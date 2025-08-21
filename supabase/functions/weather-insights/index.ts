import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { weatherData, location, requestType = 'insights' } = await req.json();
    
    console.log('Received weather data:', weatherData);
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (requestType) {
      case 'insights':
        systemPrompt = `You are Vayu, an advanced AI weather assistant with deep atmospheric knowledge. 
        Provide intelligent, personalized weather insights that go beyond basic forecasts. 
        Focus on practical implications, lifestyle recommendations, and interesting meteorological explanations.
        Be conversational but professional, and always consider user safety and comfort.`;
        
        userPrompt = `Analyze this weather data for ${location}:
        ${JSON.stringify(weatherData, null, 2)}
        
        Please provide:
        1. A compelling 2-sentence weather summary
        2. 3 practical lifestyle recommendations  
        3. One interesting meteorological insight
        4. Any important safety considerations
        
        Format as JSON with keys: summary, recommendations, insight, safety`;
        break;

      case 'activity_suggestions':
        systemPrompt = `You are Vayu, a weather-aware activity advisor. 
        Suggest specific activities perfectly suited for current weather conditions.
        Consider safety, comfort, and fun factor. Be creative and practical.`;
        
        userPrompt = `Based on this weather in ${location}:
        ${JSON.stringify(weatherData, null, 2)}
        
        Suggest 5 specific activities with brief explanations why they're perfect for these conditions.
        Format as JSON array with objects containing: activity, reason, duration, difficulty`;
        break;

      case 'weekly_analysis':
        systemPrompt = `You are Vayu, analyzing weather patterns for weekly planning.
        Identify trends, highlight notable days, and provide strategic planning advice.`;
        
        userPrompt = `Analyze this 7-day forecast for ${location}:
        ${JSON.stringify(weatherData, null, 2)}
        
        Provide:
        1. Weekly weather trend summary
        2. Best days for outdoor activities
        3. Days requiring special preparation
        4. Overall week planning advice
        
        Format as JSON with keys: trend, bestDays, preparationDays, planningAdvice`;
        break;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response:', aiResponse);

    // Try to parse as JSON, fallback to text if not valid JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch {
      parsedResponse = { content: aiResponse };
    }

    return new Response(JSON.stringify({
      success: true,
      insights: parsedResponse,
      requestType
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in weather-insights function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});