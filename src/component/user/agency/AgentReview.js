import React, { Component } from "react";
import MyReview from "./myReview";
import { NavLink } from "react-router-dom";
export default class AgentReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "review",
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
                  onClick={this.ChangeTab("review")}
                  activeClassName={
                    this.state.type === "review" ? "active-user" : ""
                  }
                >
                  My Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div> */}
        {this.state.type === "review" ? (
          <MyReview agencyId={this.props.agencyId} />
        ) : (
          ""
        )}
      </>
    );
  }
}
