require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://skate-stake-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GAMESHIFT_API_KEY = process.env.GAMESHIFT_API_KEY;

app.post('/registerUser', async (req, res) => {
  const { referenceId, email } = req.body; // Use referenceId and email from the request

  try {
    // Register the user in GameShift using the Firebase UID (referenceId) and email
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

    // Save the GameShift user data along with Firebase UID in Firestore
    const userRef = db.collection('users').doc(referenceId);
    await userRef.set({
      email: email,
      address: gameShiftUserData.address, // Assuming address is part of the GameShift response
      referenceId: referenceId
      // Other fields can be added as needed
    });

    res.json({ 
      message: 'User registration successful', 
      gameShiftUserData
    });
  } catch (error) {
    console.error('Error in /registerUser:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/createSkaterAsset', async (req, res) => {
  const { referenceId } = req.body;

  try {
    // Logic to interact with GameShift API for asset creation
    const assetResponse = await createGameShiftAsset(referenceId);

    // Optionally update Firestore database with new asset info
    // ...

    res.json({ message: 'Skater asset created successfully', assetResponse });
  } catch (error) {
    console.error('Error in /createSkaterAsset:', error);
    res.status(500).json({ error: error.message });
  }
});

// Function to handle GameShift API interaction for asset creation
async function createGameShiftAsset(referenceId) {
  // Replace with the actual metadata and GameShift API endpoint
  const metadata = {
  "name": "Skater00",
  "description": "The Architect Skater",
  "imageUrl": "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/skater00.gif?alt=media&token=2bb8ce62-bc0d-48f5-8d3f-efc93b5218c6",
  "collectionId": "e6c74a89-6a2d-4acf-a7b4-f79e7bb56f32",
  "attributes": [
      {
        "displayType": "Adrenaline Boost",
        "traitType": "adrenaline_boost",
        "value": "20"
      },
      {
        "displayType": "Age",
        "traitType": "age",
        "value": "14"
      },
      {
        "displayType": "Stamina Multiplier",
        "traitType": "stamina_multiplier",
        "value": "1.2"
      },
      {
        "displayType": "Ollie",
        "traitType": "ollie",
        "value": "80"
      },
      {
        "displayType": "Backflip Success Rate",
        "traitType": "backflip_success_rate",
        "value": "00"
      },
      {
        "displayType": "180 Success Rate",
        "traitType": "180_success_rate",
        "value": "0"
      },
      {
        "displayType": "Kickflip Success Rate",
        "traitType": "kickflip_success_rate",
        "value": "0"
      },
      {
        "displayType": "Nosegrab Success Rate",
        "traitType": "nosegrab_success_rate",
        "value": "0"
      }
    ]
  };

  const assetCreationResponse = await fetch('https://api.gameshift.dev/assetd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'x-api-key': GAMESHIFT_API_KEY
    },
    body: JSON.stringify({ referenceId, ...metadata })
  });

  if (!assetCreationResponse.ok) {
    const errorDetail = await assetCreationResponse.text();
    throw new Error(`GameShift asset creation failed: ${errorDetail}`);
  }

  return assetCreationResponse.json();
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
