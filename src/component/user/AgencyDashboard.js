import React, { Component } from "react";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";

import Dashboard from "./agency/Dashboard";

import UploadProfile from "./agency/UploadProfile";

import Header from "../Header";
import Footer from "../Footer";
import AgentTabs from "./agency/AgentTabs";
import MemberTabs from "./agency/MemberTabs";
import AgentReview from "./agency/AgentReview";

import jwt_decode from "jwt-decode";
import { getData } from "../FetchNodeServices";


export default class AgencyDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "dashboard",
      agencyDetails: {},
      updateChange: false,
      escortList: [],
    };
  }
  ChangeTab = (type) => (e) => {
    this.setState({
      type: type,
    });
  };

  componentDidMount = async () => {
    let token = localStorage.getItem("TOKEN");
    if (!token) {
      this.props.history.push("/");
    } else {
      const decode = jwt_decode(localStorage.getItem("TOKEN"));
      switch (decode.role) {
        case "user":
          this.props.history.push(`/user/dashboard/${decode._id}`);
          break;
        case "escort":
          this.props.history.push(`/user/escort/dashboard/${decode._id}`);
          break;
        default:
          break;
      }
      const agencyDetails = await getData(
        `agency/get-agency-details/${this.props.match.params.id}`
      );
      if (!agencyDetails.response) {
        console.log("agentDetails: ", agencyDetails.data.data);
        this.setState({ agencyDetails: agencyDetails.data.data });
      } else {
        console.log("err: ", agencyDetails.response);
        this.props.history.push(`/page-not-found`);
      }

      const escortList = await getData(
        `agency/get-escorts-by-agency/${this.props.match.params.id}`
      );
      if (!escortList.response) {
        this.setState({ escortList: escortList.data.data });
      } else {
        console.log(escortList.response);
      }
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.updateChange !== this.state.updateChange) {
      const agencyDetails = await getData(
        `agency/get-agency-details/${this.props.match.params.id}`
      );
      if (!agencyDetails.response) {
        console.log("agentDetails: ", agencyDetails.data.data);
        this.setState({ agencyDetails: agencyDetails.data.data });
      } else {
        console.log("err: ", agencyDetails.response);
        this.props.history.push(`/page-not-found`);
      }

      const escortList = await getData(
        `agency/get-escorts-by-agency/${this.props.match.params.id}`
      );
      if (!escortList.response) {
        this.setState({ escortList: escortList.data.data });
      } else {
        console.log(escortList.response);
      }
    }
  };

  handleUpdate = () => {
    this.setState({ updateChange: !this.state.updateChange });
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
                <UploadProfile
                  agencyId={this.props.match.params.id}
                  profileImage={this.state.agencyDetails.profileImg}
                  username={this.state.agencyDetails.username}
                />
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
                  <h2>{this.state.agencyDetails.name}</h2>
                  <div className="main-user">
                    <Row>
                      <Col md="4">
                        <span>
                          <i className="flaticon-calendar"></i> Joined{" "}
                          {this.state.agencyDetails.createdAt
                            ? this.state.agencyDetails.createdAt.split("T")[0]
                            : ""}
                        </span>
                      </Col>

                      <Col md="8">
                        <span>
                          <i className="flaticon-envelope"></i>{" "}
                          {this.state.agencyDetails.email}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="newdivag">
                  {this.state.type === "dashboard" ? (
                    <Dashboard
                      escortList={this.state.escortList}
                      agencyId={this.props.match.params.id}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.type === "agenttabs" ? (
                    <AgentTabs
                      agencyDetails={this.state.agencyDetails}
                      handleUpdate={this.handleUpdate}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.type === "membertabs" ? (
                    <MemberTabs
                      agencyId={this.props.match.params.id}
                      outCallRate={this.state.agencyDetails.outCallRate}
                      inCallRate={this.state.agencyDetails.inCallRate}
                      handleUpdate={this.handleUpdate}
                      escortList={this.state.escortList}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.type === "review" ? (
                    <AgentReview agencyId={this.props.match.params.id} />
                  ) : (
                    ""
                  )}
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
