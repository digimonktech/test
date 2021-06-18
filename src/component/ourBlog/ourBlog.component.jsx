import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const OurBlog = () => {
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
        <h1>Coming Soon</h1>
        <p>
          Stay Tuned
        </p>
      </div>
      <Footer />
    </>
  );
};

export default OurBlog;
