import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import { Route, Redirect } from "react-router-dom";
import Loading from "../pages/Loading";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  });

  const handleRoute = (props) => {
    if (user === null) {
      return <Redirect to="/" />;
    } else {
      return <Component {...props} />;
    }
  };

  return (
    <>
      <Route
        {...rest}
        render={(props) => (isLoading ? <Loading /> : handleRoute(props))}
      ></Route>
    </>
  );
}

export default PrivateRoute;
