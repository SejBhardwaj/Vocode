import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import WeatherIcon from '@/components/Weather/WeatherIcon';
import DetailModal from '@/components/Weather/DetailModal';

const WeeklyForecast = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const weeklyData = [
    { 
      day: 'Today', 
      date: 'Dec 15', 
      high: '26°', 
      low: '18°', 
      condition: 'Partly Cloudy', 
      precipitation: '20%',
      details: {
        hourlyForecast: [
          { time: '6:00', temp: '18°', condition: 'Clear' },
          { time: '9:00', temp: '22°', condition: 'Partly Cloudy' },
          { time: '12:00', temp: '26°', condition: 'Partly Cloudy' },
          { time: '15:00', temp: '25°', condition: 'Cloudy' },
          { time: '18:00', temp: '23°', condition: 'Partly Cloudy' },
          { time: '21:00', temp: '20°', condition: 'Clear' }
        ],
        wind: '15 km/h NE',
        humidity: '65%',
        uvIndex: '6 (High)',
        sunrise: '6:42 AM',
        sunset: '7:28 PM'
      }
    },
    { 
      day: 'Tomorrow', 
      date: 'Dec 16', 
      high: '24°', 
      low: '16°', 
      condition: 'Rainy', 
      precipitation: '80%',
      details: {
        hourlyForecast: [
          { time: '6:00', temp: '16°', condition: 'Cloudy' },
          { time: '9:00', temp: '18°', condition: 'Light Rain' },
          { time: '12:00', temp: '22°', condition: 'Rainy' },
          { time: '15:00', temp: '24°', condition: 'Heavy Rain' },
          { time: '18:00', temp: '21°', condition: 'Light Rain' },
          { time: '21:00', temp: '18°', condition: 'Cloudy' }
        ],
        wind: '22 km/h SW',
        humidity: '85%',
        uvIndex: '3 (Moderate)',
        sunrise: '6:43 AM',
        sunset: '7:28 PM'
      }
    },
    { 
      day: 'Wednesday', 
      date: 'Dec 17', 
      high: '22°', 
      low: '14°', 
      condition: 'Heavy Rain', 
      precipitation: '90%',
      details: {
        hourlyForecast: [
          { time: '6:00', temp: '14°', condition: 'Heavy Rain' },
          { time: '9:00', temp: '16°', condition: 'Heavy Rain' },
          { time: '12:00', temp: '20°', condition: 'Heavy Rain' },
          { time: '15:00', temp: '22°', condition: 'Rainy' },
          { time: '18:00', temp: '19°', condition: 'Light Rain' },
          { time: '21:00', temp: '16°', condition: 'Cloudy' }
        ],
        wind: '28 km/h W',
        humidity: '90%',
        uvIndex: '2 (Low)',
        sunrise: '6:43 AM',
        sunset: '7:29 PM'
      }
    },
    { 
      day: 'Thursday', 
      date: 'Dec 18', 
      high: '25°', 
      low: '17°', 
      condition: 'Cloudy', 
      precipitation: '30%',
      details: {
        hourlyForecast: [
          { time: '6:00', temp: '17°', condition: 'Cloudy' },
          { time: '9:00', temp: '20°', condition: 'Cloudy' },
          { time: '12:00', temp: '24°', condition: 'Partly Cloudy' },
          { time: '15:00', temp: '25°', condition: 'Cloudy' },
          { time: '18:00', temp: '23°', condition: 'Cloudy' },
          { time: '21:00', temp: '19°', condition: 'Partly Cloudy' }
        ],
        wind: '18 km/h NW',
        humidity: '70%',
        uvIndex: '4 (Moderate)',
        sunrise: '6:44 AM',
        sunset: '7:29 PM'
      }
    },
    { 
      day: 'Friday', 
      date: 'Dec 19', 
      high: '28°', 
      low: '20°', 
      condition: 'Sunny', 
      precipitation: '5%',
      details: {
        hourlyForecast: [
          { time: '6:00', temp: '20°', condition: 'Clear' },
          { time: '9:00', temp: '24°', condition: 'Sunny' },
          { time: '12:00', temp: '27°', condition: 'Sunny' },
          { time: '15:00', temp: '28°', condition: 'Sunny' },
          { time: '18:00', temp: '26°', condition: 'Clear' },
          { time: '21:00', temp: '22°', condition: 'Clear' }
        ],
        wind: '12 km/h NE',
        humidity: '55%',
        uvIndex: '7 (High)',
        sunrise: '6:44 AM',
        sunset: '7:30 PM'
      }
    },
    { 
      day: 'Saturday', 
      date: 'Dec 20', 
      high: '30°', 
      low: '22°', 
      condition: 'Sunny', 
      precipitation: '0%',
      details: {
        hourlyForecast: [
          { time: '6:00', temp: '22°', condition: 'Clear' },
          { time: '9:00', temp: '26°', condition: 'Sunny' },
          { time: '12:00', temp: '29°', condition: 'Sunny' },
          { time: '15:00', temp: '30°', condition: 'Sunny' },
          { time: '18:00', temp: '28°', condition: 'Clear' },
          { time: '21:00', temp: '24°', condition: 'Clear' }
        ],
        wind: '10 km/h E',
        humidity: '50%',
        uvIndex: '8 (Very High)',
        sunrise: '6:45 AM',
        sunset: '7:30 PM'
      }
    },
    { 
      day: 'Sunday', 
      date: 'Dec 21', 
      high: '29°', 
      low: '21°', 
      condition: 'Partly Cloudy', 
      precipitation: '15%',
      details: {
        hourlyForecast: [
          { time: '6:00', temp: '21°', condition: 'Clear' },
          { time: '9:00', temp: '25°', condition: 'Partly Cloudy' },
          { time: '12:00', temp: '28°', condition: 'Partly Cloudy' },
          { time: '15:00', temp: '29°', condition: 'Cloudy' },
          { time: '18:00', temp: '27°', condition: 'Partly Cloudy' },
          { time: '21:00', temp: '23°', condition: 'Clear' }
        ],
        wind: '14 km/h SE',
        humidity: '60%',
        uvIndex: '7 (High)',
        sunrise: '6:45 AM',
        sunset: '7:31 PM'
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
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-bold text-foreground">Weekly Forecast</h1>
            <p className="text-muted-foreground">7-day weather outlook</p>
          </div>
        </div>

        {/* Weekly Cards */}
        <div className="space-y-4 mb-8">
          {weeklyData.map((day, index) => (
            <motion.div
              key={index}
              className="weather-card cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              onClick={() => setSelectedDay(day)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{day.day}</div>
                    <div className="text-sm text-muted-foreground">{day.date}</div>
                  </div>
                  <WeatherIcon condition={day.condition} size="lg" />
                  <div className="text-sm text-muted-foreground capitalize">{day.condition}</div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Precipitation</div>
                    <div className="text-weather-rainy font-medium">{day.precipitation}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{day.high}</div>
                    <div className="text-sm text-muted-foreground">{day.low}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="weather-card">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-neon-primary mr-3" />
            <h2 className="text-xl font-semibold">Weekly Summary</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg glass">
              <div className="text-2xl font-bold text-foreground mb-1">28°C</div>
              <div className="text-sm text-muted-foreground mb-1">Average High</div>
              <div className="text-xs text-weather-sunny">↑2° from last week</div>
            </div>
            <div className="text-center p-4 rounded-lg glass">
              <div className="text-2xl font-bold text-foreground mb-1">18°C</div>
              <div className="text-sm text-muted-foreground mb-1">Average Low</div>
              <div className="text-xs text-weather-rainy">↓1° from last week</div>
            </div>
            <div className="text-center p-4 rounded-lg glass">
              <div className="text-2xl font-bold text-foreground mb-1">35%</div>
              <div className="text-sm text-muted-foreground mb-1">Rain Chance</div>
              <div className="text-xs text-muted-foreground">3 rainy days expected</div>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        <DetailModal
          isOpen={selectedDay !== null}
          onClose={() => setSelectedDay(null)}
          title={selectedDay ? `${selectedDay.day} - ${selectedDay.date}` : ''}
        >
          {selectedDay && (
            <div className="space-y-4">
              <div className="text-center p-4 rounded-lg glass">
                <WeatherIcon condition={selectedDay.condition} size="xl" />
                <div className="mt-3">
                  <div className="text-2xl font-bold text-foreground">{selectedDay.high}</div>
                  <div className="text-sm text-muted-foreground">High / {selectedDay.low} Low</div>
                  <div className="text-sm text-muted-foreground capitalize mt-1">{selectedDay.condition}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg glass text-center">
                  <div className="text-xs text-muted-foreground">Wind</div>
                  <div className="text-sm font-medium text-foreground">{selectedDay.details.wind}</div>
                </div>
                <div className="p-3 rounded-lg glass text-center">
                  <div className="text-xs text-muted-foreground">Humidity</div>
                  <div className="text-sm font-medium text-foreground">{selectedDay.details.humidity}</div>
                </div>
                <div className="p-3 rounded-lg glass text-center">
                  <div className="text-xs text-muted-foreground">UV Index</div>
                  <div className="text-sm font-medium text-foreground">{selectedDay.details.uvIndex}</div>
                </div>
                <div className="p-3 rounded-lg glass text-center">
                  <div className="text-xs text-muted-foreground">Rain Chance</div>
                  <div className="text-sm font-medium text-foreground">{selectedDay.precipitation}</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Hourly Forecast</h3>
                <div className="space-y-2">
                  {selectedDay.details.hourlyForecast.map((hour: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded glass">
                      <span className="text-sm text-muted-foreground">{hour.time}</span>
                      <span className="text-xs text-muted-foreground capitalize">{hour.condition}</span>
                      <span className="text-sm font-medium text-foreground">{hour.temp}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg glass text-center">
                  <div className="text-xs text-muted-foreground">Sunrise</div>
                  <div className="text-sm font-medium text-foreground">{selectedDay.details.sunrise}</div>
                </div>
                <div className="p-3 rounded-lg glass text-center">
                  <div className="text-xs text-muted-foreground">Sunset</div>
                  <div className="text-sm font-medium text-foreground">{selectedDay.details.sunset}</div>
                </div>
              </div>
            </div>
          )}
        </DetailModal>
      </div>
    </motion.div>
  );
};

export default WeeklyForecast;