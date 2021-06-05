import React, { Component } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Avatar from "../../../images/avatar1.png";
import { NavLink, Link } from "react-router-dom";
import Filter from "./filter";
import StarRatingComponent from "react-star-rating-component";
import View from "./View";
import ViewDetails from "./ViewDetails";

import { getData } from "../../FetchNodeServices";

export default class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      type: "searchuser",
      rating: 3,
      escorts: [],
      selectedEscort: {},

      selectedPlan: {},
      typePlan: "",
    };
  }
  close = () => {
    this.setState({
      showModal: false,
    });
  };
  open = () => {
    this.setState({
      showModal: true,
    });
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  ChangeTab = (type) => (e) => {
    this.setState({
      type: type,
    });
  };

  componentDidMount = async () => {
    const { filter } = this.props.details;
    const result = await getData(
      `booking/get-all-escort/${filter.country}-${filter.city}-${filter.gender}`
    );
    if (!result.response) {
      console.log(result.data.data);
      this.setState({ escorts: result.data.data });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showFilter !== this.props.showFilter) {
      this.setState({ type: "filter" });
    }
  }

  searchContent = () => {
    const { escorts } = this.state;
    switch (this.state.type) {
      case "searchuser":
        return (
          <Row xs={1} md={2} lg={2}>
            {escorts.length
              ? escorts.map((u, index) => (
                  <Col key={index}>
                    <div className="s-online mb-4">
                      <div className="online-live">
                        <i className="fas fa-circle"></i> Online
                      </div>
                      <div className="verified">
                        {u.isVerified ? "Verified" : ""}
                      </div>
                      <Link
                        to={{
                          pathname: `/viewEscort/${u._id}`,
                          state: { details: this.props.details },
                        }}
                      >
                        <img
                          src={u.profileImg || Avatar}
                          width="auto"
                          height="500"
                          alt=""
                          // onClick={() =>
                          //   this.setState({ type: "detail", selectedEscort: u })
                          // }
                          style={{ cursor: "pointer" }}
                        />
                      </Link>
                      <div className="online-user-text">
                        <Row xs={2} md={2} lg={2}>
                          <Col key={index}>
                            <h3
                              // onClick={() =>
                              //   this.setState({
                              //     type: "detail",
                              //     selectedEscort: u,
                              //   })
                              // }
                              style={{ cursor: "pointer" }}
                            >
                              <Link
                                to={{
                                  pathname: `/viewEscort/${u._id}`,
                                  state: { details: this.props.details },
                                }}
                              >
                                {u.name.split(" ")[0]}, {u.age || "N/A"}
                              </Link>
                              <span>
                                <a href="#">
                                  <i className="fas fa-share-alt"></i>
                                </a>
                                <a href="#" className="heart-user">
                                  <i className="far fa-heart"></i>
                                </a>
                              </span>
                            </h3>
                          </Col>
                          <Col>
                            <p className="newb">
                              New{" "}
                              {u.city
                                ? u.city
                                    .replace("_", " ")
                                    .replace(/\b\w/g, (l) => l.toUpperCase())
                                : ""}{" "}
                              Escort
                            </p>
                          </Col>
                        </Row>
                        <p>{u.about || "Not Avaliable"}</p>
                        <Row xs={2} md={2} lg={2}>
                          <Col>
                            <span>
                              {u.height || "N/A"} | {u.bodyShape || "N/A"}
                            </span>
                            <div className="pricebox">
                              $3,750(2h) Don't know what to show
                            </div>
                          </Col>
                          <Col className="text-right">
                            <div className="ratinguser">
                              <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                emptyStarColor={"#707070"}
                                value={u.recivedStarts / u.numOfUserRated || 0}
                                starColor={"#DFD800"}
                                editing={false}
                                renderStarIcon={() => (
                                  <span className="flaticon-star"></span>
                                )}
                              />
                              <span onClick={this.open}>
                                <i className="fas fa-bug"></i> Report
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="user-booknow">
                        {/* <NavLink
                          to="#"
                          onClick={() =>
                            this.setState({ type: "detail", selectedEscort: u })
                          }
                        >
                          <i className="flaticon-edit"></i> Book Now
                        </NavLink> */}
                        <Link
                          to={{
                            pathname: `/viewEscort/${u._id}`,
                            state: { details: this.props.details },
                          }}
                        >
                          <i className="flaticon-edit"></i> Book Now
                        </Link>
                        <NavLink to="#">
                          <i className="fas fa-comments"></i> Chat Now
                        </NavLink>
                      </div>
                    </div>
                  </Col>
                ))
              : `No ${this.props.details.filter.gender
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) =>
                    l.toUpperCase()
                  )} escort found in ${this.props.details.filter.city
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) =>
                    l.toUpperCase()
                  )}, ${this.props.details.filter.country
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}`}
          </Row>
        );
      case "filter":
        return (
          <Filter
            Next={() => {
              this.managePerent();
              this.props.hideFilter();
              this.setState({ type: "searchuser" });
            }}
          />
        );
      case "detail":
        console.log("SEARCH DETAILS: VIEW");
        return (
          <View
            Next={(plan, typePlan) => {
              // typePlan => outCall or inCall
              this.managePerent();
              this.setState({
                type: "viewdetails",
                selectedPlan: plan,
                typePlan,
              });
            }}
            escort={this.state.selectedEscort}
            stepper={this.props.stepper}
            history={this.props.history}
          />
        );
      case "viewdetails":
        return (
          <ViewDetails
            escort={this.state.selectedEscort}
            details={{
              ...this.props.details,
              selectedPlan: this.state.selectedPlan,
              typePlan: this.state.typePlan,
              agencyId: this.state.selectedEscort.agencyId,
            }}
            history={this.props.history}
          />
        );
      default:
        return null;
    }
  };

  managePerent = () => {
    console.log("ello12");
    this.props.ChildCompoment("detail");
  };

  render() {
    return (
      <>
        <div className="onlineuserdiv pt-4">{this.searchContent()}</div>
        <Modal
          size="lg"
          show={this.state.showModal}
          onHide={this.close}
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
              <Button className="mr-2">Send</Button>
              <Button
                className="btn-outline-dark"
                onClick={this.close}
                variant="false"
              >
                Cancel
              </Button>
            </Form.Group>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
