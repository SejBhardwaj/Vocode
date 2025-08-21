import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Bell, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Alerts = () => {
  const navigate = useNavigate();
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rain Warning',
      message: 'Heavy rainfall expected in the next 2 hours. Flooding possible in low-lying areas.',
      time: '2 minutes ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'UV Index Alert',
      message: 'High UV levels expected today. Use sunscreen and protective clothing.',
      time: '1 hour ago',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Air Quality Notice',
      message: 'Air quality is good today. Perfect for outdoor activities.',
      time: '3 hours ago',
      severity: 'low'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Wind Advisory',
      message: 'Strong winds expected this evening. Secure outdoor items.',
      time: '4 hours ago',
      severity: 'medium'
    },
    {
      id: 5,
      type: 'info',
      title: 'Temperature Drop',
      message: 'Temperature will drop significantly tonight. Dress warmly.',
      time: '6 hours ago',
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-neon-danger bg-neon-danger/10 text-neon-danger';
      case 'medium': return 'border-neon-warning bg-neon-warning/10 text-neon-warning';
      case 'low': return 'border-neon-success bg-neon-success/10 text-neon-success';
      default: return 'border-neon-primary bg-neon-primary/10 text-neon-primary';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Bell;
    }
  };

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
            <h1 className="text-3xl font-bold text-foreground">Weather Alerts</h1>
            <p className="text-muted-foreground">Stay informed about severe weather</p>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <motion.div
              className="weather-card text-center py-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Active Alerts</h3>
              <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
            </motion.div>
          ) : (
            alerts.map((alert, index) => {
              const IconComponent = getIcon(alert.type);
              return (
                <motion.div
                  key={alert.id}
                  className={`glass glass-hover p-6 rounded-2xl border-2 ${getSeverityColor(alert.severity)}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-current/20">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{alert.title}</h3>
                      <p className="text-muted-foreground mb-3 leading-relaxed">{alert.message}</p>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">{alert.time}</div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Alert Settings */}
        <motion.div
          className="weather-card mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">Alert Preferences</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Weather Alerts</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" defaultChecked />
                  <span>Severe Weather Warnings</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" defaultChecked />
                  <span>Rain Alerts</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  <span>Temperature Extremes</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Health & Safety</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" defaultChecked />
                  <span>UV Index Warnings</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  <span>Air Quality Alerts</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  <span>Pollen Count Alerts</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Alerts;