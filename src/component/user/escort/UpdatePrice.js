import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default class UpdatePrice extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  

  adduser() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <>
        <div className="edit-profilebox">
          <ul className="calltabs mb-4 mt-3">
            <li>
              <NavLink to="#out-call" className="call-active">
                OUT CALL
              </NavLink>
            </li>
            <li>
              <NavLink to="#in-call">IN CALL</NavLink>
            </li>
          </ul>

          <div className="call-rate-box">
            <h3>
              Rate
              <span className="add-btn-fa" onClick={() => this.adduser()}>
                <i className="fa fa-plus"></i>
              </span>
            </h3>
            <div className="out-call-shots">
              <ul>
                <li>Hours</li>
                <li>Shots</li>
                <li>Rates</li>
              </ul>
            </div>
            <div className="out-call-show-shots">
              <ul>
                <li>1 Hour</li>
                <li>1 Shot</li>
                <li>
                  $1000 <span className="flaticon-trash"></span>
                </li>
              </ul>
            </div>
            {this.state.show ? (
              <div className="shots-form">
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Hours</Form.Label>
                        <Form.Control as="select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Shots</Form.Label>
                        <Form.Control type="text" placeholder="2" />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Rates</Form.Label>
                        <div className="dollorbox">
                          <span>$</span>
                          <Form.Control type="text" placeholder="1000" />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="text-right text-uppercase">
                    <Button type="submit" className="uppercase">
                      Add
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}
