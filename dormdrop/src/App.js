import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import route types
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
// import user context
import UserProvider from "./provider/UserProvider";
// import router and switch from react router
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// Admin Components
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
// User Components
import UserFeed from "./pages/UserFeed";
import Checkout from "./pages/Checkout";

const stripePromise = loadStripe(
  "pk_test_51IFoq6KwYMI7NB0ZqUPWoPdw8Fnxa17BrTTjgkoB5gPXRE1qFIDNCxbg1xutNQMpUjy3H21mYcOa4niQJweSOFvf005sLeXuj8"
);

function App() {
  return (
    <UserProvider>
      <Elements stripe={stripePromise}>
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
              <PrivateRoute component={UserFeed} path="/feed" exact />
              <PrivateRoute component={Checkout} path="/checkout" exact />
              <PrivateRoute
                component={AdminDashboard}
                path="/admin/dashboard"
                exact
              />
              <PrivateRoute
                component={AdminOrders}
                path="/admin/orders"
                exact
              />
            </Switch>
          </div>
        </Router>
      </Elements>
    </UserProvider>
  );
}

export default App;
