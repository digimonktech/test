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
import ResetPassword from "./component/Forgotpassword/ResetPassword";
import Booking from "./component/bookingform/Booking";
import Dashboard from "./component/user/Dashboard";
import EscortDashboard from "./component/user/EscortDashboard";
import AgencyDashboard from "./component/user/AgencyDashboard";
import About from "./component/Home/About";
import ContactUS from "./component/Home/ContactUS";
import TermUse from "./component/Home/TermUse";
import Faq from "./component/Home/Faq";

import PageNotFound from "./component/pageNotFound/pageNotFound";
import VerifyEmail from "./component/verifyEmail/verifyEmail.component";
import OurBlog from "./component/ourBlog/ourBlog.component";
import TestHeader from "./component/testHeader";

import ViewEscortDetails from "./component/viewEscortDetails/viewEscortDetails";
import BookingEscort from "./component/bookingEscort/bookingEscort";
import SearchEscort from "./component/searchEscort/searchEscort";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/submit-otp/:email" exact component={SubmitOtp} />
          <Route path="/reset-password/:token" exact component={ResetPassword} />
          <Route path="/sign-up" exact component={Account} />
          <Route path="/booking" exact component={Booking} />
          <Route path="/user/dashboard/:id" exact component={Dashboard} />
          <Route
            path="/user/escort/dashboard/:id"
            exact
            component={EscortDashboard}
          />
          <Route
            path="/user/agency/dashboard/:id"
            exact
            component={AgencyDashboard}
          />
          <Route path="/about-us" exact component={About} />
          <Route path="/contact-us" exact component={ContactUS} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/term-of-use" exact component={TermUse} />
          <Route path="/page-not-found" exact component={PageNotFound} />
          <Route path="/our-blog" exact component={OurBlog} />
          <Route path="/test" exact component={TestHeader} />
          <Route path="/verify-email/:token" exact component={VerifyEmail} />
          <Route path="/viewEscort/:id" component={ViewEscortDetails} />
          <Route path="/book-escort/:id" component={BookingEscort} />
          <Route path="/search-escort" component={SearchEscort} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
