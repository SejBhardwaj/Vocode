import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WeatherInsights {
  summary: string;
  recommendations: string[];
  insight: string;
  safety: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const useWeatherAI = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<WeatherInsights | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getWeatherInsights = useCallback(async (weatherData: any, location: string, requestType = 'insights') => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('weather-insights', {
        body: { weatherData, location, requestType }
      });

      if (supabaseError) throw supabaseError;
      
      if (data.success) {
        setInsights(data.insights);
        return data.insights;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get weather insights';
      setError(errorMessage);
      console.error('Weather insights error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const sendChatMessage = useCallback(async (message: string, weatherContext: any, location: string) => {
    setLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMessage]);

    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('weather-chat', {
        body: { 
          message, 
          weatherContext, 
          location,
          conversationHistory: chatHistory.slice(-10) // Keep last 10 messages for context
        }
      });

      if (supabaseError) throw supabaseError;
      
      if (data.success) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: data.timestamp
        };
        setChatHistory(prev => [...prev, assistantMessage]);
        return data.response;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      console.error('Chat error:', err);
      
      // Remove the user message if there was an error
      setChatHistory(prev => prev.slice(0, -1));
      return null;
    } finally {
      setLoading(false);
    }
  }, [chatHistory]);

  const queryWeatherAgent = useCallback(async (query: string, location: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('weather-agent', {
        body: { query, location }
      });

      if (supabaseError) throw supabaseError;
      
      if (data.success) {
        return data.agent;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to query weather agent';
      setError(errorMessage);
      console.error('Weather agent error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setChatHistory([]);
    setError(null);
  }, []);

  return {
    loading,
    insights,
    chatHistory,
    error,
    getWeatherInsights,
    sendChatMessage,
    queryWeatherAgent,
    clearChat
  };
};