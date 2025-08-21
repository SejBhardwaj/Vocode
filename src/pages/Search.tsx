import { motion } from 'framer-motion';
import { ArrowLeft, Search as SearchIcon, MapPin, Clock, Star } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import WeatherCard from '@/components/Weather/WeatherCard';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchValue, setSearchValue] = useState(query);

  const searchResults = [
    { 
      name: 'New York, NY', 
      country: 'United States', 
      temp: '24°C', 
      condition: 'Partly Cloudy',
      saved: true 
    },
    { 
      name: 'London, UK', 
      country: 'United Kingdom', 
      temp: '18°C', 
      condition: 'Rainy',
      saved: false 
    },
    { 
      name: 'Tokyo, Japan', 
      country: 'Japan', 
      temp: '22°C', 
      condition: 'Sunny',
      saved: true 
    },
    { 
      name: 'Sydney, Australia', 
      country: 'Australia', 
      temp: '28°C', 
      condition: 'Clear',
      saved: false 
    }
  ];

  const recentSearches = [
    'Paris, France',
    'Los Angeles, CA',
    'Berlin, Germany'
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
          <div className="flex-1">
            <div className="relative">
              <motion.div 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔍
              </motion.div>
              <input
                type="text"
                placeholder="Search for cities, landmarks, or coordinates..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full glass glass-hover pl-12 pr-4 py-3 text-lg rounded-lg border border-glass-border focus:border-neon-primary focus:ring-neon-primary/20"
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Search Results */}
        {query && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Search Results for "{query}"
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  className="weather-card cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => navigate(`/location/${result.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-neon-primary" />
                      <div>
                        <div className="font-semibold text-foreground">{result.name}</div>
                        <div className="text-sm text-muted-foreground">{result.country}</div>
                      </div>
                    </div>
                    <motion.button
                      className={`p-2 rounded-lg transition-colors ${
                        result.saved 
                          ? 'text-neon-warning bg-neon-warning/10' 
                          : 'text-muted-foreground hover:text-neon-warning'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Star className="w-4 h-4" fill={result.saved ? 'currentColor' : 'none'} />
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">{result.temp}</div>
                    <div className="text-sm text-muted-foreground capitalize">{result.condition}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Searches */}
        <motion.div
          className="weather-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <Clock className="w-6 h-6 text-neon-primary mr-3" />
            <h2 className="text-xl font-semibold">Recent Searches</h2>
          </div>
          
          <div className="space-y-3">
            {recentSearches.map((search, index) => (
              <motion.button
                key={index}
                onClick={() => setSearchValue(search)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg glass glass-hover text-left"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <SearchIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{search}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Saved Locations */}
        <motion.div
          className="weather-card mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <Star className="w-6 h-6 text-neon-warning mr-3" />
            <h2 className="text-xl font-semibold">Saved Locations</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {searchResults.filter(r => r.saved).map((location, index) => (
              <motion.div
                key={index}
                className="glass glass-hover p-4 rounded-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/location/${location.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">{location.name}</div>
                    <div className="text-sm text-muted-foreground">{location.temp} • {location.condition}</div>
                  </div>
                  <Star className="w-4 h-4 text-neon-warning" fill="currentColor" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Search;