import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const Marketplace = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMarketplaceAssets = async () => {
    setLoading(true);
    try {
      // Update to use your server's endpoint
      const response = await fetch('/marketplace/assets');
      if (response.ok) {
        const data = await response.json();
        setAssets(data.assets);
      } else {
        throw new Error('Failed to fetch marketplace assets');
      }
    } catch (error) {
      console.error('Error fetching marketplace assets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplaceAssets();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={4}>
      {assets.map((asset, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={asset.imageUrl}
              alt={asset.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {asset.name}
              </Typography>
              {/* Additional asset details can be added here */}
            </CardContent>
            {/* Button for buying or bidding on an asset could be added here */}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Marketplace;
