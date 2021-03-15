import React, { Component } from 'react'
import Header from "../Header"
import Footer from "../Footer"
import InnerBanner from './InnerBanner'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
export default class ContactUS extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Header />
        <InnerBanner Title="Contact Us" item="Contact Us" />
        <div className="about-content pt-5 pb-5">
          <Container>
            <div className="contact-bg pt-5 pb-5 pl-5 pr-5">
              <Row>
                <Col md={{ offset: 4, md: 8 }}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group>
                      <Button className="uppercase">SEND</Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
