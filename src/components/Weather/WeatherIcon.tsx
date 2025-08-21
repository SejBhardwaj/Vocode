import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudDrizzle,
  Cloudy,
  Moon,
  CloudLightning
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const WeatherIcon = ({ condition, size = 'md', animated = true, className = '' }: WeatherIconProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const getIcon = () => {
    const lower = condition.toLowerCase();
    
    if (lower.includes('sunny') || lower.includes('clear')) {
      return Sun;
    } else if (lower.includes('rain') || lower.includes('shower')) {
      return CloudRain;
    } else if (lower.includes('drizzle')) {
      return CloudDrizzle;
    } else if (lower.includes('snow') || lower.includes('blizzard')) {
      return CloudSnow;
    } else if (lower.includes('thunder') || lower.includes('storm')) {
      return CloudLightning;
    } else if (lower.includes('cloudy') || lower.includes('overcast')) {
      return Cloudy;
    } else if (lower.includes('partly')) {
      return Cloud;
    } else if (lower.includes('night') || lower.includes('moon')) {
      return Moon;
    }
    
    return Cloud; // Default fallback
  };

  const IconComponent = getIcon();
  
  const getColor = () => {
    const lower = condition.toLowerCase();
    
    if (lower.includes('sunny') || lower.includes('clear')) {
      return 'text-weather-sunny';
    } else if (lower.includes('rain') || lower.includes('drizzle')) {
      return 'text-weather-rainy';
    } else if (lower.includes('snow')) {
      return 'text-weather-snowy';
    } else if (lower.includes('thunder') || lower.includes('storm')) {
      return 'text-weather-stormy';
    } else {
      return 'text-weather-cloudy';
    }
  };

  const getAnimation = () => {
    const lower = condition.toLowerCase();
    
    if (lower.includes('sunny') || lower.includes('clear')) {
      return {
        rotate: [0, 360],
        scale: [1, 1.1, 1],
        transition: { duration: 4, repeat: Infinity, ease: "linear" as const }
      };
    } else if (lower.includes('rain') || lower.includes('drizzle')) {
      return {
        y: [0, -2, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
      };
    } else if (lower.includes('thunder') || lower.includes('storm')) {
      return {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
      };
    } else if (lower.includes('snow')) {
      return {
        y: [0, -3, 0],
        x: [0, 1, -1, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
      };
    } else {
      return {
        x: [0, 2, -2, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
      };
    }
  };

  return (
    <motion.div
      className={`inline-flex ${className}`}
      animate={animated ? getAnimation() : {}}
      whileHover={{ scale: 1.1 }}
    >
      <IconComponent 
        className={`${sizeClasses[size]} ${getColor()} drop-shadow-lg`}
      />
    </motion.div>
  );
};

export default WeatherIcon;