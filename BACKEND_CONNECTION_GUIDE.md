# Backend Connection Guide

## ✅ Status: CONNECTED

The frontend is now properly connected to the backend API.

## 🚀 Running Servers

### Backend Server
- **URL**: http://localhost:5000
- **Status**: Running
- **Model**: Gemini 1.5 Flash (updated from deprecated gemini-pro)

### Frontend Server
- **URL**: http://localhost:3001
- **Status**: Running
- **Framework**: Vite + React

## 📡 API Endpoints

### 1. Health Check
```
GET http://localhost:5000/health
```
Returns: `{ "status": "ok", "message": "VOCODE API is running" }`

### 2. Test Endpoint
```
GET http://localhost:5000/api/test
```
Returns: `{ "message": "Backend is working!", "timestamp": "..." }`

### 3. Generate Code
```
POST http://localhost:5000/api/code-generate
Body: {
  "plan": { id, name, description, style, sections },
  "refinedIdea": { rawIdea, websiteType, purpose, ... }
}
```
Returns: `{ "code": "HTML code", "description": "..." }`

### 4. Edit Code
```
POST http://localhost:5000/api/edit
Body: {
  "currentCode": "existing HTML",
  "editRequest": "what to change"
}
```
Returns: `{ "code": "updated HTML", "changes": "..." }`

### 5. Download Project
```
POST http://localhost:5000/api/download
Body: { "code": "HTML code" }
```
Returns: ZIP file blob

## 🔄 User Flow

1. **Chat Page** → User enters their website idea
2. **Plan Selection Page** → User chooses design style (Minimal, Modern, or Professional)
3. **Editor Page** → 
   - Frontend calls `/api/code-generate` with selected plan
   - Backend uses Gemini AI to generate complete HTML website
   - Loading screen shows "Building your website..."
4. **Preview Page** → 
   - Shows generated website in iframe
   - User can click "Code" to see the HTML
   - User can edit via AI Editor sidebar
   - User can download the project
5. **Code View Page** →
   - Shows the HTML code
   - User can click "Preview" to go back
   - User can edit and download

## 🔧 Configuration

### Environment Variables (.env)
```
VITE_GEMINI_API_KEY=AIzaSyCRaZqmZZcaoi_RL60_M9l4MtrBdrzlXZ0
VITE_API_URL=http://localhost:5000
PORT=5000
```

### API Service (src/services/api.js)
- Automatically uses `VITE_API_URL` from environment
- Falls back to `http://localhost:5000` if not set
- Includes error handling and logging

## 🎨 What Gets Generated

The backend generates:
- Complete HTML page with embedded CSS
- Tailwind CSS via CDN
- Responsive design
- Modern animations and transitions
- All requested sections (Hero, Features, Gallery, Contact, etc.)
- Navigation menu
- Footer
- Placeholder content matching the theme

## 🐛 Troubleshooting

### Backend not responding
1. Check if backend is running: `http://localhost:5000/health`
2. Check console for errors
3. Verify Gemini API key is valid
4. Restart backend: Stop terminal and run `node index.js`

### Frontend can't connect
1. Check if frontend is running: `http://localhost:3001`
2. Verify VITE_API_URL in .env
3. Check browser console for CORS errors
4. Restart frontend: Stop terminal and run `npm run dev`

### Gemini API errors
1. Verify API key is correct in .env
2. Check if model name is correct (gemini-1.5-flash)
3. Check API quota/limits
4. Review backend console logs

## 📝 Recent Changes

1. ✅ Updated Gemini model from `gemini-pro` to `gemini-1.5-flash`
2. ✅ Improved code generation prompts for better HTML output
3. ✅ Added proper error handling and logging
4. ✅ Connected EditorPage to backend API
5. ✅ Added view switching between Preview and Code
6. ✅ Implemented AI editing functionality

## 🎯 Next Steps

To test the full flow:
1. Open http://localhost:3001 in your browser
2. Navigate to "How It Works" page
3. Enter a website idea in the chat (e.g., "Create a portfolio website for a photographer")
4. Click Send
5. Choose a design plan (Minimal, Modern, or Professional)
6. Wait for the website to generate
7. View the preview, switch to code view, or download

The backend will use Gemini AI to generate a complete, working website based on your idea and selected design style!
