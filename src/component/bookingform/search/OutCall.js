import React, { Component } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";

export default class OutCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "outcall",
    };
  }
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
                    className={`btn-outline-primary btn-block ${
                      this.state.selected === "outcall" ? "out-active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ selected: "outcall" });
                      this.props.handleFilter("outCall", true);
                    }}
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
                    className={`btn-outline-primary btn-block ${
                      this.state.selected === "incall" ? "out-active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ selected: "incall" });
                      this.props.handleFilter("inCall", true);
                    }}
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
