import React, { Component } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";

export default class OutCall extends Component {
  render() {
    return (
      <>
        <div className="out-call">
          <Container>
            <Row xs={2} md={2} lg={2}>
              <Col>
                <div className="outbox">
                  <Button
                    variant="false"
                    className="btn-outline-primary btn-block out-active"
                  >
                    OUTCALL
                    <span>(She comes to you)</span>
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="outbox">
                  <Button
                    variant="false"
                    className="btn-outline-primary btn-block"
                  >
                    INCALL
                    <span>(You go to her)</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
