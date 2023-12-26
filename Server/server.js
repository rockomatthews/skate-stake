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
  const referenceId = uuidv4(); // Generate a unique referenceId for the user

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

    res.json({ 
      message: 'User registration successful', 
      gameShiftUserData
    });
  } catch (error) {
    console.error('Error in /registerUser:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
