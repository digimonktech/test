import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import NewBookingChart from "./NewBookingChart";
import Revenue from "./Revenue";
import Datatables from "./Datatables";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "dashboard",
    };
  }
  ChangeTab = (type) => (e) => {
    this.setState({
      type: type,
    });
  };
  render() {
    return (
      <>
        <div className="user-tabs-main">
          <div className="user-tabs">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("dashboard")}
                  activeClassName={
                    this.state.type === "dashboard" ? "active-user" : ""
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              {/* <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("booking")}
                  activeClassName={
                    this.state.type === "booking" ? "active-user" : ""
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
              </li> */}
            </ul>
          </div>
        </div>

        <div className="edit-profilebox">
          <Row xs={1} md={2} lg={2}>
            <Col>
              <div className="chartbox">
                <NewBookingChart />
              </div>
            </Col>
            <Col>
              <div className="chartbox">
                <Revenue />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="dashboard-angncy mt-3">
                <h3>New Added Members</h3>
                
                <Datatables />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
