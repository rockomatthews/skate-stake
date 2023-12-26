import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

function PasswordModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Handle password submission logic here
    // For now, we'll just call onSuccess
    onSuccess();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h6">Set Your Password</Typography>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default PasswordModal;
