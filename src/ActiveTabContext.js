import React, { createContext, useState } from 'react';



export const ActiveTabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isUserCreated, setIsUserCreated] = useState(false); 

  const changeActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const setActiveTabDirectly = (newTab) => {
    setActiveTab(newTab);
  };

  return (
    <ActiveTabContext.Provider value={{ activeTab, changeActiveTab, setActiveTabDirectly, isUserCreated, setIsUserCreated }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
