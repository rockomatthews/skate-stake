import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

function MySkater() {
  const { user } = useAuth(); // Get the user object from AuthContext
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchAssets = async () => {
        try {
          const response = await fetch(`http://localhost:3001/getUserAssets?email=${encodeURIComponent(user.email)}`);
          if (!response.ok) {
            throw new Error('Failed to fetch assets');
          }
          const data = await response.json();
          setAssets(data.assets);
        } catch (error) {
          console.error('Error fetching assets:', error);
        }
      };
      
      fetchAssets();
    }
  }, [user]);

  const handleCreateSkaterAsset = async () => {
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    try {
      const userEmail = user.email; // Fetch email from logged-in user

      const response = await fetch('http://localhost:3001/asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });

      if (!response.ok) {
        throw new Error('Failed to create skater asset');
      }

      const result = await response.json();
      console.log('Skater asset created:', result);
      // Implement additional logic if needed
    } catch (error) {
      console.error('Error creating skater asset:', error);
    }
  };

  return (
    <div>
      <h2>My Skater</h2>
      {assets.length > 0 ? (
        assets.map(asset => (
          <div key={asset.id}>
            <h3>{asset.details.name}</h3>
            <img src={asset.details.imageUrl} alt={asset.details.name} style={{ maxWidth: '100%', height: 'auto' }} />
            {/* Additional asset details */}
          </div>
        ))
      ) : (
        <p>No assets created yet.</p>
      )}
      <button onClick={handleCreateSkaterAsset}>Create Skater Asset</button>
      {/* Other UI elements */}
    </div>
  );
}

export default MySkater;
