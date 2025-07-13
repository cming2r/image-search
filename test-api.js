const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testAPI() {
  try {
    // 創建一個小的測試圖片文件
    const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64');
    
    const formData = new FormData();
    formData.append('file', testImageBuffer, {
      filename: 'test.png',
      contentType: 'image/png'
    });

    console.log('Testing /api/image-url endpoint...');
    
    const response = await fetch('http://localhost:3000/api/image-url', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    
    const text = await response.text();
    console.log('Response body:', text);
    
    if (response.ok) {
      const result = JSON.parse(text);
      console.log('Success:', result);
    } else {
      console.log('Error response');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testAPI();