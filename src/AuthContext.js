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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userObj) => {
    setUser(userObj); // Update user state on login
    console.log(userObj)
  };


  const logout = () => {
    auth.signOut().then(() => setUser(null)); // Clear user on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};