import React, { Component } from "react";
import Header from "../Header";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
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
import { Helmet } from "react-helmet";

export default class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
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
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: false,
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
          },
        },
        {
          breakpoint: 400,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home page</title>
        
        </Helmet>
        <Header />
        <div className="banner d-flex align-items-center ">
          <div className="banner-center">
            <Container>
              <Row>
                <Col md="6">
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
              <div className="pr-5 ">
                <div className="avtar d-flex align-items-center mb-4">
                  <img src={Avatar} alt="" />
                  <div className="avatar-text">
                    <h3>
                      Diane has just been given a <br />5 rating.
                    </h3>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea.
                </p>
              </div>
              <div className="pr-5 ">
                <div className="avtar d-flex align-items-center mb-4">
                  <img src={Avatar} alt="" />
                  <div className="avatar-text">
                    <h3>
                      Diane has just been given a <br />5 rating.
                    </h3>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea.
                </p>
              </div>
              <div className="pr-5 ">
                <div className="avtar d-flex align-items-center mb-4">
                  <img src={Avatar} alt="" />
                  <div className="avatar-text">
                    <h3>
                      Diane has just been given a <br />5 rating.
                    </h3>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea.
                </p>
              </div>
            </Slider>
          </Container>
        </div>

        <div className="how-it-work pt-5 pb-5">
          <Container>
            <h2 className="reviews mb-5">How it works</h2>
            <Row xs={2} md={4} lg={4}>
              <Col>
                <div className="how-it-box d-flex align-items-center flex-wrap">
                  <div className="text-how">
                    <img src={Logo} alt="" />
                  </div>
                  <Link to="#">Sign in or Register with us</Link>
                </div>
              </Col>

              <Col>
                <div className="how-it-box d-flex align-items-center flex-wrap">
                  <div className="text-how">
                    <img src={Find} alt="" />
                  </div>
                  <Link to="#">
                    Find Your <br /> Escort
                  </Link>
                </div>
              </Col>
              <Col>
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
              </Col>

              <Col>
                <div className="how-it-box d-flex align-items-center flex-wrap">
                  <div className="text-how">
                    <img src={Find2} className="upimg" alt="" />
                  </div>
                  <Link to="#">
                    Leave an honest review of your escort experience
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="latest-review pt-5 pb-5 featured-slider">
          <Container>
            <h2 className="reviews mb-5 aligin-items-center d-flex justify-content-between">
              Featured Escorts{" "}
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Bangkok
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </h2>

            <Slider {...featured}>
              <div className="featured-box">
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
              </div>
            </Slider>
          </Container>
        </div>

        <div className="fresh pt-5 pb-5 featured-slider">
          <Container>
            <h2 className="reviews mb-5">Fresh Escorts</h2>

            <Slider {...featured}>
              <div className="featured-box">
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
              </div>
            </Slider>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
