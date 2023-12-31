import React, { useContext } from 'react';
import { ActiveTabContext } from '../ActiveTabContext';

function MySkater() {
  const { referenceId } = useContext(ActiveTabContext);

  const handleCreateSkaterAsset = async () => {
    try {
      const response = await fetch('https://your-server-url/createSkaterAsset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ referenceId })
      });

      if (!response.ok) {
        throw new Error('Failed to create skater asset');
      }

      const result = await response.json();
      console.log('Skater asset created:', result);
      // Handle the successful asset creation (e.g., updating UI or state)
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
