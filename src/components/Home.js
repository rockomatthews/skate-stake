import React from 'react';
import { useTheme } from '@mui/material/styles';

function Home() {
  const theme = useTheme();

  // Styles for the container
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row', // side by side
    flexWrap: 'wrap', // allows items to wrap to next line on smaller screens
    gap: '20px', // space between items
    justifyContent: 'center', // center items horizontally
    alignItems: 'center', // center items vertically
    padding: '20px',
    color: theme.palette.text.light,
  };

  // Styles for the video and text divs
  const itemStyle = {
    flex: '1 1 40%', // grow and shrink, base width of 40%
    maxWidth: '50%', // maximum width
  };

  const textStyle = {
    padding: '10px',
    color: '#ffffff',
  };

  return (
    <div style={containerStyle}>
      <div style={itemStyle}>
        <video width="100%" height="auto" controls>
          <source src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/teaser.mp4?alt=media&token=531620cb-a6af-48a1-a184-f652825a81d8" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{ ...itemStyle, ...textStyle }}>
        <h3>sponsored by The Extreme Games & ESPN 8 'The Ocho'</h3>
        <h1>Welcome to Skate Stake</h1>
        <p1>Skate Stake is unlike any other skateboarding game, EXACTLY like every other skateboarding game. Here's the difference. In Skate Stake, you can win $$$. 
          Think of Skate Stake like a cross between The Sims (with less drama) and The X-Games Big Air event (but with 3 times as many ramps). Buy $Medal and stake it at skateparks to stregthen 
          your skater's 'bag of tricks.' Compete in tournaments against 9 other skaters or 1 vs 1 games of flatland S-K-A-T-E.</p1>
          <br />
        <h3>Sign up with an email and password to receive a free Skater NFT and shitty but OMG so rare Skateboard NFT while supplies last! Early adopters will be rewarded  </h3>
      </div>
    </div>
  );
}

export default Home;
