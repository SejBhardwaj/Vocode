# VOCODE - AI Voice Website Builder

Build websites with your voice using AI. Transform your ideas into production-ready websites instantly.

## Features

- 🎤 **Voice Input**: Describe your website using voice or text
- 🤖 **AI-Powered**: Uses Google Gemini AI to understand and refine your ideas
- 🎨 **Multiple Design Plans**: Get 3 different design options to choose from
- ⚡ **Instant Generation**: Generate complete React websites in seconds
- ✏️ **Live Editing**: Make changes to your website using natural language
- 📦 **Download Ready**: Export your website as a complete project

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- OGL (WebGL library)
- Spline 3D

### Backend
- Node.js
- Express
- Google Generative AI (Gemini)
- Archiver (for ZIP downloads)

## Installation

### Prerequisites
- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vocode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   VITE_API_URL=http://localhost:5000
   PORT=5000
   ```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend together:
```bash
npm run dev:all
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:3000`

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
vocode/
├── src/
│   ├── components/
│   │   ├── MainPage.jsx          # Landing page
│   │   ├── HowItWorksPage.jsx    # Voice/text input page
│   │   ├── EditorPage.jsx        # Website editor & preview
│   │   ├── PricingPage.jsx       # Pricing information
│   │   ├── Navbar.jsx            # Navigation component
│   │   └── ui/                   # UI components
│   ├── services/
│   │   └── api.js                # API service for backend communication
│   ├── hooks/
│   │   └── useVoiceRecognition.js # Voice recognition hook
│   ├── lib/
│   │   └── utils.js              # Utility functions
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
├── index.js                      # Backend server
├── package.json
└── .env                          # Environment variables

```

## API Endpoints

### POST `/api/idea-refine`
Refine user's raw idea into structured data.

**Request:**
```json
{
  "rawIdea": "I want a portfolio website for my photography"
}
```

**Response:**
```json
{
  "websiteType": "portfolio",
  "purpose": "Showcase photography work",
  "targetAudience": "Potential clients and art enthusiasts",
  "keyFeatures": ["Gallery", "About", "Contact"],
  "tone": "creative",
  "suggestedSections": ["Hero", "Portfolio", "About", "Contact"],
  "colorScheme": "Dark with vibrant accents",
  "refinedDescription": "A modern portfolio website..."
}
```

### POST `/api/plan-generate`
Generate multiple website design plans.

**Request:**
```json
{
  "refinedIdea": { /* refined idea object */ }
}
```

**Response:**
```json
{
  "plans": [
    {
      "id": 1,
      "name": "Modern Minimal",
      "description": "Clean and professional design",
      "style": "minimal",
      "sections": [...]
    }
  ]
}
```

### POST `/api/code-generate`
Generate React code from selected plan.

**Request:**
```json
{
  "plan": { /* selected plan object */ },
  "refinedIdea": { /* refined idea object */ }
}
```

**Response:**
```json
{
  "code": "import React from 'react'...",
  "dependencies": ["react", "lucide-react"],
  "description": "A modern portfolio website..."
}
```

### POST `/api/edit`
Edit existing website code.

**Request:**
```json
{
  "currentCode": "existing code...",
  "editRequest": "Make the header blue"
}
```

**Response:**
```json
{
  "code": "updated code...",
  "changes": "Changed header background to blue"
}
```

### POST `/api/download`
Download website project as ZIP.

**Request:**
```json
{
  "code": "website code..."
}
```

**Response:** ZIP file download

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "VOCODE API is running"
}
```

## Usage Flow

1. **Start**: User lands on the main page
2. **Input**: User navigates to "How It Works" and describes their website idea (voice or text)
3. **Refine**: AI refines the idea into structured data
4. **Plans**: AI generates 3 different design plans
5. **Select**: User selects their preferred plan
6. **Generate**: AI generates complete React code
7. **Preview**: User sees live preview of their website
8. **Edit**: User can make changes using natural language
9. **Download**: User downloads the complete project as ZIP

## Features in Detail

### Voice Recognition
- Uses Web Speech API for voice input
- Real-time transcription
- Fallback to text input if voice not supported

### AI Generation
- Powered by Google Gemini Pro
- Understands natural language descriptions
- Generates production-ready React code
- Creates responsive, modern designs

### Live Preview
- Real-time preview of generated website
- Iframe-based rendering
- Supports all React features

### Code Editing
- Natural language edit requests
- AI understands context and makes precise changes
- Instant preview updates

## Troubleshooting

### Backend not starting
- Check if port 5000 is available
- Verify Gemini API key is correct
- Check Node.js version (18+ required)

### Frontend not connecting to backend
- Verify `VITE_API_URL` in `.env`
- Check if backend server is running
- Check browser console for CORS errors

### Voice recognition not working
- Use Chrome/Edge browser (best support)
- Allow microphone permissions
- Check if HTTPS is enabled (required for production)

### AI generation failing
- Verify Gemini API key is valid
- Check API quota/limits
- Review backend logs for errors

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | Required |
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |
| `PORT` | Backend server port | `5000` |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section

## Roadmap

- [ ] Add more AI models support
- [ ] Template library
- [ ] Collaborative editing
- [ ] Version history
- [ ] Direct deployment to hosting platforms
- [ ] Custom domain support
- [ ] SEO optimization tools
- [ ] Analytics integration

---

Built with ❤️ using React, Node.js, and Google Gemini AI
