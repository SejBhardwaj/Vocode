import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('🔍 Testing available Gemini models...\n');
    
    const modelsToTest = [
      'gemini-1.5-pro-latest',
      'gemini-1.5-pro',
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash',
      'gemini-pro',
      'gemini-1.0-pro',
      'gemini-1.0-pro-latest'
    ];
    
    for (const modelName of modelsToTest) {
      try {
        console.log(`Testing: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say "Hello"');
        const response = await result.response;
        const text = response.text();
        console.log(`✅ ${modelName} - WORKS! Response: ${text.substring(0, 50)}\n`);
      } catch (error) {
        console.log(`❌ ${modelName} - FAILED: ${error.message}\n`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();
