import { useState, useEffect, createContext } from "react";
import { auth } from "../firebase/firebase";

export const UserContext = createContext();

function UserProvider(props) {
  const [user, setUser] = useState({ user: "none" });

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      setUser({ user: userAuth });
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;
