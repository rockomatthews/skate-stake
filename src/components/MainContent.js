import React from 'react';
import Home from './Home';
import MySkater from './MySkater';
import { useContext } from 'react';
import { ActiveTabContext } from '../ActiveTabContext';
import { useTheme } from '@mui/material/styles';

function MainContent() {
  const theme = useTheme();
  const { activeTab } = useContext(ActiveTabContext);

  return (
    <div style={{ marginLeft: '250px', marginTop: '-20px', backgroundColor: theme.palette.primary.main, color: theme.palette.text.dark  }}>
      {/* Sidebar navigation (example) */}

      {/* Conditional rendering based on activeTab */}
      {activeTab === 'home' && <Home />}
      {activeTab === 'mySkater' && <MySkater />}
      {/* Add conditions for other components like Tournaments, Skate Parks, etc. */}
    </div>
  );
}

export default MainContent;
