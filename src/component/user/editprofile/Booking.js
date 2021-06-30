import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import Avatar from "../../../images/avatar1.png";
import noBookingImage from "../../../images/Group 4056@2x.png";
import kookyLogo from "../../../images/logo.png";

import Popup from "../../popup/popup";

import { postData } from "../../FetchNodeServices";

export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      rating: 5,
      bookingList: [],
      review: "",
      escortName: "the",
      errors: {},
    };
  }

  handlePopupClose = () => {
    this.setState({ popup: false });
  };
  componentDidMount() {
    this.setState({ bookingList: this.props.bookingList || [] });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.bookingList !== this.props.bookingList) {
      this.setState({ bookingList: this.props.bookingList });
    }
  }

  onStarClick = (nextValue, prevValue, name) => {
    console.log(
      "name: %s, nextValue: %s, prevValue: %s",
      name,
      nextValue,
      prevValue
    );
    this.setState({ rating: nextValue });
  };

  submitReview = async (booking) => {
    const body = {
      escortId: booking.escortID,
      customerId: booking.customerID,
      rating: this.state.rating,
      review: this.state.review,
      bookingId: booking._id,
    };
    console.log("BOOKING: ", body);
    const result = await postData("review/review-escort", body);
    if (!result.response) {
      this.setState({ popup: false  });
    } else {
      console.log(result.response);
      this.setState({ errors: result.response.data.errors });
    }
  };
  handleClickComplete = async (idx) => {
    const body = {
      bookingId: this.state.bookingList[idx]._id,
    };
    const complete = await postData(
      "booking/complete-booking-by-escort-or-user",
      body
    );
    if (complete.data) {
      let newBooking = [...this.state.bookingList];
      newBooking.splice(idx, 1);
      newBooking.push(complete.data);
      this.setState({ bookingList: newBooking });
    }
  };

  render() {
    return (
      <>
        <div className="edit-profilebox" style={{ minHeight: 350 }}>
          {this.state.bookingList.length ? (
            this.state.bookingList.map((u, index) => {
              console.log(u);
              const time =
                Number(u.time.split("T")[1].split(":")[0]) > 12
                  ? [Number(u.time.split("T")[1].split(":")[0]) - 12,"PM"]
                  : [u.time.split("T")[1].split(":")[0],"AM"];
              return (
                <div className="cardbox mb-4" key={index}>
                  <Row>
                    <Col md="3">
                      <div className="user-box-img">
                        <img src={u.escortProfileImg || Avatar} alt="" />
                      </div>
                    </Col>
                    <Col md="9">
                      <div className="timebox">
                        <h3>
                          {u.escortName} ({u.escortGender})
                          <span>
                            <i className="flaticon-calendar"></i>{" "}
                            {u.date.split(" ")[0]}
                          </span>
                        </h3>
                        <Row>
                          <Col md="8">
                            <ul>
                              <li>
                                <i className="flaticon-clock"></i>{" "}
                                {time[0].toString() +
                                  ":" +
                                  u.time.split("T")[1].split(":")[1]}{" "}
                                {time[1]}
                              </li>
                              <li>
                                <i className="flaticon-alarm-clock"></i>{" "}
                                {u.duration}hr
                              </li>
                              {u.outCall ? (
                                <>
                                  <li>
                                    <i className="flaticon-building"></i>{" "}
                                    {u.hotal.name}, {u.hotal.roomNumber}
                                  </li>
                                </>
                              ) : (
                                <li>
                                  <i className="flaticon-building"></i>{" "}
                                  {u.address}
                                </li>
                              )}
                              <li>
                                <i className="flaticon-credit-card"></i> $
                                {u.outCall
                                  ? u.outCallPlan.rate
                                  : u.inCallPlan.rate}
                              </li>
                            </ul>
                          </Col>
                          <Col md="4">
                            <div className="btn-fem">
                              {!u.isReviewed ? (
                                u.isCompleted ? (
                                  <Button
                                    className="mb-2 btn-block"
                                    variant={!u.isReviewed ? "dark" : "success"}
                                    disabled={!u.isCompleted}
                                    onClick={(u) =>
                                      this.setState({
                                        popup: true,
                                        escortName: u.escortName,
                                      })
                                    }
                                  >
                                    Rate Escort
                                  </Button>
                                ) : null
                              ) : (
                                <Button
                                  className="mb-2 btn-block"
                                  variant={!u.isReviewed ? "dark" : "success"}
                                  disabled
                                  onClick={() => this.setState({ popup: true })}
                                >
                                  Review Done
                                </Button>
                              )}
                              {new Date(u.bookingValidTill) < Date.now() &&
                              !u.isAccepted &&
                              !u.isRejected ? (
                                <Button
                                  className=""
                                  disabled
                                  style={{
                                    backgroundColor: "red",
                                    border: "none",
                                    marginLeft: "4vw",
                                  }}
                                >
                                  Missed
                                </Button>
                              ) : u.isAccepted &&
                                new Date(u.date) < new Date() &&
                                !u.isCompleted ? (
                                <Button
                                  onClick={() =>
                                    this.handleClickComplete(index)
                                  }
                                >
                                  Mark as Complete
                                </Button>
                              ) : (
                                <Button
                                  variant={
                                    u.isCompleted
                                      ? "success"
                                      : u.isAccepted
                                      ? "primary"
                                      : u.isRejected
                                      ? "warning"
                                      : "dark"
                                  }
                                  className="btn-block"
                                >
                                  {u.isCompleted
                                    ? "Completed"
                                    : u.isAccepted
                                    ? "In Process"
                                    : u.isRejected
                                    ? "Rejected"
                                    : "In Process"}
                                </Button>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    {this.state.popup && (
                      <Popup
                        content={
                          <>
                            <div style={{ textAlign: "center" }}>
                              {this.state.escortName}
                            </div>
                            <div style={{ textAlign: "center", marginTop: 20 }}>
                              <span style={{ fontSize: "5vh" }}>
                                <StarRatingComponent
                                  name="app2"
                                  starCount={5}
                                  value={this.state.rating}
                                  onStarClick={this.onStarClick}
                                />
                                <lable
                                  htmlFor="app2"
                                  style={{
                                    display: this.state.errors.rating
                                      ? "block"
                                      : "none",
                                    color: "red",
                                    fontSize: "20px",
                                  }}
                                >
                                  {this.state.errors.rating}
                                </lable>
                              </span>
                              <div>
                                <textarea
                                  name="review"
                                  style={{
                                    width: "700px",
                                    height: "100px",
                                    paddingLeft: 30,
                                    paddingTop: 20,
                                    marginLeft: 40,

                                    marginBottom: 40,
                                  }}
                                  value={this.state.review}
                                  onChange={(e) =>
                                    this.setState({ review: e.target.value })
                                  }
                                  placeholder="Enter your Review here"
                                />
                                <lable
                                  htmlFor="review"
                                  style={{
                                    display: this.state.errors.review
                                      ? "block"
                                      : "none",
                                    color: "red",
                                  }}
                                >
                                  {this.state.errors.review}
                                </lable>
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <Button
                                onClick={() => this.submitReview(u)}
                                color="primary"
                              >
                                Submit Reveiw
                              </Button>
                            </div>
                          </>
                        }
                        handleClose={this.handlePopupClose}
                      />
                    )}
                  </Row>
                </div>
              );
            })
          ) : (
            <div>
              <img
                style={{
                  position: "relative",
                  textAlign: "center",
                  marginLeft: 290,
                  marginTop: 40,
                }}
                width="220"
                height="240"
                src={noBookingImage}
                alt=""
              />
              <p style={{ color: "#E100FF", textAlign: "center" }}>
                <h2>No Booking Available</h2>Please make a booking to get our
                services{" "}
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}
