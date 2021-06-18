import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";

export default class Report extends Component {
  render() {
    return (
      <Modal
        size="lg"
        show={this.props.show}
        onHide={this.props.close}
        className="modal-center"
      >
        <Modal.Header className="send-report">
          <Modal.Title>Send Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Write Subject</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" />
          </Form.Group>
          <Form.Group>
            <Button className="mr-2" onClick={this.props.close}>
              Send
            </Button>
            <Button
              className="btn-outline-dark"
              variant="false"
              onClick={this.props.close}
            >
              Cancel
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    );
  }
}
