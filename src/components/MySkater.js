import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

function MySkater() {
  const theme = useTheme();
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [isCreatingAsset, setIsCreatingAsset] = useState(false);

  const fetchAssets = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:3001/getUserAssets?email=${encodeURIComponent(user.email)}`);
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
      const response = await fetch('http://localhost:3001/asset', {
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
    <div style={{ color: theme.palette.text.light, padding: '20px' }}>
      <h2>Click on the package to create a free Skater NFT!</h2>
      {assets.length === 0 && (
        <Button onClick={handleCreateSkaterAsset}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/Skater00.png?alt=media&token=60a721c0-3aaa-424d-88ff-7dbac8b91a1f"
            alt="Create Skater Asset"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </Button>
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
              <Button variant="contained">Create a Skateboard</Button>
            )}
          </div>

          <Box sx={{ border: '1px solid white', maxWidth: '50%', margin: 'auto', padding: '10px' }}>
            {asset.attributes.map((attr, idx) => (
              <Box key={idx} sx={{ marginBottom: '10px' }}>
                <Typography variant="body1">{attr.traitType}: {attr.value}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={Number(attr.value)} 
                  sx={{
                    height: 10, 
                    backgroundColor: 'black', 
                    '& .MuiLinearProgress-bar': { backgroundColor: 'white' },
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