const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files (like index.html, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Route for serving the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Optional: Add more routes if needed later
// app.get('/api/test', (req, res) => { res.json({ msg: 'API is working!' }); });

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});