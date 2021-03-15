import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Female from "../../../images/jassica.jpg";

export default class Booking extends Component {
  render() {
    const Userangey = [1, 2, 3];
    return (
      <>
        <div className="edit-profilebox">
          {Userangey.map((u, index) => (
            <div className="cardbox mb-4" key={index}>
              <Row>
                <Col md="3">
                  <div className="user-box-img">
                    <img src={Female} alt="" />
                  </div>
                </Col>
                <Col md="9">
                  <div className="timebox">
                    <h3>
                      Jessika (Female)
                      <span>
                        <i className="flaticon-calendar"></i> Feb 01, 2021
                      </span>
                    </h3>
                    <Row>
                      <Col md="8">
                        <ul>
                          <li>
                            <i className="flaticon-clock"></i> 04:30 PM
                          </li>
                          <li>
                            <i className="flaticon-alarm-clock"></i> 3hr
                          </li>
                          <li>
                            <i className="flaticon-building"></i> Hotel Name
                          </li>
                          <li>
                            <i className="flaticon-credit-card"></i> $3500
                          </li>
                        </ul>
                      </Col>
                      <Col md="4">
                        <div className="btn-fem">
                          <Button className="mb-2 btn-block">
                            Rate Escort
                          </Button>
                          <Button variant="dark" className="btn-block">
                            Completed
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </>
    );
  }
}
