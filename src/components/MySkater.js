import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';

function MySkater() {
  const { user } = useAuth(); // Get the user object from AuthContext

  useEffect(() => {
    if (user) {
      console.log("Current user:", user.email);
      // Rest of your code to handle the logged-in user
    } else {
      console.log("No user information available");
    }
  }, [user]); // This effect will run whenever the user object changes

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
      <button onClick={handleCreateSkaterAsset}>Create Skater Asset</button>
      {/* Other UI elements */}
    </div>
  );
}

export default MySkater;
