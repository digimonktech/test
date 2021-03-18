import React, { Component } from "react";

import Slider from "react-rangeslider";
import {Button} from 'react-bootstrap'
import "react-rangeslider/lib/index.css";
export default class RangeSlider extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      type: "Region",
      horizontal: 3,
    };
  }
  handleChangeHorizontal = (value) => {
    this.setState({
      horizontal: value,
    });
  };
  next = () => {
    if (this.state.horizontal < 15) {
      this.setState({
        horizontal: this.state.horizontal + 1,
      });
    }
  };
  prev = () => {
    if (this.state.horizontal > 1) {
      this.setState({
        horizontal: this.state.horizontal - 1,
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
          min={1}
          max={15}
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
