import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

function SignUpModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send only email and password
      });

      const data = await response.json();
      console.log('Registration successful:', data);
      onClose(); // Close the modal on successful registration
      // Additional success handling here
    } catch (error) {
      console.error('Registration error:', error);
      // Error handling here
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ /* Your modal styling here */ }}>
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
          {/* Include other sign-up options if needed */}
        </Box>
      </Box>
    </Modal>
  );
}

export default SignUpModal;
