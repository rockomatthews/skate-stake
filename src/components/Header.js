import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ParkIcon from '@mui/icons-material/Park';
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import LandscapeIcon from '@mui/icons-material/Landscape';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChatIcon from '@mui/icons-material/Chat';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';
import { useAuth } from '../AuthContext';
import { ActiveTabContext } from '../ActiveTabContext';
import { useTheme } from '@mui/material/styles';


function Header() {
  const theme = useTheme();
  const { changeActiveTab } = useContext(ActiveTabContext);
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/header-logo1000%20px.svg?alt=media&token=f8528fc3-37c0-48aa-aa5a-dcfc4856960e";

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
    ...(user ? [{ text: 'My Skaters', icon: <PersonIcon />, onClick: () => changeActiveTab('mySkater') }] : []),
    { text: 'Free Rides', icon: <LandscapeIcon />, onClick: () => console.log('Free Rides clicked') },
    { text: 'Tournaments', icon: <EventIcon />, onClick: () => console.log('Tournaments clicked') },
    { text: 'Play S-K-A-T-E', icon: <SkateboardingIcon />, onClick: () => console.log('Play S-K-A-T-E clicked') },
    { text: 'Skate Parks', icon: <ParkIcon />, onClick: () => console.log('Skate Parks clicked') },
    { text: 'Hospital', icon: <LocalHospitalIcon />, onClick: () => console.log('Hospital clicked') },
    { text: 'Mating', icon: <FavoriteIcon />, onClick: () => console.log('Mating clicked') },
    { text: 'Marketplace', icon: <StorefrontIcon />, onClick: () => console.log('Marketplace clicked') },
    { text: 'Stats', icon: <BarChartIcon />, onClick: () => console.log('Stats clicked') },
    { text: '$MEDAL', icon: <EmojiEventsIcon />, onClick: () => console.log('$MEDAL clicked') },
    { text: 'News', icon: <NewspaperIcon />, onClick: () => console.log('News clicked') },
    { text: 'Learn to Play', icon: <SchoolIcon />, onClick: () => console.log('Learn to Play clicked') },
    { text: 'Account', icon: <AccountCircleIcon />, onClick: () => console.log('Account clicked') },
    { text: 'Logout', icon: <ExitToAppIcon />, onClick: () => { handleClose(); logout(); } },
    { text: 'Discord', icon: <ChatIcon />, onClick: () => console.log('Discord clicked') },
    { text: 'Tech Support', icon: <SupportAgentIcon />, onClick: () => console.log('Tech Support clicked') },
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250, bgcolor: theme.palette.primary.light }} // Set the width and background color of the drawer
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
                color: theme.palette.primary.light,
                '&:hover': {
                backgroundColor: '#fdd835', // Slightly darker yellow on hover
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.light }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: theme.palette.primary.light }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" style={{ 
      backgroundColor: theme.palette.primary.light,
      zIndex: 1100, // Higher than MainContent
      position: 'relative' // To make z-index effective
  }}>
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
        style={{ backgroundColor: theme.palette.primary.light }}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawerContent}
      </Drawer>
      
      <Drawer
        variant="permanent"
        style={{ backgroundColor: theme.palette.primary.light }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, top: 64 }, // Adjust top position
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );  
}

export default Header;
