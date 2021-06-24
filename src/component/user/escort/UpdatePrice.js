import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import kookyLogo from "../../../images/logo.png";
import { postData, getData } from "../../FetchNodeServices";
import noOutCallImage from "../../../images/Group 4112@2x.png";

export default class UpdatePrice extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      outCallRate: [],
      inCallRate: [],
      regexp: /^[0-9\b]+$/,
      getHours: 1,
      getShots: "",
      getRate: "",
      duration: [],
      toShow: "outCall",
      open: false,
      result: "Hourly rate has been updated ",
      errors: {},
      button: "Add",
      lstyle: { display: "none" },
    };
  }

  adduser() {
    this.setState({
      show: !this.state.show,
    });
  }

  componentDidMount = async () => {
    const adminSetting = await getData("admin/get-all-options");
    const duration = adminSetting.data.data.duration;
    console.log("delay", duration);
    this.setState({
      duration: duration,
      outCallRate: this.props.outCallRate,
      inCallRate: this.props.inCallRate || [],
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.outCallRate !== this.props.outCallRate) {
      this.setState({ outCallRate: this.props.outCallRate });
    }
    if (prevProps.inCallRate !== this.props.inCallRate) {
      this.setState({ inCallRate: this.props.inCallRate });
    }
  }

  handleAdd = async (e) => {
    e.preventDefault();
    this.setState({
      lstyle: { display: "block" },
      button: "",
    });
    if (this.state.toShow === "outCall") {
      const body = {
        id: this.props.userId,
        outCallRate: {
          hours: this.state.getHours,
          shots: this.state.getShots,
          rate: this.state.getRate,
        },
      };
      console.log(body);
      const result = await postData("escort/out-call-rate", body);
      console.log("result: ", result);
      setTimeout(() => {
        if (!result.response) {
          this.setState({
            outCallRate: [...this.state.outCallRate, body.outCallRate],
            show: false,
            getHours: 1,
            shots: "",
            rate: "",
            open: true,
            lstyle: { display: "none" },
            button: "ADD",
          });
          this.props.handleUpdateProfile();
        } else {
          console.log(result.response);
          this.setState({
            errors: result.response.data.errors,
            lstyle: { display: "none" },
            button: "ADD",
          });
        }
      }, 3000);
    } else {
      const body = {
        id: this.props.userId,
        inCallRate: {
          hours: this.state.getHours,
          shots: this.state.getShots,
          rate: this.state.getRate,
        },
      };
      const result = await postData("escort/in-call-rate", body);
      console.log("result: ", result);
      setTimeout(() => {
        if (!result.response) {
          this.setState({
            inCallRate: [...this.state.inCallRate, body.inCallRate],
            show: false,
            getHours: 1,
            shots: "",
            rate: "",
            open: true,
            lstyle: { display: "none" },
            button: "ADD",
          });
          this.props.handleUpdateProfile();
        } else {
          console.log(result.response);
          this.setState({
            errors: result.response.data.errors,
            lstyle: { display: "none" },
            button: "ADD",
          });
        }
      }, 3000);
    }
  };

  handleDelete = async (e, item) => {
    e.preventDefault();
    if (this.state.toShow === "outCall") {
      const body = {
        id: this.props.userId,
        outCallRate: item,
      };
      const result = await postData("escort/delete-out-call-rate", body);
      if (!result.response) {
        let newRate = [];
        this.state.outCallRate.map((rate) => {
          if (rate._id !== item._id) {
            newRate.push(rate);
          }
        });
        this.setState({ outCallRate: newRate });
        if (this.props.acceptingBooking && newRate.length === 0) {
          postData("escort/change-booking-status");
          this.props.handleUpdateProfile();
        }
        this.props.handleUpdateProfile();
      } else {
        console.log(result.response);
      }
    } else {
      const body = {
        id: this.props.userId,
        inCallRate: item,
      };
      const result = await postData("escort/delete-in-call-rate", body);
      if (!result.response) {
        let newRate = [];
        this.state.inCallRate.map((rate) => {
          if (rate._id !== item._id) {
            newRate.push(rate);
          }
        });
        this.setState({ inCallRate: newRate });
        this.props.handleUpdateProfile();
      } else {
        console.log(result.response);
      }
    }
  };

  handleClose = async () => {
    this.setState({
      open: false,
      lstyle: { display: "none" },
      button: "ADD",
    });
  };

  handleOnChange = (e) => {
    if (e.key === "e") {
      e.preventDefault();
    } else {
      console.log("targetval", e.target.value);
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
    console.log("getshots", this.state.getShots);
    console.log("gethour", this.state.getRate);
  };

  render() {
    return (
      <>
        <div className="edit-profilebox" style={{ minHeight: 295 }}>
          <Dialog
            open={this.state.open}
            // TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle
              id="alert-dialog-slide-title"
              style={{ textAlign: "center" }}
            >
              <img src={kookyLogo} alt="" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                style={{
                  position: "relative",
                  textAlign: "center",
                  minWidth: 620,
                  minHeight: 50,
                  marginTop: 20,
                }}
              >
                <h4> {this.state.result} </h4>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
          <ul className="calltabs mb-4 mt-3">
            <li>
              <NavLink
                to="#out-call"
                onClick={() => this.setState({ toShow: "outCall" })}
                className={this.state.toShow === "outCall" ? "call-active" : ""}
              >
                OUT CALL
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#in-call"
                style={{ cursor: "pointer" }}
                onClick={() => this.setState({ toShow: "inCall" })}
                className={this.state.toShow === "inCall" ? "call-active" : ""}
              >
                IN CALL
              </NavLink>
            </li>
          </ul>

          <div className="call-rate-box">
            <h3>
              Rate
              <span className="add-btn-fa" onClick={() => this.adduser()}>
                <i className="fa fa-plus"></i>
              </span>
            </h3>

            <div className="out-call-show-shots">
              {this.state.toShow === "outCall" ? (
                this.state.outCallRate.length ? (
                  <>
                    <div className="out-call-shots">
                      <ul>
                        <li>Hours</li>
                        <li>Shots</li>
                        <li>Rates</li>
                      </ul>
                    </div>
                    {this.state.outCallRate.map((rates, index) => (
                      <ul key={index}>
                        <li>{rates.hours} Hour</li>
                        <li>{rates.shots} Shot</li>
                        <li>
                          ${rates.rate}{" "}
                          <span
                            className="flaticon-trash"
                            onClick={(e) => this.handleDelete(e, rates)}
                          ></span>
                        </li>
                      </ul>
                    ))}
                  </>
                ) : (
                  <img
                    src={noOutCallImage}
                    alt="no memeber Yet"
                    style={{
                      marginLeft: "40%",
                      marginTop: 40,
                      marginBottom: 40,
                    }}
                  />
                )
              ) : this.state.inCallRate.length ? (
                <>
                  <div className="out-call-shots">
                    <ul>
                      <li>Hours</li>
                      <li>Shots</li>
                      <li>Rates</li>
                    </ul>
                  </div>
                  {this.state.inCallRate.map((rates, index) => (
                    <ul key={index}>
                      <li>{rates.hours} Hour</li>
                      <li>{rates.shots} Shot</li>
                      <li>
                        ${rates.rate}{" "}
                        <span
                          className="flaticon-trash"
                          onClick={(e) => this.handleDelete(e, rates)}
                        ></span>
                      </li>
                    </ul>
                  ))}
                </>
              ) : (
                "NO IN CALL RATE avaliable"
              )}
            </div>
            {this.state.show ? (
              <div className="shots-form">
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Hours</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(e) =>
                            this.setState({ getHours: e.target.value })
                          }
                        >
                          {this.state.duration.map((hour) => (
                            <option value={`${hour}`}>{hour}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Shots</Form.Label>
                        <Form.Control
                          type="number"
                          pattern="[0-9]*"
                          placeholder="Enter Shots"
                          name="getShots"
                          onChange={this.handleOnChange}
                          // onChange={this.handleNumber}
                          // // onChange={(e) =>
                          // //   this.setState({ getShots: e.target.value })
                          // // }
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Rates</Form.Label>
                        <div className="dollorbox">
                          <span>$</span>
                          <Form.Control
                            type="number"
                            pattern="[0-9]*"
                            name="getRate"
                            placeholder="Enter rate in doller"
                            onChange={this.handleOnChange}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="text-right text-uppercase">
                    <Button
                      type="submit"
                      className="uppercase"
                      onClick={this.handleAdd}
                    >
                      {this.state.button}{" "}
                      <CircularProgress
                        style={this.state.lstyle}
                        color="white"
                      />
                    </Button>
                    <label
                      style={{
                        display: this.state.errors.outCallRate
                          ? "block"
                          : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.outCallRate}
                    </label>
                  </Form.Group>
                </Form>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}
