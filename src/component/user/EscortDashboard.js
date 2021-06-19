import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Form,
  Dropdown,
} from "react-bootstrap";

import UploadProfile from "./escort/escortProfileImage.component";
import { NavLink } from "react-router-dom";
import PersonalInfo from "./escort/PersonalInfo";
import UploadImage from "./escort/UploadImage";
import ChangePassword from "./escort/ChangePassword";
import UpdatePrice from "./escort/UpdatePrice";
import GetVerified from "./escort/GetVerified";
import Booking from "./escort/Booking";
import AllBooking from "./escort/AllBooking";
import Review from "./escort/Review";
import Chat from "./editprofile/Chat";

import { Tooltip } from "@material-ui/core/";

import jwt_decode from "jwt-decode";
import { getData, postData } from "../FetchNodeServices";

export default class EscortDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "personalinfo",
      escortDetails: { outCallRate: [] },
      reviews: [],
      booking: [],
      isUpdated: false,
      isOnline: false,
    };
  }

  ChangeTab = (type) => {
    console.log("type", type);
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
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        console.log("personal");
                        this.ChangeTab("personalinfo");
                      }}
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
                      onClick={() => this.ChangeTab("uploadimage")}
                      activeClassName={
                        this.state.type === "uploadimage" ? "active" : ""
                      }
                    >
                      Manage gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("changepassword")}
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
                      onClick={() => this.ChangeTab("updateprice")}
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
                      onClick={() => this.ChangeTab("getverified")}
                      activeClassName={
                        this.state.type === "getverified" ? "active" : ""
                      }
                    >
                      Get Verified
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.booking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("booking")}
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
                      onClick={() => this.ChangeTab("allbooking")}
                      activeClassName={
                        this.state.type === "allbooking" ? "active" : ""
                      }
                    >
                      All Bookings
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  My Reviews <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chats <span>(0)</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("chat")}
                      activeClassName={
                        this.state.type === "chat" ? "active" : ""
                      }
                    >
                      <div className="user-chat-side">
                        <div className="user-icon">T</div>
                        <div className="chat-text">
                          <h5>No User</h5>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        );
      case "uploadimage":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Profile
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => {
                          console.log("personal");
                          this.ChangeTab("personalinfo");
                        }}
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
                        onClick={() => this.ChangeTab("uploadimage")}
                        activeClassName={
                          this.state.type === "uploadimage" ? "active" : ""
                        }
                      >
                        Manage gallery
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("changepassword")}
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
                        onClick={() => this.ChangeTab("updateprice")}
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
                        onClick={() => this.ChangeTab("getverified")}
                        activeClassName={
                          this.state.type === "getverified" ? "active" : ""
                        }
                      >
                        Get Verified
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    My Booking <span>({this.state.booking.length})</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("booking")}
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
                        onClick={() => this.ChangeTab("allbooking")}
                        activeClassName={
                          this.state.type === "allbooking" ? "active" : ""
                        }
                      >
                        All Bookings
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>

                <li>
                  <a onClick={() => this.ChangeTab("review")}>
                    My Reviews <span>({this.state.reviews.length})</span>
                  </a>
                </li>

                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Chats <span>(0)</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("chat")}
                        activeClassName={
                          this.state.type === "chat" ? "active" : ""
                        }
                      >
                        <div className="user-chat-side">
                          <div className="user-icon">T</div>
                          <div className="chat-text">
                            <h5>No User</h5>
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>
          </>
        );

      case "changepassword":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Profile
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
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
                        onClick={() => this.ChangeTab("uploadimage")}
                        activeClassName={
                          this.state.type === "uploadimage" ? "active" : ""
                        }
                      >
                        Manage gallery
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("changepassword")}
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
                        onClick={() => this.ChangeTab("updateprice")}
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
                        onClick={() => this.ChangeTab("getverified")}
                        activeClassName={
                          this.state.type === "getverified" ? "active" : ""
                        }
                      >
                        Get Verified
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    My Booking <span>({this.state.booking.length})</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("booking")}
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
                        onClick={() => this.ChangeTab("allbooking")}
                        activeClassName={
                          this.state.type === "allbooking" ? "active" : ""
                        }
                      >
                        All Bookings
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>

                <li>
                  <a onClick={() => this.ChangeTab("review")}>
                    My Reviews <span>({this.state.reviews.length})</span>
                  </a>
                </li>

                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Chats <span>(0)</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("chat")}
                        activeClassName={
                          this.state.type === "chat" ? "active" : ""
                        }
                      >
                        <div className="user-chat-side">
                          <div className="user-icon">T</div>
                          <div className="chat-text">
                            <h5>No User</h5>
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>
          </>
        );

      case "updateprice":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Profile
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
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
                        onClick={() => this.ChangeTab("uploadimage")}
                        activeClassName={
                          this.state.type === "uploadimage" ? "active" : ""
                        }
                      >
                        Manage gallery
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("changepassword")}
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
                        onClick={() => this.ChangeTab("updateprice")}
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
                        onClick={() => this.ChangeTab("getverified")}
                        activeClassName={
                          this.state.type === "getverified" ? "active" : ""
                        }
                      >
                        Get Verified
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    My Booking <span>({this.state.booking.length})</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("booking")}
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
                        onClick={() => this.ChangeTab("allbooking")}
                        activeClassName={
                          this.state.type === "allbooking" ? "active" : ""
                        }
                      >
                        All Bookings
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>

                <li>
                  <a onClick={() => this.ChangeTab("review")}>
                    My Reviews <span>({this.state.reviews.length})</span>
                  </a>
                </li>

                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Chats <span>(0)</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("chat")}
                        activeClassName={
                          this.state.type === "chat" ? "active" : ""
                        }
                      >
                        <div className="user-chat-side">
                          <div className="user-icon">T</div>
                          <div className="chat-text">
                            <h5>No User</h5>
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>
          </>
        );

      case "getverified":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Profile
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
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
                        onClick={() => this.ChangeTab("uploadimage")}
                        activeClassName={
                          this.state.type === "uploadimage" ? "active" : ""
                        }
                      >
                        Manage gallery
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("changepassword")}
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
                        onClick={() => this.ChangeTab("updateprice")}
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
                        onClick={() => this.ChangeTab("getverified")}
                        activeClassName={
                          this.state.type === "getverified" ? "active" : ""
                        }
                      >
                        Get Verified
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    My Booking <span>({this.state.booking.length})</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("booking")}
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
                        onClick={() => this.ChangeTab("allbooking")}
                        activeClassName={
                          this.state.type === "allbooking" ? "active" : ""
                        }
                      >
                        All Bookings
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>

                <li>
                  <a onClick={() => this.ChangeTab("review")}>
                    My Reviews <span>({this.state.reviews.length})</span>
                  </a>
                </li>

                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Chats <span>(0)</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("chat")}
                        activeClassName={
                          this.state.type === "chat" ? "active" : ""
                        }
                      >
                        <div className="user-chat-side">
                          <div className="user-icon">T</div>
                          <div className="chat-text">
                            <h5>No User</h5>
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>
          </>
        );

      case "booking":
        return (
          <div className="edit-personal">
            <ul>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
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
                      onClick={() => this.ChangeTab("uploadimage")}
                      activeClassName={
                        this.state.type === "uploadimage" ? "active" : ""
                      }
                    >
                      Manage gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("changepassword")}
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
                      onClick={() => this.ChangeTab("updateprice")}
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
                      onClick={() => this.ChangeTab("getverified")}
                      activeClassName={
                        this.state.type === "getverified" ? "active" : ""
                      }
                    >
                      Get Verified
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.booking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("booking")}
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
                      onClick={() => this.ChangeTab("allbooking")}
                      activeClassName={
                        this.state.type === "allbooking" ? "active" : ""
                      }
                    >
                      All Bookings
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  My Reviews <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chats <span>(0)</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("chat")}
                      activeClassName={
                        this.state.type === "chat" ? "active" : ""
                      }
                    >
                      <div className="user-chat-side">
                        <div className="user-icon">T</div>
                        <div className="chat-text">
                          <h5>No User</h5>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        );
      case "allbooking":
        return (
          <div className="edit-personal">
            <ul>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
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
                      onClick={() => this.ChangeTab("uploadimage")}
                      activeClassName={
                        this.state.type === "uploadimage" ? "active" : ""
                      }
                    >
                      Manage gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("changepassword")}
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
                      onClick={() => this.ChangeTab("updateprice")}
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
                      onClick={() => this.ChangeTab("getverified")}
                      activeClassName={
                        this.state.type === "getverified" ? "active" : ""
                      }
                    >
                      Get Verified
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.booking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("booking")}
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
                      onClick={() => this.ChangeTab("allbooking")}
                      activeClassName={
                        this.state.type === "allbooking" ? "active" : ""
                      }
                    >
                      All Bookings
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  My Reviews <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chats <span>(0)</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("chat")}
                      activeClassName={
                        this.state.type === "chat" ? "active" : ""
                      }
                    >
                      <div className="user-chat-side">
                        <div className="user-icon">T</div>
                        <div className="chat-text">
                          <h5>No User</h5>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        );
      case "review":
        return (
          <div className="edit-personal">
            <ul>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
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
                      onClick={() => this.ChangeTab("uploadimage")}
                      activeClassName={
                        this.state.type === "uploadimage" ? "active" : ""
                      }
                    >
                      Manage gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("changepassword")}
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
                      onClick={() => this.ChangeTab("updateprice")}
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
                      onClick={() => this.ChangeTab("getverified")}
                      activeClassName={
                        this.state.type === "getverified" ? "active" : ""
                      }
                    >
                      Get Verified
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.booking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("booking")}
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
                      onClick={() => this.ChangeTab("allbooking")}
                      activeClassName={
                        this.state.type === "allbooking" ? "active" : ""
                      }
                    >
                      All Bookings
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  My Reviews <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chats <span>(0)</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("chat")}
                      activeClassName={
                        this.state.type === "chat" ? "active" : ""
                      }
                    >
                      <div className="user-chat-side">
                        <div className="user-icon">T</div>
                        <div className="chat-text">
                          <h5>No User</h5>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        );
      default:
        return (
          <div className="edit-personal">
            <ul>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
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
                      onClick={() => this.ChangeTab("uploadimage")}
                      activeClassName={
                        this.state.type === "uploadimage" ? "active" : ""
                      }
                    >
                      Manage gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("changepassword")}
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
                      onClick={() => this.ChangeTab("updateprice")}
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
                      onClick={() => this.ChangeTab("getverified")}
                      activeClassName={
                        this.state.type === "getverified" ? "active" : ""
                      }
                    >
                      Get Verified
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.booking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("booking")}
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
                      onClick={() => this.ChangeTab("allbooking")}
                      activeClassName={
                        this.state.type === "allbooking" ? "active" : ""
                      }
                    >
                      All Bookings
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  My Reviews <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chats <span>(0)</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("chat")}
                      activeClassName={
                        this.state.type === "chat" ? "active" : ""
                      }
                    >
                      <div className="user-chat-side">
                        <div className="user-icon">T</div>
                        <div className="chat-text">
                          <h5>No User</h5>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        );
    }
  };

  componentDidMount = async () => {
    let token = localStorage.getItem("TOKEN");
    if (!token) {
      this.props.history.push("/");
    } else {
      const decode = jwt_decode(localStorage.getItem("TOKEN"));
      switch (decode.role) {
        case "user":
          this.props.history.push(`/user/dashboard/${decode._id}`);
          break;
        case "agency":
          this.props.history.push(`/user/agency/dashboard/${decode._id}`);
          break;
        default:
          break;
      }
      const result = await getData(
        "escort/get-escort-details/" + this.props.match.params.id
      );
      const getAllBooking = await getData(
        "booking/get-booking-by-escort/" + this.props.match.params.id
      );
      if (!result.response) {
        if (!getAllBooking.response) {
          this.setState({ booking: getAllBooking.data.data });
        }
        console.log("result: ", result);
        if (result.data.data !== null) {
          this.setState({
            escortDetails: result.data.data,
            isOnline: result.data.data.isOnline,
          });
        } else {
          this.props.history.push(`/page-not-found`);
        }
      } else {
        this.props.history.push(`/page-not-found`);
      }
      const review = await getData(
        `review/get-review-by-escort/${this.props.match.params.id}`
      );
      if (!review.response) {
        this.setState({ reviews: review.data.data });
      } else {
        console.log("err: ", review.response);
      }
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.isUpdated !== this.state.isUpdated) {
      const result = await getData(
        "escort/get-escort-details/" + this.props.match.params.id
      );

      if (!result.response) {
        this.setState({ escortDetails: result.data.data });
      } else {
        console.log("updatedError: ", result.response);
      }
    }
  };

  handleEscortImageUploads = (newImages) => {
    let newEscortDetail = { ...this.state.escortDetails };
    newEscortDetail.images = [...newEscortDetail.images, ...newImages];
    this.setState({ escortDetails: newEscortDetail });
  };

  handleEscortImageDelete = (escortDetails) => {
    this.setState({ escortDetails: escortDetails });
  };

  handleUpdateProfile = () => {
    this.setState({ isUpdated: !this.state.isUpdated });
  };

  onBookingModeChange = async (e) => {
    const result = await postData("escort/change-booking-status");
    if (!result.response) {
      this.handleUpdateProfile();
    } else {
      console.log("err: ", result.response);
    }
  };

  onOnlineModeChange = async (e) => {
    const body = {
      id: this.state.escortDetails._id,
      prevStatus: this.state.isOnline.toString(),
    };
    console.log(body);
    const result = await postData("escort/change-online-status", body);
    console.log("online", result);
    if (!result.response) {
      this.setState({
        isOnline: result.data.isOnline,
      });
    } else {
      console.log("err: ", result.response);
    }
  };

  onCheckOnline = async (e) => {
    // const result = await postData("escort/change-booking-status");
    // if (!result.response) {
    //   this.handleUpdateProfile();
    // } else {
    //   console.log("err: ", result.response);
    // }
    console.log("check Online");
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
                <UploadProfile
                  userId={this.state.escortDetails._id}
                  profileImage={this.state.escortDetails.profileImg}
                  username={this.state.escortDetails.username}
                />
                {this.renderSideMenu(this.state.type)}
              </Col>
              <Col md="9">
                <div className="profile-box">
                  <h2 className="onlineiuser">
                    {this.state.escortDetails.name}
                    <span>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={this.state.isOnline ? "Online" : "Offline"}
                        checked={this.state.isOnline}
                        onChange={this.onOnlineModeChange}
                      />

                      <Tooltip
                        title={
                          this.state.escortDetails.outCallRate.length
                            ? ""
                            : "Add rates to enable booking"
                        }
                        aria-label="add"
                      >
                        <Form.Check
                          type="switch"
                          id="custom-switch1"
                          label={
                            !this.state.escortDetails.acceptingBooking
                              ? "Not Accepting Bookings"
                              : "Accepting Bookings"
                          }
                          checked={this.state.escortDetails.acceptingBooking}
                          onChange={this.onBookingModeChange}
                          disabled={
                            this.state.escortDetails.outCallRate.length
                              ? false
                              : true
                          }
                        />
                      </Tooltip>
                    </span>
                  </h2>

                  <div className="main-user">
                    <Row>
                      <Col md="3">
                        <span>
                          <i className="flaticon-calendar"></i> Joined{" "}
                          {this.state.escortDetails.createAt
                            ? this.state.escortDetails.createAt.split("T")[0]
                            : ""}
                        </span>
                      </Col>
                      <Col md="3">
                        <span>
                          <i className="flaticon-phone"></i>{" "}
                          {this.state.escortDetails.contactNumber
                            ? this.state.escortDetails.countryCode +
                              " " +
                              this.state.escortDetails.contactNumber.toString()
                            : ""}
                        </span>
                      </Col>
                      <Col md="6">
                        <span>
                          <i className="flaticon-envelope"></i>{" "}
                          {this.state.escortDetails.email}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
                {/* <div className="user-tabs-main">
                  <div className="user-tabs">
                    <ul>
                      <li>
                        <NavLink
                          to="#"
                          onClick={() => this.ChangeTab("personalinfo")}
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
                          onClick={() => this.ChangeTab("booking")}
                          activeClassName={
                            this.state.type === "booking" ||
                            this.state.type === "allbooking"
                              ? "active-user"
                              : ""
                          }
                        >
                          My Booking <span>{this.state.booking.length}</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="#"
                          onClick={() => this.ChangeTab("review")}
                          activeClassName={
                            this.state.type === "review" ? "active-user" : ""
                          }
                        >
                          My Reviews <span>{this.state.reviews.length}</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="#"
                          onClick={() => this.ChangeTab("chat")}
                          activeClassName={
                            this.state.type === "chat" ? "active-user" : ""
                          }
                        >
                          Chats <span>0</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div> */}
                <div className="userdiv">
                  {this.state.type === "personalinfo" ? (
                    <>
                      {console.log(this.state.type)}
                      <PersonalInfo
                        handleUpdateProfile={this.handleUpdateProfile}
                        escortDetail={this.state.escortDetails}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {this.state.type === "uploadimage" ? (
                    <UploadImage
                      userId={this.state.escortDetails._id}
                      images={this.state.escortDetails.images}
                      username={this.state.escortDetails.username}
                      handleEscortImageUploads={this.handleEscortImageUploads}
                      handleEscortImageDelete={this.handleEscortImageDelete}
                      handleUpdateProfile={this.handleUpdateProfile}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.type === "changepassword" ? (
                    <ChangePassword userId={this.state.escortDetails._id} />
                  ) : (
                    ""
                  )}
                  {this.state.type === "updateprice" ? (
                    <UpdatePrice
                      userId={this.state.escortDetails._id}
                      outCallRate={this.state.escortDetails.outCallRate}
                      inCallRate={this.state.escortDetails.inCallRate}
                      acceptingBooking={
                        this.state.escortDetails.acceptingBooking
                      }
                      handleUpdateProfile={this.handleUpdateProfile}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.type === "getverified" ? <GetVerified /> : ""}
                  {this.state.type === "booking" ? (
                    <Booking booking={this.state.booking} />
                  ) : (
                    ""
                  )}
                  {this.state.type === "allbooking" ? (
                    <AllBooking booking={this.state.booking} />
                  ) : (
                    ""
                  )}
                  {this.state.type === "review" ? (
                    <Review userId={this.state.escortDetails._id} />
                  ) : (
                    ""
                  )}
                  {this.state.type === "chat" ? <Chat /> : ""}
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
