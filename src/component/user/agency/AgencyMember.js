import React, { Component } from "react";

import MemberTable from "./MemberTable";

export default class AgencyMember extends Component {
  render() {
    return (
      <>
        <div className="edit-profilebox">
          <div className="tablebox">
            <MemberTable
              escortList={this.props.escortList}
              agencyId={this.props.agencyId}
              handleUpdate={this.props.handleUpdate}
            />
          </div>
        </div>
      </>
    );
  }
}
