import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getData } from "../../../FetchNodeServices";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAgency: null,
    };
  }
  componentDidMount() {
    console.log("comp", this.props.escorts);
    if (this.props.filter.filtredAgency.length !== 1) {
      this.setState({ selectedAgency: null });
    } else {
      this.setState({ selectedAgency: this.props.filter.filtredAgency[0] });
    }
  }

  render() {
    console.log("filter", this.props.filter);
    console.log("escort", this.props.escorts);
    return (
      <>
        <div className="filter">
          <Form.Group>
            <Form.Label>Agency</Form.Label>
            <Form.Control as="select" onChange={this.props.handleAgencyChange}>
              <option>Any Agency</option>
              {this.props.filter.agencies.map((agency, idx) => (
                <option key={idx} value={agency._id}>
                  {agency.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Minimum Age</Form.Label>
            <Slider
              min={20}
              max={60}
              value={this.props.filter.minAge}
              handleLabel={this.props.filter.minAge}
              onChange={this.props.handleAgeChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Minimum Height(in cm)</Form.Label>
            <Slider
              min={50}
              max={700}
              value={this.props.filter.minHeight}
              handleLabel={this.props.filter.minHeight}
              onChange={this.props.handleHeightChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Body Type</Form.Label>
            <Form.Control as="select">
              <option>Any Body Type</option>
              <option>Curvy</option>
              <option>Slim</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Service</Form.Label>
            <Form.Control as="select">
              <option>Any Service</option>
              <option>Service 1</option>
              <option>Service 2</option>
              <option>Service 3</option>
              <option>Service 4</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Button onClick={this.props.applyFilter}>Apply</Button>
          </Form.Group>
        </div>
      </>
    );
  }
}
