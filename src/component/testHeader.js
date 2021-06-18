import React, { Component } from "react";

import "bs-stepper/dist/css/bs-stepper.min.css";
import Stepper from "bs-stepper";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";

export default class testHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0o0,
      minutes: 0o0,
      theDay: "Today",
      addition_false: false,
      subtraction_false:true,
      Bookingdate: 0,
      durationHour: 3,
      currentAmOrPm: "am",
      currentHour: -1,
      currentMinute: -1,
      amOrPm: "am",
      hours24: 0o0,
      filter: { inCall: false, outCall: true, gender: "female" },
    };
  }
  componentDidMount() {
    // const date = new Date("August 19, 1975 9:15:30");
const date = new Date();
    const currentHour = date.getHours();
    // console.log("currentHour", currentHour);
    const currentMinute = date.getMinutes();
    //  console.log("currentHour,min",currentHour,currentMinute);

    const minit =
      Math.ceil(currentMinute / 15) * 15 <= 45
        ? Math.ceil(currentMinute / 15) * 15
        : 0;
    var hour24 = 0;
    if (currentHour === 23) {
      hour24 = 1;
      this.setState({ Bookingdate: date.getDate() + 1 });
    } else if (currentHour === 0) {
      hour24 = 2;
      this.setState({ Bookingdate: date.getDate() });
    } else if (currentHour === 22) {
      hour24 = 0;
      this.setState({ Bookingdate: date.getDate() + 1 });
    } else {
      hour24 = currentHour + 2;
      this.setState({ Bookingdate: date.getDate() });
    }
    console.log(hour24);
    var hour = 0;
    if (currentHour != 23) {
      hour = currentHour <= 10 ? currentHour + 2 : currentHour - 10;
    } else {
      hour = 1;
    }
    //  console.log("currenthours, hours , hour24 ", currentHour,hour,hour24);
    this.setState({
      //for delay of 2 hours we add 2
      hours: minit === 0 ? hour + 1 : hour,
      currentHour: minit === 0 ? hour + 1 : hour,
      hours24: hour24,
      minutes: minit,
      currentMinute: minit,
      amOrPm: currentHour + 2 > 11 && currentHour + 2 < 24 ? "pm" : "am",
      currentAmOrPm: currentHour + 2 > 11 && currentHour + 2 < 24 ? "pm" : "am",
    });
    // console.log(this.state.hours)
  }
/// Add Time
  addition = () => {
    const date = new Date();
    if (this.state.hours < 12) {
      this.setState({
        hours: this.state.hours + 1,
      });
    } else {
      this.setState({
        hours: 1,
      });
    }
    if (this.state.hours24 < 23) {
      this.setState({
        hours24: this.state.hours24 + 1,
      });
    } else {
      this.setState({
        hours24: 0,
      });
    }
    if (this.state.hours24 === 23 && this.state.minutes === 45) {
      this.setState({
        Bookingdate: this.state.Bookingdate + 1,
        amOrPm: "am",
        theDay:"Tommorow",
      });
    }
    if (this.state.hours24 === 11 && this.state.minutes === 45) {
      this.setState({
        amOrPm: "pm",
      });
    }
    if (this.state.currentHour === this.state.hours24-1 && this.state.Bookingdate != date.getDate()) {
      // console.log("hi",this.state.Bookingdate,date.getDate());
      this.setState({
        addition_false: true,
      });
    }
    console.log(
      "updated hour,amorpm,hou24,currenthour",
      this.state.hours,
      this.state.amOrPm,
      this.state.hours24,
      this.state.currentHour
    );
  };
// Add Minutes 
  minutes = () => {
    const date = new Date();
this.setState({subtraction_false:false});
    console.log(
      "minutes,hour,hour24",
      this.state.minutes + 15,
      this.state.hours,
      this.state.hours24
    );

    if (this.state.minutes < 45) {
      this.setState({
        minutes: this.state.minutes + 15,
      });
    }

    if (this.state.minutes >= 45) {
      this.setState({
        minutes: 0,
      });
      this.addition();
      // console.log("CEHCKhOUR", this.state.hours);
    }
  };


  // Subtract Time from
  subtraction = () => {

  const date = new Date();

  if (this.state.hours >1 && this.state.hours <=12) {
    this.setState({
      hours: this.state.hours - 1,
    });
  } else {
    this.setState({
      hours: 12,
    });
  }
  if (this.state.hours24 >0 && this.state.hours24<24) {
    this.setState({
      hours24: this.state.hours24 - 1,
    });
  } else {
    this.setState({
      hours24: 23,
    });
  }
 

}
  // Subtract Minutes
  redMinutes = () => {
    const date = new Date();
  // console.log("hi",this.state.currentHour,this.state.hours24,this.state.Bookingdate,date.getDate());
    if (this.state.currentHour === this.state.hours && this.state.Bookingdate === date.getDate()) {
      this.setState({
        subtraction_false: true,
      });
    }

    if (this.state.minutes >= 15) {
      this.setState({
        minutes: this.state.minutes - 15,
      });
    }
     
    if (this.state.minutes === 0) {
      this.setState({
        minutes: 45,
      });
      this.subtraction();
    }
    if (this.state.hours24 === 0 && this.state.minutes === 0) {
      this.setState({
        Bookingdate: this.state.Bookingdate -1,
        amOrPm: "pm",
        theDay:"Today",
      });
    }
    if (this.state.hours24 === 12 && this.state.minutes === 0) {
      this.setState({
        amOrPm: "am",
      });
    }
    
    console.log("minutemin", this.state.minutes);
   
    console.log("hours24",this.state.hours)
  };

  checkDay = () => {
    const date=  new Date();
    if(this.state.Bookingdate===date.getDate()){
      console.log("Today");
      this.setState({
        theDay:"Today",
      })
    }
    else
    {
      this.setState({
        theDay:"Tommorow",
      })
    }
  }

  render() {
    return (
      <div id="test-l-3" className="content text-center">
        <div className="findbooking">
          <div className="booking-title">
            Time
            <span
              className="fas fa-times"
              onClick={() => window.location.replace("/")}
            ></span>
          </div>
          <div className="timepicker">
            <div className="today">
              {this.state.theDay}
            </div>
            <div className="screen__value">
              <div className="tpicker__apm">
                <small className={this.state.amOrPm === "am" ? "active" : ""}>
                  AM
                </small>
                <small className={this.state.amOrPm === "pm" ? "active" : ""}>
                  PM
                </small>
              </div>
              <div className="tpicker__hhmm">{this.state.hours}</div>
              <div className="tpicker__hhmm">: {this.state.minutes || 0o0}</div>
            </div>

            {/* <Form.Group></Form.Group> */}

            <div className="plis buttondiv">
              <button
                className="mr-2 btn btn-lg"
                disabled={this.state.subtraction_false}
                onClick={() => this.redMinutes()}
              >
                <i className="fas fa-minus"></i>
              </button>

              <button
                className="btn btn-lg"
                disabled={this.state.addition_false}
                onClick={() => this.minutes()}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
