import React, { useEffect, useState, useCallback } from 'react';
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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    console.log(`Tab ${newValue} clicked`);
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
      const userEmail = user.email;
      // const response = await fetch('http://localhost:3001/asset', {
      const response = await fetch('https://skate-stake.onrender.com/asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
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

  return (
    <div style={{ padding: '20px' }}>
      <Tabs style={{ background: theme.palette.primary.yellow, color: theme.palette.text.light }}
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
        // Existing MySkater code
        <div style={{ color: theme.palette.text.light }}>
          <h2>Your Skaters</h2>
          {assets.length === 0 && (
          <Button onClick={handleCreateSkaterAsset}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/Skater00.png?alt=media&token=60a721c0-3aaa-424d-88ff-7dbac8b91a1f"
              alt="Create Skater Asset"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          </Button>
        )}
        </div>
      )}

      {/* Placeholder divs for other tabs */}
      {selectedTab !== 0 && (
        <div>
          <Typography variant="h6">Content for selected tab will go here.</Typography>
        </div>
      )}

      {assets.map((asset, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>{asset.status === 'Committed' ? asset.name : 'Processing Skater...'}</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {asset.status === 'Committed' ? (
              <img src={asset.imageUrl} alt={asset.name} style={{ maxWidth: '30%', height: 'auto', marginRight: '20px' }} />
            ) : (
              <p>Asset is being processed...</p>
            )}
            {index === 0 && (
              <Button 
                style={{ background: theme.palette.primary.yellow, color: theme.palette.text.dark }}
                variant="contained">
                  Create a Skateboard
              </Button>
            )}
          </div>

          <Box sx={{ border: '1px solid white', maxWidth: '40%', color: theme.palette.text.light, padding: '10px' }}>
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

      {isCreatingAsset && <CircularProgress />}
    </div>
  );
}

export default MySkater;