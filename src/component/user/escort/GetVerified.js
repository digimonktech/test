import React, { Component } from "react";
import { Form, Alert, Button } from "react-bootstrap";

export default class GetVerified extends Component {
  render() {
    return (
      <>
        <div className="edit-profilebox">
          <div className="getverfied">
            <h2>Get Verified</h2>
            <p>
              for getting verified need to upload your id proof once you will
              verified it will displayed
            </p>
            <Alert variant="danger">ID Proof Updated</Alert>
            <Form.Group>
              <Form.Label>ID Proof</Form.Label>
              <Form.File className="form-control" />
            </Form.Group>
            <Form.Group className="text-right text-uppercase">
              <Button type="submit" className="uppercase">
                Add
              </Button>
            </Form.Group>
          </div>
        </div>
      </>
    );
  }
}
