import { motion } from 'framer-motion';
import { ArrowLeft, Activity, Thermometer, Wind, Droplets, Sun, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OutdoorActivitiesDetail = () => {
  const navigate = useNavigate();

  const activityRatings = [
    { activity: 'Running', score: 95, emoji: '🏃', conditions: 'Perfect temp, low humidity' },
    { activity: 'Hiking', score: 90, emoji: '🥾', conditions: 'Clear trails, great visibility' },
    { activity: 'Cycling', score: 85, emoji: '🚴', conditions: 'Light tailwind, dry roads' },
    { activity: 'Tennis', score: 88, emoji: '🎾', conditions: 'No wind interference' },
    { activity: 'Golf', score: 82, emoji: '⛳', conditions: 'Minimal wind, good visibility' },
    { activity: 'Soccer', score: 87, emoji: '⚽', conditions: 'Ideal field conditions' }
  ];

  const weatherMetrics = [
    { icon: Thermometer, label: 'Temperature', value: '22°C', rating: 'Optimal', color: 'text-neon-success' },
    { icon: Wind, label: 'Wind Speed', value: '8 km/h', rating: 'Light Breeze', color: 'text-neon-success' },
    { icon: Droplets, label: 'Humidity', value: '45%', rating: 'Comfortable', color: 'text-neon-success' },
    { icon: Sun, label: 'UV Index', value: '4', rating: 'Moderate', color: 'text-neon-warning' }
  ];

  const timeSlots = [
    { time: '6-8 AM', activity: 'Running/Jogging', score: 98, temp: '18°C', conditions: 'Cool & Perfect' },
    { time: '8-10 AM', activity: 'Hiking', score: 95, temp: '20°C', conditions: 'Ideal Start Time' },
    { time: '10-12 PM', activity: 'Tennis/Sports', score: 90, temp: '22°C', conditions: 'Warm Up Complete' },
    { time: '4-6 PM', activity: 'Cycling', score: 88, temp: '24°C', conditions: 'Good Visibility' },
    { time: '6-8 PM', activity: 'Team Sports', score: 85, temp: '21°C', conditions: 'Cooling Down' }
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
            onClick={() => navigate('/lifestyle')}
            className="p-2 rounded-lg glass glass-hover mr-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex items-center space-x-4">
            <div className="text-6xl">🏃‍♂️</div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Outdoor Activities</h1>
              <p className="text-muted-foreground">Perfect conditions for outdoor sports and activities</p>
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
          <div className="text-6xl font-bold text-neon-success mb-2">85%</div>
          <div className="text-xl text-neon-success font-semibold mb-2">Excellent Activity Conditions</div>
          <div className="text-muted-foreground">Low wind, optimal temperature, and clear visibility make this ideal for outdoor activities</div>
        </motion.div>

        {/* Weather Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {weatherMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="weather-card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <metric.icon className={`w-8 h-8 mx-auto mb-2 ${metric.color}`} />
              <div className="text-lg font-bold text-foreground mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
              <div className={`text-xs font-medium ${metric.color}`}>{metric.rating}</div>
            </motion.div>
          ))}
        </div>

        {/* Activity Ratings */}
        <motion.div
          className="weather-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-3xl mr-3">🎯</span>
            Activity Suitability Ratings
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activityRatings.map((activity, index) => (
              <motion.div
                key={index}
                className="glass glass-hover p-4 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{activity.emoji}</span>
                    <span className="font-semibold text-foreground">{activity.activity}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-neon-success">{activity.score}%</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{activity.conditions}</div>
                <div className="mt-2 bg-glass rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-neon-success rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${activity.score}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Optimal Time Slots */}
        <motion.div
          className="weather-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Clock className="w-8 h-8 mr-3 text-neon-primary" />
            Optimal Activity Time Slots
          </h2>
          <div className="space-y-4">
            {timeSlots.map((slot, index) => (
              <motion.div
                key={index}
                className="glass glass-hover p-4 rounded-lg flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-bold text-neon-primary">{slot.time}</div>
                  <div>
                    <div className="font-semibold text-foreground">{slot.activity}</div>
                    <div className="text-sm text-muted-foreground">{slot.conditions}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-neon-success">{slot.score}%</div>
                  <div className="text-sm text-muted-foreground">{slot.temp}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips and Recommendations */}
        <motion.div
          className="weather-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-3xl mr-3">💡</span>
            Activity Tips & Recommendations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Pre-Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🥤</span>
                  <div>
                    <div className="font-medium text-foreground">Hydrate Well</div>
                    <div className="text-sm text-muted-foreground">Start hydrating 2 hours before activity</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🧴</span>
                  <div>
                    <div className="font-medium text-foreground">Apply Sunscreen</div>
                    <div className="text-sm text-muted-foreground">UV index is moderate - SPF 15+ recommended</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">During Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🌡️</span>
                  <div>
                    <div className="font-medium text-foreground">Monitor Temperature</div>
                    <div className="text-sm text-muted-foreground">Perfect temp range - adjust layers as needed</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">💨</span>
                  <div>
                    <div className="font-medium text-foreground">Light Breeze Advantage</div>
                    <div className="text-sm text-muted-foreground">Use the tailwind for cycling and running</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OutdoorActivitiesDetail;