const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for all responses
app.use(compression());

// Serve static files with aggressive caching for assets
app.use('/images', express.static(path.join(__dirname, 'public/images'), {
  maxAge: '30d',
  immutable: true
}));

// Serve the main HTML with shorter cache
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h'
}));

// Fallback to index.html for all routes (SPA-style)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Knot Your Bag server running on port ${PORT}`);
});
