import React, { Component } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Escort from "../../../images/favorite.png";
import { NavLink } from "react-router-dom";
import BookNow from "./BookNow";
import StarRatingComponent from "react-star-rating-component";
import View from "./View";
import ViewDetails from "./ViewDetails";

export default class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      type: "searchuser",
      rating: 4,
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

  searchContent = () => {
    const userbox = [1, { verified: "Verified" }, 3, { verified: "Verified" }];
    const Userangey = [1, 2, 3];
    const { rating } = this.state;
    switch (this.state.type) {
      case "searchuser":
        return (
          <Row xs={1} md={2} lg={2}>
            {userbox.map((u, index) => (
              <Col key={index}>
                <div className="s-online mb-4">
                  <div className="online-live">
                    <i className="fas fa-circle"></i> Online
                  </div>
                  <div className="verified">{u.verified}</div>
                  <img src={Escort} />
                  <div className="online-user-text">
                    <Row xs={2} md={2} lg={2}>
                      <Col key={index}>
                        <h3>
                          Jessica, 25
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
                        <p className="newb">New Bangkok Escort</p>
                      </Col>
                    </Row>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat.
                    </p>
                    <Row xs={2} md={2} lg={2}>
                      <Col>
                        <span>160cm | Slim</span>
                        <div className="pricebox">$3,750(2h)</div>
                      </Col>
                      <Col className="text-right">
                        <div className="ratinguser">
                          <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            emptyStarColor={"#707070"}
                            value={rating}
                            starColor={"#DFD800"}
                            renderStarIcon={() => (
                              <span className="flaticon-star"></span>
                            )}
                            onStarClick={this.onStarClick.bind(this)}
                          />
                          <span onClick={this.open}>
                            <i className="fas fa-bug"></i> Report
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="user-booknow">
                    <NavLink
                      to="#"
                      onClick={() => this.setState({ type: "booknow" })}
                    >
                      <i className="flaticon-edit"></i> Book Now
                    </NavLink>
                    <NavLink to="#">
                      <i className="fas fa-comments"></i> Chat Now
                    </NavLink>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        );
      case "booknow":
        return <BookNow Next={() => this.setState({ type: "detail" })} />;
      case "detail":
        return <View Next={() => this.setState({ type: "viewdetails" })} />;
      case "viewdetails":
        return <ViewDetails />;
      default:
        return null;
    }
  };

  render() {
    console.log(this.state.type);

    return (
      <>
        <div className="onlineuserdiv pt-4">
          {this.searchContent()}
          {/* {this.state.type === "searchuser" ? (
              <>
                
              </>
            ) : (
              <BookNow />
            )} */}
        </div>
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
