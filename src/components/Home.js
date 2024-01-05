import React from 'react';

function Home() {
  return (
    <div>
      <video width="50%" height="auto" controls>
        <source src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/teaser.mp4?alt=media&token=531620cb-a6af-48a1-a184-f652825a81d8" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Home;