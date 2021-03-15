import React, { Component } from "react";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";

import Dashboard from "./agency/Dashboard";

import UploadProfile from "./editprofile/UploadProfile";

import Header from "../Header";
import Footer from "../Footer";
import AgentTabs from "./agency/AgentTabs";
import MemberTabs from "./agency/MemberTabs";
import AgentReview from "./agency/AgentReview";

export default class AgencyDashboard extends Component {
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
        <Header />
        <div className="login-bg user-dashboard">
          <Container>
            <Breadcrumb className="user-breadcrumb">
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">Agent</Breadcrumb.Item>
              <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            <Row>
              <Col md="3">
                <UploadProfile />
                <div className="edit-personal">
                  <ul>
                    <li>
                      <NavLink
                        to="#"
                        onClick={this.ChangeTab("dashboard")}
                        activeClassName={
                          this.state.type === "dashboard" ? "active" : ""
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={this.ChangeTab("agenttabs")}
                        activeClassName={
                          this.state.type === "agenttabs" ? "active" : ""
                        }
                      >
                        Edit Agency Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={this.ChangeTab("membertabs")}
                        activeClassName={
                          this.state.type === "membertabs" ? "active" : ""
                        }
                      >
                        Agency Members
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="#"
                        onClick={this.ChangeTab("review")}
                        activeClassName={
                          this.state.type === "review" ? "active" : ""
                        }
                      >
                        My Reviews
                      </NavLink>
                    </li>
                    {/* <li>
                      <NavLink
                        to="#"
                        onClick={this.ChangeTab("updateprofile")}
                        activeClassName={
                          this.state.type === "updateprofile" ? "active" : ""
                        }
                      >
                        Update Rate
                      </NavLink>
                    </li> */}
                  </ul>
                </div>
              </Col>
              <Col md="9">
                <div className="profile-box">
                  <h2>Agency Name</h2>
                  <div className="main-user">
                    <Row xs={1} md={2} lg={2}>
                      <Col>
                        <span>
                          <i className="flaticon-calendar"></i> Joined 3-10-2021
                        </span>
                      </Col>

                      <Col>
                        <span>
                          <i className="flaticon-m"></i> maria@bahes.com
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="newdivag">
                  {this.state.type === "dashboard" ? <Dashboard /> : ""}
                  {this.state.type === "agenttabs" ? <AgentTabs /> : ""}
                  {this.state.type === "membertabs" ? <MemberTabs /> : ""}
                 {this.state.type === "review" ? <AgentReview/> : ""}
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
