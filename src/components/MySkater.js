import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

function MySkater() {
  const theme = useTheme();
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [isCreatingAsset, setIsCreatingAsset] = useState(false);  

  const fetchAssets = useCallback(async () => {
    if (!user) return;
    try {
      // const response = await fetch(`http://localhost:3001/getUserAssets?email=${encodeURIComponent(user.email)}`);
      const response = await fetch(`https://skate-stake.onrender.com/getUserAssets?email=${encodeURIComponent(user.email)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }
      const data = await response.json();
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
      await fetchAssets(); // Re-fetch the assets list to reflect the new addition
    } catch (error) {
      console.error('Error creating skater asset:', error);
    } finally {
      setIsCreatingAsset(false);
    }
  };

  return (
    <div style={{ color: theme.palette.text.light }}>
      {assets.length > 0 ? (
        assets.map((asset, index) => (
          <div key={index}>
            <h3>{asset.status === 'Committed' ? asset.name : "Processing Skater..."}</h3>
            {asset.status === 'Committed' ? (
              <img src={asset.imageUrl} alt={asset.name} style={{ maxWidth: '40%', height: 'auto' }} />
            ) : (
              <p>Asset is being processed...</p>
            )}
          </div>
        ))
      ) : (
        <p>Create a FREE Skater!</p>
      )}

      {isCreatingAsset ? (
        <CircularProgress />
      ) : (
        assets.length === 0 && (
          <button onClick={handleCreateSkaterAsset}>Create Skater Asset</button>
        )
      )}
    </div>
  );
}

export default MySkater;
