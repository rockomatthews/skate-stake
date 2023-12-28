// Home.js
import React, { useState, useContext } from 'react';
import PasswordModal from './PasswordModal';
import { ActiveTabContext } from '../ActiveTabContext';
// Assuming you have an AuthContext or similar
import { useAuth } from '../AuthContext'; // Update the path as per your setup

function Home() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { changeActiveTab } = useContext(ActiveTabContext);
  const { isAuthenticated } = useAuth(); // Assuming you have an isAuthenticated state
  const { setIsUserCreated } = useContext(ActiveTabContext);


  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
    setIsUserCreated(true);
    changeActiveTab('mySkater'); // Switch to 'My Skater' tab
    // Implement logic to create the skater asset here
  };

  return (
    <div>
      <h2>Home</h2>
      {!isAuthenticated && (
        <button onClick={() => setIsPasswordModalOpen(true)}>Set Password</button>
      )}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />
    </div>
  );
}

export default Home;
