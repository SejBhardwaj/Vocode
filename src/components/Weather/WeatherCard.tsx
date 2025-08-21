import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Eye, Wind, Droplets } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  title: string;
  location?: string;
  temperature?: string;
  condition?: string;
  details?: Array<{
    icon: React.ComponentType<any>;
    label: string;
    value: string;
  }>;
  gradient?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const WeatherCard = ({ 
  title, 
  location, 
  temperature, 
  condition, 
  details, 
  gradient = 'bg-gradient-glass',
  onClick,
  size = 'md',
  className = ''
}: WeatherCardProps) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      className={`weather-card cursor-pointer group ${gradient} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {location && (
            <div className="flex items-center space-x-1 text-muted-foreground text-sm mt-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
          )}
        </div>
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ x: 5 }}
        >
          <ArrowRight className="w-5 h-5 text-neon-primary" />
        </motion.div>
      </div>

      {/* Main Weather Display */}
      {temperature && condition && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-4xl font-bold text-foreground mb-1">
              {temperature}
            </div>
            <div className="text-muted-foreground capitalize">
              {condition}
            </div>
          </div>
          <div className="float">
            <WeatherIcon condition={condition} size="xl" />
          </div>
        </div>
      )}

      {/* Details */}
      {details && details.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {details.map((detail, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <detail.icon className="w-4 h-4 text-neon-primary" />
              <div>
                <div className="text-muted-foreground">{detail.label}</div>
                <div className="text-foreground font-medium">{detail.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export default WeatherCard;