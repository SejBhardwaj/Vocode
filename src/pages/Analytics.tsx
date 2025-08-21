import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, TrendingUp, Activity, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DetailModal from '@/components/Weather/DetailModal';

const Analytics = () => {
  const navigate = useNavigate();
  const [selectedAnalytic, setSelectedAnalytic] = useState<any>(null);

  const analyticsData = [
    { 
      title: 'Air Quality Index', 
      value: '42', 
      status: 'Good', 
      color: 'text-neon-success',
      details: {
        description: 'Air quality is considered satisfactory for most people.',
        components: { PM2_5: '12 μg/m³', PM10: '18 μg/m³', O3: '45 μg/m³', NO2: '25 μg/m³' },
        recommendations: 'Perfect for outdoor activities. No health concerns for sensitive groups.',
        forecast: '24h trend: Stable to slightly improving conditions expected.'
      }
    },
    { 
      title: 'UV Index', 
      value: '6', 
      status: 'High', 
      color: 'text-neon-warning',
      details: {
        description: 'High UV radiation levels. Protection recommended.',
        components: { UVA: '85%', UVB: '15%', 'Peak Time': '12:00-14:00' },
        recommendations: 'Wear sunscreen SPF 30+, sunglasses, and protective clothing. Seek shade during peak hours.',
        forecast: '24h trend: UV will peak at noon, decreasing to moderate levels by evening.'
      }
    },
    { 
      title: 'Pressure', 
      value: '1013', 
      status: 'Rising', 
      color: 'text-neon-primary',
      details: {
        description: 'Atmospheric pressure is rising, indicating improving weather.',
        components: { Current: '1013 hPa', 'Change (1h)': '+2.1 hPa', 'Change (3h)': '+4.8 hPa' },
        recommendations: 'Stable weather conditions expected. Good for outdoor activities.',
        forecast: '24h trend: Pressure will continue rising, bringing clearer skies.'
      }
    },
    { 
      title: 'Visibility', 
      value: '10km', 
      status: 'Excellent', 
      color: 'text-neon-success',
      details: {
        description: 'Excellent visibility with clear atmospheric conditions.',
        components: { Horizontal: '10+ km', Vertical: '8+ km', Haze: 'None', Fog: 'None' },
        recommendations: 'Perfect conditions for all outdoor activities and transportation.',
        forecast: '24h trend: Visibility will remain excellent with no deterioration expected.'
      }
    },
  ];

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <motion.button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg glass glass-hover mr-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Weather Analytics</h1>
            <p className="text-muted-foreground">Advanced weather data & insights</p>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsData.map((item, index) => (
            <motion.div
              key={index}
              className="weather-card cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setSelectedAnalytic(item)}
            >
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-neon-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{item.title}</div>
                <div className={`text-sm font-medium ${item.color}`}>{item.status}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Weather Details */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sun & Moon Details */}
          <motion.div
            className="weather-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <Activity className="w-6 h-6 text-neon-primary mr-3" />
              <h2 className="text-xl font-semibold">Astronomical Data</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <Sun className="w-12 h-12 text-weather-sunny mx-auto mb-3" />
                <div className="text-lg font-semibold text-foreground mb-1">Sunrise</div>
                <div className="text-muted-foreground">6:42 AM</div>
                <div className="text-sm text-muted-foreground mt-1">13h 46m daylight</div>
                <div className="text-xs text-muted-foreground mt-2">Solar noon: 12:35 PM</div>
              </div>
              <div className="text-center">
                <Moon className="w-12 h-12 text-weather-cloudy mx-auto mb-3" />
                <div className="text-lg font-semibold text-foreground mb-1">Sunset</div>
                <div className="text-muted-foreground">7:28 PM</div>
                <div className="text-sm text-muted-foreground mt-1">Waxing Gibbous</div>
                <div className="text-xs text-muted-foreground mt-2">Moonrise: 3:15 PM</div>
              </div>
            </div>
          </motion.div>

          {/* Environmental Conditions */}
          <motion.div
            className="weather-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-neon-primary mr-3" />
              <h2 className="text-xl font-semibold">Environmental Conditions</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg glass">
                <div className="text-sm text-muted-foreground">Feels Like Temperature</div>
                <div className="text-lg font-semibold text-foreground">27°C</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg glass">
                <div className="text-sm text-muted-foreground">Dew Point</div>
                <div className="text-lg font-semibold text-foreground">18°C</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg glass">
                <div className="text-sm text-muted-foreground">Heat Index</div>
                <div className="text-lg font-semibold text-foreground">26°C</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg glass">
                <div className="text-sm text-muted-foreground">Cloud Cover</div>
                <div className="text-lg font-semibold text-foreground">45%</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detail Modal */}
        <DetailModal
          isOpen={selectedAnalytic !== null}
          onClose={() => setSelectedAnalytic(null)}
          title={selectedAnalytic?.title || ''}
        >
          {selectedAnalytic && (
            <div className="space-y-4">
              <div className="text-center p-4 rounded-lg glass">
                <div className="text-4xl font-bold text-foreground mb-2">{selectedAnalytic.value}</div>
                <div className={`text-lg font-medium ${selectedAnalytic.color}`}>{selectedAnalytic.status}</div>
                <div className="text-sm text-muted-foreground mt-2">{selectedAnalytic.details.description}</div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Components</h3>
                <div className="space-y-2">
                  {Object.entries(selectedAnalytic.details.components).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 rounded glass">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="text-sm font-medium text-foreground">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Recommendations</h3>
                <p className="text-sm text-muted-foreground p-3 rounded-lg glass">{selectedAnalytic.details.recommendations}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">24-Hour Forecast</h3>
                <p className="text-sm text-muted-foreground p-3 rounded-lg glass">{selectedAnalytic.details.forecast}</p>
              </div>
            </div>
          )}
        </DetailModal>
      </div>
    </motion.div>
  );
};

export default Analytics;