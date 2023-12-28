import React, { useState } from 'react';
import PasswordModal from './PasswordModal';

function MySkater() {
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handlePasswordSet = () => {
    setIsPasswordSet(true);
    setIsPasswordModalOpen(false);
  };

  return (
    <div>
      {!isPasswordSet && (
        <button onClick={() => setIsPasswordModalOpen(true)}>Create Password</button>
      )}
      {isPasswordSet && (
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/Skater00.png?alt=media&token=60a721c0-3aaa-424d-88ff-7dbac8b91a1f"
          alt="Skater"
          style={{ maxWidth: '30%', height: 'auto' }}
        />
      )}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSet}
      />
    </div>
  );
}
export default MySkater;
