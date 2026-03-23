import { useState, useEffect } from 'react'
import { MenuBar } from './ui/glow-menu'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { GhostLogo } from './ui/ghost-logo'

function RoamingGhost() {
  const [pos, setPos] = useState({ x: 0, y: -32 })

  useEffect(() => {
    const roam = () => {
      const angle = Math.random() * Math.PI * 2
      // Keep ghost in a ring: min 48px from center, max 68px
      const rx = 58 + Math.random() * 14
      const ry = 26 + Math.random() * 10
      setPos({
        x: Math.cos(angle) * rx,
        y: Math.sin(angle) * ry,
      })
    }
    roam()
    const id = setInterval(roam, 2200 + Math.random() * 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: 'absolute',
      // center the ghost itself on the computed point
      left: `calc(50% + ${pos.x}px)`,
      top: `calc(50% + ${pos.y}px)`,
      transform: 'translate(-50%, -50%)',
      transition: 'left 2s cubic-bezier(0.45, 0, 0.55, 1), top 2s cubic-bezier(0.45, 0, 0.55, 1)',
      zIndex: 20,
      pointerEvents: 'none',
    }}>
      <GhostLogo size={36} />
    </div>
  )
}

export default function Navbar({ onNavigate, currentPage }) {
  const [activeItem, setActiveItem] = useState('Home')

  const menuItems = [
    {
      label: "Home",
      gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      page: 'main'
    },
    {
      label: "Chat", 
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      page: 'howItWorks'
    },
    {
      label: "Pricing",
      gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      page: 'pricing'
    }
  ];

  // Sync active item with current page
  useEffect(() => {
    if (currentPage === 'main') {
      setActiveItem('Home')
    } else if (currentPage === 'howItWorks') {
      setActiveItem('Chat')
    } else if (currentPage === 'pricing') {
      setActiveItem('Pricing')
    }
  }, [currentPage])

  const handleItemClick = (label) => {
    // Immediately set active item
    setActiveItem(label)
    
    // Navigate based on the clicked item
    if (label === "Home") {
      onNavigate('main')
    } else if (label === "Chat") {
      onNavigate('howItWorks')
    } else if (label === "Pricing") {
      onNavigate('pricing')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-4">
      {/* Left side - Logo */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer transform-gpu will-change-transform transition-transform duration-200 hover:scale-105" 
        onClick={() => {
          setActiveItem('Home')
          onNavigate('main')
        }}
      >
        {/* VOCODE text with ghost roaming around it */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
          <span className="text-xl font-black tracking-wide text-blue-400" style={{ position: 'relative', zIndex: 10 }}>VOCODE</span>
          <RoamingGhost />
        </div>
      </div>

      {/* Center - Glow Menu */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <MenuBar
          items={menuItems}
          activeItem={activeItem}
          onItemClick={handleItemClick}
          className="hidden md:flex"
        />
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="btn-outline text-sm px-4 py-1.5 rounded-lg text-white/70 transition-all duration-200 transform-gpu will-change-transform hover:scale-105">
          Login
        </button>
        <Button 
          icon={<ArrowRight />}
          title="Get Started"
          size="sm"
          gradientLight={{ from: "from-blue-500/40", via: "via-blue-400/40", to: "to-blue-500/60" }}
          gradientDark={{ from: "from-blue-800/30", via: "via-black/50", to: "to-black/70" }}
          className="text-sm"
        />
      </div>
    </nav>
  )
}
