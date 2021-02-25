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
// Admin Components
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
// User Components
import UserFeed from "./pages/UserFeed";
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
            <PublicRoute
              restricted={false}
              component={UserFeed}
              path="/feed"
              exact
            />
            <PrivateRoute
              component={AdminDashboard}
              path="/admin/dashboard"
              exact
            />
            <PrivateRoute component={AdminOrders} path="/admin/orders" exact />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
