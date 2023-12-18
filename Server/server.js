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
const GAMESHIFT_API_KEY = process.env.GAMESHIFT_API_KEY; // Use environment variable for API key

const GAMESHIFT_API_URL = 'https://api.gameshift.dev';

// User registration endpoint
app.post('/register', async (req, res) => {
  const { email } = req.body;
  const referenceId = uuidv4();

  try {
    const response = await axios.post(`${GAMESHIFT_API_URL}/users`, {
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

// Endpoint to create GameShift assets
app.post('/createGameShiftAssets', async (req, res) => {
  const { referenceId, skaterMetadata, skateboardMetadata } = req.body;

  try {
    // Function to create a GameShift asset
    const createGameShiftAsset = async (metadata, collectionId) => {
      const assetResponse = await axios.post(`${GAMESHIFT_API_URL}/assets`, {
        details: {
          description: metadata.description,
          imageUrl: metadata.sourceImage,
          name: metadata.name,
          attributes: metadata.attributes
        },
        destinationUserReferenceId: referenceId,
        collectionId: collectionId
      }, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'x-api-key': GAMESHIFT_API_KEY
        }
      });

      return assetResponse.data;
    };

    // Create Skater asset
    const skaterAsset = await createGameShiftAsset(skaterMetadata, 'e6c74a89-6a2d-4acf-a7b4-f79e7bb56f32'); // Skater collection ID

    // Create Skateboard asset
    const skateboardAsset = await createGameShiftAsset(skateboardMetadata, '3e0bd7ea-38ad-4674-bfab-a726b5561385'); // Skateboard collection ID

    res.json({ skaterAsset, skateboardAsset });
  } catch (error) {
    console.error('Error in /createGameShiftAssets:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
