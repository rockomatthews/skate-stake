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

app.post('/asset', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is missing' });
  }

  try {
    // Fetch the user's referenceId from Firestore using email
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (userSnapshot.empty) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userSnapshot.docs[0].data();
    const userReferenceId = userData.referenceId;

    const assetResponse = await createGameShiftAsset(userReferenceId);
    console.log('Asset creation response from GameShift:', assetResponse);
    // Poll asset status until it's committed
    const committedAsset = await pollAssetStatusUntilCommitted(assetResponse.id);
    console.log('Committed Asset:', committedAsset);

    // Once committed, store asset information in Firestore
    const assetData = {
      ...committedAsset,
      ownerReferenceId: userReferenceId,
    };
    await db.collection('assets').doc(committedAsset.id).set(assetData);

    res.json({ message: 'Skater asset created successfully', assetData });
  } catch (error) {
    console.error('Error in /asset:', error);
    res.status(500).json({ error: error.toString() });
  }
});

async function pollAssetStatusUntilCommitted(assetId) {
  let assetStatus = '';
  let assetData = {};

  while (assetStatus !== 'Committed') {
    const response = await fetch(`https://api.gameshift.dev/assets/${assetId}`, {
      headers: { 'x-api-key': GAMESHIFT_API_KEY }
    });
    const asset = await response.json();
    assetStatus = asset.status;
    assetData = asset;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2 seconds
  }

  return assetData;
}



// Function to handle GameShift API interaction for asset creation
async function createGameShiftAsset(referenceId) {
  const skaterMetadata = {
    details: {
      "name": "Skater00",
      "description": "The Architect Skater",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/skater00.gif?alt=media&token=2bb8ce62-bc0d-48f5-8d3f-efc93b5218c6",
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
          "value": "0"
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
    },
    "destinationUserReferenceId": referenceId
  };

  console.log('Sending request to GameShift with the following data:', skaterMetadata);

  const assetCreationResponse = await fetch('https://api.gameshift.dev/assets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'x-api-key': GAMESHIFT_API_KEY
    },
    body: JSON.stringify(skaterMetadata)
  });

  const responseText = await assetCreationResponse.text();
  console.log('Response from GameShift:', responseText);

  if (!assetCreationResponse.ok) {
    throw new Error(`GameShift asset creation failed: ${responseText}`);
  }

  return JSON.parse(responseText);
}

app.get('/getUserAssets', async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is missing' });
  }

  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (userSnapshot.empty) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userReferenceId = userSnapshot.docs[0].data().referenceId;

    const assetsSnapshot = await db.collection('assets').where('ownerReferenceId', '==', userReferenceId).get();
    if (assetsSnapshot.empty) {
      return res.json({ assets: [] }); // No assets found for this user
    }

    const assets = assetsSnapshot.docs.map(doc => doc.data());
    res.json({ assets }); // Return the assets associated with this user
  } catch (error) {
    console.error('Error in /getUserAssets:', error);
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/pollAssetStatus', async (req, res) => {
  const { assetId } = req.query;
  if (!assetId) {
    return res.status(400).json({ error: 'Asset ID is missing' });
  }

  try {
    const response = await fetch(`https://api.gameshift.dev/assets/${assetId}`, {
      headers: { 'x-api-key': GAMESHIFT_API_KEY }
    });

    if (!response.ok) {
      throw new Error('Failed to poll asset status');
    }

    const asset = await response.json();
    res.json(asset);
  } catch (error) {
    console.error('Error polling asset status:', error);
    res.status(500).json({ error: error.toString() });
  }
});


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});