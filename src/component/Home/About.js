import React, { Component } from 'react'
import Header from "../Header"
import Footer from "../Footer"
import InnerBanner from './InnerBanner'
import { Container, Row, Col } from "react-bootstrap";
import Abouts from "../../images/about.png";
import { Helmet } from "react-helmet";
export default class About extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>about</title>
          <keywords>ddd</keywords>
          <meta charSet="utf-8" keywords="this is my title" />
          <meta
            charSet="utf-8"
            name="description"
            content="Web site created using create-react-app"
          />
        </Helmet>
        <Header />
        <InnerBanner Title="About us" item="About us" />
        <div className="about-content pt-5 pb-5">
          <Container>
            <Row className="d-flex align-items-center">
              <Col md="7">
                <div className="abouttext">
                  <h2>Lorem Ipsum</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </Col>
              <Col md="4" className="offset-md-1">
                <div className="aboutimg">
                  <img src={Abouts} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
