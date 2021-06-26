/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import man from "../../../images/man.png";
import noBookingImage from "../../../images/Group 4056@2x.png";
import { postData } from "../../FetchNodeServices";

export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }

  componentDidMount() {
    console.log("check booking",this.props.booking)
    const newBooking = this.props.booking
      ? this.props.booking.filter((booking) => !booking.isCompleted)
      : [];
    newBooking.sort((a, b) => {
      return new Date(a.bookingValidTill) > new Date(b.bookingValidTill);
    });
    this.setState({ bookings: newBooking });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.booking !== this.props.booking) {
      const newBooking = this.props.booking.filter(
        (booking) => !booking.isCompleted
      );
      newBooking.sort((a, b) => {
        return new Date(a.bookingValidTill) > new Date(b.bookingValidTill);
      });
      this.setState({ bookings: newBooking });
    }
  }

  handleClickAccept = async (idx) => {
    const body = {
      bookingId: this.state.bookings[idx]._id,
    };
    const accept = await postData("booking/accept-booking-by-escort", body);
    if (accept.data) {
      let newBooking = [...this.state.bookings];
      newBooking.splice(idx, 1);
      newBooking.push(accept.data);
      this.setState({ bookings: newBooking });
    }
  };

  handleClickComplete = async (idx) => {
    const body = {
      bookingId: this.state.bookings[idx]._id,
    };
    const complete = await postData(
      "booking/complete-booking-by-escort-or-user",
      body
    );
    if (complete.data) {
      let newBooking = [...this.state.bookings];
      newBooking.splice(idx, 1);
      newBooking.push(complete.data);
      this.setState({ bookings: newBooking });
    }
  };

  handleClickReject = async (idx) => {
    const body = {
      bookingId: this.state.bookings[idx]._id,
    };
    const reject = await postData("booking/reject-booking-by-escort", body);
    if (reject.data) {
      let newBooking = [...this.state.bookings];
      newBooking.splice(idx, 1);
      newBooking.push(reject.data);
      this.setState({ bookings: newBooking });
    }
  };

  convertTZ = (date) => {
    // convert timezone to GMT
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: "Asia/Jakarta" }
      )
    );
  };

  render() {
    return (
      <>
        <div className="edit-profilebox" style={{ minHeight: 295 }}>
          {this.state.bookings.length ? (
            this.state.bookings.map((u, index) => {
              return (
                <div className="cardbox mb-4" key={index}>
                  <Row>
                    <Col md="3">
                      <div className="user-box-img boxshow">
                        <img
                          src={
                            u.customerProfileImg ? u.customerProfileImg : man
                          }
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col md="9">
                      <div className="timebox">
                        <h3>
                          {u.customerName}
                          <span>
                            <i className="flaticon-calendar"></i>{" "}
                            {u.date.split(" ")[0]}
                          </span>
                        </h3>
                        <Row>
                          <Col md="5">
                            <ol>
                              <li>
                                <a href="mailto:rajat@xyz.com">
                                  <i className="flaticon-envelope"></i>{" "}
                                  {u.customerEmail}
                                </a>
                              </li>
                              {u.outCall ? (
                                <>
                                  <li>
                                    <a href="#">
                                      <i className="flaticon-building"></i>{" "}
                                      {u.hotal.name}
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i className="fa fa-bell"></i>{" "}
                                      {u.hotal.roomNumber}
                                    </a>
                                  </li>
                                </>
                              ) : (
                                <a href="#">
                                  <i className="flaticon-building"></i>{" "}
                                  {u.address}
                                </a>
                              )}
                              <li>
                                <a href="#">
                                  <i className="flaticon-alarm-clock"></i>{" "}
                                  {u.duration}hr
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  <i className="flaticon-download"></i>{" "}
                                  {u.inCall ? "In Call" : "Out Call"}
                                </a>
                              </li>
                            </ol>
                          </Col>
                          <Col md="7">
                            <div className="nedbooking">
                              <h4>Special Request</h4>
                              <p>{u.specialRequest}</p>
                            </div>
                            <div className="btn-fem text-right">
                              {new Date(u.bookingValidTill) < Date.now() &&
                              !u.isAccepted &&
                              !u.isRejected ? (
                                <Button className="" disabled>
                                  Missed
                                </Button>
                              ) : !u.isAccepted &&
                                !u.isRejected &&
                                new Date(u.bookingValidTill) > Date.now() ? (
                                <>
                                  <Button
                                    onClick={() =>
                                      this.handleClickAccept(index)
                                    }
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    variant="light"
                                    className=""
                                    onClick={() =>
                                      this.handleClickReject(index)
                                    }
                                  >
                                    Reject
                                  </Button>
                                </>
                              ) : u.isAccepted &&
                                new Date(u.date) < new Date() &&
                                !u.isCompleted ? (
                                <div className="btn-fem text-right">
                                  <Button
                                    disabled
                                    style={{ marginBottom: "10px" }}
                                  >
                                    Accepted
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      this.handleClickComplete(index)
                                    }
                                  >
                                    Mark as Completed
                                  </Button>
                                </div>
                              ) : u.isAccepted && u.isCompleted ? (
                                <Button>Completed</Button>
                              ) : u.isRejected ? (
                                <Button variant="dark" className="" disabled>
                                  Rejected
                                </Button>
                              ) : (
                                ""
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
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
                marginTop: 20,
              }}
              width="250"
              height="220"
              src={noBookingImage}
              alt=""
            />
            
            <p style={{color:"#E100FF",textAlign:"center"}}><h2>No Booking Available</h2>Please make a booking to get our services </p>
              </div>
          )}
        </div>
      </>
    );
  }
}
