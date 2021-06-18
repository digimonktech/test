import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AgencyProfile from "./AgencyProfile";
import ChangePassword from "./changePassword";
export default class AgentTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "agencyprofile",
    };
  }
  ChangeTab = (type) => (e) => {
    this.setState({
      type: type,
    });
  };

  render() {
    console.log("agentTabs:  ", this.props.agencyDetails);
    return (
      <>
        <div className="user-tabs-main">
          <div className="user-tabs">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("agencyprofile")}
                  activeClassName={
                    this.state.type === "agencyprofile" ? "active-user" : ""
                  }
                >
                  Edit Agency Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("changepassword")}
                  activeClassName={
                    this.state.type === "changepassword" ? "active-user" : ""
                  }
                >
                  Change Password
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {this.state.type === "agencyprofile" ? (
          <AgencyProfile
            agencyDetails={this.props.agencyDetails}
            handleUpdate={this.props.handleUpdate}
          />
        ) : (
          ""
        )}
        {this.state.type === "changepassword" ? (
          <ChangePassword agencyId={this.props.agencyDetails._id} />
        ) : (
          ""
        )}
      </>
    );
  }
}
