import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class EditProfile extends Component {
  render() {
    return (
      <>
        <div className="edit-profilebox">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Rajat singh" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="rajat@digimonk.in" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="9977176972" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control type="text" placeholder="Ramaya Hotel" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Special Request</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="type here" />
          </Form.Group>

          <Form.Group className="text-right">
            <Button type="submit" className="uppercase">
              Sign in
            </Button>
          </Form.Group>
        </div>
      </>
    );
  }
}
