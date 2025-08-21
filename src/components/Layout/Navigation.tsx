import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Settings, 
  Home, 
  Clock, 
  Calendar,
  BarChart3,
  AlertTriangle,
  Activity,
  ChevronDown,
  MapPin
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SearchFilter from '@/components/Weather/SearchFilter';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  
  const handleFilterChange = (filters: any) => {
    console.log('Filters applied:', filters);
    // In a real app, this would trigger a filtered search
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Clock, label: 'Hourly', path: '/hourly' },
    { icon: Calendar, label: 'Weekly', path: '/weekly' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: AlertTriangle, label: 'Alerts', path: '/alerts' },
    { icon: Activity, label: 'Lifestyle', path: '/lifestyle' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <TooltipProvider>
      <motion.nav 
        className="glass glass-hover sticky top-0 z-50 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center neon-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-weather-sunny via-weather-rainy to-weather-stormy opacity-20"></div>
              <div className="text-lg">🌤️</div>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <h1 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                  Vayu
                </h1>
              </div>
              {/* Current Location */}
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>New York, NY</span>
                <span>24°C</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </motion.div>

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative flex items-center space-x-2">
              <div className="relative flex-1">
                <motion.div 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-primary z-10 pointer-events-none"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Search className="w-5 h-5" />
                </motion.div>
                <Input
                  type="text"
                  placeholder="Search weather locations..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="glass search-glow pl-10 pr-4 py-3 w-full border-glass-border focus:border-neon-primary focus:outline-none focus:ring-0 hover:shadow-[0_0_30px_hsl(217_91%_60%/0.4),0_0_60px_hsl(217_91%_60%/0.2)] hover:border-[hsl(217_91%_60%/0.3)] transition-all duration-500"
                />
              </div>
              <SearchFilter onFilterChange={handleFilterChange} />
            </div>
          </form>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => navigate(item.path)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gradient-primary text-white neon-glow shadow-neon'
                        : 'text-muted-foreground hover:text-neon-primary hover:bg-glass-hover hover:neon-glow hover:shadow-neon border border-transparent hover:border-neon-primary/30'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent className="glass border-neon-primary/30 bg-glass-hover neon-glow shadow-neon">
                  <p className="text-neon-primary font-semibold">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            
            {/* Settings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => navigate('/settings')}
                  className="p-3 text-muted-foreground hover:text-neon-primary hover:bg-glass-hover hover:neon-glow hover:shadow-neon rounded-lg transition-all duration-300 border border-transparent hover:border-neon-primary/30"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent className="glass border-neon-primary/30 bg-glass-hover neon-glow shadow-neon">
                <p className="text-neon-primary font-semibold">Settings</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </motion.nav>
    </TooltipProvider>
  );
};

export default Navigation;