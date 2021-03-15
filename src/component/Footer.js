import React, { Component } from "react";
import { Container, Row, Col, NavLink } from "react-bootstrap";
import FooterLogo from "../images/footer-logo.png";
export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="footer-bg pt-5 pb-3">
          <Container>
            <Row xs={1} md={4} lg={4}>
              <Col>
                <div className="footer-text">
                  <img src={FooterLogo} />
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt
                  </p>
                </div>
              </Col>

              <Col>
                <div className="footer-text">
                  <h5>Quick Links</h5>
                  <ul>
                    <li>
                      <NavLink href="/">home</NavLink>
                    </li>
                    <li>
                      <NavLink href="/booking">FInd a Escort </NavLink>
                    </li>
                    <li>
                      <NavLink href="/our-blog">Our Blog</NavLink>
                    </li>
                    <li>
                      <NavLink href="/contact-us"> Contact Us</NavLink>
                    </li>
                    <li>
                      <NavLink href="/report-profiles">Report Profiles</NavLink>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col>
                <div className="footer-text">
                  <h5>Cities</h5>
                  <ul>
                    <li>
                      <NavLink>Bangkok</NavLink>
                    </li>
                    <li>
                      <NavLink>Singapore </NavLink>
                    </li>
                    <li>
                      <NavLink>Manila</NavLink>
                    </li>
                    <li>
                      <NavLink> Angeles City</NavLink>
                    </li>
                    <li>
                      <NavLink> Cebu</NavLink>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col>
                <div className="footer-text">
                  <h5>Contact</h5>
                  <ul className="contact-icon">
                    <li>
                      <NavLink>
                        <i className="fab fa-facebook-f"></i>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink>
                        <i className="fab fa-twitter"></i>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink>
                        <i className="fab fa-instagram"></i>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
        <div className="copyright">All rights reserved to KOOKY </div>
      </>
    );
  }
}
