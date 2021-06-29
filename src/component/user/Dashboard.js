import React, { Component } from "react";
import { Container, Breadcrumb, Row, Col, Dropdown } from "react-bootstrap";
import Booking from "./editprofile/Booking";
import { NavLink } from "react-router-dom";
import EditProfile from "./editprofile/EditProfile";
import UpdateProfile from "./editprofile/UpdateProfile";
import Chat from "./editprofile/Chat";
import UploadProfile from "./editprofile/UploadProfile";
import MyReview from "./editprofile/MyReview";
import Header from "../Header";
import Footer from "../Footer";

import jwt_decode from "jwt-decode";
import { getData } from "../FetchNodeServices";

export default class Dashboard extends Component {
  // state = {
  //   username: "",
  // };
  constructor() {
    super();
    this.state = {
      type: "editprofile",
      getemail: "",
      getname: "",
      getcontactnumber: "",
      gethotelname: "",
      getspecialrequest: "",
      getid: "",
      getdate: "",

      headerUserDetails: {},
      userBooking: [],
      booking: "inProcessBooking",
      filteredBooking: [],
      reviews: [],
      isUpdated: false,
    };
  }
  ChangeTab = (type) => {
    this.setState({
      type: type,
    });
    if (type === "booking") {
      if (this.state.booking === "inProcessBooking") {
        this.inProgressBookingFilter();
      } else if (this.state.booking === "completedBooking") {
        this.completedBookingFilter();
      }
    }
  };
  componentDidMount = async () => {
    let token = localStorage.getItem("TOKEN");
    if (!token) {
      this.props.history.push("/");
    } else {
      const decode = jwt_decode(localStorage.getItem("TOKEN"));
      switch (decode.role) {
        case "escort":
          this.props.history.push(`/user/escort/dashboard/${decode._id}`);
          break;
        case "agency":
          this.props.history.push(`/user/agency/dashboard/${decode._id}`);
          break;
        default:
          break;
      }
      console.log("v1: ", this.props.match.params.id);
      console.log("v: ");
      const result = await getData(
        `user/get-user-details/${this.props.match.params.id}`
      );
      const userBooking = await getData(
        `booking/get-booking-by-user/${this.props.match.params.id}`
      );
      if (!result.response && result.data.data !== null) {
        console.log("get: ", result.data);
        this.setState({
          headerUserDetails: result.data.data,
          userBooking: userBooking.data.data,
        });
      } else {
        this.props.history.push(`/page-not-found`);
      }
      const reviews = await getData(
        `review/get-review-by-user/${this.props.match.params.id}`
      );
      if (!reviews.response) {
        console.log(reviews.data.data);
        this.setState({ reviews: reviews.data.data });
      } else {
        console.log(reviews.response);
      }
    }
  };

  handleUpdateProfile = () => {
    this.setState({ isUpdated: !this.state.isUpdated });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.isUpdated !== this.state.isUpdated) {
      const result = await getData(
        `user/get-user-details/${this.props.match.params.id}`
      );
      if (!result.response) {
        console.log("Updated: ", result.data);
        this.setState({
          headerUserDetails: result.data.data,
        });
      } else {
        console.log("updatedError: ", result.response);
      }
    }
  };

  inProgressBookingFilter = () => {
    let allBooking = [...this.state.userBooking];
    const filteredBooking = allBooking.filter(
      (booking) => !booking.isCompleted
    );
    this.setState({ filteredBooking });
  };

  completedBookingFilter = () => {
    let allBooking = [...this.state.userBooking];
    const filteredBooking = allBooking.filter((booking) => booking.isCompleted);
    this.setState({ filteredBooking });
  };
  renderSideMenu = (type) => {
    switch (type) {
      case "editprofile":
        return (
          <div className="edit-personal">
            <ul>
              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Profile
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("editprofile")}
                      activeClassName={
                        this.state.type === "editprofile" ? "active" : ""
                      }
                    >
                      Edit Personal Info
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("updateprofile")}
                      activeClassName={
                        this.state.type === "updateprofile" ? "active" : ""
                      }
                    >
                      Update Password
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.userBooking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        this.ChangeTab("booking");
                        this.setState({ booking: "inProcessBooking" });
                        this.inProgressBookingFilter();
                      }}
                      activeClassName={
                        this.state.booking === "inProcessBooking"
                          ? "active"
                          : ""
                      }
                    >
                      Inprocess Bookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        this.ChangeTab("booking");
                        this.setState({ booking: "completedBooking" });
                        this.completedBookingFilter();
                      }}
                      activeClassName={
                        this.state.booking === "completedBooking"
                          ? "active"
                          : ""
                      }
                    >
                      Completed Booking
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  Review <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chat <span>(0)</span>
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
      case "updateprofile":
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
                        onClick={() => this.ChangeTab("editprofile")}
                        activeClassName={
                          this.state.type === "editprofile" ? "active" : ""
                        }
                      >
                        Edit Personal Info
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => this.ChangeTab("updateprofile")}
                        activeClassName={
                          this.state.type === "updateprofile" ? "active" : ""
                        }
                      >
                        Update Password
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    My Booking <span>({this.state.userBooking.length})</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as="ul">
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => {
                          this.ChangeTab("booking");
                          this.setState({ booking: "inProcessBooking" });
                          this.inProgressBookingFilter();
                        }}
                        activeClassName={
                          this.state.booking === "inProcessBooking"
                            ? "active"
                            : ""
                        }
                      >
                        Inprocess Bookings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={() => {
                          this.ChangeTab("booking");
                          this.setState({ booking: "completedBooking" });
                          this.completedBookingFilter();
                        }}
                        activeClassName={
                          this.state.booking === "completedBooking"
                            ? "active"
                            : ""
                        }
                      >
                        Completed Booking
                      </NavLink>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>

                <li>
                  <a onClick={() => this.ChangeTab("review")}>
                    Review <span>({this.state.reviews.length})</span>
                  </a>
                </li>

                <Dropdown as="li">
                  <Dropdown.Toggle as="a" variant="false">
                    Chat <span>(0)</span>
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
                      onClick={() => this.ChangeTab("editprofile")}
                      activeClassName={
                        this.state.type === "editprofile" ? "active" : ""
                      }
                    >
                      Edit Personal Info
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("updateprofile")}
                      activeClassName={
                        this.state.type === "updateprofile" ? "active" : ""
                      }
                    >
                      Update Password
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.userBooking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        this.ChangeTab("booking");
                        this.setState({ booking: "inProcessBooking" });
                        this.inProgressBookingFilter();
                      }}
                      activeClassName={
                        this.state.booking === "inProcessBooking"
                          ? "active"
                          : ""
                      }
                    >
                      Inprocess Bookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        this.ChangeTab("booking");
                        this.setState({ booking: "completedBooking" });
                        this.completedBookingFilter();
                      }}
                      activeClassName={
                        this.state.booking === "completedBooking"
                          ? "active"
                          : ""
                      }
                    >
                      Completed Booking
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  Review <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chat <span>(0)</span>
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
                      onClick={() => this.ChangeTab("editprofile")}
                      activeClassName={
                        this.state.type === "editprofile" ? "active" : ""
                      }
                    >
                      Edit Personal Info
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("updateprofile")}
                      activeClassName={
                        this.state.type === "updateprofile" ? "active" : ""
                      }
                    >
                      Update Password
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.userBooking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        this.ChangeTab("booking");
                        this.setState({ booking: "inProcessBooking" });
                        this.inProgressBookingFilter();
                      }}
                      activeClassName={
                        this.state.booking === "inProcessBooking"
                          ? "active"
                          : ""
                      }
                    >
                      Inprocess Bookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        this.ChangeTab("booking");
                        this.setState({ booking: "completedBooking" });
                        this.completedBookingFilter();
                      }}
                      activeClassName={
                        this.state.booking === "completedBooking"
                          ? "active"
                          : ""
                      }
                    >
                      Completed Booking
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  Review <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chat <span>(0)</span>
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
                      onClick={() => this.ChangeTab("editprofile")}
                      activeClassName={
                        this.state.type === "editprofile" ? "active" : ""
                      }
                    >
                      Edit Personal Info
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => this.ChangeTab("updateprofile")}
                      activeClassName={
                        this.state.type === "updateprofile" ? "active" : ""
                      }
                    >
                      Update Password
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  My Booking <span>({this.state.userBooking.length})</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ul">
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        this.ChangeTab("booking");
                        this.setState({ booking: "inProcessBooking" });
                        this.inProgressBookingFilter();
                      }}
                      activeClassName={
                        this.state.booking === "inProcessBooking"
                          ? "active"
                          : ""
                      }
                    >
                      Inprocess Bookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      onClick={() => {
                        this.ChangeTab("booking");
                        this.setState({ booking: "completedBooking" });
                        this.completedBookingFilter();
                      }}
                      activeClassName={
                        this.state.booking === "completedBooking"
                          ? "active"
                          : ""
                      }
                    >
                      Completed Booking
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <a onClick={() => this.ChangeTab("review")}>
                  Review <span>({this.state.reviews.length})</span>
                </a>
              </li>

              <Dropdown as="li">
                <Dropdown.Toggle as="a" variant="false">
                  Chat <span>(0)</span>
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

  render() {
    // console.log("dsdsdds", this.state);
    // let fully = this.state.full;
    // console.log("fully", fully);
    return (
      <>
        <Header />
        <div className="login-bg user-dashboard">
          <Container>
            <Breadcrumb className="user-breadcrumb">
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">User</Breadcrumb.Item>
              <Breadcrumb.Item active>{this.state.type}</Breadcrumb.Item>
            </Breadcrumb>

            <Row>
              <Col md="3">
                <UploadProfile
                  userId={this.props.match.params.id}
                  profileImage={this.state.headerUserDetails.profileImg}
                  username={this.state.headerUserDetails.username}
                />
                {this.renderSideMenu(this.state.type)}
              </Col>
              <Col md="9">
                <div className="profile-box">
                  <h2> {this.state.headerUserDetails.name}</h2>
                  <div className="main-user">
                    <Row>
                      <Col md="3">
                        <span>
                          <i className="flaticon-calendar"></i> Joined{" "}
                          {this.state.headerUserDetails.createdAt
                            ? this.state.headerUserDetails.createdAt.split(
                                "T"
                              )[0]
                            : ""}
                        </span>
                      </Col>
                      <Col md="3">
                        <span>
                          <i className="flaticon-phone"></i>{" "}
                          {this.state.headerUserDetails.contactNumber
                            ? this.state.headerUserDetails.countryCode +
                              " " +
                              this.state.headerUserDetails.contactNumber.toString()
                            : ""}
                        </span>
                      </Col>
                      <Col md="5">
                        <span>
                          <i className="flaticon-envelope"></i>{" "}
                          {this.state.headerUserDetails.email}
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
                          onClick={() => this.ChangeTab("editprofile")}
                          activeClassName={
                            this.state.type === "editprofile" ||
                            this.state.type === "updateprofile"
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
                            this.state.type === "booking" ? "active-user" : ""
                          }
                        >
                          My Booking{" "}
                          <span>{this.state.userBooking.length}</span>
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
                  {this.state.type === "editprofile" ? (
                    <EditProfile
                      userId={this.props.match.params.id}
                      handleUpdateProfile={this.handleUpdateProfile}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.type === "updateprofile" ? (
                    <UpdateProfile userId={this.props.match.params.id} />
                  ) : (
                    ""
                  )}
                  {this.state.type === "booking" ? (
                    this.state.booking === "inProcessBooking" ? (
                      <Booking bookingList={this.state.filteredBooking} />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {this.state.type === "booking" ? (
                    this.state.booking === "completedBooking" ? (
                      <Booking bookingList={this.state.filteredBooking} />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {this.state.type === "review" ? (
                    <MyReview userId={this.props.match.params.id} />
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
