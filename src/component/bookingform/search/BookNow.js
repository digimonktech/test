import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default class BookNow extends Component {
  render() {
    return (
      <>
        <div className="booknow">
          <Form.Group>
            <Form.Label>Agency</Form.Label>
            <Form.Control as="select">
              <option>Any Agency</option>
              <option>Any Agency</option>
              <option>Any Agency</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control as="select">
              <option>Any Age</option>
              <option>Any Age</option>
              <option>Any Age</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Height</Form.Label>
            <Form.Control as="select">
              <option>Any Height</option>
              <option>Any Height</option>
              <option>Any Height</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Body Type</Form.Label>
            <Form.Control as="select">
              <option>Any Body Type</option>
              <option>Any Body Type</option>
              <option>Any Body Type</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Service</Form.Label>
            <Form.Control as="select">
              <option>multi select</option>
              <option>Amulti select</option>
              <option>multi select</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Button onClick={() => this.props.Next()}>Apply</Button>
          </Form.Group>
        </div>
      </>
    );
  }
}
