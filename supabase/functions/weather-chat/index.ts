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
    const { message, weatherContext, location, conversationHistory = [] } = await req.json();
    
    console.log('Received chat request:', { message, location });
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are Vayu, an intelligent weather AI assistant built into a futuristic weather app. 

    PERSONALITY: 
    - Friendly, knowledgeable, and slightly futuristic in tone
    - Use weather and atmospheric metaphors naturally
    - Be concise but informative (2-3 sentences usually)
    - Proactive in suggesting weather-related activities and preparations

    CAPABILITIES:
    - Real-time weather analysis and forecasting
    - Lifestyle and activity recommendations based on conditions  
    - Safety alerts and weather warnings
    - Atmospheric science explanations made simple
    - Location-specific insights

    CURRENT CONTEXT:
    Location: ${location}
    Weather Data: ${JSON.stringify(weatherContext, null, 2)}

    Always reference current conditions when relevant and provide actionable insights.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Chat Response:', aiResponse);

    return new Response(JSON.stringify({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in weather-chat function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});