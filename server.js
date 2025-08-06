// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch'); // Required for server-side fetch

const app = express();

// Enable CORS for your domain
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files (your HTML, JS, CSS)
app.use(express.static(path.join(__dirname)));

// Proxy API route
app.post('/api/submit', async (req, res) => {
  try {
    const { full_name, email, mobile_number, service_interest, message } = req.body;

    // Validate required fields
    if (!full_name || !email || !mobile_number || !service_interest || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Forward to PythonAnywhere
    const response = await fetch('https://webrsolution.pythonanywhere.com/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 068e4b57f9876e6c17c03a00da76ff74'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Serve index.html for all routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});