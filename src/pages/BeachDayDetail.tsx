import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Thermometer, Wind, Droplets, Eye, Waves, Umbrella } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BeachDayDetail = () => {
  const navigate = useNavigate();

  const beachConditions = [
    { icon: Sun, label: 'UV Index', value: '7 (High)', color: 'text-weather-sunny', status: 'Bring SPF 30+' },
    { icon: Thermometer, label: 'Air Temp', value: '28°C', color: 'text-neon-success', status: 'Perfect' },
    { icon: Thermometer, label: 'Water Temp', value: '24°C', color: 'text-neon-primary', status: 'Comfortable' },
    { icon: Wind, label: 'Wind Speed', value: '12 km/h', color: 'text-neon-success', status: 'Gentle Breeze' },
    { icon: Waves, label: 'Wave Height', value: '0.5m', color: 'text-neon-success', status: 'Calm' },
    { icon: Eye, label: 'Visibility', value: '15 km', color: 'text-neon-success', status: 'Excellent' }
  ];

  const hourlyForecast = [
    { time: '10 AM', temp: '26°C', condition: 'Sunny', icon: '☀️' },
    { time: '12 PM', temp: '28°C', condition: 'Sunny', icon: '☀️' },
    { time: '2 PM', temp: '29°C', condition: 'Partly Cloudy', icon: '⛅' },
    { time: '4 PM', temp: '27°C', condition: 'Partly Cloudy', icon: '⛅' },
    { time: '6 PM', temp: '25°C', condition: 'Clear', icon: '🌅' }
  ];

  const recommendations = [
    { emoji: '🏖️', title: 'Beach Activities', items: ['Swimming', 'Beach Volleyball', 'Sunbathing', 'Beach Walking'] },
    { emoji: '🏄', title: 'Water Sports', items: ['Surfing (Light waves)', 'Paddleboarding', 'Beach Volleyball', 'Snorkeling'] },
    { emoji: '☂️', title: 'What to Bring', items: ['SPF 30+ Sunscreen', 'Beach Umbrella', 'Plenty of Water', 'Light Snacks'] }
  ];

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <motion.button
            onClick={() => navigate('/lifestyle')}
            className="p-2 rounded-lg glass glass-hover mr-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex items-center space-x-4">
            <div className="text-6xl">🏖️</div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Perfect Beach Day</h1>
              <p className="text-muted-foreground">Ideal conditions for beach activities</p>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <motion.div
          className="weather-card mb-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl font-bold text-neon-success mb-2">90%</div>
          <div className="text-xl text-neon-success font-semibold mb-2">Perfect Beach Conditions</div>
          <div className="text-muted-foreground">Sunny skies, warm temperature, and gentle breeze make this an ideal beach day</div>
        </motion.div>

        {/* Current Conditions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {beachConditions.map((condition, index) => (
            <motion.div
              key={index}
              className="weather-card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <condition.icon className={`w-8 h-8 mx-auto mb-2 ${condition.color}`} />
              <div className="text-lg font-bold text-foreground mb-1">{condition.value}</div>
              <div className="text-sm text-muted-foreground mb-1">{condition.label}</div>
              <div className={`text-xs font-medium ${condition.color}`}>{condition.status}</div>
            </motion.div>
          ))}
        </div>

        {/* Hourly Beach Forecast */}
        <motion.div
          className="weather-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-3xl mr-3">⏰</span>
            Beach Day Timeline
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="text-center glass glass-hover p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">{hour.time}</div>
                <div className="text-2xl mb-2">{hour.icon}</div>
                <div className="font-semibold text-foreground mb-1">{hour.temp}</div>
                <div className="text-xs text-muted-foreground">{hour.condition}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              className="weather-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{rec.emoji}</div>
                <h3 className="text-lg font-semibold text-foreground">{rec.title}</h3>
              </div>
              <div className="space-y-2">
                {rec.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-neon-primary"></div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Beach Safety Tips */}
        <motion.div
          className="weather-card mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-3xl mr-3">🚨</span>
            Beach Safety Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-xl">☀️</span>
                <div>
                  <div className="font-medium text-foreground">Sun Protection</div>
                  <div className="text-sm text-muted-foreground">High UV index - reapply sunscreen every 2 hours</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl">💧</span>
                <div>
                  <div className="font-medium text-foreground">Stay Hydrated</div>
                  <div className="text-sm text-muted-foreground">Warm weather increases dehydration risk</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-xl">🌊</span>
                <div>
                  <div className="font-medium text-foreground">Water Safety</div>
                  <div className="text-sm text-muted-foreground">Calm waves perfect for swimming - stay aware of currents</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl">⏰</span>
                <div>
                  <div className="font-medium text-foreground">Best Beach Hours</div>
                  <div className="text-sm text-muted-foreground">11 AM - 3 PM for optimal sun and warmth</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BeachDayDetail;