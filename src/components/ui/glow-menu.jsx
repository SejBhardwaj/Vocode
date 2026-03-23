"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.9 },
  hover: {
    opacity: 1,
    scale: 1.1,
    transition: {
      opacity: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
      scale: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  duration: 0.3,
}

const smoothTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1],
}

export const MenuBar = React.forwardRef(({ className, items, activeItem, onItemClick, ...props }, ref) => {
  const [hoveredItem, setHoveredItem] = React.useState(null)
  
  // Get the current item (hovered or active)
  const currentItem = hoveredItem || activeItem
  const currentItemData = items.find(item => item.label === currentItem)
  
  return (
    <motion.nav
      ref={ref}
      className={cn(
        "p-2 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg relative overflow-hidden transition-all duration-300",
        "transform-gpu will-change-transform",
        className,
      )}
      style={{
        background: currentItemData 
          ? `linear-gradient(135deg, ${currentItemData.gradient.match(/rgba\([^)]+\)/g)?.[0]?.replace('0.15', '0.08') || 'rgba(255,255,255,0.05)'}, rgba(255,255,255,0.02))`
          : 'rgba(255,255,255,0.05)'
      }}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      <motion.div
        className="absolute -inset-2 rounded-3xl z-0 pointer-events-none transition-all duration-300"
        style={{
          background: currentItemData 
            ? currentItemData.gradient.replace(/0\.\d+/g, '0.1')
            : 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 100%)'
        }}
        variants={navGlowVariants}
      />
      
      <ul className="flex items-center gap-1 relative z-10">
        {items.map((item) => {
          const isActive = item.label === activeItem
          return (
            <motion.li key={item.label} className="relative">
              <button
                onClick={() => onItemClick?.(item.label)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className="block w-full"
              >
                <motion.div
                  className="block rounded-xl overflow-hidden group relative transform-gpu will-change-transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={smoothTransition}
                >
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-xl"
                    variants={glowVariants}
                    animate={isActive ? "hover" : "initial"}
                    style={{
                      background: item.gradient,
                      opacity: isActive ? 0.8 : 0,
                    }}
                  />
                  
                  <motion.div
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 relative z-10 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-white bg-white/5"
                        : "text-white/70 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <span>{item.label}</span>
                  </motion.div>
                </motion.div>
              </button>
            </motion.li>
          )
        })}
      </ul>
    </motion.nav>
  )
})

MenuBar.displayName = "MenuBar"
