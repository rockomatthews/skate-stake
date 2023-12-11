const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Environment variables
const PORT = process.env.PORT || 3001;
const GAMESHIFT_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0MDVkYzlhYi03YWU5LTQ0NzQtOGUxYy03Mjg3YWNhMWNhZmEiLCJzdWIiOiJkOWEwMTRhNy1kNDIwLTRkZWUtODdjNS1jNmFjZDljMmFjZWQiLCJpYXQiOjE3MDE3MjUzMTF9.i9YuYTvZ-_d8MnOgxNQWFQM12unJNnLDfSG5GSvrqBU'; // Replace with your actual GameShift API key
const GAMESHIFT_API_URL = 'https://api.gameshift.dev/users';

// User registration endpoint
app.post('/register', async (req, res) => {
  const { email } = req.body; // Only get email from the request body
  const referenceId = uuidv4(); // Generate a unique referenceId

  try {
    const response = await axios.post(GAMESHIFT_API_URL, {
      referenceId,
      email
    }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-key': GAMESHIFT_API_KEY
      }
    });

    res.json({ ...response.data, referenceId });
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
