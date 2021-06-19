import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getData } from "../../../FetchNodeServices";
import { Multiselect } from "multiselect-react-dropdown";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAgency: null,
      services: [],
      bodyType: [],
      allServices: [],
    };
  }
  componentDidMount = async () => {
    console.log("comp", this.props.escorts);
    if (this.props.filter.filtredAgency.length !== 1) {
      this.setState({ selectedAgency: null });
    } else {
      this.setState({ selectedAgency: this.props.filter.filtredAgency[0] });
    }

    const services = await getData("admin/get-all-services");
    if (!services.response) {
      console.log("services data", services.data.data);
      const service = services.data.data;
      const servicesName = services.data.data.map(
        (services) => services.shortName
      );
      this.setState({
        allServices: servicesName,
      });
    } else {
      console.log("services Data", services.response);
    }

    const bodyType = await getData("admin/get-all-body-type");
    if (!bodyType.response) {
      console.log("bodyType  data", bodyType.data.data);
      const body = bodyType.data.data;
      this.setState({
        bodyType: body,
      });
    } else {
      console.log("bodyType res Data", bodyType.response);
    }
  };

  onServiceSelect = (selectedList, selectedItem) => {
    this.setState({ services: selectedList }, () => {
      this.props.handleServices(this.state.services);
    });
  };

  onServiceRemove = (selectedList, removedItem) => {
    this.setState({ services: selectedList }, () => {
      this.props.handleServices(this.state.services);
    });
  };

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
            <Form.Control as="select" onChange={this.props.handleBodyType}>
              <option>Choose Any Body Type</option>
              {this.state.bodyType.length
                ? this.state.bodyType.map((bodyType, idx) => (
                    <option key={idx} value={bodyType.name}>
                      {bodyType.name}
                    </option>
                  ))
                : ""}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Service</Form.Label>
            <Multiselect
              options={this.state.allServices}
              isObject={false}
              style={{ chips: { background: "#E100FF" } }}
              selectedValues={this.state.getServices}
              onSelect={this.onServiceSelect} // Function will trigger on select event
              onRemove={this.onServiceRemove} // Function will trigger on remove event
            />
            {/* <Form.Control as="select" onChange={this.props.handleServices}> 
            
              <option>Choose Any Service</option>
              { this.state.services.length ? (
                  this.state.services.map((services, idx) => (  <option key={idx} value={services.shortName}>{services.shortName}</option>))):""
              }
       
            </Form.Control> */}
          </Form.Group>
          <Form.Group>
            <Button
              onClick={this.props.cancelFilter}
              className="btn btn-outline-dark mr-2"
            >
              Cancel
            </Button>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Button
              onClick={this.props.applyFilter}
              style={{ textAlign: "right" }}
            >
              Apply
            </Button>
          </Form.Group>
        </div>
      </>
    );
  }
}
