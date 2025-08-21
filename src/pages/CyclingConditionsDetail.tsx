import { motion } from 'framer-motion';
import { ArrowLeft, Bike, Wind, Thermometer, Eye, Droplets, AlertTriangle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CyclingConditionsDetail = () => {
  const navigate = useNavigate();

  const cyclingMetrics = [
    { icon: Thermometer, label: 'Road Temp', value: '22°C', rating: 'Ideal', color: 'text-neon-success' },
    { icon: Wind, label: 'Wind', value: '5 km/h Tailwind', rating: 'Favorable', color: 'text-neon-success' },
    { icon: Eye, label: 'Visibility', value: '12 km', rating: 'Excellent', color: 'text-neon-success' },
    { icon: Droplets, label: 'Rain Risk', value: '30%', rating: 'Low-Moderate', color: 'text-neon-warning' }
  ];

  const routeRecommendations = [
    { 
      route: 'City Park Loop', 
      distance: '15 km', 
      difficulty: 'Easy', 
      score: 95, 
      emoji: '🌳',
      conditions: 'Protected from wind, smooth roads'
    },
    { 
      route: 'Coastal Highway', 
      distance: '25 km', 
      difficulty: 'Moderate', 
      score: 88, 
      emoji: '🌊',
      conditions: 'Scenic but watch for afternoon breeze'
    },
    { 
      route: 'Mountain Trail', 
      distance: '30 km', 
      difficulty: 'Hard', 
      score: 75, 
      emoji: '⛰️',
      conditions: 'Challenging climbs, variable wind'
    },
    { 
      route: 'Urban Commute', 
      distance: '12 km', 
      difficulty: 'Easy', 
      score: 90, 
      emoji: '🏙️',
      conditions: 'Light traffic, dry roads'
    }
  ];

  const hourlyConditions = [
    { time: '7 AM', temp: '19°C', wind: '3 km/h', rain: '10%', score: 98, conditions: 'Perfect start' },
    { time: '9 AM', temp: '21°C', wind: '4 km/h', rain: '15%', score: 95, conditions: 'Excellent' },
    { time: '11 AM', temp: '23°C', wind: '6 km/h', rain: '20%', score: 90, conditions: 'Very good' },
    { time: '1 PM', temp: '24°C', wind: '8 km/h', rain: '25%', score: 85, conditions: 'Good' },
    { time: '3 PM', temp: '23°C', wind: '7 km/h', rain: '35%', score: 75, conditions: 'Watch clouds' },
    { time: '5 PM', temp: '22°C', wind: '5 km/h', rain: '30%', score: 80, conditions: 'Improving' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-neon-success';
    if (score >= 75) return 'text-neon-primary';
    if (score >= 60) return 'text-neon-warning';
    return 'text-neon-danger';
  };

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
            <div className="text-6xl">🚴‍♂️</div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cycling Conditions</h1>
              <p className="text-muted-foreground">Light breeze makes for comfortable cycling</p>
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
          <div className="text-6xl font-bold text-neon-primary mb-2">72%</div>
          <div className="text-xl text-neon-primary font-semibold mb-2">Good Cycling Conditions</div>
          <div className="text-muted-foreground">Dry roads with minimal wind resistance. Watch for potential afternoon showers</div>
        </motion.div>

        {/* Cycling Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {cyclingMetrics.map((metric, index) => (
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

        {/* Hourly Cycling Forecast */}
        <motion.div
          className="weather-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Clock className="w-8 h-8 mr-3 text-neon-primary" />
            Hourly Cycling Conditions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hourlyConditions.map((hour, index) => (
              <motion.div
                key={index}
                className="glass glass-hover p-3 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-sm font-semibold text-foreground mb-2">{hour.time}</div>
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(hour.score)}`}>{hour.score}%</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>{hour.temp}</div>
                  <div>{hour.wind}</div>
                  <div>Rain: {hour.rain}</div>
                  <div className="font-medium">{hour.conditions}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Route Recommendations */}
        <motion.div
          className="weather-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-3xl mr-3">🗺️</span>
            Recommended Cycling Routes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {routeRecommendations.map((route, index) => (
              <motion.div
                key={index}
                className="glass glass-hover p-4 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{route.emoji}</span>
                    <div>
                      <div className="font-semibold text-foreground">{route.route}</div>
                      <div className="text-sm text-muted-foreground">{route.distance} • {route.difficulty}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${getScoreColor(route.score)}`}>{route.score}%</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{route.conditions}</div>
                <div className="mt-2 bg-glass rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      route.score >= 90 ? 'bg-neon-success' : 
                      route.score >= 75 ? 'bg-neon-primary' : 'bg-neon-warning'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${route.score}%` }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Safety & Tips */}
        <motion.div
          className="weather-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3 text-neon-warning" />
            Cycling Safety & Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Current Conditions</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">💨</span>
                  <div>
                    <div className="font-medium text-foreground">Tailwind Advantage</div>
                    <div className="text-sm text-muted-foreground">5 km/h tailwind will assist your ride</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🛣️</span>
                  <div>
                    <div className="font-medium text-foreground">Road Conditions</div>
                    <div className="text-sm text-muted-foreground">Dry roads with good grip and visibility</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Afternoon Watch</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">☔</span>
                  <div>
                    <div className="font-medium text-foreground">Rain Possibility</div>
                    <div className="text-sm text-muted-foreground">30% chance after 3 PM - pack light rain gear</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">⏰</span>
                  <div>
                    <div className="font-medium text-foreground">Best Time Window</div>
                    <div className="text-sm text-muted-foreground">7-11 AM for optimal conditions</div>
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

export default CyclingConditionsDetail;