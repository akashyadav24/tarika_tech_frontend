const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Routes
app.use(cors());
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 5000;

// Start the server only when running the application (not during tests)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export the app for testing