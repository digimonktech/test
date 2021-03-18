import React, { Component } from "react";
import { Link } from "react-router-dom";
import Stepper from "bs-stepper";
export default class Region extends Component {
  
  ChangeTab = (type) => (e) => {
    this.setState({
      type: type,
    });
  };
  render() {
      
    return (
      <>
        <ul className="region">
          <li>
            <Link to="#">Asia (Coming soon)</Link>
          </li>
          <li>
            <Link to="#" onClick={this.ChangeTab("city")}>
              Australia (Coming soon)
            </Link>
          </li>
          <li>
            <Link to="#" onClick={this.ChangeTab("city")}>
              Germany
            </Link>
          </li>
          <li>
            <Link to="#" onClick={this.ChangeTab("city")}>
              Switzerland
            </Link>
          </li>
          <li>
            <Link to="#" onClick={this.ChangeTab("city")}>
              Poland (Coming soon)
            </Link>
          </li>
          <li>
            <Link to="#" onClick={this.ChangeTab("city")}>
              Spain (Coming soon)
            </Link>
          </li>
          <li>
            <Link to="#" onClick={this.ChangeTab("city")}>
              United Kingdom (Coming soon)
            </Link>
          </li>
        </ul>
      </>
    );
  }
}
