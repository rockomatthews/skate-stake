import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function SignUpModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }
    setErrorMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const referenceId = uuidv4(); // Generate a unique reference ID

      // Register user with GameShift
      const gameShiftUserResponse = await fetch('https://api.gameshift.dev/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'x-api-key': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify({ referenceId, email })
      });

      if (!gameShiftUserResponse.ok) {
        throw new Error('GameShift registration failed');
      }

      const gameShiftUserData = await gameShiftUserResponse.json();
      const walletAddress = gameShiftUserData.address;

      // Create GameShift assets
      const createAssetsResponse = await fetch('/createGameShiftAssets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          referenceId,
          skaterMetadata: {
            "name": "Skater00",
            "description": "Skater00 tester",
            "sourceImage": "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/skater00.gif?alt=media&token=2bb8ce62-bc0d-48f5-8d3f-efc93b5218c6",
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
        },
          skateboardMetadata: {
            "name": "Skateboard00",
            "description": "A free skateboard",
            "sourceImage": "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/skateboard00.gif?alt=media&token=48cfe199-369b-42b7-bab7-f3f85cdd091e",
            "collectionId": "3e0bd7ea-38ad-4674-bfab-a726b5561385",
            "attributes": [
              {
                "trait_type": "Learning Multiplier",
                "value": "1"
              },
              {
                "trait_type": "Speed",
                "value": "1"
              }
            ]
        }
                
        })
      });

      if (!createAssetsResponse.ok) {
        throw new Error('Failed to create GameShift assets');
      }

      // Save user data in Firestore
      await addDoc(collection(db, 'users'), {
        email: email,
        createdAt: new Date(),
        referenceId: referenceId,
        walletAddress: walletAddress
      });

      login(userCredential.user);
      onClose(); // Close the modal
    } catch (error) {
      setErrorMessage(`Registration error: ${error.message}`);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '400px' },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h6">Sign Up</Typography>
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          {errorMessage && <Typography color="red">{errorMessage}</Typography>}
        </Box>
      </Box>
    </Modal>
  );
}

export default SignUpModal;






