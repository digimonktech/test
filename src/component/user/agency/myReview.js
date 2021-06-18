import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import noReviewImage from "../../../images/Group 4113@2x.png";
import man from "../../../images/man.png";
import StarRatingComponent from "react-star-rating-component";

import { getData } from "../../FetchNodeServices";

export default class Review extends Component {
  constructor() {
    super();

    this.state = {
      reviews: [],
    };
  }

  componentDidMount = async () => {
    console.log("data: ", this.props.agencyId);
    const review = await getData(
      `review/get-review-by-agency/${this.props.agencyId}`
    );
    if (!review.response) {
      console.log(review.data.data);
      this.setState({ reviews: review.data.data });
    } else {
      console.log("err: ", review.response);
    }
  };

  render() {
    return (
      <>
        <div className="edit-profilebox" style={{ minHeight: 350 }}>
          {this.state.reviews.length ? (
            this.state.reviews.map((u, index) => (
              <div className="cardbox mb-4" key={index}>
                <Row>
                  <Col md="3">
                    <div className="user-box-img boxshow">
                      <img src={u.customerProfileImg || man} alt="" />
                    </div>
                  </Col>
                  <Col md="9">
                    <div className="timebox">
                      <h3>{u.customerName}</h3>
                      <Row>
                        <Col md="9">
                          <div className="lorem">
                            <p>{u.review}</p>
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="text-right">
                            <span>
                              <i className="flaticon-calendar"></i>{" "}
                              {u.createdAt.split("T")[0]}
                            </span>
                            <div className="starbox mt-2">
                              <div className="ratingdiv">
                                <StarRatingComponent
                                  name="rate1"
                                  starCount={u.rating}
                                  value={u.rating}
                                  editing={false}
                                  starColor={"#DFD800"}
                                  renderStarIcon={() => (
                                    <span className="flaticon-star"></span>
                                  )}
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
            ))
          ) : (
            <img
              style={{
                position: "relative",
                textAlign: "center",
                marginLeft: "35%",
                marginTop: 40,
              }}
              width="270"
              height="230"
              src={noReviewImage}
              alt=""
            />
          )}
        </div>
      </>
    );
  }
}
