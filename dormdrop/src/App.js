import "./App.css";
// import route types
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
// import user context
import UserProvider from "./provider/UserProvider";
// import router and switch from react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Protected from "./pages/Protected";
function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Switch>
            <PublicRoute restricted={false} component={Home} path="/" exact />
            <PublicRoute
              restricted={true}
              component={SignIn}
              path="/login"
              exact
            />
            <PublicRoute
              restricted={true}
              component={SignUp}
              path="/register"
              exact
            />
            <PrivateRoute component={Protected} path="/protected" exact />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
