import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SecurityCheckIcon,
  ZapIcon,
  UserStoryIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const INITIAL_CHIPS = [
  { id: 1, title: "Production Ready",  description: "Fully type-safe and tested",       icon: SecurityCheckIcon },
  { id: 2, title: "Fluid Motion",      description: "60fps optimizations built-in",      icon: ZapIcon },
  { id: 3, title: "Accessible",        description: "Works perfectly for everyone",      icon: UserStoryIcon },
  { id: 4, title: "Modern Design",     description: "Crafted for high-end feel",         icon: SparklesIcon },
];

export default function Bucket() {
  const [items, setItems] = useState(INITIAL_CHIPS);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-fit relative w-full">
      <div className="relative isolate w-full max-w-[655px]" style={{ aspectRatio: "655/352" }}>
        {/* Background SVG layer */}
        <svg width="100%" height="100%" viewBox="0 0 655 352" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-0">
          <defs>
            <filter id="filter0_i_bucket" x="123.766" y="79.1595" width="413" height="275.676" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" /><feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_bucket" />
            </filter>
            <filter id="filter6_bucket" x="21.477" y="56.6875" width="612.444" height="212.562" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="33.3087" /><feGaussianBlur stdDeviation="22.2058" /><feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_bucket" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="8.94656" /><feGaussianBlur stdDeviation="4.47328" /><feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_bucket" result="effect2_dropShadow_bucket" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_bucket" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" /><feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect4_innerShadow_bucket" />
            </filter>
            <clipPath id="center_box_clip_bucket"><rect x="123.766" y="0" width="413" height="352" /></clipPath>
            <linearGradient id="paint0_linear_bucket" x1="329.353" y1="42.8774" x2="329.353" y2="79.1144" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.4" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Left wing */}
          <g filter="url(#filter6_bucket)">
            <path d="M123.116 79.1145L171.548 42.8776L97.2715 12.5164C94.8305 11.5186 93.61 11.0197 92.3446 11.1143C91.0793 11.2089 89.9465 11.8837 87.681 13.2334L56.155 32.0149C48.1832 36.7641 44.1973 39.1386 44.4205 42.4378C44.6438 45.737 48.9132 47.553 57.4522 51.1849L123.116 79.1145Z" fill="white" fillOpacity="0.42" shapeRendering="crispEdges" />
          </g>
          {/* Right wing */}
          <g filter="url(#filter6_bucket)">
            <path d="M535.59 78.7427L487.973 42.8776L558.738 13.9516C562.902 12.2494 564.984 11.3984 567.143 11.5597C569.301 11.7211 571.233 12.8723 575.098 15.1747L590.22 24.1832C603.923 32.347 610.775 36.4289 610.372 42.0779C609.97 47.7269 602.609 50.7964 587.887 56.9354L535.59 78.7427Z" fill="white" fillOpacity="0.42" shapeRendering="crispEdges" />
          </g>
          {/* Top flap */}
          <g filter="url(#filter6_bucket)">
            <path d="M487.973 42.8774L171.548 42.8775L123.116 79.1144L535.59 78.7424L487.973 42.8774Z" fill="url(#paint0_linear_bucket)" fillOpacity="0.72" shapeRendering="crispEdges" />
          </g>
        </svg>

        {/* Animated chip in center */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full flex justify-center items-center" style={{ paddingBottom: "65%" }}>
            <AnimatePresence mode="popLayout">
              {items.map((chip, index) => {
                if (index !== 0) return null;
                return (
                  <motion.div
                    key={chip.id}
                    initial={{ y: -100, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1.15 }}
                    exit={{ y: 130, scale: 0.8, transition: { duration: 0.8 } }}
                    transition={{ duration: 0.5, ease: [0.455, 0.03, 0.515, 0.955] }}
                    className="absolute pointer-events-auto flex items-center gap-3 rounded-full px-4 py-2.5 origin-bottom"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                      minWidth: 220,
                    }}
                  >
                    <div className="flex w-9 h-9 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(96,165,250,0.15)' }}>
                      <HugeiconsIcon icon={chip.icon} className="w-5 h-5" style={{ color: '#60a5fa' }} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-white leading-none">{chip.title}</span>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{chip.description}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Foreground SVG — bucket body */}
        <svg width="100%" height="100%" viewBox="0 0 655 352" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <defs>
            <filter id="filter0_i_bucket_fg" x="123.766" y="79.1595" width="413" height="275.676" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" /><feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_fg" />
            </filter>
            <filter id="filter6_bucket_fg" x="21.477" y="56.6875" width="612.444" height="212.562" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="33.3087" /><feGaussianBlur stdDeviation="22.2058" /><feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="e1" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="8.94656" /><feGaussianBlur stdDeviation="4.47328" /><feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0" />
              <feBlend mode="normal" in2="e1" result="e2" />
              <feBlend mode="normal" in="SourceGraphic" in2="e2" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" /><feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect4_fg" />
            </filter>
          </defs>
          {/* Bucket body */}
          <g filter="url(#filter0_i_bucket_fg)">
            <path
              d="M512.766 79.1595L147.766 79.1624C136.453 79.1625 130.796 79.1626 127.281 82.6773C123.766 86.192 123.766 91.8488 123.766 103.162V327.159C123.766 338.473 123.766 344.13 127.281 347.645C130.796 351.159 136.453 351.159 147.766 351.159H512.766C524.08 351.159 529.737 351.159 533.252 347.645C536.766 344.13 536.766 338.473 536.766 327.159V103.159C536.766 91.8457 536.766 86.1888 533.252 82.6741C529.737 79.1594 524.08 79.1594 512.766 79.1595Z"
              fill="rgba(14,14,14,0.92)"
            />
          </g>
          {/* Front trapezoid */}
          <g filter="url(#filter6_bucket_fg)">
            <path
              d="M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z"
              fill="rgba(20,20,20,0.85)"
              shapeRendering="crispEdges"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
