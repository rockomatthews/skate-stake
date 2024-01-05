import React, { useState, useContext } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ActiveTabContext } from '../ActiveTabContext';
import { useAuth } from '../AuthContext';

function SignUpModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add a state for password
  const [errorMessage, setErrorMessage] = useState('');
  const { setActiveTabDirectly, setIsUserCreated } = useContext(ActiveTabContext);
  const { login } = useAuth();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }
    setErrorMessage('');

    try {
      // Create user in Firebase Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUserId = userCredential.user.uid;

      // Proceed to register the user in GameShift using the Firebase UID
      await registerUserInGameShift(firebaseUserId, email);

      setIsUserCreated(true);
      setActiveTabDirectly('mySkater');
      onClose(); // Close the modal
      login(userCredential.user); // Update the authentication state

      console.log("Firebase and GameShift User Created:", firebaseUserId);
    } catch (error) {
      setErrorMessage(`Registration error: ${error.message}`);
    }
  };

  // Function to register user in GameShift
  const registerUserInGameShift = async (firebaseUserId, email) => {
    try {
      // const response = await fetch('https://skate-stake.onrender.com/registerUser', {
        const response = await fetch('http://localhost:3001/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ referenceId: firebaseUserId, email })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to register with GameShift');
      }
      // Handle the response as needed
    } catch (error) {
      console.error('Error registering user in GameShift:', error);
      throw error; // Rethrow to be handled in the calling function
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
          {/* Email input */}
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
          {/* Password input */}
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
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </Box>
      </Box>
    </Modal>
  );
}

export default SignUpModal;
