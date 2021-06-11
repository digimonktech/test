import React, { Component } from "react";

import "bs-stepper/dist/css/bs-stepper.min.css";
import Stepper from "bs-stepper";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import Region from "./Region/Region";
import City from "./Region/City";
import OutCall from "./search/OutCall";
import RangeSlider from "./search/RangeSlider";
import SearchTabs from "./search/SearchTabs";
import kookyLogo from "../../images/logo.png"
import { Link } from "react-router-dom";

export default class Booking extends Component {
  constructor() {
    super();
    this.state = {
      duration: true,
      type: "Region",
      stepFourType: "duration",
      hours: 0o0,
      minutes: 0o0,
      theDay: "Today",
      addition_false: false,
      subtraction_false: true,
      Bookingdate: 0,
      durationHour: 3,
      currentAmOrPm: "am",
      currentHour: -1,
      currentMinute: -1,
      amOrPm: "am",
      hours24: 0o0,
      filter: { inCall: false, outCall: true, gender: "female" },
    };
  }
  DurationBox() {
    this.setState({
      duration: !this.state.duration,
    });
  }
  ChangeTab = (type) => (e) => {
    this.setState({
      type: type,
    });
  };

  changeNewTab = (type) => {
    this.setState({
      type: type,
    });
  };

  handleFilter = (field, value) => {
    let newFilter = { ...this.state.filter };
    newFilter[field] = value;
    if (newFilter.outCall) {
      newFilter.inCall = false;
    } else if (newFilter.inCall) {
      newFilter.outCall = true;
    }
    this.setState({ filter: newFilter });
    console.log(newFilter);
  };

  componentDidMount() {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
    const date = new Date();
    const currentHour = date.getHours();
    // console.log("currentHour", currentHour);
    const currentMinute = date.getMinutes();
    //  console.log("currentHour,min",currentHour,currentMinute);

    const minit =
      Math.ceil(currentMinute / 15) * 15 <= 45
        ? Math.ceil(currentMinute / 15) * 15
        : 0;
    var hour24 = 0;
    if (currentHour === 23) {
      hour24 = 1;
      this.setState({ Bookingdate: date.getDate() + 1 , theDay:"tommorow"});
    } else if (currentHour === 0) {
      hour24 = 2;
      this.setState({ Bookingdate: date.getDate() ,theDay:"tommorow"});
    } else if (currentHour === 22) {
      hour24 = 0;
      this.setState({ Bookingdate: date.getDate() + 1 });
    } else {
      hour24 = currentHour + 2;
      this.setState({ Bookingdate: date.getDate() });
    }
    var hour = 0;
    if (currentHour != 23) {
      hour = currentHour <= 10 ? currentHour + 2 : currentHour - 10;
    } else {
      hour = 1;
    }
    console.log(hour24,hour);

    //  console.log("currenthours, hours , hour24 ", currentHour,hour,hour24);
    this.setState({
      //for delay of 2 hours we add 2
      hours: minit === 0 ? hour + 1 : hour,
      currentHour: minit === 0 ? hour + 1 : hour,
      hours24: hour24,
      minutes: minit,
      currentMinute: minit,
      amOrPm: currentHour + 2 > 11 && currentHour + 2 < 24 ? "pm" : "am",
      currentAmOrPm: currentHour + 2 > 11 && currentHour + 2 < 24 ? "pm" : "am",
    });
    // console.log(this.state.hours)
  }

  onSubmit(e) {
    e.preventDefault();
  }

  duration = (value) => {
    this.setState({ durationHour: value });
  };
  stepFour = () => {
    switch (this.state.stepFourType) {
      case "duration":
        return (
          <div className="findbooking">
            <div className="booking-title">
              Duration
              <span
                className="fas fa-times"
                onClick={() => window.location.replace("/")}
              ></span>
            </div>
            <RangeSlider duration={this.duration} />
            <div className="text-right">
              <button
                className="btn btn-outline-dark mr-2"
                onClick={() => this.stepper.previous()}
              >
                Back
              </button>
              {/* <button
                className="btn btn-primary"
                onClick={() => this.setState({ stepFourType: "search" })}
              >
                Search
              </button> */}
              <Link
                to={{
                  pathname: "/search-escort",
                  state: { filter: this.state.filter },
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={() => this.setState({ stepFourType: "search" })}
                >
                  Search
                </button>
              </Link>
            </div>
          </div>
        );
      case "search":
        console.log("SEARCH : SearchTabs");
        return (
          <SearchTabs
            details={{
              date: `${new Date().toISOString().split("T")[0]} ${
                this.state.amOrPm === "pm"
                  ? this.state.hours + 12
                  : this.state.hours
              }:${this.state.minutes}`,
              duration: this.state.durationHour,
              filter: { ...this.state.filter },
            }}
            history={this.props.history}
            stepper={this.stepper}
          />
        );
      default:
        return (
          <div className="findbooking">
            <div className="booking-title">
              Duration
              <span className="fas fa-times"></span>
            </div>
            <RangeSlider />
            <div className="text-right">
              <button
                className="btn btn-outline-dark mr-2"
                onClick={() => this.stepper.previous()}
              >
                Back
              </button>
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        );
    }
  };

  //// for adition
  addition = () => {


    const date = new Date();
    if (this.state.hours < 12) {
      this.setState({
        hours: this.state.hours + 1,
      });
    } else {
      this.setState({
        hours: 1,
      });
    }
    if (this.state.hours24 < 23) {
      this.setState({
        hours24: this.state.hours24 + 1,
      });
    } else {
      this.setState({
        hours24: 0,
      });
    }
  
    if (
      this.state.currentHour === this.state.hours24 -1 &&
      this.state.Bookingdate !== date.getDate()
    ) {
      // console.log("hi",this.state.Bookingdate,date.getDate());
      this.setState({
        addition_false: true,
      });
    }
    console.log(
      "updated hour,amorpm,hou24,currenthour",
      this.state.hours,
      this.state.amOrPm,
      this.state.hours24,
      this.state.currentHour
    );
  };
  // Add Minutes
  // Add Minutes
  // Add Minutes
  minutes = () => {
    // const date = new Date();
    this.setState({ subtraction_false: false });
    // console.log(
    //   "minutes,hour,hour24",
    //   this.state.minutes + 15,
    //   this.state.hours,
    //   this.state.hours24
    // );
    console.log('cuurent hour',this.state.currentHour,this.state.hours24);
    if(this.state.currentHour===11){
      if (this.state.hours24 === 22 && this.state.minutes === 45) {
        this.setState({
          Bookingdate: this.state.Bookingdate + 1,
          amOrPm: "am",
          theDay: "Tommorow",
        });
      }
      if (this.state.hours24 === 11 && this.state.minutes === 45) {
        this.setState({
          amOrPm: "pm",
        });
      }
    }
    else {
    if (this.state.hours24 === 23 && this.state.minutes === 45) {
      this.setState({
        Bookingdate: this.state.Bookingdate + 1,
        amOrPm: "am",
        theDay: "Tommorow",
      });
    }
  
    if (this.state.hours24 === 11 && this.state.minutes === 45) {
      this.setState({
        amOrPm: "pm",
      });
    }
  }
    if (this.state.minutes < 45) {
      this.setState({
        minutes: this.state.minutes + 15,
      });
    }

    if (this.state.minutes >= 45) {
      this.setState({
        minutes: 0,
      });
      this.addition();
      // console.log("CEHCKhOUR", this.state.hours);
    }
  };

  // Subtract Time from
  subtraction = () => {
    // const date = new Date();

    if (this.state.hours > 1 && this.state.hours <= 12) {
      this.setState({
        hours: this.state.hours - 1,
      });
    } else {
      this.setState({
        hours: 12,
      });
    }
    if (this.state.hours24 > 0 && this.state.hours24 < 24) {
      this.setState({
        hours24: this.state.hours24 - 1,
      });
    } else {
      this.setState({
        hours24: 23,
      });
    }
  };
  // Subtract Minutes
  redMinutes = () => {
    const date = new Date();
    if (this.state.hours24 === 11 && this.state.minutes === 45) {
      this.setState({
        amOrPm: "pm",
      });
    }
    this.setState({
      addition_false: false,
    });
    // console.log("hi",this.state.currentHour,this.state.hours24,this.state.Bookingdate,date.getDate());
    if (
      this.state.currentHour === this.state.hours &&
      this.state.Bookingdate === date.getDate()
    ) {
      this.setState({
        subtraction_false: true,
      });
    }

    if (this.state.minutes >= 15) {
      this.setState({
        minutes: this.state.minutes - 15,
      });
    }

    if (this.state.minutes === 0) {
      this.setState({
        minutes: 45,
      });
      this.subtraction();
    }
    if (this.state.hours24 === 0 && this.state.minutes === 0) {
      this.setState({
        Bookingdate: this.state.Bookingdate - 1,
        amOrPm: "pm",
        theDay: "Today",
      });
    }
    if (this.state.hours24 === 12 && this.state.minutes === 0) {
      this.setState({
        amOrPm: "am",
      });
    }

    // console.log("minutemin", this.state.minutes);

    // console.log("hours24",this.state.hours)
  };
  render() {
    return (
      <>
        <div className="booking-header">
          <Container>
            <div className="booking-menu">
           <Row>   <Col md="2"><a href="./"><img style={{}} src={kookyLogo} alt="Logo" /></a>
             </Col>
             <Col md="8">
              <h1>
                BOOK AN ESCORT
                {/* <span>
                  <i className="fas fa-bars"></i>
                </span> */}
              </h1>
              </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="stepers pt-4 pb-4">
          <Container>
            <Row>
              <Col md="12">
                <div id="stepper1" className="bs-stepper">
                  <div className="bs-stepper-header">
                    <div className="step" data-target="#test-l-1">
                      <button
                        className="step-trigger"
                        onClick={() => this.setState({ type: "Region" })}
                        disabled
                      >
                        <span className="bs-stepper-circle">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="bs-stepper-label">
                          <small>STEP 1</small> Country/City
                        </span>
                      </button>
                    </div>
                    <div className="line"></div>
                    <div className="step" data-target="#test-l-2">
                      <button className="step-trigger" disabled>
                        <span className="bs-stepper-circle">
                          <i className="fas fa-transgender-alt"></i>
                        </span>
                        <span className="bs-stepper-label">
                          <small>STEP 2</small>
                          Gender
                        </span>
                      </button>
                    </div>
                    <div className="line"></div>
                    <div className="step" data-target="#test-l-3">
                      <button className="step-trigger" disabled>
                        <span className="bs-stepper-circle">
                          <i className="far fa-clock"></i>
                        </span>
                        <span className="bs-stepper-label">
                          <small>STEP 3</small>
                          Time
                        </span>
                      </button>
                    </div>
                    <div className="line"></div>
                    <div className="step" data-target="#test-l-4">
                      <button
                        className="step-trigger"
                        onClick={() =>
                          this.setState({
                            duration: true,
                            stepFourType: "duration",
                          })
                        }
                        disabled
                      >
                        <span className="bs-stepper-circle">
                          <i className="fas fa-history"></i>
                        </span>
                        <span className="bs-stepper-label">
                          <small>STEP 4</small>
                          {this.state.stepFourType}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="bs-stepper-content mt-4">
                    <div id="test-l-1" className="content">
                      <div className="findbooking">
                        <div className="booking-title">
                          Select Country/City
                          <span
                            className="fas fa-times"
                            onClick={() => window.location.replace("/")}
                          ></span>
                        </div>
                        {this.state.type === "Region" ? (
                          <>
                          <Region
                            changeTab={this.changeNewTab}
                            handleFilter={this.handleFilter}
                          />
                           <Row  style={{marginTop:70}}>
                          <Col md="6">
                        <div className="text-left">
                          <a href="./">
              <button
                className="btn btn-outline-dark mr-2"
                
              >
                Back
              </button>
              </a>
              </div>
              </Col>
              <Col md="6">
                         <div className="text-right">
              <button
                className="btn btn-primary"
                onClick={() => this.stepper.next()}
              >
                Next
              </button>
              </div>
              </Col></Row>
                          </>
                        ) : (
                          ""
                        )}
                        {this.state.type === "city" ? (
                        <>
                          <City
                            stepper={this.stepper}
                            handleFilter={this.handleFilter}
                            country={this.state.filter.country}
                          />
                               <Row  style={{marginTop:70}}>
                          <Col md="6">
                        <div className="text-left">
                          <a href="./booking">
              <button
                className="btn btn-outline-dark mr-2"
                
              >
                Back
              </button>
             </a>
              </div>
              </Col>
              <Col md="6">
                         <div className="text-right">
              <button
                className="btn btn-primary"
                onClick={() => this.stepper.next()}
              >
                Next
              </button>
              </div>
              </Col></Row>
                          </>
                      
                        ) : (
                          ""
                        )}

                        {/* <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.stepper.next();
                            console.log("stepper: ", this.stepper);
                          }}
                        >
                          Next
                        </button> */}
                       
                      </div>
                    </div>
                    <div id="test-l-2" className="content">
                      <div className="findbooking">
                        <div className="booking-title">
                          Select Gender
                          <span
                            className="fas fa-times"
                            onClick={() => window.location.replace("/")}
                          ></span>
                        </div>
                        <Tab.Container
                          id="left-tabs-example"
                          defaultActiveKey="first"
                        >
                          <Nav variant="pills" className="row gendertabs">
                            <Col>
                              <Nav.Item>
                                <Nav.Link
                                  eventKey={
                                    this.state.filter.city &&
                                    (this.state.filter.city.femaleEscort
                                      .inCallAvaliable ||
                                      this.state.filter.city.femaleEscort
                                        .outCallAvaliable)
                                      ? "first"
                                      : "f"
                                  }
                                  onClick={() => {
                                    if (
                                      this.state.filter.city &&
                                      (this.state.filter.city.femaleEscort
                                        .inCallAvaliable ||
                                        this.state.filter.city.femaleEscort
                                          .outCallAvaliable)
                                    ) {
                                      this.handleFilter("gender", "female");
                                    } else {
                                      this.handleFilter("gender", "");
                                    }
                                  }}
                                >
                                  <p>
                                    <i className="flaticon-venus"></i>
                                  </p>
                                  FEMALE{" "}
                                  {this.state.filter.city &&
                                  (this.state.filter.city.femaleEscort
                                    .inCallAvaliable ||
                                    this.state.filter.city.femaleEscort
                                      .outCallAvaliable)
                                    ? ""
                                    : "(Coming Soon)"}
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                            <Col>
                              <Nav.Item>
                                <Nav.Link
                                  eventKey={
                                    this.state.filter.city &&
                                    (this.state.filter.city.maleEscort
                                      .inCallAvaliable ||
                                      this.state.filter.city.maleEscort
                                        .outCallAvaliable)
                                      ? "second"
                                      : "s"
                                  }
                                  onClick={() => {
                                    if (
                                      this.state.filter.city &&
                                      (this.state.filter.city.maleEscort
                                        .inCallAvaliable ||
                                        this.state.filter.city.maleEscort
                                          .outCallAvaliable)
                                    ) {
                                      this.handleFilter("gender", "male");
                                    } else {
                                      this.handleFilter("gender", "");
                                    }
                                  }}
                                >
                                  <p>
                                    <i className="flaticon-mars"></i>
                                  </p>
                                  MALE{" "}
                                  {this.state.filter.city &&
                                  (this.state.filter.city.maleEscort
                                    .inCallAvaliable ||
                                    this.state.filter.city.maleEscort
                                      .outCallAvaliable)
                                    ? ""
                                    : "(Coming Soon)"}
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                            <Col>
                              <Nav.Item>
                                <Nav.Link
                                  eventKey={
                                    this.state.filter.city &&
                                    (this.state.filter.city.transgenderEscort
                                      .inCallAvaliable ||
                                      this.state.filter.city.transgenderEscort
                                        .outCallAvaliable)
                                      ? "third"
                                      : "t"
                                  }
                                  onClick={() => {
                                    if (
                                      this.state.filter.city &&
                                      (this.state.filter.city.transgenderEscort
                                        .inCallAvaliable ||
                                        this.state.filter.city.transgenderEscort
                                          .outCallAvaliable)
                                    ) {
                                      this.handleFilter(
                                        "gender",
                                        "transgender"
                                      );
                                    } else {
                                      this.handleFilter("gender", "");
                                    }
                                  }}
                                >
                                  <p>
                                    <i className="flaticon-transgender"></i>
                                  </p>
                                  TRANSEXUAL{" "}
                                  {this.state.filter.city &&
                                  (this.state.filter.city.transgenderEscort
                                    .inCallAvaliable ||
                                    this.state.filter.city.transgenderEscort
                                      .outCallAvaliable)
                                    ? ""
                                    : "(Coming Soon)"}
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                          </Nav>

                          <Tab.Content className="mt-5 mb-5">
                            <Tab.Pane eventKey="first">
                              <OutCall handleFilter={this.handleFilter} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <OutCall handleFilter={this.handleFilter} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                              <OutCall handleFilter={this.handleFilter} />
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>

                        <div >
                          {this.state.filter.gender ? (
                            <>
                              <Row  style={{marginTop:70}}>
                          <Col md="6">
                              <div className="text-left">
                              <button
                                className="btn btn-outline-dark mr-2"
                                onClick={() => this.stepper.previous()}
                              >
                                Back
                              </button>
                              </div>
                              </Col>
                              <Col md="6">
                              <div className="text-right">
                              <button
                                className="btn btn-primary"
                                onClick={() => this.stepper.next()}
                              >
                                Next
                              </button>
                              </div>
                              </Col>
                              </Row>
                             
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div id="test-l-3" className="content text-center">
                      <div className="findbooking">
                        <div className="booking-title">
                          Time
                          <span
                            className="fas fa-times"
                            onClick={() => window.location.replace("/")}
                          ></span>
                        </div>
                        <div className="timepicker">
                          <div className="today">{this.state.theDay}</div>
                          <div className="screen__value">
                            <div className="tpicker__apm">
                              <small
                                className={
                                  this.state.amOrPm === "am" ? "active" : ""
                                }
                              >
                                AM
                              </small>
                              <small
                                className={
                                  this.state.amOrPm === "pm" ? "active" : ""
                                }
                              >
                                PM
                              </small>
                            </div>
                            <div className="tpicker__hhmm">
                              {this.state.hours}
                            </div>
                            <div className="tpicker__hhmm">
                              : {this.state.minutes || 0o0}
                            </div>
                          </div>

                          {/* <Form.Group></Form.Group> */}

                          <div className="plis buttondiv">
                            <button
                              className="mr-2 btn btn-lg"
                              disabled={this.state.subtraction_false}
                              onClick={() => this.redMinutes()}
                            >
                              <i className="fas fa-minus"></i>
                            </button>

                            <button
                              className="btn btn-lg"
                              disabled={this.state.addition_false}
                              onClick={() => this.minutes()}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <button
                            className="btn btn-outline-dark mr-2"
                            onClick={() => this.stepper.previous()}
                          >
                                                        Back
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.setState({
                                stepFourType: "duration",
                                filter: {
                                  ...this.state.filter,
                                  date: this.state.theDay,
                                  time:
                                    this.state.hours +
                                    ":" +
                                    this.state.minutes +
                                    " " +
                                    this.state.amOrPm,
                                },
                              });
                              this.stepper.next();
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="test-l-4" className="content">
                      {this.stepFour()}
                      {/* {this.state.duration  ? (
                        <>
                          
                        </>
                      ) : (
                        <>
                          <SearchTabs />
                        </>
                      )} */}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
