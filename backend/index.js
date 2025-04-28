const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('audio'), (req, res) => {
    const audioPath = req.file.path;

    exec(`python transcribe.py ${audioPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            console.error(stderr);
            return res.status(500).json({ error: 'Error transcribing audio' }); // ✅ important: return JSON
        }

        try {
            res.json({ transcript: stdout.trim() }); // ✅ send transcript as JSON
        } catch (jsonError) {
            console.error('Error converting output to JSON:', jsonError.message);
            res.status(500).json({ error: 'Error returning transcription result' });
        }
    });
});

app.get('/', (req, res) => {
  res.send('Backend is running 👋');
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
