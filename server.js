const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Search anime (Jikan API)
app.get('/api/anime/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch anime info.' });
  }
});

// Get anime streaming links (Consumet/Gogoanime)
app.get('/api/anime/:id/streams', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.consumet.org/anime/gogoanime/info/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch streaming links.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
