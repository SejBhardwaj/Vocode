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
    const { query, location = "New York, NY" } = await req.json();
    
    console.log('Weather agent query:', query, 'Location:', location);
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are Vayu, an advanced AI weather agent with the ability to provide comprehensive weather analysis.

    You have access to the following capabilities:
    1. Current weather analysis
    2. Forecast interpretation  
    3. Activity recommendations
    4. Safety assessments
    5. Atmospheric explanations

    For the location: ${location}

    RESPONSE FORMAT: Always respond in JSON with this structure:
    {
      "response": "Your natural language response",
      "actionItems": ["List", "of", "practical", "actions"],
      "confidence": "high|medium|low",
      "followUp": "Suggested follow-up question"
    }

    Be conversational, helpful, and weather-focused in your responses.`;

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
          { role: 'user', content: query }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let aiResponse = data.choices[0].message.content;
    
    // Try to parse as JSON, fallback to structured response if needed
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch {
      parsedResponse = {
        response: aiResponse,
        actionItems: ["Check current weather conditions", "Plan accordingly"],
        confidence: "medium",
        followUp: "Would you like more specific weather details?"
      };
    }
    
    console.log('Weather agent response:', parsedResponse);

    return new Response(JSON.stringify({
      success: true,
      agent: parsedResponse,
      location,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in weather-agent function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});