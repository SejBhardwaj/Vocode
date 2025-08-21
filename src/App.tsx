import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "./components/Layout/Navigation";
import LoadingScreen from "./components/Loading/LoadingScreen";
import WeatherChat from "./components/AI/WeatherChat";

// Pages
import Dashboard from "./pages/Dashboard";
import HourlyForecast from "./pages/HourlyForecast";
import HourlyDetail from "./pages/HourlyDetail";
import WeeklyForecast from "./pages/WeeklyForecast";
import MapsRadar from "./pages/MapsRadar";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Lifestyle from "./pages/Lifestyle";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import BeachDayDetail from "./pages/BeachDayDetail";
import OutdoorActivitiesDetail from "./pages/OutdoorActivitiesDetail";
import CyclingConditionsDetail from "./pages/CyclingConditionsDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 seconds to reach 100%

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen animated-bg">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/hourly" element={<HourlyForecast />} />
                <Route path="/hourly/:time" element={<HourlyDetail />} />
                <Route path="/weekly" element={<WeeklyForecast />} />
                <Route path="/maps" element={<MapsRadar />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/lifestyle" element={<Lifestyle />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/search" element={<Search />} />
                <Route path="/lifestyle/beach-day" element={<BeachDayDetail />} />
                <Route path="/lifestyle/outdoor-activities" element={<OutdoorActivitiesDetail />} />
                <Route path="/lifestyle/cycling-conditions" element={<CyclingConditionsDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
            
            {/* AI Weather Chat - Available on all pages */}
            <WeatherChat 
              location="New York, NY"
              weatherContext={{
                temperature: '24°C',
                condition: 'Partly Cloudy',
                feelsLike: '27°C',
                humidity: '68%',
                wind: '15 km/h',
                visibility: '10 km',
                pressure: '1013 hPa'
              }}
            />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
