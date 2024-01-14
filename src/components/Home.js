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
    flex: '1 1 100%', // grow and shrink, base width of 40%
    maxWidth: '80%', // maximum width
    margin: '0 auto',
  };

  const textStyle = {
    padding: '10px',
    color: '#ffffff',
  };

  return (
    <div style={containerStyle}>
      <div style={itemStyle}>
        <h1>Welcome to Skate Stake</h1>
        <h3>sponsored by The Extreme Games & ESPN 8 'The Ocho'</h3>
        <video width="100%" margin= "0 auto" height="auto" controls>
          <source src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/teaser.mp4?alt=media&token=531620cb-a6af-48a1-a184-f652825a81d8" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{ ...itemStyle, ...textStyle }}>
        <h4>In Skate Stake, you can win $PODIUM and instantly trade it for $USDC. Think of Skate Stake like a cross between The Sims (let 2 skaters mate to create another) 
          and The X-Games Big Air event (but with 3 times as many ramps + some rails). Or, buy $Medal and stake it at skateparks to strengthen 
          your skater's arsenol of tricks. Compete in tournaments against 9 other skaters or 1 vs 1 games of flatland S-K-A-T-E.</h4>
          <br />
        <h3>Learn more about the strategy in Skate-Stake</h3>
      </div>
    </div>
  );
}

export default Home;
