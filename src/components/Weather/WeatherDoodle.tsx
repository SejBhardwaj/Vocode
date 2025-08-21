import { motion } from 'framer-motion';

interface WeatherDoodleProps {
  condition: string;
  size?: 'sm' | 'md' | 'lg';
}

const WeatherDoodle = ({ condition, size = 'md' }: WeatherDoodleProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const getDoodle = () => {
    const normalizedCondition = condition.toLowerCase();
    
    if (normalizedCondition.includes('sunny') || normalizedCondition.includes('clear')) {
      return (
        <motion.div
          className={`${sizeClasses[size]} relative`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full text-6xl">☀️</div>
          <motion.div
            className="absolute inset-0 text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </motion.div>
      );
    }
    
    if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
      return (
        <motion.div className={`${sizeClasses[size]} relative`}>
          <motion.div
            className="text-6xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ☁️
          </motion.div>
          <motion.div
            className="absolute top-12 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, staggerChildren: 0.2 }}
          >
            <div className="text-2xl">💧💧💧</div>
          </motion.div>
        </motion.div>
      );
    }
    
    if (normalizedCondition.includes('wind') || normalizedCondition.includes('breez')) {
      return (
        <motion.div className={`${sizeClasses[size]} relative`}>
          <motion.div
            className="text-6xl"
            animate={{ x: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💨
          </motion.div>
          <motion.div
            className="absolute inset-0 text-3xl"
            animate={{ opacity: [0.5, 1, 0.5], x: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🌪️
          </motion.div>
        </motion.div>
      );
    }
    
    if (normalizedCondition.includes('snow') || normalizedCondition.includes('blizzard')) {
      return (
        <motion.div className={`${sizeClasses[size]} relative`}>
          <div className="text-6xl">❄️</div>
          <motion.div
            className="absolute inset-0"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, staggerChildren: 0.3 }}
          >
            <div className="text-2xl">❄️ ❄️ ❄️</div>
          </motion.div>
        </motion.div>
      );
    }
    
    if (normalizedCondition.includes('storm') || normalizedCondition.includes('thunder')) {
      return (
        <motion.div className={`${sizeClasses[size]} relative`}>
          <motion.div
            className="text-6xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ⛈️
          </motion.div>
          <motion.div
            className="absolute inset-0 text-4xl"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
          >
            ⚡
          </motion.div>
        </motion.div>
      );
    }
    
    if (normalizedCondition.includes('cloud') || normalizedCondition.includes('overcast')) {
      return (
        <motion.div className={`${sizeClasses[size]} relative`}>
          <motion.div
            className="text-6xl"
            animate={{ x: [0, 5, -5, 0], y: [0, -2, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ☁️
          </motion.div>
          <motion.div
            className="absolute inset-0 text-4xl opacity-70"
            animate={{ x: [0, -3, 3, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            ☁️
          </motion.div>
        </motion.div>
      );
    }
    
    // Default case
    return (
      <motion.div
        className={`${sizeClasses[size]} text-6xl`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🌤️
      </motion.div>
    );
  };

  return (
    <div className="flex items-center justify-center">
      {getDoodle()}
    </div>
  );
};

export default WeatherDoodle;