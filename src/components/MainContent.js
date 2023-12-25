import React from 'react';
import Home from './Home';
import MySkater from './MySkater';
import { useContext } from 'react';
import { ActiveTabContext } from '../ActiveTabContext';


function MainContent() {
  const { activeTab } = useContext(ActiveTabContext);

  return (
    <div style={{ marginLeft: '250px' }}>
      {/* Sidebar navigation (example) */}

      {/* Conditional rendering based on activeTab */}
      {activeTab === 'home' && <Home />}
      {activeTab === 'mySkater' && <MySkater />}
      {/* Add conditions for other components like Tournaments, Skate Parks, etc. */}
    </div>
  );
}

export default MainContent;
