import React, { useEffect, useState, useCallback } from 'react';
import Settings from './Settings';
import { useMediaQuery } from '@mui/material';
import { useAuth } from '../AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function MySkater() {
  const theme = useTheme();
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [isCreatingAsset, setIsCreatingAsset] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tabStyle = {
    background: theme.palette.primary.yellow,
    color: theme.palette.text.light,
    ...(isMobile && { width: '100%', overflowX: 'auto' }), // Full width and scrollable on mobile
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const redirectToSkateboards = () => {
    setSelectedTab(1); // Set to the index of the Skateboards tab
  };

  const fetchAssets = useCallback(async () => {
    if (!user) return;
    try {
      // const response = await fetch(`http://localhost:3001/getUserAssets?email=${encodeURIComponent(user.email)}`);
      const response = await fetch(`https://skate-stake.onrender.com/getUserAssets?email=${encodeURIComponent(user.email)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }
      const data = await response.json();
      console.log(data);
      setAssets(data.assets);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const handleCreateSkaterAsset = async () => {
    if (!user || isCreatingAsset) return;
    setIsCreatingAsset(true);

    try {
    // const response = await fetch('http://localhost:3001/asset', {
    const response = await fetch('https://skate-stake.onrender.com/asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, assetType: 'skater' }) // Include assetType
    });

      if (!response.ok) {
        throw new Error('Failed to create skater asset');
      }

      console.log('Fetching new list of assets');
      await fetchAssets();
    } catch (error) {
      console.error('Error creating skater asset:', error);
    } finally {
      setIsCreatingAsset(false);
    }
  };

  const handleCreateSkateboardAsset = async () => {
    if (!user || isCreatingAsset) return;
    setIsCreatingAsset(true);

    try {
      const userEmail = user.email;
      // const response = await fetch('http://localhost:3001/asset', {
      const response = await fetch('https://skate-stake.onrender.com/asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, assetType: 'skateboard' }) // Specify asset type
      });

      if (!response.ok) {
        throw new Error('Failed to create skateboard asset');
      }

      console.log('Fetching new list of assets');
      await fetchAssets();
    } catch (error) {
      console.error('Error creating skateboard asset:', error);
    } finally {
      setIsCreatingAsset(false);
    }
  };


return (
    <div style={{ padding: '10px' }}>
       <Tabs style={tabStyle} 
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="My Skater tabs"
      >
        <Tab label="Skaters" />
        <Tab label="Skateboards" />
        <Tab label="Team Financials" />
        <Tab label="Team Stats" />
        <Tab label="My Bets" />
        <Tab label="Inbox" />
        <Tab label="Settings" />
      </Tabs>

  {selectedTab === 0 && (
  <div style={{ color: theme.palette.text.light }}>
    {/* <h1>My Skaters</h1> */}
    {assets.length === 0 && (
      <Button onClick={handleCreateSkaterAsset}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/Skater00.png?alt=media&token=60a721c0-3aaa-424d-88ff-7dbac8b91a1f"
          alt="Create Skater Asset"
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      </Button>
    )}

    {assets.filter(asset => asset.name === "Skater00").map((asset, index) => (
      <div key={index} style={{ marginBottom: '20px' }}>
        <h3>{asset.status === 'Committed' ? asset.name : 'Processing Skater...'}</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {asset.status === 'Committed' ? (
            <img src={asset.imageUrl} alt={asset.name} style={{ maxWidth: '30%', minWidth: '200px', border: '1px solid white', height: 'auto'}} />
          ) : (
            <p>Asset is being processed...</p>
          )}
          {index === 0 && assets.length === 1 && (
            <Button 
              style={{ background: theme.palette.primary.yellow, color: theme.palette.text.dark }}
              variant="contained"
              onClick={redirectToSkateboards}
            >
                Create a Skateboard
            </Button>
          )}
        </div>

        <Box sx={{ border: '1px solid white', maxWidth: '30%', minWidth: '200px', color: theme.palette.text.light }}>
          {asset.attributes.map((attr, idx) => (
            <Box key={idx} sx={{ marginBottom: '10px' }}>
              <Typography variant="body1">{attr.traitType}: {attr.value}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={Number(attr.value)} 
                sx={{
                  height: 10, 
                  backgroundColor: 'black', 
                  '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.primary.yellow },
                  border: '1px solid white'
                }} 
              />
            </Box>
          ))}
        </Box>
      </div>
    ))}
  </div>
)}


    
{selectedTab === 1 && (
  <div style={{ color: theme.palette.text.light }}>
    {/* <h1>Skateboards</h1> */}
    {assets.length === 1 && (
      <Button onClick={handleCreateSkateboardAsset}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/Screenshot%202024-01-08%20at%207.19.41%E2%80%AFPM.png?alt=media&token=21af4b3a-a8a5-4a8a-a04d-4491a5f33302"
          alt="Create Skater Asset"
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      </Button>
    )}

    {assets.filter(asset => asset.name === "Skateboard00").map((asset, index) => (
      <div key={index} style={{ marginBottom: '20px' }}>
        <h3>{asset.status === 'Committed' ? asset.name : 'Processing Skateboard...'}</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {asset.status === 'Committed' ? (
                      <img src={asset.imageUrl} alt={asset.name} style={{ maxWidth: '30%', minWidth: '200px', border: '1px solid white', height: 'auto', marginRight: '20px'}} />
          ) : (
            <p>Asset is being processed...</p>
          )}
        </div>

        {asset.status === 'Committed' && (
          <Box sx={{ border: '1px solid white', maxWidth: '30%', minWidth: '200px', color: theme.palette.text.light }}>
            {asset.attributes.map((attr, idx) => (
              <Box key={idx} sx={{ marginBottom: '10px' }}>
                <Typography variant="body1">{attr.traitType}: {attr.value}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={Number(attr.value)} 
                  sx={{
                    height: 10, 
                    backgroundColor: 'black', 
                    '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.primary.yellow },
                    border: '1px solid white'
                  }} 
                />
              </Box>
            ))}
          </Box>
        )}
      </div>
    ))}
  </div>
)}

{selectedTab === 6 && (
  <Settings />
)}


      {isCreatingAsset && <CircularProgress />}
    </div>
  );
}

export default MySkater;
