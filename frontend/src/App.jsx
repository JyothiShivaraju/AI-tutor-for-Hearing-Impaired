import React, { useState } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setTranscript(data.transcript);
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };
  <img src={logo} alt="Logo" className="logo" />

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">🎧 AI Tutor for Hearing-Impaired</h1>

        <label className="block mb-4 text-lg font-medium text-gray-700">
          Upload Audio File:
        </label>

        <input
          type="file"
          onChange={handleUpload}
          className="mb-6 p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
        />

        {transcript && (
          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📄 Transcript:</h2>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;