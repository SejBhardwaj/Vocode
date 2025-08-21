import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  Wind, 
  Droplets, 
  Thermometer,
  Sun,
  Moon,
  Activity,
  TrendingUp,
  MapPin,
  Clock,
  Calendar
} from 'lucide-react';
import WeatherCard from '@/components/Weather/WeatherCard';
import WeatherIcon from '@/components/Weather/WeatherIcon';
import WeatherInsights from '@/components/AI/WeatherInsights';
import heroImage from '@/assets/weather-hero-hd.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock weather data - in real app, this would come from an API
  const currentWeather = {
    location: 'New York, NY',
    temperature: '24°C',
    condition: 'Partly Cloudy',
    feelsLike: '27°C'
  };

  const quickStats = [
    { icon: Eye, label: 'Visibility', value: '10 km', color: 'text-neon-primary' },
    { icon: Wind, label: 'Wind', value: '15 km/h', color: 'text-weather-rainy' },
    { icon: Droplets, label: 'Humidity', value: '68%', color: 'text-weather-stormy' },
    { icon: Activity, label: 'Pressure', value: '1013 hPa', color: 'text-neon-success' }
  ];

  const forecastCards = [
    {
      title: 'Next 24 Hours',
      subtitle: 'Hourly Forecast',
      description: 'Detailed hour-by-hour weather patterns, precipitation chances, wind speeds, and temperature variations throughout the day',
      icon: Clock,
      onClick: () => navigate('/hourly')
    },
    {
      title: 'Weekly Outlook',
      subtitle: '7-Day Forecast',
      description: 'Extended forecast with daily highs and lows, weather conditions, precipitation probability, and weekly weather patterns',
      icon: Calendar,
      onClick: () => navigate('/weekly')
    },
    {
      title: 'Weather Intelligence',
      subtitle: 'Advanced Analytics',
      description: 'Comprehensive weather data analysis including air quality index, UV levels, atmospheric pressure, and climate insights',
      icon: TrendingUp,
      onClick: () => navigate('/analytics')
    }
  ];

  return (
    <motion.div
      className="min-h-screen pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Enhanced Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src={heroImage} 
            alt="Weather Dashboard Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/90" />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-5xl px-6">
            <motion.div
              className="relative"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent leading-tight drop-shadow-2xl">
                Weather Intelligence
              </h1>
              <div className="absolute inset-0 bg-gradient-neon bg-clip-text text-transparent opacity-20 pointer-events-none">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Weather Intelligence
                </h1>
              </div>
            </motion.div>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-foreground/90 mb-8 font-medium max-w-4xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Experience the future of weather prediction with AI-powered insights
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-8 -mt-32 relative z-10">
        {/* Current Weather Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <WeatherCard
            title="Current Weather"
            location={currentWeather.location}
            temperature={currentWeather.temperature}
            condition={currentWeather.condition}
            details={[
              { icon: Thermometer, label: 'Feels like', value: currentWeather.feelsLike },
              ...quickStats
            ]}
            size="lg"
            onClick={() => navigate('/hourly')}
          />
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              className="weather-card text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/analytics')}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Forecast Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forecastCards.map((card, index) => (
            <motion.div
              key={index}
              className="weather-card group cursor-pointer"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={card.onClick}
            >
              <div className="flex items-center justify-between mb-4">
                <card.icon className="w-8 h-8 text-neon-primary group-hover:scale-110 transition-transform" />
                <motion.div
                  className="w-2 h-2 rounded-full bg-neon-primary opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{card.title}</h3>
              <p className="text-sm text-neon-primary mb-2">{card.subtitle}</p>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* AI Weather Insights */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <WeatherInsights
            weatherData={{
              temperature: '24°C',
              condition: 'Partly Cloudy',
              feelsLike: '27°C',
              humidity: '68%',
              wind: '15 km/h',
              visibility: '10 km',
              pressure: '1013 hPa',
              uvIndex: 6,
              airQuality: 'Good (42 AQI)',
              sunrise: '6:42 AM',
              sunset: '7:28 PM'
            }}
            location={currentWeather.location}
          />
        </motion.div>

        {/* Today's Highlights */}
        <motion.div
          className="weather-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-foreground">Today's Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Sun className="w-12 h-12 text-weather-sunny mx-auto mb-3" />
              <div className="text-lg font-semibold text-foreground">Sunrise</div>
              <div className="text-muted-foreground">6:42 AM</div>
            </div>
            <div className="text-center">
              <Moon className="w-12 h-12 text-weather-cloudy mx-auto mb-3" />
              <div className="text-lg font-semibold text-foreground">Sunset</div>
              <div className="text-muted-foreground">7:28 PM</div>
            </div>
            <div className="text-center cursor-pointer" onClick={() => navigate('/analytics')}>
              <Activity className="w-12 h-12 text-neon-primary mx-auto mb-3" />
              <div className="text-lg font-semibold text-foreground">Air Quality</div>
              <div className="text-neon-success">Good (42 AQI)</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;