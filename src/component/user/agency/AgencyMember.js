import React, { Component } from 'react'

import MemberTable from './MemberTable';
import {Button} from "react-bootstrap"
export default class AgencyMember extends Component {
  

  render() {
    return (
      <>
        <div className="edit-profilebox">
          <div className="tablebox">
            <Button variant="false" className="btn btn-light btn-postion">
              <i className="far fa-plus-square"></i> ADD
            </Button>
            <MemberTable />
          </div>
        </div>
      </>
    );
  }
}
