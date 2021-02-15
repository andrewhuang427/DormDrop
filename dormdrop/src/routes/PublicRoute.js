import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, restricted, ...rest }) {

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          !isLoaded ? (
            <></>
          ) : user !== undefined && restricted ? (
            <Redirect to="/feed" />
          ) : (
            <Component {...props} />
          )
        }
      ></Route>
    </>
  );
}

export default PublicRoute;
