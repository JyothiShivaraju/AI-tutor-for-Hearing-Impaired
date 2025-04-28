import React, { useState } from 'react';
import logo from './logo.png';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // Chatbot toggle state

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', selectedFile);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTranscript(data.transcript);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-blue-200 text-gray-800'}`}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="flex items-center justify-center gap-4 mb-8 animate-fadeIn">
          <img src={logo} alt="Logo" className="h-16 rounded-full shadow-lg" />
          <h1 className="text-4xl font-bold">AI Tutor for Hearing-Impaired</h1>
        </header>

        <div className="flex justify-center mb-6">
          <button
            className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8 animate-fadeIn">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full max-w-lg border-2 border-dashed border-yellow-400 p-4 rounded-xl bg-white dark:bg-gray-800 transition"
          />
          <button
            onClick={handleUpload}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 shadow-md transition duration-300"
          >
            Upload & Transcribe
          </button>
        </div>

        {loading && (
          <p className="text-center text-blue-600 font-medium text-lg animate-pulse">
            Transcribing audio... ⏳
          </p>
        )}

        {transcript && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto mb-8 animate-fadeInSlow">
            <h2 className="text-2xl font-semibold mb-3">📝 Transcript</h2>
            <p className="text-lg leading-relaxed">{transcript}</p>
          </div>
        )}
      </div>

      
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          💬 Chat
        </button>

        {chatOpen && (
          <div className="mt-3 w-80 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <iframe
    allow="microphone;"
    width="350"
    height="430"
    src="https://console.dialogflow.com/api-client/demo/embedded/f9b26df7-34f4-4cb1-859f-1c50da9cc7df">
</iframe>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;