import { useState } from 'react';
import { Download } from 'lucide-react';
import { FileTree } from './ui/file-tree';
import { PromptInputBox } from './ui/ai-prompt-box';

const FILE_STRUCTURE = [
  {
    name: 'project',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'components',
            type: 'folder',
            children: [
              { name: 'Hero.jsx',    type: 'file', extension: 'jsx' },
              { name: 'Features.jsx',type: 'file', extension: 'jsx' },
              { name: 'Contact.jsx', type: 'file', extension: 'jsx' },
              { name: 'Footer.jsx',  type: 'file', extension: 'jsx' },
            ],
          },
          { name: 'App.jsx',   type: 'file', extension: 'jsx' },
          { name: 'index.jsx', type: 'file', extension: 'jsx' },
          { name: 'styles.css',type: 'file', extension: 'css' },
        ],
      },
      { name: 'index.html',   type: 'file', extension: 'html' },
      { name: 'package.json', type: 'file', extension: 'json' },
      { name: 'README.md',    type: 'file', extension: 'md' },
    ],
  },
];

const QUICK_CHIPS = ['Make hero darker', 'Add testimonials', 'Change font'];

export default function CodeViewPage({
  generatedCode,
  onEdit,
  onDownload,
  onBack,
  onPreview,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Here's your generated code. You can edit it using the chat." },
  ]);

  const handleChip = async (chip) => {
    setMessages(m => [...m, { from: 'user', text: chip }]);
    setIsEditing(true);
    await onEdit(chip);
    setIsEditing(false);
    setMessages(m => [...m, { from: 'ai', text: `Applied: "${chip}".` }]);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#080808', color: '#fff', fontFamily: 'system-ui,sans-serif' }}>

      {/* Main column */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b flex-shrink-0" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white/80">Modern Landing Page</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Saved</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onPreview}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              👁 Preview
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: '#2563eb', color: '#fff' }}
            >
              {'</>'} Code
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ background: '#2563eb', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
            >
              <Download className="w-3.5 h-3.5" />
              Export Code
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* File tree panel */}
          <div className="w-52 flex-shrink-0 flex flex-col border-r overflow-y-auto" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="px-3 py-2.5 border-b flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>explorer</span>
            </div>
            <div className="p-2">
              <FileTree data={FILE_STRUCTURE} />
            </div>
          </div>

          {/* Code panel */}
          <div className="flex-1 overflow-auto p-4" style={{ background: '#080808' }}>
            <div className="rounded-xl overflow-hidden h-full flex flex-col" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b flex-shrink-0" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.07)' }}>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>index.html</span>
              </div>
              <pre className="flex-1 p-5 text-sm font-mono leading-relaxed overflow-auto" style={{ color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                <code>{generatedCode || '<!-- No code generated yet -->'}</code>
              </pre>
            </div>
          </div>

          {/* AI Editor sidebar */}
          <div className="w-96 flex flex-col border-l flex-shrink-0 overflow-hidden" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs" style={{ background: '#2563eb' }}>V</div>
                <span className="font-semibold text-sm">AI Editor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Describe changes</span>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {msg.from === 'ai' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: '#2563eb' }}>V</div>
                  )}
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                    style={{
                      background: msg.from === 'user' ? '#2563eb' : 'rgba(255,255,255,0.07)',
                      color: msg.from === 'user' ? '#fff' : 'rgba(255,255,255,0.85)',
                      borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    }}
                  >
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

            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_CHIPS.map((chip, i) => (
                <button key={i} onClick={() => handleChip(chip)}
                  className="px-2.5 py-1 rounded-full text-xs transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                >{chip}</button>
              ))}
            </div>

            <div className="px-3 pb-4">
              <PromptInputBox
                isLoading={isEditing}
                placeholder="Make hero darker..."
                onSend={async (msg) => {
                  setMessages(m => [...m, { from: 'user', text: msg }]);
                  setIsEditing(true);
                  await onEdit(msg);
                  setIsEditing(false);
                  setMessages(m => [...m, { from: 'ai', text: `Applied: "${msg}".` }]);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
