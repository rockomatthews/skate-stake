const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Initialize the GameShift API
const sdk = require('api')('@gameshift/v1.0#ffmg2jlpwuu3b4');

// Environment variables
const PORT = process.env.PORT || 3001;

// User registration endpoint
app.post('/register', (req, res) => {
  const { referenceId, email } = req.body;

  sdk.projectUserController_create({ referenceId, email })
    .then(({ data }) => res.json(data))
    .catch(err => {
      console.error('Error in /register:', err);
      res.status(500).json({ error: err.message });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
