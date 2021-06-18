import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import NewBookingChart from "./NewBookingChart";
import Revenue from "./Revenue";
import noMemberImage from "../../../images/Group 4071.png";
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
        {/* <div className="user-tabs-main">
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
            </ul>
          </div>
        </div> */}

        <div className="edit-profilebox">
          <Row xs={1} md={2} lg={2}>
            <Col>
              <div className="chartbox">
                <NewBookingChart agencyId={this.props.agencyId} />
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
                {this.props.escortList.length ? (
                  <Datatables escortList={this.props.escortList} />
                ) : (
                <img src={noMemberImage} alt="no memeber Yet"  style={{marginLeft:"25%", marginTop:20,marginBottom:20}}/>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
