import React, { Component } from "react";
import Header from "../Header";
import { Container, Row, Col, Dropdown, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import noFeatureEscortImage from "../../images/Group 4111@2x.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avatar from "../../images/avatar.jpg";
import Logo from "../../images/logo.png";
import Find from "../../images/find.jpg";
import Find2 from "../../images/find-2.jpg";
import Find3 from "../../images/find-3.jpg";
import Featured from "../../images/feature-1.jpg";
import Featured2 from "../../images/feature-2.jpg";
import Featured3 from "../../images/feature-3.jpg";
import Footer from "../Footer";
import Avatar1 from "../../images/avatar1.png";
import noResultImage from "../../images/Group 4078.png";
import { getData } from "../FetchNodeServices";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: "Bangkok",
      escortByCity: [],
      getFrashEscort: [],
      escortReview: [],
      allCities: [],
      escortReviewImg: {},
    };
  }
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const escortReview = await getData(`review/get-all-review`);
    // console.log(escortReview);
    if (!escortReview.response) {
      for (const i in escortReview.data.data) {
        const id = escortReview.data.data[i].escortId;
        const img = await this.getEscortProfileImg(id);
        escortReview.data.data[i].escortProfileImg = img;
      }
      this.setState({
        escortReview: escortReview.data.data,
      });
    }
    const escortByCity = await getData(
      `escort/get-featured-escort-from-city/${this.state.selectedCity}`
    );
    if (!escortByCity.response) {
      // console.log("escortByCity: ", escortByCity);
      this.setState({ escortByCity: escortByCity.data.data.slice(0, 10) });
    }
    const getFrashEscort = await getData("escort/get-home-all-frash-escort");
    if (!getFrashEscort.response) {
      //  console.log("getFrashEscort: ", getFrashEscort.data.data.slice(0, 2));
      this.setState({ getFrashEscort: getFrashEscort.data.data.slice(0, 10) });
    }
  

    const cities = await getData(`admin/get-all-city-by-country/${"THA"}`);
    if (!cities.response) {
      // console.log(cities.data.data);
      this.setState({ allCities: cities.data.data });
    }
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.selectedCity !== this.state.selectedCity) {
      const escortByCity = await getData(
        `escort/get-featured-escort-from-city/${this.state.selectedCity}`
      );
      if (!escortByCity.response) {
        console.log("escortByCity updae -> SetState: ", escortByCity.data.data);
        this.setState({ escortByCity: escortByCity.data.data }, () => {
          console.log("escortByCity", this.state.escortByCity);
        });
        // this.setState({ escortByCity: escortByCity.data.data });
      }
    }
  };
  getEscortProfileImg = async (id) => {
    const escortDetails = await getData(`escort/get-escort-details/${id}`);
    if (!escortDetails.response) {
      // console.log(escortDetails.data.data.profileImg);
      return escortDetails.data.data.profileImg;
    }
  };
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,

      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    var featured = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,

      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      // adaptiveHeight: true,
    };

    var howitwork = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,

      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      // adaptiveHeight: true,
    };

    console.log("imgdes: ", this.state.escortReviewImg);

    return (
      <>
        <Header />
        <div className="banner d-flex align-items-center ">
          <div className="banner-center">
            <Container>
              <Row>
                <Col xs="6">
                  <div className="banner-text">
                    <h1 className="mb-5">
                      Come in stressed. Leave revitalized
                    </h1>
                    <Link to="/booking">
                      <span>Find an</span>ESCORT
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="restomer pt-4 pb-4">
          <Container>
            <p>
              Are you an escort or Agency? <Link to="/sign-up">Click here</Link>{" "}
              to Register on Kooky
            </p>
          </Container>
        </div>
        <div className="latest-review pt-5 pb-5">
          <Container>
            <h2 className="reviews mb-5">Latest reviews, photos and escorts</h2>

            <Slider {...settings}>
              {this.state.escortReview.length ? (
                this.state.escortReview.map((escort, idx) => {
                  return (
                    <div className="pr-5 ">
                      <div className="avtar d-flex align-items-center mb-4">
                        <Link to={`/viewEscort/${escort.escortId}`}>
                          <img
                            src={escort.escortProfileImg}
                            alt="img"
                            height="120vh"
                            width="120vw"
                          />
                        </Link>
                        <div className="avatar-text">
                        <Link to={`/viewEscort/${escort.escortId}`}>
                          <h3
                            style={{
                              textAlign: "left",
                              marginTop: 20,
                              marginLeft: "1vw",
                            }}
                          >
                           {escort.escortName} has just recieved a {escort.rating} star rating .
                          </h3>
                          </Link>
                        </div>
                      </div>
                      <p>{escort.review}</p>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={noResultImage}
                    alt="No favorite Escort available"
                    height="270vh"
                    width="330vw"
                    
                  />
                </div>
              )}
            </Slider>
          </Container>
        </div>

        <div className="latest-review pt-5 pb-5">
          <Container>
            <h2 className="reviews mb-5">How it works</h2>

            <Slider {...howitwork}>
              <div>
                <div className="how-it-box d-flex align-items-center flex-wrap">
                  <div className="text-how">
                    <img src={Logo} alt="" />
                  </div>
                  <Link to="#">Sign in or Register with us</Link>
                </div>
              </div>

              <div>
                <div className="how-it-box d-flex align-items-center flex-wrap">
                  <div className="text-how">
                    <img src={Find} alt="" />
                  </div>
                  <Link to="#">
                    Find Your <br /> Escort
                  </Link>
                </div>
              </div>
              <div>
                <div className="how-it-box d-flex align-items-center flex-wrap">
                  <div className="text-how">
                    <img
                      alt=""
                      className="upimg"
                      src={Find3}
                      style={{
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px #ccc",
                      }}
                    />
                  </div>
                  <Link to="#">Fast confirmations</Link>
                </div>
              </div>

              <div>
                <div className="how-it-box d-flex align-items-center flex-wrap">
                  <div className="text-how">
                    <img src={Find2} className="upimg" alt="" />
                  </div>
                  <Link to="#">
                    Leave an honest review of your escort experience
                  </Link>
                </div>
              </div>
            </Slider>
          </Container>
        </div>
        <div className="latest-review pt-5 pb-5 ">
          {/* class commented: "featured-slider" */}
          <Container>
            <h2 className="reviews mb-5 aligin-items-center d-flex justify-content-between">
              Featured Escorts{" "}
              <Form.Group className="login-icon">
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    this.setState({ selectedCity: e.target.value })
                  }
                  id="dropdown-basic"
                  variant="outline-primary"
                >
                  {this.state.allCities.map((city, idx) => (
                    <option
                      value={city.city}
                      selected={city.city === this.state.selectedCity}
                    >
                      {city.city}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </h2>

            <Slider {...featured}>
              {this.state.escortByCity.length ? (
                this.state.escortByCity.map((escort, idx) => {
                  console.log("login: ", escort);
                  return (
                    <Link to={`/viewEscort/${escort._id}`}>
                      <div className="featured-box">
                        <img
                          src={escort.profileImg || Avatar1}
                          alt=""
                          height="400"
                        />{" "}
                        {/* adding height to image */}
                        <div className="featured-overlay">
                          <h5>
                            {escort.name}, {escort.age || "N/A"}
                          </h5>
                          <p>
                            Model{" "}
                            {escort.city
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <img
                  src={noFeatureEscortImage}
                  alt="no Featured Escort Yet"
                  style={{ marginLeft: "35%", marginTop: 40, marginBottom: 40 }}
                />
              )}
              {/* <div className="featured-box">
                <img src={Featured} alt="" />
                <div className="featured-overlay">
                  <h5>Jessica, 25</h5>
                  <p>Model Bankkok</p>
                </div>
              </div>
              <div className="featured-box">
                <img src={Featured2} alt="" />
                <div className="featured-overlay">
                  <h5>Rebeka, 25</h5>
                  <p>Model Bankkok</p>
                </div>
              </div>
              <div className="featured-box">
                <img src={Featured3} alt="" />
                <div className="featured-overlay">
                  <h5>Julla, 25</h5>
                  <p>Model Bankkok</p>
                </div>
              </div>
              <div className="featured-box">
                <img src={Featured2} alt="" />
                <div className="featured-overlay">
                  <h5>Rebeka, 25</h5>
                  <p>Model Bankkok</p>
                </div>
              </div> */}
            </Slider>
          </Container>
        </div>

        <div className="fresh pt-5 pb-5 ">
          {" "}
          {/* class commented: "featured-slider" */}
          <Container>
            <h2 className="reviews mb-5">Fresh Escorts</h2>

            <Slider {...featured}>
              {
              this.state.getFrashEscort.map((escort, idx) => {
                return (
                  <Link to={`/viewEscort/${escort._id}`}>
                    <div className="featured-box">
                      <img
                        src={escort.profileImg || Avatar1}
                        alt=""
                        height="400"
                      />{" "}
                      {/* adding height to image */}
                      <div className="featured-overlay">
                        <h5>
                          {escort.name}, {escort.age || "N/A"}
                        </h5>
                        <p>
                          Model{" "}
                          {escort.city
                            ? escort.city
                                .replace("_", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                            : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Slider>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
