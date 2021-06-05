import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <div
        className="login-bg user-dashboard"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "15vw",
          color: "white",
        }}
      >
        <h1>Page Not Found, Error: 404</h1>
        <p>
          The page you are trying to access is broken or no longer avaliable
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
