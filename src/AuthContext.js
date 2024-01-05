import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './firebase'; // Adjust the path as necessary
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Set the Firebase user object
      setLoading(false); // Update loading state when auth state is determined
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const login = (userObj) => {
    setUser(userObj); // Update user state on login
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null); // Clear user on logout
      setLoading(false); // Ensure loading is set to false when user logs out
    });
  };

  // Render a loading indicator or null while checking the auth state
  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  // Once loading is done, render the children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
