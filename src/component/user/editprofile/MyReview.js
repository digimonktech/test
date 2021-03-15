import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";

import Female from "../../../images/jassica.jpg";
import StarRatingComponent from "react-star-rating-component";
import { Link } from "react-router-dom";
export default class MyReview extends Component {
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
                  <div className="user-box-img">
                    <img src={Female} alt="" />
                  </div>
                </Col>
                <Col md="9">
                  <div className="timebox">
                    <h3>
                      Jessika
                      <span>
                        <i className="flaticon-calendar"></i> Feb 01, 2021
                      </span>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua.
                    </p>
                    <div className="starbox">
                      <Row xs={1} md={2} lg={2}>
                        <Col>
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
                        </Col>
                        <Col>
                          <div className="btn-usbox text-right">
                            <Link to="#" className="btn btn-danger mr-2">
                              <i className="flaticon-trash"></i> Delete
                            </Link>
                            <Link to="#" className="btn btn-success">
                              <i className="flaticon-edit"></i>Edit
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
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
