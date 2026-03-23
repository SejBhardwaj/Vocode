import { useState, useRef, useEffect } from "react";
import { ArrowUp, Paperclip, Mic, Globe, BrainCog, FolderCode, StopCircle, Square, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// inject scrollbar styles once
if (typeof document !== "undefined" && !document.getElementById("aipb-styles")) {
  const s = document.createElement("style");
  s.id = "aipb-styles";
  s.innerText = `#aipb-ta::-webkit-scrollbar{width:5px}#aipb-ta::-webkit-scrollbar-thumb{background:#444;border-radius:3px}`;
  document.head.appendChild(s);
}

const TOGGLES = [
  { key: "search", label: "Search", color: "#1EAEDB", Icon: Globe },
  { key: "think",  label: "Think",  color: "#8B5CF6", Icon: BrainCog },
  { key: "canvas", label: "Canvas", color: "#F97316", Icon: FolderCode },
];

export function PromptInputBox({ onSend = () => {}, isLoading = false, placeholder = "Describe changes..." }) {
  const [value, setValue] = useState("");
  const [active, setActive] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recTime, setRecTime] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const taRef = useRef(null);
  const fileRef = useRef(null);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  const isVoiceSupported = typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  // auto-resize textarea
  useEffect(() => {
    if (!taRef.current) return;
    taRef.current.style.height = "auto";
    taRef.current.style.height = Math.min(taRef.current.scrollHeight, 160) + "px";
  }, [value]);

  // recording timer
  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setRecTime(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setRecTime(0);
    }
    return () => clearInterval(timerRef.current);
  }, [recording]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const hasContent = value.trim() || image;

  const startVoice = () => {
    if (!isVoiceSupported) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onstart = () => setRecording(true);
    rec.onresult = (e) => {
      let final = "", interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      const text = final || interim;
      if (text) setValue(text);
    };
    rec.onerror = () => { setRecording(false); recognitionRef.current = null; };
    rec.onend = () => { setRecording(false); recognitionRef.current = null; };
    rec.start();
    recognitionRef.current = rec;
  };

  const stopVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setRecording(false);
  };

  const handleSubmit = () => {
    if (recording) { stopVoice(); return; }
    if (!hasContent) { startVoice(); return; }
    const prefix = active ? `[${active.charAt(0).toUpperCase() + active.slice(1)}: ` : "";
    onSend(prefix ? `${prefix}${value}]` : value, image ? [image] : []);
    setValue(""); setImage(null); setImagePreview(null);
  };

  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setImage(f);
    const r = new FileReader();
    r.onload = e => setImagePreview(e.target.result);
    r.readAsDataURL(f);
  };

  const handleToggle = (key) => setActive(a => a === key ? null : key);

  return (
    <div
      className="rounded-3xl p-2 transition-all duration-300"
      style={{
        background: "#1F2023",
        border: `1px solid ${isLoading ? "rgba(239,68,68,0.5)" : "#444"}`,
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image preview */}
      {imagePreview && (
        <div className="flex gap-2 pb-2 px-1">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
            <img src={imagePreview} alt="attachment" className="w-full h-full object-cover" />
            <button onClick={() => { setImage(null); setImagePreview(null); }}
              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/70 flex items-center justify-center">
              <X className="w-2.5 h-2.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Recording visualizer */}
      {recording ? (
        <div className="flex flex-col items-center py-3 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-sm text-white/80">{fmt(recTime)}</span>
          </div>
          <div className="flex items-center gap-0.5 h-8 w-full px-4">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="flex-1 rounded-full bg-white/40 animate-pulse"
                style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        </div>
      ) : (
        <textarea
          id="aipb-ta"
          ref={taRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
          placeholder={active === "search" ? "Search the web..." : active === "think" ? "Think deeply..." : active === "canvas" ? "Create on canvas..." : placeholder}
          disabled={isLoading}
          rows={1}
          className="w-full bg-transparent text-sm text-gray-100 placeholder-gray-500 resize-none focus:outline-none px-2 py-1"
          style={{ minHeight: 40, maxHeight: 160 }}
        />
      )}

      {/* Bottom bar */}
      <div className="flex items-center justify-between pt-1 px-1">
        {/* Left: attach + toggles */}
        <div className="flex items-center gap-1">
          {/* Attach */}
          <button onClick={() => fileRef.current?.click()}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ color: "#9CA3AF" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Paperclip className="w-4 h-4" />
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); e.target.value = ""; }} />
          </button>

          {/* Divider */}
          <div className="w-px h-4 mx-0.5" style={{ background: "rgba(255,255,255,0.1)" }} />

          {/* Toggles */}
          {TOGGLES.map(({ key, label, color, Icon }) => (
            <button key={key} onClick={() => handleToggle(key)}
              className="flex items-center gap-1 px-2 py-1 h-7 rounded-full border transition-all"
              style={{
                background: active === key ? `${color}22` : "transparent",
                borderColor: active === key ? color : "transparent",
                color: active === key ? color : "#9CA3AF",
              }}
              onMouseEnter={e => { if (active !== key) e.currentTarget.style.color = "#D1D5DB"; }}
              onMouseLeave={e => { if (active !== key) e.currentTarget.style.color = "#9CA3AF"; }}>
              <motion.div animate={{ rotate: active === key ? 360 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 25 }}>
                <Icon className="w-3.5 h-3.5" />
              </motion.div>
              <AnimatePresence>
                {active === key && (
                  <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }} className="text-xs overflow-hidden whitespace-nowrap" style={{ color }}>
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        {/* Right: mic + send */}
        <div className="flex items-center gap-1.5">
          {/* Dedicated mic button */}
          {isVoiceSupported && (
            <button
              onClick={recording ? stopVoice : startVoice}
              title={recording ? "Stop recording" : "Voice input"}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0"
              style={{
                background: recording ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.06)",
                border: recording ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
              }}>
              {recording
                ? <StopCircle className="w-4 h-4 text-red-400" />
                : <Mic className="w-4 h-4" style={{ color: "#9CA3AF" }} />}
            </button>
          )}

          {/* Send button */}
          <button onClick={handleSubmit} disabled={isLoading || !hasContent}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0"
            style={{
              background: hasContent && !isLoading ? "#fff" : "rgba(255,255,255,0.08)",
            }}>
            {isLoading
              ? <Square className="w-3.5 h-3.5 animate-pulse" style={{ color: "#9CA3AF" }} />
              : <ArrowUp className="w-4 h-4" style={{ color: hasContent ? "#1F2023" : "#555" }} />}
          </button>
        </div>
      </div>
    </div>
  );
}
