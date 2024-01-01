import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ParkIcon from '@mui/icons-material/Park';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';
import { useAuth } from '../AuthContext';
import { ActiveTabContext } from '../ActiveTabContext';

function Header() {
  const { isUserCreated, changeActiveTab } = useContext(ActiveTabContext);
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/Skate-Stake-Logo-Main.svg?alt=media&token=e2ac22da-2f29-4a13-b5f0-385b1d0e41a7";

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

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleMobileDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, onClick: () => changeActiveTab('home') },
    ...(isUserCreated ? [{ text: 'My Skaters', icon: <PersonIcon />, onClick: () => changeActiveTab('mySkater') }] : []),
    { text: 'Tournaments', icon: <EventIcon />, onClick: () => console.log('Tournaments clicked') },
    { text: 'Skate Parks', icon: <ParkIcon />, onClick: () => console.log('Skate Parks clicked') },
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250, bgcolor: 'black' }} // Set the width and background color of the drawer
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      open={drawerOpen}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={index} 
            onClick={item.onClick}
            sx={{
                backgroundColor: '#FED700',
                margin: '5px',
                color: 'black',
                '&:hover': {
                backgroundColor: '#fdd835', // Slightly darker yellow on hover
              },
            }}
          >
            <ListItemIcon sx={{ color: 'black' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: 'black' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Hamburger menu icon for mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileDrawer(true)}
          sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <img src={logoUrl} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
        <Box sx={{ flexGrow: 1 }} /> 
        {user ? (
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Account: {user.email}</MenuItem>
              <MenuItem onClick={() => { handleClose(); logout(); }}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Button 
              color="inherit" 
              onClick={handleOpenSignUpModal}
              sx={{
                backgroundColor: '#FED700',
                borderRadius: '0',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#fdd835', // Slightly darker yellow on hover
                },
                marginRight: '8px', // Optional: adds some space between the buttons
              }}
            >
              Sign Up
            </Button>
            <Button 
              color="inherit" 
              onClick={handleOpenSignInModal}
              sx={{
                backgroundColor: '#FED700',
                borderRadius: '0',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#fdd835', // Slightly darker yellow on hover
                },
              }}
            >
              Sign In
            </Button>
          </>
        )}
      </Toolbar>
      <SignUpModal isOpen={isSignUpModalOpen} onClose={handleCloseSignUpModal} />
      <SignInModal isOpen={isSignInModalOpen} onClose={handleCloseSignInModal} />
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawerContent}
      </Drawer>
      
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, bgcolor: 'black', top: 64 }, // Adjust top position
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );  
}

export default Header;
