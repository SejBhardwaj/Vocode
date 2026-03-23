# 🚀 Quick Start Guide

Get VOCODE up and running in 3 minutes!

## Prerequisites

- Node.js 18+ installed
- Google Gemini API key

## Step 1: Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

## Step 2: Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure API key
# Edit .env file and add your key:
VITE_GEMINI_API_KEY=your_api_key_here
```

## Step 3: Run

```bash
# Start both frontend and backend
npm run dev:all
```

That's it! Open http://localhost:3000 in your browser.

## What You'll See

1. **Loading Screen** (3 seconds)
2. **Main Page** - Landing page with features
3. **How It Works** - Click "Chat" in navbar
4. **Voice/Text Input** - Describe your website
5. **AI Generation** - Watch your website being built
6. **Editor** - Preview and edit your website
7. **Download** - Get your complete project

## Example Ideas to Try

- "A portfolio website for a photographer"
- "An e-commerce site for selling handmade jewelry"
- "A blog about travel and adventure"
- "A landing page for a SaaS product"
- "A restaurant website with menu and reservations"

## Troubleshooting

### Port already in use?
```bash
# Change port in .env
PORT=5001
```

### API key not working?
- Make sure it's in `.env` file
- Restart the servers after changing `.env`
- Check if key is valid at Google AI Studio

### Voice not working?
- Use Chrome or Edge browser
- Allow microphone permissions
- Or just type your idea instead!

## Need Help?

Check the full [README.md](README.md) for detailed documentation.

---

Happy building! 🎉
