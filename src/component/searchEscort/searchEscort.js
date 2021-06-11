/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import { getData, postData } from "../FetchNodeServices";
import EscortCard from "./components/escortCard/escortCard";
import noFavImage from "../../images/Group 4077.png";
import noResultImage from "../../images/Group 4078.png";
import Filter from "./components/filter/filter";

import Popup from "../popup/popup";
import noReviewImage from "../../images/Group 4113@2x.png";
import man from "../../images/man.png";
import StarRatingComponent from "react-star-rating-component";

// import SearchUser from "./SearchUser";
// import Favorite from "./Favorite";
export default class SearchEscort extends Component {
  constructor() {
    super();
    this.state = {
      tab: "online",
      escorts: [],
      favEscorts: [],
      filter: {
        agencies: [],
        outCallPriceArray: [],
        minAge: 20,
        minHeight: 50,
        filtredAgency: [],
      },

      showPopup: false,
      reviews: [],
    };
  }

  componentDidMount = async () => {
    // console.log("props: ", this.props.location.state);
    const { filter } = this.props.location.state;
    this.setState({ filter: { ...this.state.filter, ...filter } });
    const result = await getData(
      `booking/get-all-escort/${filter.country}-${filter.city.city}-${filter.gender}`
    );
    if (!result.response) {
      console.log('take length',result.data.data.length )
      this.setState({ escorts: result.data.data });
    }
    const agency = await getData("agency/get-all-agencies");
    if (!agency.response) {
      let newArr = agency.data.data.map((agency) => agency._id);
      this.setState({
        filter: {
          ...this.state.filter,
          agencies: agency.data.data,
          filtredAgency: [...newArr, null],
        },
      });
    } else {
      console.log("err", agency.response);
    }
  };

  handlePopupClose = () => {
    this.setState({ showPopup: false, reviews: [] });
  };

  handlePopupOpen = async (id, name) => {
    console.log("id: ", id, name);
    const review = await getData(`review/get-review-by-escort/${id}`);
    if (!review.response) {
      console.log(review.data.data);
      this.setState({ showPopup: true , reviews:review.data.data});
    } else {
      console.log(review.response);
    }
  };

  handleAgeChange = (age) => {
    this.setState({ filter: { ...this.state.filter, minAge: age } });
  };

  handleHeightChange = (height) => {
    this.setState({ filter: { ...this.state.filter, minHeight: height } });
  };

  handleAgencyChange = (e) => {
    let newArr = [];
    if (e.target.value === "Any Agency") {
      newArr = this.state.filter.agencies.map((agency) => agency._id);
      newArr.push(null);
    } else {
      newArr = [e.target.value];
    }
    this.setState({ filter: { ...this.state.filter, filtredAgency: newArr } });
  };

  applyFilter = async () => {
    const body = { ...this.state.filter };
  console.log("after applay ",body)
    const newEscorts = await postData(
      "booking/filter-escort-for-booking",
      body
    );
    if (!newEscorts.response) {
      this.setState({ escorts: newEscorts.data });
    } else {
      console.log("err: ", newEscorts.response);
    }
    this.setState({ tab: "online" });
  };

  cancelFilter = async () => {
  
    this.setState({ tab: "online" });
  }
  render() {
    return (
      <>
        <Header />
        <Container style={{ minHeight: "100vh" }}>
          <div style={{textAlign: "center",marginTop:100,color:"#E100FF"}}>
<b><p style={{fontSize:25}}>{   this.state.escorts.length } Escorts Are wating For You</p></b>

          </div>
          <hr style={{marginBottom:"-80px",height:0.5,backgroundColor:"#E100FF"}} />
          <div
            className="onlineuser"
            style={{ marginTop: "12vh", marginBottom: "5vh" }}
          >
            <Container>
              <ul className="usertabs-t">
                <li>
                  <a
                    aria-current="page"
                    style={{
                      cursor: "pointer",
                      borderBottomColor:
                        this.state.tab === "online" ? "#DC49F0" : "",
                    }}
                    onClick={() => this.setState({ tab: "online" })}
                  >
                    💋 Online
                  </a>
                </li>
                <li>
                  <a
                    aria-current="page"
                    style={{
                      cursor: "pointer",
                      borderBottomColor:
                        this.state.tab === "favorite" ? "#DC49F0" : "",
                    }}
                    onClick={() => this.setState({ tab: "favorite" })}
                  >
                    <i className="far fa-star"></i> Favorite
                  </a>
                </li>
                <li className="t-fillter">
                  <div className="user-filter">
                    <div className="e-fillter">
                      <span>Sort by :</span>
                      <Form.Control as="select">
                        <option>Popular</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </Form.Control>
                    </div>
                    <div
                      className="fillter-e"
                      onClick={() => this.setState({ tab: "filter" })}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="flaticon-settings"></i> Filters
                    </div>
                  </div>
                </li>
              </ul>
            </Container>
          </div>
          {this.state.tab === "online" ? (
            <Row xs={1} md={2} lg={2}>
              {
                this.state.escorts.length ? (
                  this.state.escorts.map((escort, idx) => (
                    <EscortCard
                      escort={escort}
                      key={idx}
                      details={this.state.filter}
                      handleReview={this.handlePopupOpen}
                    />
                  ))
                ) : (
              <div style={{ textAlign: "center", marginTop: 150,marginLeft: "25%" }}>

                  <img src={noResultImage} alt="No favorite Escort available" />
                  </div>
                )

                // :`No ${filter.gender
                //     .replace("_", " ")
                //     .replace(/\b\w/g, (l) =>
                //       l.toUpperCase()
                //     )} escort found in ${filter.city.city
                //     .replace("_", " ")
                //     .replace(/\b\w/g, (l) => l.toUpperCase())}, ${filter.country
                //     .replace("_", " ")
                //     .replace(/\b\w/g, (l) => l.toUpperCase())}`
              }
            </Row>
          ) : this.state.tab === "favorite" ? (
            this.state.favEscorts.length ? (
              this.state.favEscorts.map((escort, idx) => (
                <EscortCard
                  escort={escort}
                  key={idx}
                  details={this.state.filter}
                />
              ))
            ) : (
              <div style={{ textAlign: "center", marginTop:150 }}>
                <img src={noFavImage} alt="No favorite Escort available" />
              </div>
            )
          ) : this.state.tab === "filter" ? (
            <Filter
              applyFilter={this.applyFilter}
              handleAgeChange={this.handleAgeChange}
              handleAgencyChange={this.handleAgencyChange}
              handleHeightChange={this.handleHeightChange}
              filter={this.state.filter}
              escorts={this.state.escorts}
              cancelFilter={this.cancelFilter}
            />
          ) : (
            ""
          )}
        </Container>

        <Footer />
        {this.state.showPopup ? (
          <Popup
            handleClose={this.handlePopupClose}
            content={
              this.state.reviews.length ? (
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
                <>
          
                  <img
                    style={{
                      position: "relative",
                      textAlign: "center",
                      marginLeft: "37%",
                      marginTop: 35,
                      marginBottom: 35,
                    }}
                    width="250"
                    height="220"
                    src={noReviewImage}
                    alt=""
                  />
                </>
              )
            }
          />
        ) : (
          ""
        )}
      </>
    );
  }
}
