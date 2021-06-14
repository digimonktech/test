import React, { Component } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

export default class InnerBanner extends Component {
  render() {
    return (
      <>
        <div className="aboutbanner">
          <Container>
            <Row>
              <Col md="12">
                <div className="banner-title">
                  <h1>{this.props.Title}</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="breadcream">
          <Container>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

              <Breadcrumb.Item active>{this.props.item}</Breadcrumb.Item>
            </Breadcrumb>
          </Container>
        </div>
      </>
    );
  }
}
