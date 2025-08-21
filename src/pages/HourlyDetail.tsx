import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Thermometer, Droplets, Wind, Eye, Gauge, Compass, CloudRain, Sun, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import WeatherIcon from '@/components/Weather/WeatherIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HourlyDetail = () => {
  const navigate = useNavigate();
  const { time } = useParams();

  // Mock detailed data for the specific hour
  const getHourData = (timeParam: string) => {
    const hourlyDataMap: Record<string, any> = {
      '12:00': {
        time: '12:00',
        temp: '24°C',
        condition: 'Sunny',
        precipitation: '0%',
        humidity: '45%',
        windSpeed: '12 km/h',
        windDirection: 'NW',
        pressure: '1013 hPa',
        visibility: '10 km',
        uvIndex: '7',
        feelLike: '26°C',
        dewPoint: '12°C',
        cloudCover: '10%',
        predictions: [
          'Perfect sunny conditions expected',
          'Ideal time for outdoor activities',
          'UV levels are high - sunscreen recommended'
        ],
        risks: [],
        airQuality: 'Good'
      },
      '19:00': {
        time: '19:00',
        temp: '20°C',
        condition: 'Cloudy',
        precipitation: '15%',
        humidity: '68%',
        windSpeed: '8 km/h',
        windDirection: 'SW',
        pressure: '1010 hPa',
        visibility: '8 km',
        uvIndex: '1',
        feelLike: '19°C',
        dewPoint: '14°C',
        cloudCover: '75%',
        predictions: [
          'Overcast conditions developing',
          'Temperature dropping as sun sets',
          'Light breeze from southwest'
        ],
        risks: ['Possible light drizzle'],
        airQuality: 'Moderate'
      }
    };

    return hourlyDataMap[timeParam || '12:00'] || hourlyDataMap['12:00'];
  };

  const hourData = getHourData(time || '12:00');

  const weatherParams = [
    { icon: Thermometer, label: 'Temperature', value: hourData.temp, color: 'text-orange-500' },
    { icon: Thermometer, label: 'Feels Like', value: hourData.feelLike, color: 'text-orange-400' },
    { icon: Droplets, label: 'Humidity', value: hourData.humidity, color: 'text-blue-500' },
    { icon: CloudRain, label: 'Precipitation', value: hourData.precipitation, color: 'text-blue-600' },
    { icon: Wind, label: 'Wind Speed', value: hourData.windSpeed, color: 'text-green-500' },
    { icon: Compass, label: 'Wind Direction', value: hourData.windDirection, color: 'text-green-400' },
    { icon: Gauge, label: 'Pressure', value: hourData.pressure, color: 'text-purple-500' },
    { icon: Eye, label: 'Visibility', value: hourData.visibility, color: 'text-gray-500' },
    { icon: Sun, label: 'UV Index', value: hourData.uvIndex, color: 'text-yellow-500' },
    { icon: Droplets, label: 'Dew Point', value: hourData.dewPoint, color: 'text-cyan-500' }
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
            onClick={() => navigate('/hourly')}
            className="p-2 rounded-lg glass glass-hover mr-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Weather Analysis</h1>
            <p className="text-muted-foreground">Detailed forecast for {hourData.time}</p>
          </div>
        </div>

        {/* Main Weather Overview */}
        <Card className="mb-8 weather-card">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <Clock className="w-6 h-6 text-neon-primary" />
                  <span className="text-2xl font-bold">{hourData.time}</span>
                  <Badge variant="secondary" className="ml-2">
                    {hourData.condition}
                  </Badge>
                </div>
                <div className="text-6xl font-bold text-foreground mb-2">
                  {hourData.temp}
                </div>
                <div className="text-lg text-muted-foreground capitalize">
                  {hourData.condition}
                </div>
              </div>
              <div className="float">
                <WeatherIcon condition={hourData.condition} size="xl" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weather Parameters */}
          <Card className="weather-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gauge className="w-5 h-5 text-neon-primary mr-2" />
                Weather Parameters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {weatherParams.map((param, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <param.icon className={`w-5 h-5 ${param.color}`} />
                    <div>
                      <div className="text-sm text-muted-foreground">{param.label}</div>
                      <div className="font-semibold">{param.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Predictions & Analysis */}
          <div className="space-y-6">
            {/* Predictions */}
            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sun className="w-5 h-5 text-neon-primary mr-2" />
                  Weather Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hourData.predictions.map((prediction: string, index: number) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg glass"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-neon-primary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">{prediction}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risks & Alerts */}
            {hourData.risks.length > 0 && (
              <Card className="weather-card border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-500">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Weather Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {hourData.risks.map((risk: string, index: number) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <p className="text-sm text-foreground">{risk}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Air Quality */}
            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wind className="w-5 h-5 text-neon-primary mr-2" />
                  Air Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={hourData.airQuality === 'Good' ? 'default' : 'secondary'}
                    className="text-sm"
                  >
                    {hourData.airQuality}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Air quality index and pollution levels
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cloud Coverage Visualization */}
        <Card className="mt-8 weather-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CloudRain className="w-5 h-5 text-neon-primary mr-2" />
              Cloud Coverage & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Cloud Coverage</span>
              <span className="font-semibold">{hourData.cloudCover}</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: hourData.cloudCover }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Cloud coverage affects temperature, UV levels, and precipitation probability
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default HourlyDetail;