import { useId } from 'react';

export function GhostLogo({ size = 52 }) {
  const id = useId().replace(/:/g, '');
  const haloId = `gh-halo-${id}`;
  const innerGlowId = `gh-inner-${id}`;
  const shineId = `gh-shine-${id}`;
  const glowColorId = `gh-glow-${id}`;
  const clipId = `gh-clip-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={haloId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="blur1" />
          <feGaussianBlur stdDeviation="14" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id={innerGlowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id={shineId} cx="35%" cy="28%" r="65%">
          <stop offset="0%"   stopColor="white"  stopOpacity="1" />
          <stop offset="45%"  stopColor="#e8f4ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#a0c8ff" stopOpacity="0.85" />
        </radialGradient>

        <radialGradient id={glowColorId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>

        <clipPath id={clipId}>
          <path d="M10,60 Q10,10 50,10 Q90,10 90,60 L90,90 Q78,82 66,90 Q58,96 50,90 Q42,84 34,90 Q22,98 10,90 Z" />
        </clipPath>
      </defs>

      <style>{`
        @keyframes ghostFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes tailWave {
          0%, 100% { transform: translateY(0px) scaleX(1); }
          25%       { transform: translateY(2px) scaleX(0.96); }
          50%       { transform: translateY(5px) scaleX(1.04); }
          75%       { transform: translateY(2px) scaleX(0.96); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        @keyframes shineSweep {
          0%   { opacity: 0.2; transform: translateX(-10px); }
          50%  { opacity: 0.55; transform: translateX(6px); }
          100% { opacity: 0.2; transform: translateX(-10px); }
        }
        .ghost-all   { animation: ghostFloat 2s ease-in-out infinite; transform-origin: 50px 60px; }
        .ghost-tail  { animation: tailWave 1.6s ease-in-out infinite; transform-origin: 50px 90px; }
        .glow-pulse  { animation: glowPulse 2s ease-in-out infinite; }
        .shine-sweep { animation: shineSweep 2.4s ease-in-out infinite; }
      `}</style>

      <ellipse cx="50" cy="58" rx="44" ry="50" fill={`url(#${glowColorId})`} className="glow-pulse" />

      <g className="ghost-all">
        <path
          d="M10,60 Q10,10 50,10 Q90,10 90,60 L90,90 Q78,82 66,90 Q58,96 50,90 Q42,84 34,90 Q22,98 10,90 Z"
          fill="#93c5fd"
          opacity="0.35"
          filter={`url(#${haloId})`}
        />
        <path
          d="M10,60 Q10,10 50,10 Q90,10 90,60 L90,90 Q78,82 66,90 Q58,96 50,90 Q42,84 34,90 Q22,98 10,90 Z"
          fill={`url(#${shineId})`}
          filter={`url(#${innerGlowId})`}
        />
        <ellipse cx="36" cy="32" rx="12" ry="18" fill="white" opacity="0.55"
          transform="rotate(-15 36 32)" clipPath={`url(#${clipId})`} />
        <ellipse cx="50" cy="45" rx="18" ry="30" fill="white"
          className="shine-sweep" clipPath={`url(#${clipId})`} />
        <g className="ghost-tail">
          <path
            d="M10,88 Q22,100 34,90 Q42,84 50,90 Q58,96 66,90 Q78,82 90,88 L90,93 Q78,105 66,95 Q58,89 50,95 Q42,101 34,95 Q22,107 10,93 Z"
            fill={`url(#${shineId})`}
            filter={`url(#${innerGlowId})`}
          />
        </g>
        <circle cx="37" cy="50" r="6" fill="#1e3a5f" />
        <circle cx="63" cy="50" r="6" fill="#1e3a5f" />
        <circle cx="39" cy="48" r="2" fill="white" opacity="0.8" />
        <circle cx="65" cy="48" r="2" fill="white" opacity="0.8" />
        <path d="M39,65 Q50,76 61,65" stroke="#1e3a5f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
