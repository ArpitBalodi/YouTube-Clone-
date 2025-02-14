import { createContext, useState, useEffect, useMemo } from "react";

// Creating the AuthContext
const AuthContext = createContext();

export function AuthProvider(prop) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  // Checking if user is already logged in (on page refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  //  Function to login user
  function loginUser(token, userName) {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    setIsLoggedIn(true);
    setUserName(userName);
  }

  //  Function to logout user
  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); 
    setIsLoggedIn(false);
    setUserName(null);
  }

  // Memoized value to avoid unnecessary re-renders
  const authContextValue = useMemo(
    () => ({ isLoggedIn, userName, loginUser, logoutUser }),
    [isLoggedIn, userName]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {prop.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

