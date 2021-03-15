import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
export default class ChangePassword extends Component {
  render() {
    return (
      <>
        <div className="edit-profilebox">
          <Form.Group>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="**********"
            ></Form.Control>
          </Form.Group>
          <Row xs={1} md={2} lg={2}>
            <Col>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="text-right text-uppercase">
            <Button type="submit" className="uppercase">
              Update
            </Button>
          </Form.Group>
        </div>
      </>
    );
  }
}
