import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import man from "../../../images/man.png";
export default class AllBooking extends Component {
  render() {
    const Userangey = [1, 2, 3];
    return (
      <>
        <div className="edit-profilebox">
          {Userangey.map((u, index) => (
            <div className="cardbox mb-4" key={index}>
              <Row>
                <Col md="3">
                  <div className="user-box-img boxshow">
                    <img src={man} alt="" />
                  </div>
                </Col>
                <Col md="9">
                  <div className="timebox">
                    <h3>
                      Rajat singh
                      <span>
                        <i className="flaticon-calendar"></i> Feb 01, 2021
                      </span>
                    </h3>
                    <Row>
                      <Col md="5">
                        <ol>
                          <li>
                            <a href="mailto:rajat@xyz.com">
                              <i className="flaticon-envelope"></i>{" "}
                              sunil.baghel@digimonk.in
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="flaticon-building"></i> Hotel Name
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-bell"></i> 101
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="flaticon-alarm-clock"></i> 3hr
                            </a>
                          </li>

                          <li>
                            <a href="#">
                              <i className="flaticon-download"></i> In call
                            </a>
                          </li>
                        </ol>
                      </Col>
                      <Col md="7">
                        <div className="nedbooking">
                          <h4>Special Request</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam
                          </p>
                        </div>
                        <div className="btn-fem text-right">
                          <Button>Accept</Button>
                          <Button variant="light" className="">
                            reject
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
