const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GAMESHIFT_API_KEY = process.env.GAMESHIFT_API_KEY;

app.post('/registerUser', async (req, res) => {
  const { email } = req.body;
  const referenceId = uuidv4(); // Generate a unique referenceId

  try {
    const gameShiftUserResponse = await fetch('https://api.gameshift.dev/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'x-api-key': GAMESHIFT_API_KEY
      },
      body: JSON.stringify({ referenceId, email })
    });

    if (!gameShiftUserResponse.ok) {
      const errorDetail = await gameShiftUserResponse.text();
      console.error('GameShift API error:', errorDetail);
      throw new Error('GameShift registration failed');
    }

    const gameShiftUserData = await gameShiftUserResponse.json();
    console.log("GameShift user created successfully for:", email);
    res.json({ message: 'User registration successful', gameShiftUserData });
  } catch (error) {
    console.error('Error in /registerUser:', error);
    res.status(500).json({ error: error.message });
  }
});

const skaterMetadata = {
  name: "Skater00",
  description: "The collection of the first",
  collectionId: "e6c74a89-6a2d-4acf-a7b4-f79e7bb56f32",
  // Add any other relevant metadata here
};

const skateboardMetadata = {
  name: "Skateboard00",
  description: "The OG Skateboard",
  collectionId: "3e0bd7ea-38ad-4674-bfab-a726b5561385",
  // Add any other relevant metadata here
};



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
