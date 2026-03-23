import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function testAllModels() {
  console.log('🧪 Testing all Gemini models with generateContent support...\n');
  
  const modelsToTest = [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash',
    'gemini-2.0-flash-001',
    'gemini-2.0-flash-lite-001',
    'gemini-2.0-flash-lite',
    'gemini-flash-latest',
    'gemini-flash-lite-latest',
    'gemini-pro-latest',
    'gemini-2.5-flash-lite',
    'gemini-3-pro-preview',
    'gemini-3-flash-preview',
    'gemini-3.1-pro-preview',
    'gemini-3.1-flash-lite-preview'
  ];
  
  const results = [];
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`\n📦 Testing: ${modelName}`);
      console.log('─'.repeat(60));
      
      const model = genAI.getGenerativeModel({ model: modelName });
      
      // Test prompt
      const prompt = 'Generate a simple HTML button with Tailwind CSS. Just return the HTML code, nothing else.';
      
      const startTime = Date.now();
      const result = await model.generateContent(prompt);
      const endTime = Date.now();
      
      const response = await result.response;
      const text = response.text();
      
      // Count tokens
      const tokenCount = await model.countTokens(prompt);
      
      const responseTime = endTime - startTime;
      
      console.log(`✅ SUCCESS`);
      console.log(`   Response Time: ${responseTime}ms`);
      console.log(`   Input Tokens: ${tokenCount.totalTokens}`);
      console.log(`   Response Length: ${text.length} characters`);
      console.log(`   Response Preview: ${text.substring(0, 100)}...`);
      
      results.push({
        model: modelName,
        status: 'SUCCESS',
        responseTime,
        inputTokens: tokenCount.totalTokens,
        responseLength: text.length,
        preview: text.substring(0, 100)
      });
      
    } catch (error) {
      console.log(`❌ FAILED: ${error.message}`);
      results.push({
        model: modelName,
        status: 'FAILED',
        error: error.message
      });
    }
  }
  
  // Summary
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  
  const successful = results.filter(r => r.status === 'SUCCESS');
  const failed = results.filter(r => r.status === 'FAILED');
  
  console.log(`\n✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}\n`);
  
  if (successful.length > 0) {
    console.log('🏆 WORKING MODELS (sorted by speed):');
    console.log('─'.repeat(80));
    successful
      .sort((a, b) => a.responseTime - b.responseTime)
      .forEach((r, idx) => {
        console.log(`${idx + 1}. ${r.model}`);
        console.log(`   ⚡ Speed: ${r.responseTime}ms`);
        console.log(`   📝 Input Tokens: ${r.inputTokens}`);
        console.log(`   📄 Response: ${r.responseLength} chars`);
        console.log('');
      });
    
    console.log('\n🎯 RECOMMENDED MODELS:');
    console.log('─'.repeat(80));
    const fastest = successful.sort((a, b) => a.responseTime - b.responseTime)[0];
    console.log(`⚡ Fastest: ${fastest.model} (${fastest.responseTime}ms)`);
    
    const gemini25Flash = successful.find(r => r.model === 'gemini-2.5-flash');
    if (gemini25Flash) {
      console.log(`🚀 Best Overall: gemini-2.5-flash (${gemini25Flash.responseTime}ms)`);
    }
    
    const gemini25Pro = successful.find(r => r.model === 'gemini-2.5-pro');
    if (gemini25Pro) {
      console.log(`🧠 Most Powerful: gemini-2.5-pro (${gemini25Pro.responseTime}ms)`);
    }
  }
  
  if (failed.length > 0) {
    console.log('\n\n❌ FAILED MODELS:');
    console.log('─'.repeat(80));
    failed.forEach(r => {
      console.log(`• ${r.model}`);
      console.log(`  Error: ${r.error.substring(0, 100)}...`);
    });
  }
}

testAllModels().catch(console.error);
