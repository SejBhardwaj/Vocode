import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Zap, Crown, Check } from 'lucide-react';
import Navbar from './Navbar';
import LightRays from './ui/LightRays';

function MiniPage() {
  return (
    <div
      className="w-full h-full rounded-xl p-3"
      style={{
        background: 'linear-gradient(145deg, #aaa 0%, #777 20%, #bbb 45%, #585858 65%, #909090 85%, #484848 100%)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '1px 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
      }}
    >
      <div className="flex flex-col gap-1.5">
        <div
          className="w-full h-1.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, #666, #999, #666)' }}
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-1.5">
            <div className="flex-1 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #777, #aaa, #777)', opacity: 0.7 }} />
            <div className="flex-1 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #686868, #999, #686868)', opacity: 0.6 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

const cardPages = [
  {
    initial: { rotate: -3, x: -38, y: 2 },
    open:    { rotate: -8, x: -70, y: -55 },
    transition: { type: 'spring', bounce: 0.15, stiffness: 160, damping: 22 },
    className: 'z-10 shadow-md',
  },
  {
    initial: { rotate: 0, x: 0, y: 0 },
    open:    { rotate: 1, x: 2, y: -75 },
    transition: { type: 'spring', duration: 0.55, bounce: 0.12, stiffness: 190, damping: 24 },
    className: 'z-20 shadow-lg',
  },
  {
    initial: { rotate: 3.5, x: 42, y: 1 },
    open:    { rotate: 9, x: 75, y: -60 },
    transition: { type: 'spring', duration: 0.58, bounce: 0.17, stiffness: 170, damping: 21 },
    className: 'z-10 shadow-md',
  },
];

function PlanCard({ plan, selected, onClick, autoOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      const t1 = setTimeout(() => setIsOpen(true), autoOpen.delay);
      const t2 = setTimeout(() => setIsOpen(false), autoOpen.delay + 2500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  const borderColor = selected ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="w-full cursor-pointer flex flex-col gap-5"
    >
      {/* Folder area */}
      <div className="w-64 h-48 relative mx-auto">
        {/* Folder body — metallic */}
        <div
          className="relative w-[80%] mx-auto h-full flex justify-center items-center"
          style={{
            background: 'linear-gradient(160deg, #aaa 0%, #777 25%, #bbb 50%, #555 72%, #888 88%, #404040 100%)',
            boxShadow: '2px 4px 18px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
            borderRadius: 20,
            border: selected ? '1.5px solid rgba(59,130,246,0.7)' : '1px solid rgba(210,210,210,0.3)',
          }}
        >
          {cardPages.map((page, i) => (
            <motion.div
              key={i}
              initial={page.initial}
              animate={isOpen ? page.open : page.initial}
              transition={page.transition}
              className={`absolute top-2 w-32 h-fit rounded-xl ${page.className}`}
            >
              <MiniPage />
            </motion.div>
          ))}
        </div>

        {/* Folder front flap — taller so it covers lower half of folder body */}
        <motion.div
          animate={{ rotateX: isOpen ? -40 : 0 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
          className="absolute left-0 right-0 bottom-0 z-20 origin-bottom"
          style={{ perspective: 800, height: '72%', top: 'auto' }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 235 121"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 -4px 10px rgba(0,0,0,0.35))' }}
          >
            <defs>
              <linearGradient id={`metalFlap-${plan.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#b0b0b0" />
                <stop offset="15%"  stopColor="#808080" />
                <stop offset="40%"  stopColor="#c0c0c0" />
                <stop offset="60%"  stopColor="#505050" />
                <stop offset="80%"  stopColor="#888888" />
                <stop offset="100%" stopColor="#383838" />
              </linearGradient>
              <linearGradient id={`metalFlapSel-${plan.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#c8d8ff" />
                <stop offset="20%"  stopColor="#a0b8f0" />
                <stop offset="50%"  stopColor="#d8e8ff" />
                <stop offset="75%"  stopColor="#6080c0" />
                <stop offset="100%" stopColor="#304080" />
              </linearGradient>
            </defs>
            <path
              d="M104.615 0.350494L33.1297 0.838776C32.7542 0.841362 32.3825 0.881463 32.032 0.918854C31.6754 0.956907 31.3392 0.992086 31.0057 0.992096H31.0047C30.6871 0.99235 30.3673 0.962051 30.0272 0.929596C29.6927 0.897686 29.3384 0.863802 28.9803 0.866119L13.2693 0.967682H13.2527L13.2352 0.969635C13.1239 0.981406 13.0121 0.986674 12.9002 0.986237H9.91388C8.33299 0.958599 6.76052 1.22345 5.27423 1.76651H5.27325C4.33579 2.11246 3.48761 2.66213 2.7879 3.37393L2.49689 3.68839L2.492 3.69424C1.62667 4.73882 1.00023 5.96217 0.656067 7.27725C0.653324 7.28773 0.654065 7.29886 0.652161 7.30948C0.3098 8.62705 0.257231 10.0048 0.499817 11.3446L12.2147 114.399L12.2156 114.411L12.2176 114.423C12.6046 116.568 13.7287 118.508 15.3934 119.902C17.058 121.297 19.1572 122.056 21.3231 122.049V122.05H215.379C217.76 122.02 220.064 121.192 221.926 119.698V119.697C223.657 118.384 224.857 116.485 225.305 114.35L225.307 114.339L235.914 53.3798L235.968 53.1093L235.97 53.0985L235.971 53.0888C236.134 51.8978 236.044 50.685 235.705 49.5321C235.307 48.1669 234.63 46.9005 233.717 45.8144L233.383 45.4296C232.58 44.5553 231.614 43.8449 230.539 43.3398C229.311 42.7628 227.971 42.4685 226.616 42.4774H146.746C144.063 42.4705 141.423 41.8004 139.056 40.5263C136.691 39.2522 134.671 37.4127 133.175 35.1689L113.548 5.05948L113.544 5.05362L113.539 5.04776C112.545 3.65165 111.238 2.51062 109.722 1.72061C108.266 0.886502 106.627 0.422235 104.952 0.365143V0.364166L104.633 0.350494H104.615Z"
              fill={selected ? `url(#metalFlapSel-${plan.id})` : `url(#metalFlap-${plan.id})`}
              stroke={selected ? 'rgba(100,140,255,0.6)' : 'rgba(200,200,200,0.3)'}
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </div>

      {/* Card info — separate box below folder */}
      <div
        className="px-5 pt-4 pb-5 rounded-2xl transition-all duration-300"
        style={{
          background: selected ? '#0f1f3d' : '#0e1117',
          border: `1px solid ${borderColor}`,
          boxShadow: selected ? '0 0 20px rgba(37,99,235,0.15)' : '0 2px 12px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white flex-shrink-0`}>
            {plan.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base leading-tight">{plan.name}</h3>
            {plan.popular && (
              <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">
                POPULAR
              </span>
            )}
          </div>
          {selected && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>

        <p className="text-white/50 text-sm mb-3">{plan.description}</p>

        <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Features:</p>
        <ul className="space-y-1.5">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-white/60">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${plan.color} flex-shrink-0`} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PlanSelectionPage({ userIdea, onSelectPlan, onBack, onNavigate, currentPage }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'minimal',
      name: 'Minimal & Clean',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Simple, elegant design focused on content',
      color: 'from-blue-500 to-cyan-500',
      features: ['Clean typography', 'Minimalist layout', 'Fast loading', 'Mobile responsive', 'Modern aesthetics'],
      style: 'minimal',
    },
    {
      id: 'modern',
      name: 'Modern & Bold',
      icon: <Zap className="w-5 h-5" />,
      description: 'Eye-catching design with animations',
      color: 'from-purple-500 to-pink-500',
      features: ['Smooth animations', 'Bold colors', 'Interactive elements', 'Gradient backgrounds', 'Dynamic sections'],
      style: 'modern',
      popular: true,
    },
    {
      id: 'professional',
      name: 'Professional & Corporate',
      icon: <Crown className="w-5 h-5" />,
      description: 'Business-focused professional design',
      color: 'from-indigo-500 to-blue-500',
      features: ['Corporate style', 'Trust-building elements', 'Professional layout', 'Data visualization', 'Team showcase'],
      style: 'professional',
    },
  ];

  const handleContinue = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) onSelectPlan(plan);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar onNavigate={onNavigate} currentPage={currentPage} />

      <div className="absolute inset-0 z-[5] pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={1.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="relative z-10 pt-24 px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-blue-400">
            Choose Your Design Style
          </h1>
          <p className="text-white/50 text-base mb-8">Select a design that best fits your vision</p>

          <div className="border border-white/10 rounded-xl p-5 mb-12 bg-white/[0.03]">
            <p className="text-xs text-white/30 mb-1">Your Idea:</p>
            <p className="text-white/80">{userIdea}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5, type: 'spring', stiffness: 120, damping: 20 }}
              >
                <PlanCard
                  plan={plan}
                  selected={selectedPlan === plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  autoOpen={{ delay: 300 + i * 200 }}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedPlan}
              className={`px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${
                selectedPlan
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:scale-105'
                  : 'bg-white/5 text-white/25 cursor-not-allowed'
              }`}
            >
              Continue with Selected Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
