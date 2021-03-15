import React, { Component } from 'react'
import Header from "../Header";
import Footer from "../Footer";
import InnerBanner from "./InnerBanner";
import { Container, Button, Card, Accordion } from "react-bootstrap";
export default class Faq extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Header />
        <InnerBanner Title="FAQ" item="FAQ" />
        <div className="about-content pt-5 pb-5">
          <Container>
            <div className="abouttext">
              <h2>Lorem Ipsum</h2>
              <div className="faq-toggle">
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as="a" eventKey="0">
                        <i className="fas fa-long-arrow-alt-left"></i> Lorem
                        ipsum dolor sit amet, consetetur?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as="a" eventKey="1">
                        <i className="fas fa-long-arrow-alt-left"></i> Lorem
                        ipsum dolor sit amet, consetetur?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as="a" eventKey="2">
                        <i className="fas fa-long-arrow-alt-left"></i> Lorem
                        ipsum dolor sit amet, consetetur?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
