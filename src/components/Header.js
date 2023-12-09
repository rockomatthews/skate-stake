import React, { useState } from 'react';
// Import modal library if used

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header>
      <h1>Stake Skate</h1>
      <button onClick={openModal}>Sign Up</button>
      {/* Modal code goes here */}
    </header>
  );
}

export default Header;
