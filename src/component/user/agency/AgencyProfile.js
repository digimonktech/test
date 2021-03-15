import React, { Component } from "react";

import { Row, Col, Form, Button } from "react-bootstrap";

export default class AgencyProfile extends Component {
  
  render() {
    return (
      <>
        

        <div className="edit-profilebox">
          <Form>
            <Form.Group>
              <Form.Label>Agency Name</Form.Label>
              <Form.Control type="text" placeholder="xyz" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="xyz@gmail.com" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="xyz@gmail.com" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Owner name</Form.Label>
              <Form.Control type="email" placeholder="Rajat Singh" />
            </Form.Group>
            <Row xs={1} md={2} lg={2}>
              <Col>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select">
                    <option>Select Country</option>
                    <option>Country 1</option>
                    <option>Country 2</option>
                    <option>Country 3</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control as="select">
                    <option>Select City</option>
                    <option>City 1</option>
                    <option>City 2</option>
                    <option>City 3</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Set percentage</Form.Label>
              <Form.Control type="text" placeholder="20%" />
            </Form.Group>
            <Form.Group className="text-right">
              <Button type="submit" className="uppercase">
                Save
              </Button>
            </Form.Group>
          </Form>
        </div>
      </>
    );
  }
}
