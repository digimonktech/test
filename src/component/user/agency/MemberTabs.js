import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AgencyMember from "./AgencyMember";
import { Button } from "react-bootstrap";
import UpdatePrice from "../escort/UpdatePrice";
import NewRequest from "./NewRequest";
import Edit from "./Edit"
export default class MemberTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "agencymember",
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
                  onClick={this.ChangeTab("agencymember")}
                  activeClassName={
                    this.state.type === "agencymember" ? "active-user" : ""
                  }
                >
                  Members
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("updateprice")}
                  activeClassName={
                    this.state.type === "updateprice" ? "active-user" : ""
                  }
                >
                  Update Rate
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("newrequest")}
                  activeClassName={
                    this.state.type === "newrequest" ? "active-user" : ""
                  }
                >
                  New Request
                </NavLink>
              </li>
              
            </ul>
          </div>
        </div>
        {this.state.type === "agencymember" ? <AgencyMember /> : ""}
        {this.state.type === "updateprice" ? <UpdatePrice /> : ""}
        {this.state.type === "newrequest" ? <NewRequest/> : ""}
        {this.state.type === "edit" ? <Edit/> : ""}
      </>
    );
  }
}
