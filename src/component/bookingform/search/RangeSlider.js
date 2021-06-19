import React, { Component } from "react";

import Slider from "react-rangeslider";
import {Button} from 'react-bootstrap'
import "react-rangeslider/lib/index.css";
import {getData} from "../../FetchNodeServices";
export default class RangeSlider extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      type: "Region",
      horizontal: 1,
      bookingDuration:[],
      index:0,
    };
  }

  componentDidMount = async()=>  {
    const adminSetting = await getData("admin/get-all-options")
    console.log('admin',adminSetting.data.data.duration);
    this.setState({
      bookingDuration:adminSetting.data.data.duration,
    })
  }

  handleChangeHorizontal = (value) => {
    this.props.duration(value)
    this.setState({
      horizontal: value,
    });
  };
  next = () => {
    if (this.state.horizontal < this.state.bookingDuration[this.state.bookingDuration.length - 1]) {
      this.setState({
     index:this.state.index + 1,
        horizontal:  this.state.bookingDuration[this.state.index+1],
      });
    }
  };
  prev = () => {
    if (this.state.horizontal > this.state.bookingDuration[0]) {
      this.setState({ index:this.state.index -1,
        horizontal:  this.state.bookingDuration[this.state.index-1],
      });
    }
  };

  render() {
    const { horizontal } = this.state;

    const formatkg = (value) => value + "h";
    return (
      <>
        <Slider
          className="mt-5"
          tooltip
          min={this.state.bookingDuration[0]}
          max={this.state.bookingDuration[this.state.bookingDuration.length - 1]}
          value={`${horizontal}`}
          format={formatkg}
          handleLabel={horizontal}
          onChange={this.handleChangeHorizontal}
        />
        <div className="value-text mb-4">{formatkg(horizontal)}</div>
        <div className="buttondiv text-right mt-2 mb-5">
          <Button
            onClick={() => this.prev()}
            className="mr-3 prevplus"
            variant="false"
          >
            <i className="fas fa-minus"></i> 
          </Button>
          <Button
            onClick={() => this.next()}
            className="nextbox"
            variant="false"
          >
            <i className="fas fa-plus"></i>
          </Button>
        </div>
      </>
    );
  }
}
