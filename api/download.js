
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/download', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  const cmd = `yt-dlp -f best -o - "${url}"`;
  exec(cmd, { encoding: 'buffer', maxBuffer: 1024 * 1024 * 50 }, (err, stdout, stderr) => {
    if (err) return res.status(500).send('Erro ao baixar vídeo');
    res.setHeader('Content-Type', 'video/mp4');
    res.send(stdout);
  });
});

module.exports = app;
