import { motion } from 'framer-motion';
import { ArrowLeft, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WeatherIcon from '@/components/Weather/WeatherIcon';

const HourlyForecast = () => {
  const navigate = useNavigate();

  const hourlyData = [
    { time: '12:00', temp: '24°', condition: 'Sunny', precipitation: '0%' },
    { time: '13:00', temp: '26°', condition: 'Partly Cloudy', precipitation: '10%' },
    { time: '14:00', temp: '27°', condition: 'Cloudy', precipitation: '20%' },
    { time: '15:00', temp: '25°', condition: 'Light Rain', precipitation: '65%' },
    { time: '16:00', temp: '23°', condition: 'Rain', precipitation: '85%' },
    { time: '17:00', temp: '22°', condition: 'Heavy Rain', precipitation: '95%' },
    { time: '18:00', temp: '21°', condition: 'Light Rain', precipitation: '45%' },
    { time: '19:00', temp: '20°', condition: 'Cloudy', precipitation: '15%' },
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
            <h1 className="text-3xl font-bold text-foreground">Hourly Forecast</h1>
            <p className="text-muted-foreground">Next 24 hours detailed prediction</p>
          </div>
        </div>

        {/* Hourly Timeline */}
        <div className="weather-card mb-8">
          <div className="flex items-center mb-6">
            <Clock className="w-6 h-6 text-neon-primary mr-3" />
            <h2 className="text-xl font-semibold">24-Hour Timeline</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {hourlyData.map((hour, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-lg glass glass-hover cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => navigate(`/hourly/${hour.time}`)}
              >
                <div className="text-sm text-muted-foreground mb-2">{hour.time}</div>
                <div className="mb-3">
                  <WeatherIcon condition={hour.condition} size="md" />
                </div>
                <div className="text-lg font-semibold mb-1">{hour.temp}</div>
                <div className="text-xs text-weather-rainy">{hour.precipitation}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hourly Details */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="weather-card">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-neon-primary mr-3" />
              <h2 className="text-xl font-semibold">Hourly Highlights</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg glass">
                <div className="text-sm text-muted-foreground">Peak Temperature</div>
                <div className="text-lg font-semibold text-foreground">27°C at 2:00 PM</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg glass">
                <div className="text-sm text-muted-foreground">Lowest Temperature</div>
                <div className="text-lg font-semibold text-foreground">20°C at 7:00 PM</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg glass">
                <div className="text-sm text-muted-foreground">Heavy Rain Period</div>
                <div className="text-lg font-semibold text-weather-rainy">5:00 PM - 6:00 PM</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg glass">
                <div className="text-sm text-muted-foreground">Best Time Outdoors</div>
                <div className="text-lg font-semibold text-weather-sunny">12:00 PM - 2:00 PM</div>
              </div>
            </div>
          </div>

          <div className="weather-card">
            <div className="flex items-center mb-6">
              <Clock className="w-6 h-6 text-neon-primary mr-3" />
              <h2 className="text-xl font-semibold">Weather Alerts</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-weather-rainy/30 bg-weather-rainy/10">
                <div className="text-sm font-medium text-weather-rainy mb-1">Rain Alert</div>
                <div className="text-xs text-muted-foreground">Heavy rainfall expected at 5:00 PM with 95% probability</div>
              </div>
              <div className="p-3 rounded-lg border border-weather-sunny/30 bg-weather-sunny/10">
                <div className="text-sm font-medium text-weather-sunny mb-1">UV Alert</div>
                <div className="text-xs text-muted-foreground">High UV index from 11:00 AM - 3:00 PM, use sun protection</div>
              </div>
              <div className="p-3 rounded-lg border border-neon-primary/30 bg-neon-primary/10">
                <div className="text-sm font-medium text-neon-primary mb-1">Wind Alert</div>
                <div className="text-xs text-muted-foreground">Moderate winds up to 25 km/h this afternoon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast;