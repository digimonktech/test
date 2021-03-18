import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import SearchUser from "./SearchUser";
import Favorite from "./Favorite";

export default class SearchTabs extends Component {
  constructor() {
    super();
    this.state = {
      type: "searchuser",
      rating: 4,
      hideStatus: false,
    };
  }
  ChangeTab = (type) => (e) => {
    this.setState({
      type: type,
    });
  };

  manageChildComponent = (value) => {
    this.setState({
      hideStatus: true,
    });
  };

  render() {
    return (
      <>
        {!this.state.hideStatus ? (
          <div className="onlineuser">
            <Container>
              <ul className="usertabs-t">
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("searchuser")}
                    activeClassName={
                      this.state.type === "searchuser" ? "active" : ""
                    }
                  >
                    💋 Online
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("favorite")}
                    activeClassName={
                      this.state.type === "favorite" ? "active" : ""
                    }
                  >
                    <i className="far fa-star"></i> Favorite
                  </NavLink>
                </li>
                <li className="t-fillter">
                  <div className="user-filter">
                    <div className="e-fillter">
                      <span>Sort by :</span>
                      <Form.Control as="select">
                        <option>Popular</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </Form.Control>
                    </div>
                    <div className="fillter-e">
                      <i className="flaticon-settings"></i> Filters
                    </div>
                  </div>
                </li>
              </ul>
            </Container>
          </div>
        ) : null}
        {this.state.type === "searchuser" ? (
          <SearchUser ChildCompoment={() => this.manageChildComponent()} />
        ) : (
          ""
        )}
        {this.state.type === "favorite" ? <Favorite /> : ""}
      </>
    );
  }
}
