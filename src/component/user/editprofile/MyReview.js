import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Avatar from "../../../images/avatar1.png";
import StarRatingComponent from "react-star-rating-component";
// import noReviewImage from "../../../images/Group 4050@2x.png";
import { getData, postData } from "../../FetchNodeServices";
import noReviewImage from "../../../images/Group 4113@2x.png";

/**
 * Uncomment Edit button in render methord to enable edit reviews
 */



export default class MyReview extends Component {
  constructor() {
    super();

    this.state = {
      reviews: [],
      isEditing: false,
      newReview: "",

      currSelected: -1,

      errors: {},
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  componentDidMount = async () => {
    const reviews = await getData(
      `review/get-review-by-user/${this.props.userId}`
    );
    if (!reviews.response) {
      console.log(reviews.data.data);
      this.setState({ reviews: reviews.data.data });
    } else {
      console.log(reviews.response);
    }
  };
  handleSave = async (idx) => {
    const newReviewList = [...this.state.reviews];
    const newReview = newReviewList[idx];
    newReview.review = this.state.newReview;

    const body = {
      reviewId: newReview._id,
      review: this.state.newReview,
    };
    const result = await postData("review/edit-review-escort", body);
    if (!result.response) {
      newReviewList[idx] = newReview;
      this.setState({ isEditing: false, reviews: newReviewList });
    } else {
      console.log(result.response);
      this.setState({ errors: result.response.data.errors });
    }
  };
  handleCancle = () => {
    this.setState({ isEditing: false });
  };

  handleDelete = async (review, idx) => {
    let newReviewList = [...this.state.reviews];
    newReviewList.splice(idx, 1);

    this.setState({ reviews: newReviewList });

    const body = {
      reviewId: review._id,
    };
    const result = await postData("review/delete-review-by-user", body);
    if (!result.response) {
      console.log(result);
    } else {
      console.log(result.response);
    }
  };
  render() {
    return (
      <>
        <div className="edit-profilebox" style={{ minHeight: 350 }}>
      
          {this.state.reviews.map((u, index) => (
            <div className="cardbox mb-4" key={index}>
              <Row>
                <Col md="3">
                  <div className="user-box-img">
                    <img src={u.escortProfileImg || Avatar} alt="" />
                  </div>
                </Col>
                <Col md="9">
                  <div className="timebox">
                    <h3>
                      {u.escortName}
                      <span>
                        <i className="flaticon-calendar"></i>
                        {u.createdAt.split("T")[0]}
                      </span>
                    </h3>
                    {this.state.isEditing &&
                    this.state.currSelected === index ? (
                      <>
                        <textarea
                          name="newReview"
                          value={this.state.newReview}
                          onChange={(e) =>
                            this.setState({ newReview: e.target.value })
                          }
                        />
                        <lable
                          htmlFor="newReview"
                          style={{
                            display: this.state.errors.review
                              ? "block"
                              : "none",
                            color: "red",
                          }}
                        >
                          {this.state.errors.review}
                        </lable>
                      </>
                    ) : (
                      <p>{u.review}</p>
                    )}

                    <div className="starbox">
                      <Row xs={1} md={2} lg={2}>
                        <Col>
                          <div className="ratingdiv">
                            <StarRatingComponent
                              name="rate1"
                              starCount={5}
                              value={u.rating}
                              editing={false}
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
                            {this.state.isEditing &&
                            this.state.currSelected === index ? (
                              <>
                                <Button
                                  className="btn btn-danger mr-2"
                                  onClick={this.handleCancle}
                                >
                                  <i className="flaticon-trash"></i> Cancle
                                </Button>
                                <Button
                                  to="#"
                                  variant="success"
                                  className="btn btn-success"
                                  onClick={() => this.handleSave(index)}
                                >
                                  <i className="flaticon-edit"></i> Save
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  className="btn btn-danger mr-2"
                                  onClick={() => this.handleDelete(u, index)}
                                >
                                  <i className="flaticon-trash"></i> Delete
                                </Button>
                                {/* <Button
                                  variant="success"
                                  className="btn btn-success"
                                  onClick={() =>
                                    this.setState({
                                      isEditing: true,
                                      newReview: u.review,
                                      currSelected: index,
                                    })
                                  }
                                >
                                  <i className="flaticon-edit"></i> Edit
                                </Button> */}
                              </>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
          
          {this.state.reviews.length === 0 ? <img  style={{position:'relative', textAlign:'center',marginLeft:"35%",marginTop:40}} width="270" height="230"src={noReviewImage} alt="" />  : ""}
        </div>
      </>
    );
  }
}
