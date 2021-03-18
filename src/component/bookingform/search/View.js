import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  NavLink,
  Nav,
  Tab,
  Table,
  Button,
} from "react-bootstrap";

import Viewmg from "../../../images/searchuser.png";
export default class View extends Component {
 
  render() {
   
    return (
      <>
       

        <div className="viewbox pb-4">
          <Row>
            <Col md="12">
              <div className="view-title mb-4">
                <h2>
                  Jesika <span>Review</span>
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="9">
              <div className="view-gallery-left mb-4">
                <img src={Viewmg} alt="" />
              </div>
            </Col>
            <Col md="3">
              <Row xs={3} md={1} lg={1}>
                <Col>
                  <div className="view-gallery-left mb-4">
                    <img src={Viewmg} alt="" />
                  </div>
                </Col>
                <Col>
                  <div className="view-gallery-left mb-4">
                    <img src={Viewmg} alt="" />
                  </div>
                </Col>
                <Col>
                  <div className="view-gallery-left">
                    <img src={Viewmg} alt="" />
                    <div className="seeAll">See All</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row xs={1} md={2} lg={2}>
            <Col>
              <div className="shart-alt">
                <NavLink href="#" className="active">
                  <i className="fas fa-share-alt"></i> Share Profile
                </NavLink>
              </div>
            </Col>
            <Col>
              <div className="shart-alt">
                <NavLink href="#">
                  <i className="fas fa-comments"></i> Chat Now
                </NavLink>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="citybox-view mt-4">
                <ul>
                  <li>
                    City <span>Bangkok</span>
                  </li>
                  <li>
                    Agency <span>Independent</span>
                  </li>
                  <li>
                    Gender <span>Female</span>
                  </li>
                  <li>
                    Measurements <span>36 B 28 34</span>
                  </li>
                  <li>
                    Age <span>25 Yr</span>
                  </li>
                  <li>
                    Height <span>156 cm</span>
                  </li>
                  <li>
                    Body Type <span>Slim</span>
                  </li>
                  <li>
                    Nationality <span>Bangkok</span>
                  </li>
                  <li>
                    Languages <span>English</span>
                  </li>
                  <li>
                    Services
                    <span>
                      <small>A-Level</small>
                      <small>Couples</small>
                      <small>Massages</small>
                      <small>COB</small>
                    </span>
                  </li>
                  <li>
                    Response Time <span>Responds within 10 mins</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="12">
              <h3 className="price-title">Price</h3>

              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Nav variant="pills" className="tabsnow row mb-3" as="ul">
                  <Nav.Item as="li" className="col-md-6">
                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="col-md-6">
                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Table className="information">
                      <thead>
                        <tr>
                          <th>DURATION</th>
                          <th>PRICE</th>
                          <th>PREMIUM PRICE</th>
                          <th>SHOTS</th>
                          <th aligin="right">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td>1</td>
                          <td className="text-right">
                            <span className="selected active">Selected</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td>2</td>
                          <td className="text-right">
                            <span className="selected">Selected</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td>3</td>
                          <td className="text-right">
                            <span className="selected">Selected</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td>4</td>
                          <td className="text-right">
                            <span className="selected">Selected</span>
                          </td>
                        </tr>
                        <tr>
                          <td>5 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td></td>
                          <td className="text-right">
                            <span className="selected">Selected</span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Table className="information">
                      <thead>
                        <tr>
                          <th>DURATION</th>
                          <th>PRICE</th>
                          <th>PREMIUM PRICE</th>
                          <th>SHOTS</th>
                          <th aligin="right">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td>1</td>
                          <td className="text-right">
                            <span className="selected active">Selected</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td>2</td>
                          <td className="text-right">
                            <span className="selected">Selected</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td>3</td>
                          <td className="text-right">
                            <span className="selected">Selected</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td>4</td>
                          <td className="text-right">
                            <span className="selected">Selected</span>
                          </td>
                        </tr>
                        <tr>
                          <td>5 Hour</td>
                          <td>$3500</td>
                          <td>$2500</td>
                          <td></td>
                          <td className="text-right">
                            <span className="selected">Selected</span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
            <Col md="12" className="text-right">
              <Button variant="false" className="btn-outline-dark mr-2">
                BACK
              </Button>
              <Button
                className="btn-outline-dark"
                onClick={() => this.props.Next()}
              >
                BOOK
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
