import React, { Component } from "react";

import "bs-stepper/dist/css/bs-stepper.min.css";
import Stepper from "bs-stepper";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import Region from "./Region/Region";
import City from "./Region/City";
import OutCall from "./search/OutCall";
import RangeSlider from "./search/RangeSlider";
import SearchTabs from "./search/SearchTabs";
import View from "./search/View";

export default class Booking extends Component {
  constructor() {
    super();
    this.state = {
      duration: true,
      type: "Region",
      stepFourType: "duration",
      hours: 0o0,
      minutes: 0o0,
      addition_false: false,
      subtraction_false: false,
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
  componentDidMount() {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  stepFour = () => {
    switch (this.state.stepFourType) {
      case "duration":
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
              <button
                className="btn btn-primary"
                onClick={() => this.setState({ stepFourType: "search" })}
              >
                Search
              </button>
            </div>
          </div>
        );
      case "search":
        return (
          <SearchTabs
            NextPage={() => this.setState({ stepFourType: "SearchDetail" })}
          />
        );
      case "SearchDetail":
        return (
          <View
            NextPage={() => this.setState({ stepFourType: "SearchDetail" })}
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
    // const { hours } = this.state;
    // if (hours > 12) {
    //   this.setState({
    //     // addition_false: true,
    //     hours: hours + 1,
    //   });
    // }
    if (this.state.hours < 12)
      this.setState({
        // addition_false: true,
        hours: this.state.hours + 1,
      });

    console.log(this.state.hours);
  };
  subtraction = () => {
    if (this.state.hours >= 1) {
      this.setState({
        hours: this.state.hours - 1,
      });
    }

    // if (hours < 1) {

    // }

    // this.setState({
    //   // subtraction_false: true,
    //   hours: hours - 1,
    // });
    console.log(this.state.hours);
  };
  redMinutes = () => {
    if (this.state.minutes > 0) {
      this.setState({
        minutes: this.state.minutes - 15,
      });
    }
    if (this.state.minutes == 0) {
      this.setState({
        minutes: 0,
      });
      this.subtraction();
    }
  };
  minutes = () => {
    console.log("minutes", this.state.minutes + 15);
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
    }
  };
  render() {
    return (
      <>
        <div className="booking-header">
          <Container>
            <div className="booking-menu">
              <h1>
                BOOK AN ESCORT
                {/* <span>
                  <i className="fas fa-bars"></i>
                </span> */}
              </h1>
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
                      <button className="step-trigger">
                        <span className="bs-stepper-circle">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="bs-stepper-label">
                          <small>STEP 1</small> City
                        </span>
                      </button>
                    </div>
                    <div className="line"></div>
                    <div className="step" data-target="#test-l-2">
                      <button className="step-trigger">
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
                      <button className="step-trigger">
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
                          Select City
                          <span className="fas fa-times"></span>
                        </div>
                        {this.state.type === "Region" ? <Region /> : ""}
                        {this.state.type === "city" ? <City /> : ""}

                        <button
                          className="btn btn-primary"
                          onClick={() => this.stepper.next()}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    <div id="test-l-2" className="content">
                      <div className="findbooking">
                        <div className="booking-title">
                          Select Gender
                          <span className="fas fa-times"></span>
                        </div>
                        <Tab.Container
                          id="left-tabs-example"
                          defaultActiveKey="first"
                        >
                          <Nav variant="pills" className="row gendertabs">
                            <Col>
                              <Nav.Item>
                                <Nav.Link eventKey="first">
                                  <p>
                                    <i className="flaticon-venus"></i>
                                  </p>
                                  FEMALE
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                            <Col>
                              <Nav.Item>
                                <Nav.Link eventKey="second">
                                  <p>
                                    <i className="flaticon-mars"></i>
                                  </p>
                                  MALE
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                            <Col>
                              <Nav.Item>
                                <Nav.Link eventKey="third">
                                  <p>
                                    <i className="flaticon-transgender"></i>
                                  </p>
                                  TRANSEXUAL
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                          </Nav>

                          <Tab.Content className="mt-5 mb-5">
                            <Tab.Pane eventKey="first">
                              <OutCall />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <OutCall />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                              <OutCall />
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>

                        <div className="text-right">
                          <button
                            className="btn btn-outline-dark mr-2"
                            onClick={() => this.stepper.previous()}
                          >
                            Back
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => this.stepper.next()}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="test-l-3" className="content text-center">
                      <div className="findbooking">
                        <div className="booking-title">
                          Time
                          <span className="fas fa-times"></span>
                        </div>
                        <div className="timepicker">
                          <div className="today">Today</div>
                          <div class="screen__value">
                            <div class="tpicker__apm">
                              <small class="">AM</small>
                              <small class="active">PM</small>
                            </div>
                            <div class="tpicker__hhmm">{this.state.hours}</div>
                            <div class="tpicker__hhmm">
                              : {this.state.minutes || 0o0}
                            </div>
                          </div>

                          {/* <Form.Group></Form.Group> */}

                          <div className="plis buttondiv">
                            <button
                              className="mr-2 btn btn-lg"
                              disabled={this.state.addition_false}
                              onClick={() => this.redMinutes()}
                            >
                              <i className="fas fa-minus"></i>
                            </button>

                            <button
                              className="btn btn-lg"
                              disabled={this.state.subtraction_false}
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
                            onClick={() => this.stepper.next()}
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
