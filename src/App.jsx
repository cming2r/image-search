import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [status, setStatus] = useState('');

  const search = (engine) => {
    const finalUrl = url || uploadedUrl;
    if (!finalUrl) {
      setStatus('請輸入網址或上傳圖片！');
      return;
    }
    if (engine === 'google') {
      window.open(`https://www.google.com/searchbyimage?&image_url=${finalUrl}`);
    } else if (engine === 'bing') {
      window.open(`https://www.bing.com/images/search?view=detailv2&mediaurl=${finalUrl}`);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus('上傳中...');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/upload', { // 這裡先用相對路徑，後面會綁定 Workers
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
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>圖片搜尋工具</h1>
      <input
        type="text"
        placeholder="貼上圖片網址"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '300px', padding: '5px', margin: '10px' }}
      />
      <br />
      <input type="file" accept="image/*" onChange={handleUpload} style={{ margin: '10px' }} />
      <br />
      <button onClick={() => search('google')} style={{ padding: '5px 10px', margin: '5px' }}>
        Google 搜尋
      </button>
      <button onClick={() => search('bing')} style={{ padding: '5px 10px', margin: '5px' }}>
        Bing 搜尋
      </button>
      <p>{status}</p>
    </div>
  );
}

export default App;