import React from 'react';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <video width="100%" height="auto" controls>
        <source src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/UntitledSong1.mp4?alt=media&token=96825dbc-043a-49c5-8570-884a71b9a88f" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Home;