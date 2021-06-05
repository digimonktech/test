import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import noOutCallImage from "../../../images/Group 4112@2x.png";
import { postData } from "../../FetchNodeServices";

export default class UpdatePrice extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      outCallRate: [],
      inCallRate: [],
      toShow: "outCall",
      getHours: "1",
      getShots: "",
      getRate: "",

      errors: {},
    };
  }

  adduser() {
    this.setState({
      show: !this.state.show,
    });
  }

  handleAdd = async (e) => {
    e.preventDefault();
    console.log("bd", this.state.getHours, this.state.getShots);
    if (this.state.toShow === "outCall") {
      const body = {
        id: this.props.agencyId,
        outCallRate: {
          hours: this.state.getHours,
          shots: this.state.getShots,
          rate: this.state.getRate,
        },
      };
      console.log("outCallRate", body);
      const result = await postData("agency/update-out-call-rate-agency", body);
      if (!result.response) {
        this.props.handleUpdate();
        this.setState({
          outCallRate: [...this.state.outCallRate, body.outCallRate],
          show: false,
          getHours: "1",
          shots: "",
          rate: "",
        });
        console.log("result: ", result);
      } else {
        console.log("err: ", result.response);
        this.setState({ errors: result.response.data.errors });
      }
    } else {
      const body = {
        id: this.props.agencyId,
        inCallRate: {
          hours: this.state.getHours,
          shots: this.state.getShots,
          rate: this.state.getRate,
        },
      };
      const result = await postData("agency/update-in-call-rate-agency", body);
      console.log("result: ", result);

      if (!result.response) {
        this.props.handleUpdate();
        this.setState({
          inCallRate: [...this.state.inCallRate, body.inCallRate],
          show: false,
          getHours: "1",
          shots: "",
          rate: "",
        });
      } else {
        console.log(result.response);
        this.setState({
          errors: result.response.data.errors,
          lstyle: { display: "none" },
          button: "ADD",
        });
      }
    }
  };

  componentDidMount = () => {
    this.setState({
      outCallRate: this.props.outCallRate || [],
      inCallRate: this.props.inCallRate || [],
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.outCallRate !== this.props.outCallRate) {
      this.setState({ outCallRate: this.props.outCallRate || [] });
    }
    if (prevProps.inCallRate !== this.props.inCallRate) {
      this.setState({ inCallRate: this.props.inCallRate || [] });
    }
  };

  handleDelete = async (e, item) => {
    e.preventDefault();
    if (this.state.toShow === "outCall") {
      const body = {
        id: this.props.agencyId,
        outCallRate: item,
      };
      const result = await postData("agency/delete-out-call-rate-agency", body);
      if (!result.response) {
        this.props.handleUpdate();
        let newRate = [];
        this.state.outCallRate.map((rate) => {
          if (rate._id !== item._id) {
            newRate.push(rate);
          }
          return "";
        });
        this.setState({ outCallRate: newRate });
      } else {
        console.log(result.response);
      }
    } else {
      const body = {
        id: this.props.agencyId,
        inCallRate: item,
      };
      const result = await postData("agency/delete-in-call-rate-agency", body);
      if (!result.response) {
        this.props.handleUpdate();
        let newRate = [];
        this.state.inCallRate.map((rate) => {
          if (rate._id !== item._id) {
            newRate.push(rate);
          }
          return "";
        });
        this.setState({ inCallRate: newRate });
      } else {
        console.log(result.response);
      }
    }
  };
  render() {
    return (
      <>
        <div className="edit-profilebox" style={{ minHeight: 350 }}>
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
            <img src={noOutCallImage} alt="no memeber Yet"  style={{marginLeft:"40%", marginTop:40,marginBottom:40}}/>
                 
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
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Shots</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Shots"
                          onChange={(e) =>
                            this.setState({ getShots: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Rates</Form.Label>
                        <div className="dollorbox">
                          <span>$</span>
                          <Form.Control
                            type="text"
                            placeholder="Enter rate in doller"
                            onChange={(e) =>
                              this.setState({ getRate: e.target.value })
                            }
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
                      Add
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
