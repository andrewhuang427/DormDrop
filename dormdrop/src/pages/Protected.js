import React, { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import { signOut } from "../firebase/firebase";

function Protected() {
  const { user } = useContext(UserContext);
  console.log(user);

  const handleSignOut = (event) => {
    event.preventDefault();
    signOut();
  };

  return (
    <div>
      <div>Welcome, {user !== null ? user.email : ""}</div>
      <div>You should only be able to see this if your are logged in</div>
      <div>
        <button onClick={handleSignOut}>Sign-Out</button>
      </div>
    </div>
  );
}

export default Protected;
