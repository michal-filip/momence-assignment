const express = require('express');
const https = require('https');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Simple proxy endpoint for CNB
app.get('/rates', (req, res) => {
  https
    .get(
      'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt',
      (proxyRes) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.set(
          'Content-Type',
          proxyRes.headers['content-type'] || 'text/plain',
        );
        proxyRes.pipe(res);
      },
    )
    .on('error', (err) => {
      res.status(500).send('Proxy error: ' + err.message);
    });
});

// For any other route, serve index.html (SPA fallback)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
