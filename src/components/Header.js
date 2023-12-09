import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SignUpModal from './SignUpModal'; 

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Stake Skate
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit" onClick={handleOpenModal}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </AppBar>
  );
}

export default Header;
