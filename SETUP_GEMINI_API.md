# Setup Gemini API Key

## The Problem
The Gemini API key in your `.env` file is invalid or expired. That's why you're getting 404 errors when trying to generate websites.

## Solution: Get a Valid API Key

### Step 1: Get Your API Key
1. Go to **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

### Step 2: Update .env File
1. Open the `.env` file in your project root
2. Replace `YOUR_ACTUAL_GEMINI_API_KEY_HERE` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_API_URL=http://localhost:5000
   PORT=5000
   ```

### Step 3: Restart Backend Server
After updating the API key, restart the backend:
1. Stop the current backend process (Ctrl+C in the terminal)
2. Run: `node index.js`

### Step 4: Test
1. Open http://localhost:3001
2. Go to "How It Works"
3. Enter a website idea
4. Select a plan
5. Wait for the website to generate

## Alternative: Use Free Tier
If you don't want to use Gemini API, I can modify the code to:
1. Use a different AI service (OpenAI, Anthropic, etc.)
2. Generate websites using templates (no AI needed)
3. Use a mock API for testing

Let me know which option you prefer!

## Current Status
- ❌ Invalid API key in .env
- ✅ Backend server running on port 5000
- ✅ Frontend running on port 3001
- ✅ All code properly connected
- ❌ Gemini API calls failing due to invalid key

## What Happens After You Add Valid Key
Once you add a valid Gemini API key:
1. Backend will successfully call Gemini AI
2. AI will generate custom HTML websites based on user input
3. Users can edit websites using AI
4. Full stack application will work end-to-end
