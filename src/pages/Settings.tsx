import { motion } from 'framer-motion';
import { ArrowLeft, Settings as SettingsIcon, Bell, Globe, Thermometer, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Settings = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState({
    temperature: 'celsius',
    wind: 'kmh',
    pressure: 'hpa',
    visibility: 'km',
    precipitation: 'mm',
    distance: 'km'
  });

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
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Customize your weather experience</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Units */}
          <motion.div
            className="weather-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <Thermometer className="w-6 h-6 text-neon-primary mr-3" />
              <h2 className="text-xl font-semibold">Units</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Temperature</label>
                <select 
                  value={units.temperature}
                  onChange={(e) => setUnits({...units, temperature: e.target.value})}
                  className="w-full glass glass-hover p-4 rounded-xl border border-glass-border focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 transition-all duration-200 text-foreground bg-background/50 backdrop-blur-sm hover:bg-background/70"
                >
                  <option value="celsius">Celsius (°C) - Standard metric</option>
                  <option value="fahrenheit">Fahrenheit (°F) - Imperial system</option>
                  <option value="kelvin">Kelvin (K) - Scientific absolute</option>
                  <option value="rankine">Rankine (°R) - Absolute Fahrenheit</option>
                  <option value="reaumur">Réaumur (°Ré) - Historical European</option>
                  <option value="delisle">Delisle (°De) - Inverted temperature</option>
                  <option value="newton">Newton (°N) - Historical scientific</option>
                  <option value="romer">Rømer (°Rø) - Danish astronomer scale</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Wind Speed</label>
                <select 
                  value={units.wind}
                  onChange={(e) => setUnits({...units, wind: e.target.value})}
                  className="w-full glass glass-hover p-4 rounded-xl border border-glass-border focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 transition-all duration-200 text-foreground bg-background/50 backdrop-blur-sm hover:bg-background/70"
                >
                  <option value="kmh">Kilometers per hour (km/h) - Metric standard</option>
                  <option value="mph">Miles per hour (mph) - Imperial standard</option>
                  <option value="ms">Meters per second (m/s) - Scientific metric</option>
                  <option value="knots">Knots (kn) - Nautical/Aviation</option>
                  <option value="fts">Feet per second (ft/s) - Engineering</option>
                  <option value="beaufort">Beaufort Scale (0-12) - Traditional sailing</option>
                  <option value="cms">Centimeters per second (cm/s) - Precision metric</option>
                  <option value="ips">Inches per second (in/s) - Precision imperial</option>
                  <option value="mach">Mach number - Supersonic reference</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pressure</label>
                <select 
                  value={units.pressure}
                  onChange={(e) => setUnits({...units, pressure: e.target.value})}
                  className="w-full glass glass-hover p-4 rounded-xl border border-glass-border focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 transition-all duration-200 text-foreground bg-background/50 backdrop-blur-sm hover:bg-background/70"
                >
                  <option value="hpa">Hectopascals (hPa) - Meteorological standard</option>
                  <option value="mbar">Millibars (mbar) - Aviation standard</option>
                  <option value="inhg">Inches of Mercury (inHg) - US weather</option>
                  <option value="mmhg">Millimeters of Mercury (mmHg) - Medical/Lab</option>
                  <option value="kpa">Kilopascals (kPa) - Engineering metric</option>
                  <option value="psi">Pounds per Square Inch (psi) - Industrial</option>
                  <option value="atm">Atmospheres (atm) - Scientific reference</option>
                  <option value="torr">Torr - Vacuum technology</option>
                  <option value="pa">Pascals (Pa) - SI base unit</option>
                  <option value="bar">Bar - European meteorology</option>
                  <option value="psf">Pounds per Square Foot (psf) - Construction</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Visibility</label>
                <select 
                  value={units.visibility}
                  onChange={(e) => setUnits({...units, visibility: e.target.value})}
                  className="w-full glass glass-hover p-4 rounded-xl border border-glass-border focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 transition-all duration-200 text-foreground bg-background/50 backdrop-blur-sm hover:bg-background/70"
                >
                  <option value="km">Kilometers (km) - Metric standard</option>
                  <option value="miles">Miles (mi) - Imperial standard</option>
                  <option value="meters">Meters (m) - Precise metric</option>
                  <option value="feet">Feet (ft) - Aviation/Engineering</option>
                  <option value="nautical-miles">Nautical Miles (nmi) - Marine/Aviation</option>
                  <option value="yards">Yards (yd) - Sports/Land measurement</option>
                  <option value="leagues">Leagues - Historical distance</option>
                  <option value="furlongs">Furlongs - Traditional British</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Precipitation</label>
                <select 
                  value={units.precipitation}
                  onChange={(e) => setUnits({...units, precipitation: e.target.value})}
                  className="w-full glass glass-hover p-4 rounded-xl border border-glass-border focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 transition-all duration-200 text-foreground bg-background/50 backdrop-blur-sm hover:bg-background/70"
                >
                  <option value="mm">Millimeters (mm) - Global meteorological</option>
                  <option value="cm">Centimeters (cm) - Heavy precipitation</option>
                  <option value="inches">Inches (in) - US weather standard</option>
                  <option value="feet">Feet (ft) - Extreme precipitation</option>
                  <option value="micrometers">Micrometers (μm) - Scientific precision</option>
                  <option value="points">Points (pt) - Typography reference</option>
                  <option value="thou">Thousandths of inch (thou) - Precision</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Distance</label>
                <select 
                  value={units.distance}
                  onChange={(e) => setUnits({...units, distance: e.target.value})}
                  className="w-full glass glass-hover p-4 rounded-xl border border-glass-border focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 transition-all duration-200 text-foreground bg-background/50 backdrop-blur-sm hover:bg-background/70"
                >
                  <option value="km">Kilometers (km) - Metric standard</option>
                  <option value="miles">Miles (mi) - Imperial standard</option>
                  <option value="meters">Meters (m) - SI base unit</option>
                  <option value="feet">Feet (ft) - Imperial/Aviation</option>
                  <option value="nautical-miles">Nautical Miles (nmi) - Marine/Aviation</option>
                  <option value="yards">Yards (yd) - Sports/Construction</option>
                  <option value="chains">Chains - Land surveying</option>
                  <option value="furlongs">Furlongs - Horse racing</option>
                  <option value="leagues">Leagues - Historical navigation</option>
                  <option value="parsecs">Parsecs (pc) - Astronomical</option>
                  <option value="light-years">Light Years - Cosmic scale</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            className="weather-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-neon-primary mr-3" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-foreground">Weather Alerts</div>
                  <div className="text-sm text-muted-foreground">Severe weather warnings and advisories</div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-border" defaultChecked />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-foreground">Daily Forecast</div>
                  <div className="text-sm text-muted-foreground">Morning weather summary</div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-border" />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-foreground">Rain Alerts</div>
                  <div className="text-sm text-muted-foreground">Notifications when rain is expected</div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-border" defaultChecked />
              </label>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            className="weather-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 text-neon-primary mr-3" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Theme</label>
                <select className="w-full glass glass-hover p-4 rounded-xl border border-glass-border focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 transition-all duration-200 text-foreground bg-background/50 backdrop-blur-sm hover:bg-background/70">
                  <option>Auto (based on weather) - Adaptive experience</option>
                  <option>Dark - Night owl friendly</option>
                  <option>Light - Bright and clean</option>
                  <option>System - Follow device preference</option>
                  <option>High Contrast - Accessibility focused</option>
                </select>
              </div>
              
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-foreground">Animated Weather Icons</div>
                  <div className="text-sm text-muted-foreground">Enable weather icon animations</div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-border" defaultChecked />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-foreground">Dynamic Backgrounds</div>
                  <div className="text-sm text-muted-foreground">Change background based on weather</div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-border" defaultChecked />
              </label>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            className="weather-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-neon-primary mr-3" />
              <h2 className="text-xl font-semibold">Location</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-foreground">Use Current Location</div>
                  <div className="text-sm text-muted-foreground">Automatically detect your location</div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-border" defaultChecked />
              </label>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Default Location</label>
                <input 
                  type="text" 
                  placeholder="Enter city name, postal code, or coordinates"
                  className="w-full glass glass-hover p-4 rounded-xl border border-glass-border focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 transition-all duration-200 text-foreground bg-background/50 backdrop-blur-sm hover:bg-background/70 placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;