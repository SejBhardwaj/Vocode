import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, Mic, Square } from "lucide-react";

function useAutoResizeTextarea({ minHeight, maxHeight }) {
  const textareaRef = useRef(null);
  const adjustHeight = useCallback((reset) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    if (reset) { textarea.style.height = `${minHeight}px`; return; }
    textarea.style.height = `${minHeight}px`;
    const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY));
    textarea.style.height = `${newHeight}px`;
  }, [minHeight, maxHeight]);
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);
  useEffect(() => {
    const h = () => adjustHeight();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [adjustHeight]);
  return { textareaRef, adjustHeight };
}

export function VercelV0Chat({ onSubmit }) {
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 60, maxHeight: 200 });

  // Use refs so callbacks always see latest values without stale closures
  const activeRef = useRef(false);   // true = user wants mic on
  const recRef = useRef(null);       // current SpeechRecognition instance

  const isSupported = typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const launchRecognition = useCallback(() => {
    if (!activeRef.current) return;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    recRef.current = rec;

    rec.onstart = () => {
      setIsRecording(true);
    };

    rec.onresult = (e) => {
      let final = "";
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      if (final) {
        setValue(prev => (prev ? prev + " " + final : final).trim());
        setInterimText("");
        adjustHeight();
      } else if (interim) {
        setInterimText(interim);
      }
    };

    rec.onerror = (e) => {
      if (e.error === "not-allowed") {
        activeRef.current = false;
        setIsRecording(false);
        setInterimText("");
        alert("Microphone access denied. Please allow microphone permission in your browser settings and reload.");
      }
      // no-speech / audio-capture: onend will fire and restart automatically
    };

    rec.onend = () => {
      recRef.current = null;
      if (activeRef.current) {
        // restart after brief pause to keep listening
        setTimeout(launchRecognition, 200);
      } else {
        setIsRecording(false);
        setInterimText("");
      }
    };

    try {
      rec.start();
    } catch (err) {
      console.error("rec.start() failed:", err);
      activeRef.current = false;
      setIsRecording(false);
    }
  }, [adjustHeight]);

  const startVoice = () => {
    if (!isSupported) {
      alert("Voice recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    activeRef.current = true;
    launchRecognition();
  };

  const stopVoice = () => {
    activeRef.current = false;
    if (recRef.current) {
      try { recRef.current.stop(); } catch (_) {}
      recRef.current = null;
    }
    setIsRecording(false);
    setInterimText("");
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      activeRef.current = false;
      if (recRef.current) { try { recRef.current.stop(); } catch (_) {} }
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const handleSubmit = () => {
    const text = value.trim();
    if (!text) return;
    if (activeRef.current) stopVoice();
    onSubmit && onSubmit(text);
    setValue("");
    setInterimText("");
    adjustHeight(true);
  };

  // display value: committed text + live interim
  const displayValue = interimText ? (value ? value + " " + interimText : interimText) : value;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-8">
      <div className="w-full relative" style={{ overflow: 'visible' }}>
        {/* Light beam */}
        <div className="absolute top-1/2 pointer-events-none z-0"
          style={{ left: '50%', transform: 'translateX(-50%) translateY(-50%)', width: '100vw', height: '3px',
            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 55%, rgba(255,255,255,0.2) 75%, transparent 100%)',
            filter: 'blur(2px)', boxShadow: '0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)' }} />
        <div className="absolute top-1/2 pointer-events-none z-0"
          style={{ left: '50%', transform: 'translateX(-50%) translateY(-50%)', width: '100vw', height: '8px',
            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.4) 47%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 53%, rgba(255,255,255,0.1) 70%, transparent 100%)',
            filter: 'blur(8px)' }} />

        {/* Glass container */}
        <div className="relative rounded-2xl p-6 z-10"
          style={{ background: 'rgba(20,20,25,0.4)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.5)' }}>

          <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
            <div className="overflow-y-auto">
              <Textarea
                ref={textareaRef}
                value={displayValue}
                onChange={(e) => { setValue(e.target.value); setInterimText(""); adjustHeight(); }}
                onKeyDown={handleKeyDown}
                placeholder="Describe your website idea using voice or text..."
                className={cn(
                  "w-full px-4 py-3 resize-none bg-transparent border-none text-white text-sm",
                  "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                  "placeholder:text-neutral-500 placeholder:text-sm min-h-[60px]"
                )}
                style={{ overflow: "hidden" }}
              />
            </div>

            <div className="flex items-center justify-between p-3">
              <button
                type="button"
                onClick={isRecording ? stopVoice : startVoice}
                disabled={!isSupported}
                className={cn(
                  "group p-2 rounded-lg transition-all flex items-center gap-1.5",
                  isRecording ? "bg-red-600 hover:bg-red-700" : "hover:bg-neutral-800",
                  !isSupported && "opacity-40 cursor-not-allowed"
                )}
                title={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording
                  ? <Square className="w-4 h-4 text-white fill-white" />
                  : <Mic className="w-4 h-4 text-white" />}
                <span className="text-xs text-white/70 hidden group-hover:inline">
                  {isRecording ? "Stop" : "Voice"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!value.trim()}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm transition-colors border flex items-center gap-2",
                  value.trim() ? "bg-white text-black border-white hover:bg-gray-100" : "text-zinc-400 border-zinc-700 cursor-not-allowed"
                )}
              >
                <ArrowUpIcon className={cn("w-4 h-4", value.trim() ? "text-black" : "text-zinc-400")} />
                <span className="text-sm font-medium">Send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <div className="mt-4 flex items-center justify-center gap-3 text-red-400 text-sm">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div className="flex items-end gap-0.5 h-5">
              {[3,5,8,5,7,4,6,3,5,8].map((h, i) => (
                <div key={i} className="w-1 rounded-full bg-red-400 animate-pulse"
                  style={{ height: `${h * 2}px`, animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
            <span>Listening{interimText ? `: "${interimText}"` : "..."}</span>
          </div>
        )}
      </div>
    </div>
  );
}
