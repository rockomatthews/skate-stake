import React, { createContext, useState } from 'react';

export const ActiveTabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');

  const changeActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ActiveTabContext.Provider value={{ activeTab, changeActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
