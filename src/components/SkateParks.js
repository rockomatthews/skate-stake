import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const skateparks = [
  {
    name: "Woodward Park City, UT",  // Assuming you want to display the name of the skatepark
    image: "https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/woodWardPark.png?alt=media&token=0996b642-4bde-4904-9ae5-f6b8c0c5eebd",
    categories: [
      { title: "Trick", detail: "Kickflip" },
      { title: "Your Rating", detail: "0%" },
      { title: "Skaters Practicing", detail: "134564" },
    ],
  },
  // ...add more skateparks here
];

function SkateParks() {
  return (
    <Grid container spacing={4}>
      {skateparks.map((skatepark, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{
            backgroundColor: 'black',
            borderColor: 'primary.yellow',  // Adjust based on your theme's color palette
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 0,
          }}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  height="150"  // Set max height to 250px
                  padding="10px"
                  image={skatepark.image}
                  alt={skatepark.name}
                  sx={{ objectFit: 'contain', maxWidth: '150px', width: '100%' }}  // Limit max width to 250px
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {skatepark.name}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" sx={{ color: 'white' }}>
                    {skatepark.categories.map((category, index) => (
                      <Box key={index} sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
                          {category.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                          {category.detail}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default SkateParks;
