import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  MapPin, 
  Thermometer, 
  Wind, 
  Droplets, 
  Eye,
  Clock,
  Calendar,
  Check
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface FilterOptions {
  location: string[];
  temperature: string[];
  conditions: string[];
  timeframe: string[];
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const SearchFilter = ({ onFilterChange }: SearchFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    location: [],
    temperature: [],
    conditions: [],
    timeframe: []
  });

  const filterCategories = {
    location: {
      icon: MapPin,
      label: 'Location Type',
      options: ['Cities', 'Countries', 'Landmarks', 'Coordinates', 'Nearby Places']
    },
    temperature: {
      icon: Thermometer,
      label: 'Temperature Range',
      options: ['Below 0°C', '0°C - 10°C', '10°C - 20°C', '20°C - 30°C', 'Above 30°C']
    },
    conditions: {
      icon: Wind,
      label: 'Weather Conditions',
      options: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy', 'Snowy', 'Foggy']
    },
    timeframe: {
      icon: Clock,
      label: 'Time Frame',
      options: ['Current', 'Hourly', 'Daily', 'Weekly', 'Monthly']
    }
  };

  const toggleFilter = (category: keyof FilterOptions, option: string) => {
    const updatedFilters = { ...selectedFilters };
    const categoryFilters = updatedFilters[category];
    
    if (categoryFilters.includes(option)) {
      updatedFilters[category] = categoryFilters.filter(item => item !== option);
    } else {
      updatedFilters[category] = [...categoryFilters, option];
    }
    
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      location: [],
      temperature: [],
      conditions: [],
      timeframe: []
    };
    setSelectedFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().length;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.button
          className="relative p-2 rounded-lg glass glass-hover neon-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpen ? { scale: 1.1 } : { scale: 1 }}
        >
          <Filter className="w-5 h-5 text-neon-primary" />
          {getActiveFilterCount() > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-neon-warning rounded-full flex items-center justify-center text-xs font-bold text-background"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {getActiveFilterCount()}
            </motion.div>
          )}
        </motion.button>
      </PopoverTrigger>
      
      <PopoverContent className="glass glass-hover border-glass-border p-0 w-80" sideOffset={8}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-neon-primary" />
              <h3 className="text-lg font-semibold text-foreground">Search Filters</h3>
            </div>
            {getActiveFilterCount() > 0 && (
              <motion.button
                onClick={clearAllFilters}
                className="text-sm text-neon-danger hover:text-neon-danger/80 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Clear All
              </motion.button>
            )}
          </div>

          {/* Filter Categories */}
          <div className="space-y-6">
            {Object.entries(filterCategories).map(([key, category]) => (
              <div key={key} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <category.icon className="w-4 h-4 text-neon-primary" />
                  <h4 className="font-medium text-foreground">{category.label}</h4>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {category.options.map((option) => {
                    const isSelected = selectedFilters[key as keyof FilterOptions].includes(option);
                    return (
                      <motion.button
                        key={option}
                        onClick={() => toggleFilter(key as keyof FilterOptions, option)}
                        className={`flex items-center justify-between p-2 rounded-lg text-sm transition-all ${
                          isSelected
                            ? 'bg-neon-primary/20 text-neon-primary border border-neon-primary/30'
                            : 'glass-hover text-muted-foreground hover:text-foreground'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{option}</span>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                            >
                              <Check className="w-4 h-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Apply Button */}
          <motion.button
            onClick={() => setIsOpen(false)}
            className="w-full mt-6 p-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium neon-glow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Filters ({getActiveFilterCount()})
          </motion.button>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchFilter;