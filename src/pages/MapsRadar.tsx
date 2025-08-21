import { motion } from 'framer-motion';
import { ArrowLeft, Map, Play, Pause, Layers, Zap, Wind, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MapsRadar = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLayer, setActiveLayer] = useState('precipitation');

  const mapLayers = [
    { id: 'precipitation', label: 'Precipitation', icon: Droplets, color: 'text-weather-rainy' },
    { id: 'wind', label: 'Wind Flow', icon: Wind, color: 'text-weather-cloudy' },
    { id: 'lightning', label: 'Lightning', icon: Zap, color: 'text-weather-stormy' },
    { id: 'temperature', label: 'Temperature', icon: Map, color: 'text-weather-sunny' },
  ];

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <motion.button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg glass glass-hover mr-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Weather Maps</h1>
              <p className="text-muted-foreground">Interactive radar & satellite imagery</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-4 py-2 glass glass-hover rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </motion.button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Layers */}
          <div className="lg:col-span-1">
            <div className="weather-card">
              <div className="flex items-center mb-4">
                <Layers className="w-5 h-5 text-neon-primary mr-2" />
                <h3 className="text-lg font-semibold">Map Layers</h3>
              </div>
              
              <div className="space-y-2">
                {mapLayers.map((layer) => (
                  <motion.button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeLayer === layer.id
                        ? 'bg-gradient-primary text-white'
                        : 'glass glass-hover'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <layer.icon className={`w-5 h-5 ${activeLayer === layer.id ? 'text-white' : layer.color}`} />
                    <span className="font-medium">{layer.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Legend</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-weather-rainy rounded"></div>
                    <span>Heavy Rain</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-weather-rainy/50 rounded"></div>
                    <span>Light Rain</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-weather-stormy rounded"></div>
                    <span>Storms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-3">
            <motion.div
              className="weather-card h-96 lg:h-[600px] relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-glass rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-neon-primary mx-auto mb-4" />
                  <div className="text-xl font-semibold text-foreground mb-2">Interactive Weather Map</div>
                  <div className="text-muted-foreground">
                    Showing {mapLayers.find(l => l.id === activeLayer)?.label} data
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Click anywhere on the map for local forecast
                  </div>
                </div>
              </div>

              {/* Animated Overlays */}
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-32 h-32 bg-weather-rainy/20 rounded-full absolute top-20 left-20 animate-pulse"></div>
                  <div className="w-24 h-24 bg-weather-stormy/20 rounded-full absolute bottom-32 right-32 animate-pulse"></div>
                  <div className="w-40 h-40 bg-weather-rainy/10 rounded-full absolute top-40 right-20 animate-pulse"></div>
                </motion.div>
              )}

              {/* Time Scrubber */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass glass-hover p-3 rounded-lg">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Past 6h</span>
                    <span>Now</span>
                    <span>Next 6h</span>
                  </div>
                  <div className="h-2 bg-glass rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neon-primary rounded-full shadow-neon"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapsRadar;