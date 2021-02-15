import React, { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, restricted, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          user !== null && restricted ? (
            <Redirect to="/protected" />
          ) : (
            <Component {...props} />
          )
        }
      ></Route>
    </>
  );
}

export default PublicRoute;
