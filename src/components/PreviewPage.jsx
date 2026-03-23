import { useState, useEffect } from 'react';
import { RefreshCw, Download, Monitor, Tablet, Smartphone } from 'lucide-react';
import Bucket from './ui/bucket';
import { PromptInputBox } from './ui/ai-prompt-box';

const QUICK_CHIPS = ['Make hero darker', 'Add testimonials', 'Change font'];

function GeneratingMessages({ idea }) {
  const base = idea ? idea.slice(0, 40) : 'your website';
  const steps = [
    `Analysing "${base}"...`,
    'Planning page structure...',
    'Designing layout & sections...',
    'Writing HTML & styles...',
    'Adding animations & interactions...',
    'Polishing final details...',
    'Almost ready...',
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col items-center gap-1.5" style={{ marginTop: -32 }}>
      <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{steps[idx]}</p>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>This may take a few moments</p>
    </div>
  );
}

export default function PreviewPage({ generatedCode, refinedIdea, onEdit, onDownload, onBack, onCodeView, isGenerating = false }) {
  const [device, setDevice]     = useState('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'user', text: refinedIdea?.description || 'Generate my website' },
    { from: 'ai',   text: "I've generated your website. You can now preview it and make edits using the chat below." },
  ]);

  const iframeWidths = { desktop: '100%', tablet: '768px', mobile: '390px' };
  const previewHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Preview</title><script>/* suppress tailwind cdn warning */const _warn=console.warn;console.warn=(...a)=>{if(a[0]&&String(a[0]).includes('cdn.tailwindcss'))return;_warn(...a)};<\/script><style>body{margin:0;padding:0;font-family:system-ui,-apple-system,sans-serif;}</style></head><body>${generatedCode || ''}<script>document.addEventListener('click',function(e){var a=e.target.closest('a');if(a){var href=a.getAttribute('href');if(!href||href==='#'||href.startsWith('#')){e.preventDefault();if(href&&href.length>1){var el=document.querySelector(href);if(el)el.scrollIntoView({behavior:'smooth'});}}else{e.preventDefault();}}});<\/script></body></html>`;

  const handleSend = async (msg) => {
    setMessages(m => [...m, { from: 'user', text: msg }]);
    setIsEditing(true);
    await onEdit(msg);
    setIsEditing(false);
    setMessages(m => [...m, { from: 'ai', text: `Applied: "${msg}". Check the preview.` }]);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#080808', color: '#fff', fontFamily: 'system-ui,sans-serif' }}>
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b flex-shrink-0" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white/80">Modern Landing Page</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Saved</span>
          </div>
          <div className="flex items-center gap-1 px-1 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[{ id: 'desktop', Icon: Monitor }, { id: 'tablet', Icon: Tablet }, { id: 'mobile', Icon: Smartphone }].map(({ id, Icon }) => (
              <button key={id} onClick={() => setDevice(id)}
                className="px-3 py-1 rounded-md text-xs flex items-center gap-1.5 transition-all capitalize"
                style={{ background: device === id ? 'rgba(255,255,255,0.1)' : 'transparent', color: device === id ? '#fff' : 'rgba(255,255,255,0.45)' }}>
                <Icon className="w-3.5 h-3.5" />{id}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => {}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: '#2563eb', color: '#fff' }}>👁 Preview</button>
            <button onClick={onCodeView} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
              {'</>'} Code
            </button>
            <button onClick={onDownload} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ background: '#2563eb', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>
              <Download className="w-3.5 h-3.5" /> Export Code
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Preview area */}
          <div className="flex-1 flex flex-col overflow-hidden p-4 gap-3" style={{ background: '#080808' }}>
            <div className="rounded-xl overflow-hidden flex flex-col flex-1" style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#111' }}>
              <div className="flex items-center px-4 py-2.5 border-b flex-shrink-0" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="flex-1 mx-3 px-3 py-1 rounded-md text-xs text-center" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)' }}>
                  preview.vocode.app
                </div>
                <RefreshCw className="w-3.5 h-3.5 cursor-pointer transition-all"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  onClick={() => setIframeKey(k => k + 1)}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'} />
              </div>
              <div className="flex-1 overflow-hidden flex justify-center" style={{ background: (!isGenerating && generatedCode) ? '#fff' : '#080808' }}>
                {isGenerating || !generatedCode ? (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-5">
                    <div style={{ width: '60%', maxWidth: 400 }}><Bucket /></div>
                    <div style={{ marginTop: '2rem' }}>
                      <GeneratingMessages idea={refinedIdea?.description} />
                    </div>
                  </div>
                ) : (
                  <iframe key={iframeKey} srcDoc={previewHtml} title="Website Preview"
                    style={{ width: iframeWidths[device], height: '100%', border: 'none', transition: 'width 0.3s ease' }} />
                )}
              </div>
            </div>
          </div>

          {/* AI Editor sidebar */}
          <div className="w-96 flex flex-col border-l flex-shrink-0 overflow-hidden" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.07)' }}>
            {/* Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs" style={{ background: '#2563eb' }}>V</div>
                <span className="font-semibold text-sm">AI Editor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Describe changes</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {msg.from === 'ai' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: '#2563eb' }}>V</div>
                  )}
                  <div className="max-w-[85%] px-3 py-2 text-sm leading-relaxed"
                    style={{
                      background: msg.from === 'user' ? '#2563eb' : 'rgba(255,255,255,0.07)',
                      color: msg.from === 'user' ? '#fff' : 'rgba(255,255,255,0.85)',
                      borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isEditing && (
                <div className="flex justify-start gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#2563eb' }}>V</div>
                  <div className="px-3 py-2 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}>Applying changes...</div>
                </div>
              )}
            </div>

            {/* Quick chips */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {QUICK_CHIPS.map((chip, i) => (
                <button key={i} onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full text-xs transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                  {chip}
                </button>
              ))}
            </div>

            {/* Prompt box */}
            <div className="px-3 pb-4 flex-shrink-0">
              <PromptInputBox isLoading={isEditing} placeholder="Make hero darker..." onSend={handleSend} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
