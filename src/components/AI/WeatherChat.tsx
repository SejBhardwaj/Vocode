import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWeatherAI } from '@/hooks/useWeatherAI';
import { useToast } from '@/components/ui/use-toast';

interface WeatherChatProps {
  weatherContext?: any;
  location?: string;
  className?: string;
}

const WeatherChat = ({ weatherContext, location = "New York, NY", className = "" }: WeatherChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { chatHistory, loading, error, sendChatMessage, clearChat } = useWeatherAI();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Chat Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;

    const currentMessage = message;
    setMessage('');
    
    await sendChatMessage(currentMessage, weatherContext, location);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What should I wear today?",
    "Is it good weather for outdoor activities?",
    "Will it rain this afternoon?",
    "How's the air quality?"
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="weather-card mb-4 w-80 h-96 flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-neon-primary" />
                <h3 className="font-semibold text-foreground">Vayu AI</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatHistory.length === 0 ? (
                <div className="space-y-3">
                  <div className="text-center text-muted-foreground text-sm mb-4">
                    Ask me anything about the weather in {location}
                  </div>
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setMessage(question)}
                      className="w-full text-left p-2 text-sm glass glass-hover rounded-lg text-muted-foreground hover:text-foreground"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.role === 'user'
                          ? 'bg-neon-primary text-primary-foreground'
                          : 'glass text-foreground'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))
              )}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="glass p-3 rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin text-neon-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-glass-border">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about weather..."
                  className="flex-1"
                  disabled={loading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || loading}
                  size="sm"
                  className="bg-neon-primary hover:bg-neon-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center neon-glow shadow-neon"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default WeatherChat;