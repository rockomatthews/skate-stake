const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');


const admin = require('firebase-admin');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GAMESHIFT_API_KEY = process.env.GAMESHIFT_API_KEY;
console.log('GameShift API KEY:', process.env.GAMESHIFT_API_KEY);
console.log('FIREBASE_SERVICE_ACCOUNT:', process.env.FIREBASE_SERVICE_ACCOUNT);
const FIREBASE_SERVICE_ACCOUNT = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(FIREBASE_SERVICE_ACCOUNT)
});



// Skater and Skateboard metadata
const skaterMetadata = {
  "name": "Skater00",
  "description": "The Architect Skater",
  "imageUrl": "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/skater00.gif?alt=media&token=2bb8ce62-bc0d-48f5-8d3f-efc93b5218c6",
  "collectionId": "e6c74a89-6a2d-4acf-a7b4-f79e7bb56f32",
  "attributes": [
    {
      "trait_type": "Attitude",
      "value": "Interested"
    },
    {
      "trait_type": "Adrenaline Boost",
      "value": "00%"
    },
    {
      "trait_type": "Age",
      "value": "14"
    },
    {
      "trait_type": "Stamina",
      "value": "Low"
    },
    {
      "category": "Flips",
      "traits": [
        {
          "trait_type": "Backflip Success Rate",
          "value": "00%"
        }
      ]
    },
    {
      "category": "Spins",
      "traits": [
        {
          "trait_type": "180 Spin Success Rate",
          "value": "00%"
        }
      ]
    },
    {
      "category": "Board Flips",
      "traits": [
        {
          "trait_type": "Kickflip Success Rate",
          "value": "00%"
        }
      ]
    },
    {
      "category": "Grabs",
      "traits": [
        {
          "trait_type": "Nosegrab Success Rate",
          "value": "00%"
        }
      ]
    }
  ]
};

const skateboardMetadata = {
  "name": "Skateboard00",
  "description": "A free skateboard",
  "imageUrl": "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/skateboard00.gif?alt=media&token=48cfe199-369b-42b7-bab7-f3f85cdd091e",
  "collectionId": "3e0bd7ea-38ad-4674-bfab-a726b5561385",
  "attributes": [
    {
      "trait_type": "Learning Multiplier",
      "value": "1"
    },
    {
      "trait_type": "Speed",
      "value": "slow"
    }
  ]
};

// Function to create GameShift asset
async function createGameShiftAsset(referenceId, metadata) {
  try {
    const response = await fetch('https://api.gameshift.dev/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'x-api-key': GAMESHIFT_API_KEY
      },
      body: JSON.stringify({
        details: {
          name: metadata.name,
          description: metadata.description,
          imageUrl: metadata.imageUrl,
          attributes: metadata.attributes
        },
        destinationUserReferenceId: referenceId,
        collectionId: metadata.collectionId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create GameShift asset for ${metadata.name}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in createGameShiftAsset for ${metadata.name}:`, error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

// Endpoint to handle user registration
app.post('/registerUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await getAuth().createUser({
      email: email,
      password: password
    });

    const referenceId = userRecord.uid; // Use Firebase UID as referenceId

    // Register user with GameShift
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
      throw new Error('GameShift registration failed');
    }

    const gameShiftUserData = await gameShiftUserResponse.json();
    const walletAddress = gameShiftUserData.address;

    // Save user data in Firestore
    await admin.firestore().collection('users').doc(referenceId).set({
      email: email,
      createdAt: new Date(),
      walletAddress: walletAddress
    });

    res.json({ message: 'User registration successful', userRecord, gameShiftUserData });
  } catch (error) {
    console.error('Error in /registerUser:', error);
    res.status(500).json({ error: error.message });
  }
});

// New endpoint to create GameShift assets
app.post('/createGameShiftAssets', async (req, res) => {
  const { referenceId } = req.body;

  try {
    // Create GameShift assets
    const skaterAsset = await createGameShiftAsset(referenceId, skaterMetadata);
    const skateboardAsset = await createGameShiftAsset(referenceId, skateboardMetadata);

    res.json({ skaterAsset, skateboardAsset });
  } catch (error) {
    console.error('Error in /createGameShiftAssets:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







