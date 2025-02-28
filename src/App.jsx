import { useState } from 'react';
import './App.css';

function App() {
  const [inputUrl, setInputUrl] = useState(''); // 貼上的圖片網址
  const [uploadedUrl, setUploadedUrl] = useState(''); // 上傳後的圖片網址
  const [status, setStatus] = useState(''); // 顯示狀態訊息

  // 搜尋功能
  const search = (engine) => {
    const url = inputUrl || uploadedUrl;
    if (!url) {
      setStatus('請輸入圖片網址或上傳圖片！');
      return;
    }
    if (engine === 'google') {
      window.open(`https://www.google.com/searchbyimage?&image_url=${url}`, '_blank');
    } else if (engine === 'bing') {
      window.open(`https://www.bing.com/images/search?view=detailv2&mediaurl=${url}`, '_blank');
    }
  };

  // 上傳圖片到 Workers
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus('上傳中...');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://你的WORKERS_URL.workers.dev/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        setUploadedUrl(data.url);
        setStatus(`上傳成功！網址: ${data.url}`);
      } else {
        setStatus('上傳失敗，請再試一次。');
      }
    } catch (error) {
      setStatus(`錯誤: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>圖片搜尋工具</h1>
      <input
        type="text"
        placeholder="貼上圖片網址"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleUpload} />
      <div className="buttons">
        <button onClick={() => search('google')}>Google 搜尋</button>
        <button onClick={() => search('bing')}>Bing 搜尋</button>
      </div>
      <p>{status}</p>
    </div>
  );
}

export default App;