import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./flaticon.css";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./component/Home/Home";
import Login from "./component/login/Login";
import Account from "./component/login/Account";
import ForgotPassword from "./component/Forgotpassword/ForgotPassword";
import SubmitOtp from "./component/Forgotpassword/SubmitOtp";
import Booking from "./component/bookingform/Booking";
import Dashboard from "./component/user/Dashboard";
import EscortDashboard from "./component/user/EscortDashboard";
import AgencyDashboard from "./component/user/AgencyDashboard";
import About from "./component/Home/About";
import ContactUS from "./component/Home/ContactUS";
import TermUse from "./component/Home/TermUse"
import Faq from "./component/Home/Faq";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/submit-otp" exact component={SubmitOtp} />
          <Route path="/sign-up" exact component={Account} />
          <Route path="/booking" exact component={Booking} />
          <Route path="/user/dashboard" exact component={Dashboard} />
          <Route path="/user/escort/dashboard" exact component={EscortDashboard} />
          <Route path="/user/agency/dashboard" exact component={AgencyDashboard} />
          <Route path="/about-us" exact component={About} />
          <Route path="/contact-us" exact component={ContactUS} />
          <Route path="/faq" exact component={Faq}/>
          <Route path="/term-of-use" exact component={TermUse } />
         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
