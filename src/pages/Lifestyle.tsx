import { motion } from 'framer-motion';
import { ArrowLeft, Activity, Bike, Plane, Umbrella, Sun, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Lifestyle = () => {
  const navigate = useNavigate();

  const lifestyleCards = [
    {
      title: 'Outdoor Activities',
      icon: Activity,
      score: 85,
      status: 'Excellent',
      description: 'Perfect conditions for outdoor sports and activities. Low wind, optimal temperature, and clear visibility make this ideal for hiking, running, and sports.',
      details: 'UV Index: 4 (Moderate), Wind Speed: 8 km/h, Humidity: 45%',
      color: 'text-neon-success',
      bgColor: 'bg-neon-success/10'
    },
    {
      title: 'Cycling Conditions',
      icon: Bike,
      score: 72,
      status: 'Good',
      description: 'Light breeze makes for comfortable cycling. Dry roads with minimal wind resistance. Watch for potential afternoon showers.',
      details: 'Road Temp: 22°C, Tailwind: 5 km/h, Rain Chance: 30%',
      color: 'text-neon-primary',
      bgColor: 'bg-neon-primary/10'
    },
    {
      title: 'Travel Weather',
      icon: Plane,
      score: 65,
      status: 'Fair',
      description: 'Moderate wind conditions may cause slight turbulence. Check with airlines for potential delays due to weather patterns.',
      details: 'Flight Delays: 15%, Turbulence: Light, Visibility: 8km',
      color: 'text-neon-warning',
      bgColor: 'bg-neon-warning/10'
    },
    {
      title: 'Beach Day',
      icon: Sun,
      score: 90,
      status: 'Perfect',
      description: 'Ideal beach conditions with sunny skies, warm temperature, and gentle breeze. Perfect for swimming, sunbathing, and water sports.',
      details: 'Water Temp: 24°C, Wave Height: 0.5m, UV Index: 7',
      color: 'text-weather-sunny',
      bgColor: 'bg-weather-sunny/10'
    },
    {
      title: 'Health Index',
      icon: Heart,
      score: 78,
      status: 'Good',
      description: 'Excellent air quality with low pollen count. Safe conditions for people with respiratory sensitivities and allergies.',
      details: 'AQI: 42, Pollen: Low, Allergens: Minimal',
      color: 'text-neon-success',
      bgColor: 'bg-neon-success/10'
    },
    {
      title: 'Rain Gear Needed',
      icon: Umbrella,
      score: 30,
      status: 'Likely',
      description: 'High probability of precipitation this afternoon. Bring waterproof gear and plan indoor alternatives for outdoor activities.',
      details: 'Rain Start: 3 PM, Intensity: Moderate, Duration: 2 hours',
      color: 'text-weather-rainy',
      bgColor: 'bg-weather-rainy/10'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-success';
    if (score >= 60) return 'text-neon-primary';
    if (score >= 40) return 'text-neon-warning';
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
            onClick={() => navigate('/')}
            className="p-2 rounded-lg glass glass-hover mr-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lifestyle & Activities</h1>
            <p className="text-muted-foreground">Weather insights for your daily life</p>
          </div>
        </div>

        {/* Lifestyle Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestyleCards.map((card, index) => (
            <motion.div
              key={index}
              className="weather-card cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => navigate(`/lifestyle/${card.title.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(card.score)}`}>
                    {card.score}%
                  </div>
                  <div className={`text-sm font-medium ${card.color}`}>
                    {card.status}
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-2">
                {card.description}
              </p>
              
              <p className="text-xs text-muted-foreground/80 italic">
                {card.details}
              </p>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-glass rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${card.bgColor.replace('/10', '')} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${card.score}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Recommendations */}
        <motion.div
          className="weather-card mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Today's Recommendations</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Sun className="w-5 h-5 text-weather-sunny mr-2" />
                Best Times Today
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Outdoor Exercise</span>
                  <span className="text-neon-success font-medium">7-10 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Beach Activities</span>
                  <span className="text-neon-success font-medium">11 AM - 3 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Photography</span>
                  <span className="text-neon-warning font-medium">6-8 PM</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Umbrella className="w-5 h-5 text-weather-rainy mr-2" />
                What to Bring
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-neon-success"></div>
                  <span>Sunscreen (UV index: 6)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-neon-warning"></div>
                  <span>Light jacket for evening</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-weather-rainy"></div>
                  <span>Umbrella (rain likely after 3 PM)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Lifestyle;