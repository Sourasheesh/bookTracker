const express = require('express');
const cors = require('cors');

// Dynamic import of node-fetch for CommonJS compatibility
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3000;

// Your Google Books API key
const apiKey = 'AIzaSyB8ZyQEvENjRC9gb8phWu48NmtsNJwbycs';  // <-- Add your API key here

app.use(cors());
app.use(express.json());

// Endpoint to handle search request
app.get('/api/books', async (req, res) => {
  const query = req.query.q;  // The search term from the frontend
  
  try {
    // Fetch data from the Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
    const data = await response.json();
    
    // Return the API data to the frontend
    res.json(data);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
