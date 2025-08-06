// server.js
const express = require('express');
const path = require('path');
require('dotenv').config(); // npm install dotenv

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// ✅ PROTECTED: API Key is stored in environment, not in frontend
const API_URL = 'https://webrsolution.pythonanywhere.com/api/submit';
const API_KEY = process.env.API_KEY;

// ✅ Proxy endpoint (only backend knows the key)
app.post('/api/submit', async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy failed' });
  }
});

// Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});