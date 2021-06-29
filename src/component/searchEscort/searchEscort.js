/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import { getData, postData } from "../FetchNodeServices";
import EscortCard from "./components/escortCard/escortCard";
import noFavImage from "../../images/Group 4077.png";
import noResultImage from "../../images/Group 4078.png";
import Filter from "./components/filter/filter";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Popup from "../popup/popup";
import noReviewImage from "../../images/Group 4113@2x.png";
import man from "../../images/man.png";
import StarRatingComponent from "react-star-rating-component";
// import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
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
        bodyType: "",
        services: [],
        country: "",
        city: "",
        gender: "",
      },
      short: "top",
      getFrashEscort: [],
      getOldEscort: [],
      showPopup: false,
      reviews: [],
    };
  }

  componentDidMount = async () => {
    // console.log("props: ", this.props.location.state);
    const { filter } = this.props.location.state;
    console.log("filter value", filter);
    this.setState({ filter: { ...this.state.filter, ...filter } });
    const result = await getData(
      `booking/get-all-escort/${filter.country}-${filter.city.city}-${filter.gender}`
    );
    if (!result.response) {
      console.log("take length", result.data.data.length);
      this.setState({
        escorts: result.data.data,
        country: filter.country,
        city: filter.city.city,
        gender: filter.gender,
      });
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

    const getFrashEscort = await getData(
      `escort/get-all-frash-escort/${filter.country}-${filter.city.city}-${filter.gender}`
    );
    const getOldEscort = await getData(
      `escort/get-all-old-escort/${filter.country}-${filter.city.city}-${filter.gender}`
    );

    if (!getFrashEscort.response) {
      console.log("getFrashEscort: ", getFrashEscort);
      this.setState({
        getFrashEscort: getFrashEscort.data.data,
        getOldEscort: getOldEscort.data.data,
      });
      // getFrashEscort.reverse();
      // console.log("getFrashEscort: ", getFrashEscort)
      // this.setState({  getOldEscort:getFrashEscort});
    }
  };

  goBack = () => {
    this.props.history.push(`/booking`);
  };
  handlePopupClose = () => {
    this.setState({ showPopup: false, reviews: [] });
  };

  handlePopupOpen = async (id, name) => {
    console.log("id: ", id, name);
    const review = await getData(`review/get-review-by-escort/${id}`);
    if (!review.response) {
      console.log(review.data.data);
      this.setState({ showPopup: true, reviews: review.data.data });
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

  handleBodyType = (e) => {
    console.log("body", e.target.value);
    this.setState({
      filter: { ...this.state.filter, bodyType: e.target.value },
    });
  };

  handleServices = (services) => {
    // console.log('service',e.target.value);
    this.setState({ filter: { ...this.state.filter, services } });
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
    console.log("after applay ", body);
    const Escorts = await postData("booking/filter-escort-for-booking", body);
    const newEscorts = await postData(
      "booking/filter-frash-escort-for-booking",
      body
    );
    const oldEscorts = await postData(
      "booking/filter-old-escort-for-booking",
      body
    );
    console.log("ESCORT: ", Escorts);
    if (!newEscorts.response) {
      this.setState({
        escorts: Escorts.data,
        getFrashEscort: newEscorts.data.data,
        getOldEscort: oldEscorts.data.data,
      });
    } else {
      console.log("err: ", newEscorts.response);
    }
    this.setState({ tab: "online" });
    //  console.log("short",this.state.short);
  };

  cancelFilter = async () => {
    this.setState({ tab: "online" });
  };
  render() {
    const { filter } = this.props.location.state;
    console.log("render filter", filter);

    return (
      <>
        <Header />
        <Container style={{ minHeight: "100vh" }}>
          <div
            style={{ textAlign: "center", marginTop: 100, color: "#E100FF" }}
          >
            <b>
              <p style={{ fontSize: 25 }}>
                {this.state.escorts.length} Escorts Are wating For You
              </p>
            </b>
          </div>
          <hr
            style={{
              marginBottom: "-80px",
              height: 0.5,
              backgroundColor: "#E100FF",
            }}
          />

          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ marginTop: "9%", textAlign: "center", marginLeft: "23%" }}
          >
            <Typography
              color="textPrimary"
              style={{ display: "flex", fontSize: 18, color: "#E100FF" }}
            >
              Country : {filter.country}
            </Typography>
            <Typography
              color="textPrimary"
              style={{ display: "flex", fontSize: 18, color: "#E100FF" }}
            >
              City : {filter.city.city}
            </Typography>
            <Typography
              color="textPrimary"
              style={{ display: "flex", fontSize: 18, color: "#E100FF" }}
            >
              Gender : {filter.gender}
            </Typography>
            <Typography
              color="textPrimary"
              style={{ display: "flex", fontSize: 18, color: "#E100FF" }}
            >
              Time : {filter.time}
            </Typography>
          </Breadcrumbs>

          <hr
            style={{
              marginBottom: "-80px",
              height: 0.5,
              backgroundColor: "#E100FF",
            }}
          />
          <div
            className="onlineuser"
            style={{ marginTop: "13vh", marginBottom: "5vh" }}
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
                      <Form.Control
                        as="select"
                        onChange={(e) =>
                          this.setState({ short: e.target.value })
                        }
                      >
                        <option value="top">Top Rated</option>
                        <option value="new">New</option>
                        <option value="old">Old</option>
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
                this.state.escorts.length && this.state.short === "top" ? (
                  this.state.escorts.map((escort, idx) => (
                    <EscortCard
                      escort={escort}
                      key={idx}
                      details={this.state.filter}
                      handleReview={this.handlePopupOpen}
                    />
                  ))
                ) : (
                  <>
                    {this.state.escorts.length && this.state.short === "new" ? (
                      this.state.getFrashEscort.map((escort, idx) => (
                        <EscortCard
                          escort={escort}
                          key={idx}
                          details={this.state.filter}
                          handleReview={this.handlePopupOpen}
                        />
                      ))
                    ) : (
                      <>
                        {this.state.escorts.length &&
                        this.state.short === "old" ? (
                          this.state.getOldEscort.map((escort, idx) => (
                            <EscortCard
                              escort={escort}
                              key={idx}
                              details={this.state.filter}
                              handleReview={this.handlePopupOpen}
                            />
                          ))
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: 100,
                              marginLeft: "25%",
                            }}
                          >
                            <img
                              src={noResultImage}
                              alt="No favorite Escort available"
                            />
                            <br /> <br />
                            <Button
                              className="btn-outline-dark"
                              hidden={this.state.chat ? true : false}
                              style={{
                                width: "40%",
                                height: "20%",
                                fontSize: 20,
                              }}
                              onClick={() => this.goBack()}
                            >
                              FIND AN ESCORT
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </>
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
              <div style={{ textAlign: "center", marginTop: 120 }}>
                <img src={noFavImage} alt="No favorite Escort available" />
                <br /> <br />
                <Button
                  className="btn-outline-dark"
                  hidden={this.state.chat ? true : false}
                  style={{ width: "25%", height: "25%", fontSize: 22 }}
                  onClick={() => this.goBack()}
                >
                  FIND AN ESCORT
                </Button>
              </div>
            )
          ) : this.state.tab === "filter" ? (
            <Filter
              applyFilter={this.applyFilter}
              handleAgeChange={this.handleAgeChange}
              handleAgencyChange={this.handleAgencyChange}
              handleHeightChange={this.handleHeightChange}
              handleBodyType={this.handleBodyType}
              handleServices={this.handleServices}
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
                      marginLeft: "39%",
                      marginTop: 35,
                    }}
                    width="250"
                    height="220"
                    src={noReviewImage}
                    alt=""
                  />
                  <p style={{ color: "#E100FF", textAlign: "center" }}>
                    <h2>Have Not Posted Any Review</h2>
                  </p>
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
