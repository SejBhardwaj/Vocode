import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [currentDoodle, setCurrentDoodle] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const weatherScenarios = [
    {
      type: 'sunny',
      colors: ['#FFD700', '#FFA500', '#FFFF99'],
      icon: (colors: string[]) => (
        <svg width="96" height="96" viewBox="0 0 96 96" className="w-24 h-24">
          <circle cx="48" cy="48" r="20" fill={colors[0]} />
          {Array.from({length: 8}).map((_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const x1 = 48 + Math.cos(angle) * 28;
            const y1 = 48 + Math.sin(angle) * 28;
            const x2 = 48 + Math.cos(angle) * 36;
            const y2 = 48 + Math.sin(angle) * 36;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={colors[1]}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      )
    },
    {
      type: 'rainy',
      colors: ['#4A90E2', '#2E5BBA', '#87CEEB'],
      icon: (colors: string[]) => (
        <svg width="96" height="96" viewBox="0 0 96 96" className="w-24 h-24">
          <path
            d="M24 40c0-13.3 10.7-24 24-24s24 10.7 24 24c6.6 0 12 5.4 12 12s-5.4 12-12 12H24c-6.6 0-12-5.4-12-12s5.4-12 12-12z"
            fill={colors[0]}
          />
          {Array.from({length: 6}).map((_, i) => (
            <line
              key={i}
              x1={28 + i * 8} y1={68}
              x2={24 + i * 8} y2={80}
              stroke={colors[1]}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </svg>
      )
    },
    {
      type: 'windy',
      colors: ['#E6E6FA', '#C0C0C0', '#B0E0E6'],
      icon: (colors: string[]) => (
        <svg width="96" height="96" viewBox="0 0 96 96" className="w-24 h-24">
          {Array.from({length: 4}).map((_, i) => (
            <path
              key={i}
              d={`M12 ${32 + i * 8} Q36 ${28 + i * 8} 60 ${32 + i * 8} T84 ${32 + i * 8}`}
              stroke={colors[i % colors.length]}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>
      )
    },
    {
      type: 'cloudy',
      colors: ['#F5F5F5', '#DCDCDC', '#C0C0C0'],
      icon: (colors: string[]) => (
        <svg width="96" height="96" viewBox="0 0 96 96" className="w-24 h-24">
          <circle cx="36" cy="44" r="16" fill={colors[0]} />
          <circle cx="56" cy="40" r="20" fill={colors[1]} />
          <circle cx="32" cy="56" r="12" fill={colors[2]} />
          <circle cx="60" cy="56" r="14" fill={colors[0]} />
        </svg>
      )
    },
    {
      type: 'stormy',
      colors: ['#4169E1', '#1E90FF', '#87CEFA'],
      icon: (colors: string[]) => (
        <svg width="96" height="96" viewBox="0 0 96 96" className="w-24 h-24">
          <path
            d="M24 40c0-13.3 10.7-24 24-24s24 10.7 24 24c6.6 0 12 5.4 12 12s-5.4 12-12 12H24c-6.6 0-12-5.4-12-12s5.4-12 12-12z"
            fill={colors[0]}
          />
          <path
            d="M44 64 L40 72 L48 72 L42 80 L52 68 L46 68 L50 60 Z"
            fill={colors[1]}
          />
        </svg>
      )
    }
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Doodle rotation
    const doodleInterval = setInterval(() => {
      setCurrentDoodle(prev => (prev + 1) % weatherScenarios.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(doodleInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 animated-bg flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Animated Weather Doodles */}
        <div className="flex items-center justify-center mb-8 h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDoodle}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {weatherScenarios[currentDoodle].icon(weatherScenarios[currentDoodle].colors)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading Text */}
        <motion.h1
          className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Vayu
        </motion.h1>

        <motion.p
          className="text-muted-foreground mb-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Predicting the mood of the sky...
        </motion.p>

        {/* Breeze Loading Progress */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="flex-1 h-2 bg-glass rounded-full overflow-hidden mr-4 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Background wind particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: '-10px',
                  }}
                  animate={{
                    x: [0, 300],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            {/* Progress bar with breeze effect */}
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-full relative"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              {/* Shiny glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Percentage Counter */}
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.5))',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {progress}%
          </motion.div>
        </div>

        {/* Floating wind particles around the screen */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;