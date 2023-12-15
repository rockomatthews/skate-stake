import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SignUpModal from './SignUpModal'; // Import SignUpModal
import SignInModal from './SignInModal'; // Import SignInModal
import { useAuth } from '../AuthContext'; // Import useAuth

function Header() {
  const { isAuthenticated, logout } = useAuth(); // Use isAuthenticated and logout from AuthContext
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State for SignUpModal
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); // State for SignInModal
  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleOpenSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const handleCloseSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
          SKATE STAKE
        </Typography>
        {isAuthenticated ? (
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Account</MenuItem>
              <MenuItem onClick={() => { handleClose(); logout(); }}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Button color="inherit" onClick={handleOpenSignUpModal}>Sign Up</Button>
            <Button color="inherit" onClick={handleOpenSignInModal}>Sign In</Button>
          </>
        )}
      </Toolbar>
      <SignUpModal isOpen={isSignUpModalOpen} onClose={handleCloseSignUpModal} />
      <SignInModal isOpen={isSignInModalOpen} onClose={handleCloseSignInModal} />
    </AppBar>
  );
}

export default Header;
