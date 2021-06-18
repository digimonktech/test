import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AgencyMember from "./AgencyMember";

import UpdatePrice from "./updatePrice";
import NewRequest from "./NewRequest";
import Edit from "./Edit";
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

  cancleEdit = () => {
    this.setState({ type: "agencymember" });
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
              <li>
                <Button
                  variant="false"
                  className="btn btn-light btn-postion"
                  onClick={() => this.setState({ type: "edit" })}
                >
                  <i className="far fa-plus-square"></i> ADD
                </Button>
              </li>
            </ul>
          </div>
        </div>
        {this.state.type === "agencymember" ? (
          <AgencyMember
            escortList={this.props.escortList}
            agencyId={this.props.agencyId}
            handleUpdate={this.props.handleUpdate}
          />
        ) : (
          ""
        )}
        {this.state.type === "updateprice" ? (
          <UpdatePrice
            agencyId={this.props.agencyId}
            outCallRate={this.props.outCallRate}
            inCallRate={this.props.inCallRate}
            handleUpdate={this.props.handleUpdate}
          />
        ) : (
          ""
        )}
        {this.state.type === "newrequest" ? (
          <NewRequest agencyId={this.props.agencyId} />
        ) : (
          ""
        )}
        {this.state.type === "edit" ? (
          <Edit
            agencyId={this.props.agencyId}
            escort={{}}
            cancleEdit={this.cancleEdit}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}
