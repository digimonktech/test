import React, { Component, Fragment } from "react";
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
import { Link } from "react-router-dom";

export default class View extends Component {
  componentDidMount() {
    console.log("view: ", this.props.escort);
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: ["outCall", 0],
      plan: "outCall",
    };
  }

  render() {
    const { escort } = this.props;
    return (
      <>
        <div className="viewbox pb-4">
          <Row>
            <Col md="12">
              <div className="view-title mb-4">
                <h2>
                  {escort.name} <span>Review</span>
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="9">
              <div className="view-gallery-left mb-4">
                <img src={escort.profileImg} alt="" />
              </div>
            </Col>
            <Col md="3">
              <Row xs={3} md={1} lg={1}>
                {escort.images.map((img, idx) => {
                  return (
                    <Fragment key={idx}>
                      <Col>
                        <div className="view-gallery-left mb-4">
                          <img src={img} alt="" />
                        </div>
                      </Col>
                    </Fragment>
                  );
                })}
                {/* <Col>
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
                </Col> */}
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
                    City <span>{escort.city}</span>
                  </li>
                  <li>
                    Agency{" "}
                    {escort.agencyId ? (
                      <Link to={`/user/agency/dashboard/${escort.agencyId}`}>
                        {escort.agencyName}
                      </Link>
                    ) : (
                      <span>Independent</span>
                    )}
                  </li>
                  <li>
                    Gender <span>{escort.gender || "N/A"}</span>
                  </li>
                  <li>
                    Measurements{" "}
                    <span>
                      {escort.measurement
                        ? `${escort.measurement.bust} ${escort.measurement.hips} ${escort.measurement.waist}`
                        : "N/A"}
                    </span>
                  </li>
                  <li>
                    Age <span>{escort.age || "N/A"}</span>
                  </li>
                  <li>
                    Height <span>{escort.height || "N/A"} cm</span>
                  </li>
                  <li>
                    Body Type <span>{escort.bodyShape || "N/A"}</span>
                  </li>
                  <li>
                    Nationality <span>{escort.country || "N/A"}</span>
                  </li>
                  <li>
                    Languages <span>{escort.languge || "N/A"}</span>
                  </li>
                  <li>
                    Services
                    <span>
                      {escort.services.length
                        ? escort.services.map((serv, idx) => {
                            return <small key={idx}>{serv}</small>;
                          })
                        : "N/A"}
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
                  <Nav.Item
                    as="li"
                    className="col-md-6"
                    onClick={() => this.setState({ plan: "outCall" })}
                  >
                    <Nav.Link eventKey="first">Out Call</Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    as="li"
                    className="col-md-6"
                    onClick={() => this.setState({ plan: "inCall" })}
                  >
                    <Nav.Link
                      eventKey="second"
                      disabled={escort.agencyId ? false : true}
                      onClick={() =>
                        this.setState({
                          selectedPlan: ["inCall", 0],
                        })
                      }
                    >
                      {escort.agencyId
                        ? "In Call"
                        : "In Call is not avaliable for this escort as she didn't belong to any agency"}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Table className="information">
                      <thead>
                        <tr>
                          <th>DURATION</th>
                          <th>PRICE</th>
                          <th>SHOTS</th>
                          <th aligin="right">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {escort.outCallRate.map((rate, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{rate.hours} Hour</td>
                              <td>{`$ ${rate.rate}`}</td>
                              <td>{rate.shots}</td>
                              <td className="text-right">
                                <span
                                  className={`selected ${
                                    idx === this.state.selectedPlan
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    this.setState({
                                      selectedPlan: ["outCall", idx],
                                    })
                                  }
                                >
                                  {idx === this.state.selectedPlan[1]
                                    ? "Selected"
                                    : "Select"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Table className="information">
                      <thead>
                        <tr>
                          <th>DURATION</th>
                          <th>PRICE</th>
                          <th>SHOTS</th>
                          <th aligin="right">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {escort.inCallRate.map((rate, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{rate.hours} Hour</td>
                              <td>{`$ ${rate.rate}`}</td>
                              <td>{rate.shots}</td>
                              <td className="text-right">
                                <span
                                  className={`selected ${
                                    idx === this.state.selectedPlan
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    this.setState({
                                      selectedPlan: ["inCall", idx],
                                    })
                                  }
                                >
                                  {idx === this.state.selectedPlan[1]
                                    ? "Selected"
                                    : "Select"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
            <Col md="12" className="text-right">
              <Button
                variant="false"
                className="btn-outline-dark mr-2"
                onClick={() => {
                  console.log("history: ", this.props.stepper);
                  this.props.stepper.previous();
                }}
              >
                BACK
              </Button>
              <Button
                className="btn-outline-dark"
                onClick={() =>
                  this.props.Next(
                    this.state.selectedPlan[0] === "outCall"
                      ? escort.outCallRate[this.state.selectedPlan[1]]
                      : escort.inCallRate[this.state.selectedPlan[1]],
                    this.state.selectedPlan[0]
                  )
                }
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
