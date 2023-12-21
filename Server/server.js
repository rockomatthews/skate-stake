const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GAMESHIFT_API_KEY = process.env.GAMESHIFT_API_KEY;

// Endpoint to create GameShift assets
app.post('/createGameShiftAssets', async (req, res) => {
  const { referenceId, skaterMetadata, skateboardMetadata } = req.body;

  console.log('Received request to create GameShift assets:', req.body);

  try {
    // Create Skater Asset
    console.log('Creating Skater Asset...');
    const skaterResponse = await fetch('https://api.gameshift.dev/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'x-api-key': GAMESHIFT_API_KEY
      },
      body: JSON.stringify({
        details: skaterMetadata,
        destinationUserReferenceId: referenceId
      })
    });

    if (!skaterResponse.ok) {
      throw new Error('Failed to create GameShift skater asset');
    }

    const skaterAsset = await skaterResponse.json();
    console.log('Skater Asset Created:', skaterAsset);

    // Create Skateboard Asset
    console.log('Creating Skateboard Asset...');
    const skateboardResponse = await fetch('https://api.gameshift.dev/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'x-api-key': GAMESHIFT_API_KEY
      },
      body: JSON.stringify({
        details: skateboardMetadata,
        destinationUserReferenceId: referenceId
      })
    });

    if (!skateboardResponse.ok) {
      throw new Error('Failed to create GameShift skateboard asset');
    }

    const skateboardAsset = await skateboardResponse.json();
    console.log('Skateboard Asset Created:', skateboardAsset);

    res.json({ skaterAsset, skateboardAsset });
  } catch (error) {
    console.error('Error in /createGameShiftAssets:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
