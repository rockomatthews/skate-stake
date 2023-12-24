import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

function SignUpModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!email) {
      setErrorMessage('Email is required');
      return;
    }
    setErrorMessage('');

    try {
      // Send request to your server to register the user with GameShift and create assets
      const response = await fetch('http://localhost:3001/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })  // Send only email, server will handle the rest
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to register with GameShift');
      }

      const result = await response.json();
      console.log("GameShift User and Assets Created:", result);
      onClose(); // Close the modal on successful registration
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
