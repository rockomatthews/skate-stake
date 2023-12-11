import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useAuth } from '../AuthContext';


function SignUpModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); // Use the login function
    

  const handleSignUp = async (event) => {
      event.preventDefault();
      if (!email ) {
        setErrorMessage('');
        return;
      }
      setSuccessMessage('');
    
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send only email
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccessMessage('Registration successful!');
        setEmail('');
        login(); 
      } else {
        setErrorMessage(`Registration failed: ${data.error}`);
      }
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
        width: { xs: '90%', sm: '400px' }, // Responsive width
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4, // Padding around the content
        borderRadius: 2, // Optional: for rounded corners
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
            {successMessage && <Typography color="green">{successMessage}</Typography>}
            {errorMessage && <Typography color="red">{errorMessage}</Typography>}
        </Box>
      </Box>
    </Modal>
  );
}

export default SignUpModal;
