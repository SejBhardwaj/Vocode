import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import archiver from 'archiver';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || 'AIzaSyCRaZqmZZcaoi_RL60_M9l4MtrBdrzlXZ0');

// Helper function to get model
function getModel() {
  // Use gemini-2.5-flash-lite - tested and working (825ms response time)
  return genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash-lite'
  });
}

// Sanitize AI-generated HTML — remove broken external resources
function sanitizeGeneratedCode(code) {
  // Remove broken placeholder image services
  code = code.replace(/<img[^>]+src=["'][^"']*(?:via\.placeholder\.com|placehold\.it|picsum\.photos|lorempixel\.com|dummyimage\.com)[^"']*["'][^>]*>/gi, 
    (match) => {
      // Extract alt text if present
      const altMatch = match.match(/alt=["']([^"']*)["']/i);
      const alt = altMatch ? altMatch[1] : 'Image';
      const classMatch = match.match(/class=["']([^"']*)["']/i);
      const cls = classMatch ? classMatch[1] : '';
      return `<div class="${cls}" style="background:linear-gradient(135deg,#1e1e2e,#2d2d4e);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-size:0.875rem;border-radius:8px;min-height:200px;">${alt}</div>`;
    }
  );

  // Remove FontAwesome kit scripts (403 forbidden)
  code = code.replace(/<script[^>]+kit\.fontawesome\.com[^>]*><\/script>/gi, '');
  code = code.replace(/<script[^>]+fontawesome[^>]*><\/script>/gi, '');
  code = code.replace(/<link[^>]+fontawesome[^>]*>/gi, '');

  // Remove broken Google Fonts links (optional — keep if they work)
  // code = code.replace(/<link[^>]+fonts\.googleapis\.com[^>]*>/gi, '');

  // Fix malformed SVG path data (remove SVGs with clearly broken paths)
  // We leave SVGs intact but log — they usually render fine despite console warnings

  return code;
}

// API Routes

// Refine user idea
app.post('/api/idea-refine', async (req, res) => {
  console.log('📥 Received idea-refine request');
  console.log('Request body:', req.body);
  
  try {
    const { rawIdea } = req.body;
    
    if (!rawIdea) {
      console.log('❌ No rawIdea provided');
      return res.status(400).json({ error: 'Raw idea is required' });
    }

    console.log('🤖 Calling Gemini AI with idea:', rawIdea);
    const model = getModel();
    
    const prompt = `You are an expert web designer and UX consultant. A user wants to create a website and has described their idea as follows:

"${rawIdea}"

Please analyze this idea and provide a structured response in JSON format with the following fields:
{
  "websiteType": "landing page | portfolio | e-commerce | blog | corporate | other",
  "purpose": "brief description of the website's main purpose",
  "targetAudience": "who is this website for",
  "keyFeatures": ["feature1", "feature2", "feature3"],
  "tone": "professional | casual | creative | modern | elegant",
  "suggestedSections": ["section1", "section2", "section3"],
  "colorScheme": "suggested color palette description",
  "refinedDescription": "a clear, detailed description of what the website should be"
}

Only respond with valid JSON, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const refinedIdea = JSON.parse(jsonMatch[0]);
      res.json(refinedIdea);
    } else {
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error refining idea:', error);
    res.status(500).json({ error: 'Failed to refine idea', details: error.message });
  }
});

// Generate website plans
app.post('/api/plan-generate', async (req, res) => {
  try {
    const { refinedIdea } = req.body;
    
    if (!refinedIdea) {
      return res.status(400).json({ error: 'Refined idea is required' });
    }

    const model = getModel();
    
    const prompt = `Based on this website concept:
${JSON.stringify(refinedIdea, null, 2)}

Generate 3 different website layout plans. Each plan should be a complete website structure with sections and components.

Respond with valid JSON in this format:
{
  "plans": [
    {
      "id": 1,
      "name": "Plan name",
      "description": "Brief description",
      "style": "modern | minimal | bold | elegant",
      "sections": [
        {
          "type": "hero | about | features | gallery | testimonials | contact | footer",
          "title": "Section title",
          "content": "Content description",
          "layout": "layout description"
        }
      ]
    }
  ]
}

Only respond with valid JSON, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const plans = JSON.parse(jsonMatch[0]);
      res.json(plans);
    } else {
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error generating plans:', error);
    res.status(500).json({ error: 'Failed to generate plans', details: error.message });
  }
});

// Generate code from plan
app.post('/api/code-generate', async (req, res) => {
  console.log('📥 Received code-generate request');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { plan, refinedIdea } = req.body;
    
    if (!plan || !refinedIdea) {
      console.log('❌ Missing plan or refinedIdea');
      return res.status(400).json({ error: 'Plan and refined idea are required' });
    }

    // Safely extract sections — handle array of strings or array of objects
    const rawSections = plan.sections || plan.features || ['Hero', 'Features', 'About', 'Contact', 'Footer'];
    const sectionsStr = Array.isArray(rawSections)
      ? rawSections.map(s => (typeof s === 'string' ? s : s.type || s.title || JSON.stringify(s))).join(', ')
      : String(rawSections);

    const ideaText = refinedIdea.rawIdea || refinedIdea.refinedDescription || refinedIdea.purpose || 'a modern website';

    console.log('🤖 Calling Gemini AI to generate code...');
    const model = getModel();
    
    const prompt = `Generate a complete, production-ready HTML website for this concept:

User Idea: ${ideaText}
Design Style: ${plan.style || 'modern'}
Plan Name: ${plan.name || 'Modern Website'}
Sections to Include: ${sectionsStr}

Requirements:
- Create a COMPLETE, WORKING HTML page with embedded CSS and JavaScript
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Make it fully responsive and mobile-friendly
- Include smooth CSS animations and transitions
- Use a color scheme that matches: ${refinedIdea.colorScheme || 'modern and professional dark theme'}
- Include all sections: ${sectionsStr}
- Make it visually stunning with gradients, shadows, and modern UI elements
- Add interactive elements using vanilla JavaScript only
- Include a navigation menu and footer

STRICT RULES - NEVER violate these:
1. NEVER use placeholder image services like via.placeholder.com, placehold.it, picsum.photos, lorempixel.com or any external image URL
2. NEVER use FontAwesome, Google Fonts external links, or any external icon/font CDN except Tailwind
3. For ALL images: use inline SVG illustrations or CSS gradient backgrounds instead - NO <img> tags with external src
4. For ALL icons: use simple inline SVG paths or Unicode symbols - NO icon libraries
5. NEVER use kit.fontawesome.com or any fontawesome URL
6. All content must be self-contained - zero external dependencies except Tailwind CDN
7. Use CSS gradients, shapes, and patterns for visual interest instead of images

IMPORTANT: Return ONLY the complete HTML code. Start with <!DOCTYPE html> and end with </html>.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Code generated successfully');
    
    // Extract HTML if wrapped in markdown code blocks
    let code = text;
    const htmlMatch = text.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) {
      code = htmlMatch[1];
    } else if (text.includes('```')) {
      code = text.replace(/```[\s\S]*?\n/g, '').replace(/\n```/g, '');
    }

    // Post-process: strip broken external resources
    code = sanitizeGeneratedCode(code);
    
    res.json({ 
      code: code.trim(),
      description: `${plan.name} website generated successfully`
    });
  } catch (error) {
    console.error('❌ Error generating code:', error);
    res.status(500).json({ error: 'Failed to generate code', details: error.message });
  }
});

// Edit existing code
app.post('/api/edit', async (req, res) => {
  console.log('📥 Received edit request');
  
  try {
    const { currentCode, editRequest } = req.body;
    
    if (!currentCode || !editRequest) {
      console.log('❌ Missing currentCode or editRequest');
      return res.status(400).json({ error: 'Current code and edit request are required' });
    }

    console.log('🤖 Calling Gemini AI to edit code...');
    console.log('Edit request:', editRequest);
    
    const model = getModel();
    
    const prompt = `You are a web developer. Here is the current HTML code:

${currentCode}

The user wants to make this change: "${editRequest}"

Please modify the HTML code according to the request. Make sure to:
- Keep the existing structure and styling
- Only change what's necessary for the requested modification
- Maintain responsiveness and modern design
- Keep all Tailwind CSS classes and styling intact

IMPORTANT: Return ONLY the complete modified HTML code, no explanations or markdown. Start with <!DOCTYPE html> and end with </html>.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Code edited successfully');
    
    // Extract HTML if wrapped in markdown code blocks
    let code = text;
    const htmlMatch = text.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) {
      code = htmlMatch[1];
    } else if (text.includes('```')) {
      code = text.replace(/```[\s\S]*?\n/g, '').replace(/\n```/g, '');
    }
    
    res.json({ 
      code: sanitizeGeneratedCode(code.trim()),
      changes: `Applied: ${editRequest}`
    });
  } catch (error) {
    console.error('❌ Error editing code:', error);
    res.status(500).json({ error: 'Failed to edit code', details: error.message });
  }
});

// Download project as ZIP
app.post('/api/download', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=vocode-website.zip');

    const archive = archiver('zip', { zlib: { level: 9 } });
    
    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(res);

    // Add project files
    archive.append(JSON.stringify({
      name: 'vocode-generated-website',
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        'lucide-react': '^0.445.0',
        'framer-motion': '^11.5.4'
      },
      devDependencies: {
        '@vitejs/plugin-react': '^4.3.1',
        'autoprefixer': '^10.4.20',
        'postcss': '^8.4.45',
        'tailwindcss': '^3.4.10',
        'vite': '^5.4.3'
      }
    }, null, 2), { name: 'package.json' });

    archive.append(code, { name: 'src/App.jsx' });
    
    // Add other necessary files...
    
    await archive.finalize();
  } catch (error) {
    console.error('Error creating download:', error);
    res.status(500).json({ error: 'Failed to create download', details: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  console.log('✅ Health check requested');
  res.json({ status: 'ok', message: 'VOCODE API is running' });
});

// Root route
app.get('/', (req, res) => {
  console.log('🏠 Root endpoint accessed');
  res.json({ 
    message: 'VOCODE API Server',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      test: 'GET /api/test',
      refineIdea: 'POST /api/idea-refine',
      generatePlans: 'POST /api/plan-generate',
      generateCode: 'POST /api/code-generate',
      editCode: 'POST /api/edit',
      download: 'POST /api/download'
    },
    frontend: 'http://localhost:3001'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('🧪 Test endpoint called');
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 VOCODE server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
});

