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
          skaterMetadata: {/* Skater metadata here */},
          skateboardMetadata: {/* Skateboard metadata here */}
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






