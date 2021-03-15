import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

import man from "../../../images/man.png";
import StarRatingComponent from "react-star-rating-component";

export default class Review extends Component {
  constructor() {
    super();

    this.state = {
      rating: 4,
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  render() {
    const Userangey = [1, 2, 3];
    const { rating } = this.state;
    return (
      <>
        <div className="edit-profilebox">
          {Userangey.map((u, index) => (
            <div className="cardbox mb-4" key={index}>
              <Row>
                <Col md="3">
                  <div className="user-box-img boxshow">
                    <img src={man} alt="" />
                  </div>
                </Col>
                <Col md="9">
                  <div className="timebox">
                    <h3>Rajat</h3>
                    <Row>
                      <Col md="9">
                        <div className="lorem">
                          <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et.
                          </p>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="text-right">
                          <span>
                            <i className="flaticon-calendar"></i> Feb 01, 2021
                          </span>
                          <div className="starbox mt-2">
                            <div className="ratingdiv">
                              <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={rating}
                                starColor={"#DFD800"}
                                renderStarIcon={() => (
                                  <span className="flaticon-star"></span>
                                )}
                                onStarClick={this.onStarClick.bind(this)}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </>
    );
  }
}
