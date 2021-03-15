import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Container, Breadcrumb, Row, Col, Form } from "react-bootstrap";

import UploadProfile from "./editprofile/UploadProfile";
import { NavLink } from "react-router-dom";
import PersonalInfo from "./escort/PersonalInfo";
import UploadImage from "./escort/UploadImage";
import ChangePassword from "./escort/ChangePassword"
import UpdatePrice from "./escort/UpdatePrice";
import GetVerified from "./escort/GetVerified";
import Booking from "./escort/Booking";
import AllBooking from "./escort/AllBooking";
import Review from "./escort/Review"
import Chat from "./editprofile/Chat"

export default class EscortDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "personalinfo",
    };
  }

  ChangeTab = (type) => (e) => {
    
    this.setState({
      type: type,
    });
  };

  renderSideMenu = (type) => {
    switch (type) {
      case "personalinfo":
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={() => this.ChangeTab("personalinfo")}
                  activeClassName={
                    this.state.type === "personalinfo" ? "active" : ""
                  }
                >
                  Edit Personal Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("uploadimage")}
                  activeClassName={
                    this.state.type === "uploadimage" ? "active" : ""
                  }
                >
                  Upload Images
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("changepassword")}
                  activeClassName={
                    this.state.type === "changepassword" ? "active" : ""
                  }
                >
                  Change Password
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("updateprice")}
                  activeClassName={
                    this.state.type === "updateprice" ? "active" : ""
                  }
                >
                  Update Rate or Price
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("getverified")}
                  activeClassName={
                    this.state.type === "getverified" ? "active" : ""
                  }
                >
                  Get Verified
                </NavLink>
              </li>
            </ul>
          </div>
        );
      case "uploadimage":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("personalinfo")}
                    activeClassName={
                      this.state.type === "personalinfo" ? "active" : ""
                    }
                  >
                    Edit Personal Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("uploadimage")}
                    activeClassName={
                      this.state.type === "uploadimage" ? "active" : ""
                    }
                  >
                    Update Password
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("changepassword")}
                    activeClassName={
                      this.state.type === "changepassword" ? "active" : ""
                    }
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("updateprice")}
                    activeClassName={
                      this.state.type === "updateprice" ? "active" : ""
                    }
                  >
                    Update Rate or Price
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("getverified")}
                    activeClassName={
                      this.state.type === "getverified" ? "active" : ""
                    }
                  >
                    Get Verified
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        );

      case "changepassword":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("personalinfo")}
                    activeClassName={
                      this.state.type === "personalinfo" ? "active" : ""
                    }
                  >
                    Edit Personal Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("uploadimage")}
                    activeClassName={
                      this.state.type === "uploadimage" ? "active" : ""
                    }
                  >
                    Upload Images
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("changepassword")}
                    activeClassName={
                      this.state.type === "changepassword" ? "active" : ""
                    }
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("updateprice")}
                    activeClassName={
                      this.state.type === "updateprice" ? "active" : ""
                    }
                  >
                    Update Rate or Price
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("getverified")}
                    activeClassName={
                      this.state.type === "getverified" ? "active" : ""
                    }
                  >
                    Get Verified
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        );

      case "updateprice":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("personalinfo")}
                    activeClassName={
                      this.state.type === "personalinfo" ? "active" : ""
                    }
                  >
                    Edit Personal Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("uploadimage")}
                    activeClassName={
                      this.state.type === "uploadimage" ? "active" : ""
                    }
                  >
                    Upload Images
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("changepassword")}
                    activeClassName={
                      this.state.type === "changepassword" ? "active" : ""
                    }
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("updateprice")}
                    activeClassName={
                      this.state.type === "updateprice" ? "active" : ""
                    }
                  >
                    Update Rate or Price
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("getverified")}
                    activeClassName={
                      this.state.type === "getverified" ? "active" : ""
                    }
                  >
                    Get Verified
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        );

      case "getverified":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("personalinfo")}
                    activeClassName={
                      this.state.type === "personalinfo" ? "active" : ""
                    }
                  >
                    Edit Personal Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("uploadimage")}
                    activeClassName={
                      this.state.type === "uploadimage" ? "active" : ""
                    }
                  >
                    Upload Images
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("changepassword")}
                    activeClassName={
                      this.state.type === "changepassword" ? "active" : ""
                    }
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("updateprice")}
                    activeClassName={
                      this.state.type === "updateprice" ? "active" : ""
                    }
                  >
                    Update Rate or Price
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("getverified")}
                    activeClassName={
                      this.state.type === "getverified" ? "active" : ""
                    }
                  >
                    Get Verified
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        );

      case "booking":
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("booking")}
                  activeClassName={
                    this.state.type === "booking" ? "active" : ""
                  }
                >
                  New Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("allbooking")}
                  activeClassName={
                    this.state.type === "allbooking" ? "active" : ""
                  }
                >
                  All Bookings
                </NavLink>
              </li>
            </ul>
          </div>
        );
      case "allbooking":
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("booking")}
                  activeClassName={
                    this.state.type === "booking" ? "active" : ""
                  }
                >
                  New Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("allbooking")}
                  activeClassName={
                    this.state.type === "allbooking" ? "active" : ""
                  }
                >
                  All Bookings
                </NavLink>
              </li>
            </ul>
          </div>
        );
      case "review":
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("review")}
                  activeClassName={this.state.type === "review" ? "active" : ""}
                >
                  My Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("chat")}
                  activeClassName={this.state.type === "chat" ? "active" : ""}
                >
                  <div className="user-chat-side">
                    <div className="user-icon">T</div>
                    <div className="chat-text">
                      <h5>User 1</h5>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("chat1")}
                  activeClassName={this.state.type === "chat1" ? "active" : ""}
                >
                  <div className="user-chat-side">
                    <div className="user-icon">T</div>
                    <div className="chat-text">
                      <h5>User 2</h5>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("chat1")}
                  activeClassName={this.state.type === "chat1" ? "active" : ""}
                >
                  <div className="user-chat-side">
                    <div className="user-icon">T</div>
                    <div className="chat-text">
                      <h5>User 3</h5>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("chat1")}
                  activeClassName={this.state.type === "chat1" ? "active" : ""}
                >
                  <div className="user-chat-side">
                    <div className="user-icon">T</div>
                    <div className="chat-text">
                      <h5>User 4</h5>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        );
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="login-bg user-dashboard">
          <Container>
            <Breadcrumb className="user-breadcrumb">
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">User</Breadcrumb.Item>
              <Breadcrumb.Item active>Edit Profile</Breadcrumb.Item>
            </Breadcrumb>

            <Row>
              <Col md="3">
                <UploadProfile  />
                {this.renderSideMenu(this.state.type)}
              </Col>
              <Col md="9">
                <div className="profile-box">
                  <h2 className="onlineiuser">
                    Jesika
                    <span>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Online"
                      />

                      <Form.Check
                        type="switch"
                        id="custom-switch1"
                        label="Accepting Booking"
                      />
                    </span>
                  </h2>

                  <div className="main-user">
                    <Row xs={1} md={3} lg={3}>
                      <Col>
                        <span>
                          <i className="flaticon-calendar"></i> Joined 3-10-2021
                        </span>
                      </Col>
                      <Col>
                        <span>
                          <i className="flaticon-phone"></i> +XXX XXXXXXXXXX
                        </span>
                      </Col>
                      <Col>
                        <span>
                          <i className="flaticon-m"></i> maria@bahes.com
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="user-tabs-main">
                  <div className="user-tabs">
                    <ul>
                      <li>
                        <NavLink
                          to="#"
                          onClick={this.ChangeTab("personalinfo")}
                          activeClassName={
                            this.state.type === "personalinfo" ||
                            this.state.type === "uploadimage" ||
                            this.state.type === "changepassword" ||
                            this.state.type === "updateprice" ||
                            this.state.type === "getverified"
                              ? "active-user"
                              : ""
                          }
                        >
                          Edit Profile
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="#"
                          onClick={this.ChangeTab("booking")}
                          activeClassName={
                            this.state.type === "booking" || this.state.type === "allbooking" ? "active-user" : ""
                          }
                        >
                          My Booking <span>5</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="#"
                          onClick={this.ChangeTab("review")}
                          activeClassName={
                            this.state.type === "review" ? "active-user" : ""
                          }
                        >
                          My Reviews <span>5</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="#"
                          onClick={this.ChangeTab("chat")}
                          activeClassName={
                            this.state.type === "chat" ? "active-user" : ""
                          }
                        >
                          Charts <span>5</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="userdiv">
                  {this.state.type === "personalinfo" ? <PersonalInfo /> : ""}
                  {this.state.type === "uploadimage" ? <UploadImage /> : ""}
                  {this.state.type === "changepassword" ? (
                    <ChangePassword />
                  ) : (
                    ""
                  )}
                  {this.state.type === "updateprice" ? <UpdatePrice /> : ""}
                  {this.state.type === "getverified" ? <GetVerified /> : ""}
                  {this.state.type === "booking" ? <Booking/>: ""}
                  {this.state.type === "allbooking" ? <AllBooking/> : ""}
                  {this.state.type === "review" ? <Review/> : ""}
                  {this.state.type === "chat" ? <Chat/> : ""}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
