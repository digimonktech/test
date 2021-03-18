import React, { Component } from 'react'

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom"
import Viewmg from "../../../images/searchuser.png";
export default class ViewDetails extends Component {
    render() {
        return (
          <>
            <div className="viewbox pb-4">
             
                <Row>
                  <Col md="12">
                    <div className="view-title mb-4">
                      <h2>Booking Details</h2>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="booking-detailsbox mb-4">
                      <Row>
                        <Col md="4">
                          <img src={Viewmg} alt="" />
                        </Col>
                        <Col md="8">
                          <div className="timebox bookingslot">
                            <h3>Jessika (Female)</h3>
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
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="type here"
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="type here"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Hotel Name</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="type here"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Room Number</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="type here"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Special Request</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="type here"
                      ></Form.Control>
                    </Form.Group>

                    <p className="confirm">
                      By confirming this booking you are agreeing to our{" "}
                      <Link to="/term-of-use">terms & conditions.</Link>
                    </p>
                    <Form.Group className="text-right">
                      <Button variant="false" className="btn-outline-dark mr-2">
                        BACK
                      </Button>
                      <Link to="/login" className="btn btn-primary">CONFIRM BOOKING</Link>
                    </Form.Group>
                  </Col>
                </Row>
              
            </div>
          </>
        );
    }
}
