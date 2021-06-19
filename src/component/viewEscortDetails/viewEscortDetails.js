import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  NavLink,
  Nav,
  Tab,
  Table,
  Button,
} from "react-bootstrap";
import "./viewEscortDetails.styles.css";
// import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import kookyLogo from "../../images/logo.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import StarRatingComponent from "react-star-rating-component";
import { getData } from "../FetchNodeServices";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import Header from "../Header";
import jwt_decode from "jwt-decode";
import Footer from "../Footer";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from "mdb-react-ui-kit";
import Popup from "../popup/popup";
import noReviewImage from "../../images/Group 4113@2x.png";
import man from "../../images/man.png";
import { Facebook, Twitter } from "react-sharingbuttons";
import "react-sharingbuttons/dist/main.css";
// import {useHistory} from  "react-router-dom";
export default class ViewEscortDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlan: "outCall",
      selectedPlanOut: 0, //index
      selectedPlanIn: 0, //index
      plan: "outCall",
      showPopup: false,
      reviews: [],
      escort: {
        images: [],
        services: [],
        outCallRate: [],
        inCallRate: [],
        languages: [],
        copyUrl: "",
        isOpen: false,
        chat: false,
        openSeeAll: false,
      },
      imageList: [],
    };
  }
  componentDidMount = async () => {
    // const history = useHistory();
    // console.log("history",history);

    if (localStorage.getItem("TOKEN")) {
      const decode = jwt_decode(localStorage.getItem("TOKEN"));
      switch (decode.role) {
        case "escort":
          this.setState({ chat: true });
          break;
        case "user":
          this.setState({ chat: false });
          break;
        case "agency":
          this.setState({ chat: false });
          break;
        default:
          break;
      }
    }

    console.log("location", window.location.href);
    console.log("view: ", this.props.match.params.id);
    const review = await getData(
      `review/get-review-by-escort/${this.props.match.params.id}`
    );
    const result = await getData(
      `escort/get-escort-details/${this.props.match.params.id}`
    );
    if (!result.response) {
      console.log("for responce ", result.data.data);
      console.log("for review", review);

      const imageList = result.data.data.images.slice(0, 2);
      console.log(imageList);
      this.setState({
        escort: result.data.data,
        imageList,
        reviews: review.data.data,
      });
    } else {
      this.props.history.push(`/page-not-found`);
    }
  };
  onShareProfile = () => {
    let Url = window.location.href;
    console.log("hi", Url);
    this.setState({ isOpen: true, copyUrl: Url });
  };

  handleClickOpenSeeAllImage = () => {
    this.setState({ openSeeAll: true });
  };

  copyCodeToClipboard = (e) => {
    const escortUrl = this.escortUrl;
    escortUrl.select();
    document.execCommand("copy");
  };

  handleClose = () => {
    this.setState({ isOpen: false, openSeeAll: false });
  };

  handlePopupClose = () => {
    this.setState({ showPopup: false, reviews: [] });
  };

  openPopUp = () => {
    this.setState({ showPopup: true });
  };
  // handlePopupOpen = async (id) => {
  //   console.log("id: ", id);
  //   const review = await getData(`review/get-review-by-escort/${id}`);
  //   if (!review.response) {
  //     console.log("review",review.data.data);
  //     this.setState({ showPopup: false , reviews:review.data.data});
  //   } else {
  //     console.log(review.response);
  //   }
  // };

  callIcon =()=>{
    this.props.history.push("../");
  }
  render() {
    const { escort } = this.state;
    const url = window.location.href;
    const shareText = "Check this site!";
    return (
      <>
        <Header />

        <Container style={{ marginTop: "10vh" }}>
          {this.state.showPopup ? (
            <Popup
              //open={this.state.showPopup}
              handleClose={this.handlePopupClose}
              content={
                this.state.reviews.length ? (
                  <>
                    <div
                      id="alert-dialog-slide-title"
                      style={{ textAlign: "center" }}
                    >
                      <img src={kookyLogo} alt="" />
                    </div>
                    <h3
                      style={{
                        textAlign: "center",
                        marginBottom: 20,
                        marginTop: 20,
                      }}
                    >
                      Total Reviews : {this.state.reviews.length}
                    </h3>
                    {this.state.reviews.map((u, index) => (
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
                    ))}
                  </>
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
          <div hidden className="openDialog">
            <Dialog
              maxWidth={"md"}
              open={this.state.openSeeAll}
              onClose={() => this.handleClose()}
              scrolling="none"
            >
              <div style={{ textAlign: "right", backgroundColor: "#E100FF" }}>
                <HighlightOffIcon
                  onClick={() => this.handleClose()}
                  className="HighlightOffIco"
                  style={{ height: 30, width: 30, color: "black" }}
                />

                <MDBCarousel
                  showIndicators
                  showControls
                  fade
                  style={{
                    showIndicatorsColor: true,
                    showIndicatorsColor: "black",
                  }}
                >
                  <MDBCarouselInner style={{ height: "80vh" }}>
                    <MDBCarouselItem itemId={escort.images.length}>
                      <MDBCarouselElement
                        maxHeight="800vw"
                        src={escort.profileImg}
                        alt="..."
                      />
                    </MDBCarouselItem>
                    {escort.images.map((img, idx) => {
                      return (
                        <MDBCarouselItem itemId={idx}>
                          <MDBCarouselElement
                            height="700px"
                            src={img}
                            alt="..."
                          />
                        </MDBCarouselItem>
                      );
                    })}
                  </MDBCarouselInner>
                </MDBCarousel>
              </div>
            </Dialog>
          </div>
          <div className="viewbox pb-4">
            <Row>
              <Col md="12">
                <div className="view-title mb-4">
                  <h2>
                    {" "}
                    {/* <a href="../"> */}
                      <i
                      onClick={()=>this.callIcon()}
                        style={{ color: "#E100FF" }}
                        className="fa fa-arrow-circle-left"
                      ></i>
                    {/* </a> */}
                    {escort.name}{" "}
                    <span>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.openPopUp()}
                      >
                        Reviews
                      </button>
                    </span>
                  </h2>
                </div>
              </Col>
            </Row>
            {this.state.imageList.length === 1 ? (
              <Row>
                <Col md="6">
                  <div className="view-gallery-left mb-4">
                    <img
                      src={escort.profileImg}
                      alt=""
                      style={{ height: "60vh" }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  {this.state.imageList.map((img, idx) => {
                    return (
                      <Fragment key={idx}>
                        <Col>
                          <div className="view-gallery-left mb-4">
                            <img src={img} alt="" style={{ height: "60vh" }} />
                          </div>
                        </Col>
                      </Fragment>
                    );
                  })}
                </Col>
              </Row>
            ) : (
              <Row>
                <Col md="8">
                  <div className="view-gallery-left mb-4">
                    <img
                      src={escort.profileImg}
                      alt=""
                      style={{ height: "75vh" }}
                    />
                  </div>
                </Col>
                <Col md="4">
                  <Row xs={3} md={1} lg={1}>
                    {this.state.imageList.map((img, idx) => {
                      console.log("no");
                      if (
                        idx === this.state.imageList.length - 1 &&
                        escort.images.length > 2
                      ) {
                        console.log(idx);
                        return (
                          <Fragment key={idx}>
                            <Col>
                              <div className="seeAllImage mb-4">
                                <img
                                  src={img}
                                  alt=""
                                  width="8vw"
                                  height="280vh"
                                />
                                <button
                                  className="btn"
                                  onClick={() =>
                                    this.handleClickOpenSeeAllImage()
                                  }
                                >
                                  <b>See All</b>
                                </button>
                              </div>
                            </Col>
                          </Fragment>
                        );
                      } else {
                        return (
                          <Fragment key={idx}>
                            <Col>
                              <div className="view-gallery-left mb-4">
                                <img
                                  src={img}
                                  alt=""
                                  width="8vw"
                                  height="280vh"
                                />
                              </div>
                            </Col>
                          </Fragment>
                        );
                      }
                    })}
                  </Row>
                </Col>
              </Row>
            )}
            <Row xs={1} md={2} lg={2}>
              <Col>
                <div
                  className="shart-alt"
                  style={{ textAlign: "center", postion: "relavtive" }}
                >
                  <NavLink
                    href="#"
                    className="active"
                    onClick={() => this.onShareProfile()}
                  >
                    <i className="fas fa-share-alt"></i> Share Profile
                  </NavLink>
                </div>
              </Col>
              <Col>
                <div className="shart-alt">
                  <NavLink href="#" hidden={this.state.chat ? true : false}>
                    <i className="fas fa-comments"></i> Chat Now
                  </NavLink>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="citybox-view mt-4">
                  <ul>
                    <li>
                      City <span>{escort.city}</span>
                    </li>
                    <li>
                      Agency{" "}
                      {escort.agencyId ? (
                        <Link to={`/user/agency/dashboard/${escort.agencyId}`}>
                          {escort.agencyName}
                        </Link>
                      ) : (
                        <span>Independent</span>
                      )}
                    </li>
                    <li>
                      Gender <span>{escort.gender || "N/A"}</span>
                    </li>
                    <li>
                      Ratings
                      <span>
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          emptyStarColor={"#707070"}
                          value={
                            escort.recivedStarts / escort.numOfUserRated || 0
                          }
                          starColor={"#DFD800"}
                          renderStarIcon={() => (
                            <span className="flaticon-star"></span>
                          )}
                        />
                      </span>
                    </li>
                    <li>
                      Measurements{" "}
                      <span>
                        {escort.measurement
                          ? `${escort.measurement.bust} ${escort.measurement.hips} ${escort.measurement.waist}`
                          : "N/A"}
                      </span>
                    </li>
                    <li>
                      Age <span>{escort.age || "N/A"}</span>
                    </li>
                    <li>
                      Height <span>{escort.height || "N/A"} cm</span>
                    </li>
                    <li>
                      Body Type <span>{escort.bodyShape || "N/A"}</span>
                    </li>
                    <li>
                      Nationality <span>{escort.country || "N/A"}</span>
                    </li>
                    <li>
                      Languages{" "}
                      <span>
                        {escort.languages.length
                          ? escort.languages.map((serv, idx) => {
                              return <small key={idx}>{serv}</small>;
                            })
                          : "N/A"}
                      </span>
                    </li>
                    <li>
                      Services
                      <span>
                        {escort.services.length
                          ? escort.services.map((serv, idx) => {
                              return <small key={idx}>{serv}</small>;
                            })
                          : "N/A"}
                      </span>
                    </li>
                    {/* <li>
                      Response Time <span>Responds within 10 mins</span>
                    </li> */}
                  </ul>
                </div>
              </Col>
            </Row>
            {escort.acceptingBooking ? (
              <Row className="mt-4">
                <Col md="12">
                  <h3 className="price-title">Price</h3>

                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                  >
                    <Nav variant="pills" className="tabsnow row mb-3" as="ul">
                      <Nav.Item
                        as="li"
                        className="col-md-6"
                        onClick={() => this.setState({ plan: "outCall" })}
                      >
                        <Nav.Link eventKey="first">Out Call</Nav.Link>
                      </Nav.Item>
                      <Nav.Item
                        as="li"
                        className="col-md-6"
                        onClick={() => this.setState({ plan: "inCall" })}
                      >
                        <Nav.Link
                          eventKey="second"
                          onClick={() =>
                            this.setState({
                              currentPlan: "inCall",
                            })
                          }
                        >
                          In Call
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Table className="information">
                          <thead>
                            <tr>
                              <th>DURATION</th>
                              <th>PRICE</th>
                              <th>SHOTS</th>
                              <th aligin="right">&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {escort.outCallRate.map((rate, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{rate.hours} Hour</td>
                                  <td>{`$${rate.rate}`}</td>
                                  <td>{rate.shots}</td>
                                  <td    className="text-right">
                                    <span style={{
                                            backgroundColor: this.state.selectedPlanOut===idx ?"#E100FF":"white",
                                            color: this.state.selectedPlanOut===idx ?"white":"#E100FF",
                                          }}
                                      className={`selected ${
                                        idx === this.state.selectedPlanOut
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        this.setState({
                                          selectedPlanOut: idx,
                                          currentPlan: "outCall",
                                        })
                                      }
                                    >
                                      {idx === this.state.selectedPlanOut ? (
                                       
                                          "Selected"
                                    
                                      ) : (
                                        "Select"
                                      )}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Table className="information">
                          <thead>
                            <tr>
                              <th>DURATION</th>
                              <th>PRICE</th>
                              <th>SHOTS</th>
                              <th aligin="right">&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {escort.inCallRate.map((rate, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{rate.hours} Hour</td>
                                  <td>{`$${rate.rate}`}</td>
                                  <td>{rate.shots}</td>
                                  <td className="text-right">
                                    <span
                                    style={{ backgroundColor: this.state.selectedPlanIn===idx ?"#E100FF":"white",
                                            color: this.state.selectedPlanIn===idx ?"white":"#E100FF",
}}
                                      className={`selected ${
                                        idx === this.state.selectedPlanIn
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        this.setState({
                                          selectedPlanIn: idx,
                                          currentPlan: "inCall",
                                        })
                                      }
                                    >
                                      {idx === this.state.selectedPlanIn
                                        ? "Selected"
                                        : "Select"}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Col>
                <Col md="12" className="text-right">
                  {/* <Button variant="false" className="btn-outline-dark mr-2">
                    BACK
                  </Button> */}
                  <Link
                    to={{
                      pathname: `/book-escort/${this.state.escort._id}`,
                      state: {
                        escort: this.state.escort,
                        details: this.props.location.state
                          ? {
                              selectedPlan:
                                this.state.currentPlan === "outCall"
                                  ? this.state.escort.outCallRate[
                                      this.state.selectedPlanOut
                                    ]
                                  : this.state.escort.inCallRate[
                                      this.state.selectedPlanIn
                                    ],
                              typePlan: this.state.currentPlan,
                              ...this.props.location.state.details,
                            }
                          : {
                              selectedPlan:
                                this.state.currentPlan === "outCall"
                                  ? this.state.escort.outCallRate[
                                      this.state.selectedPlanOut
                                    ]
                                  : this.state.escort.inCallRate[
                                      this.state.selectedPlanIn
                                    ],
                              typePlan: this.state.currentPlan,
                            },
                      },
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Button
                        className="btn-outline-dark"
                        hidden={this.state.chat ? true : false}
                        style={{ width: "40%", height: "30%" }}
                      >
                        BOOK NOW
                      </Button>
                    </div>
                    <Button
                      className="btn-outline-dark"
                      hidden={this.state.chat ? false : true}
                      disabled
                    >
                      {" "}
                      Next
                    </Button>
                  </Link>
                </Col>
              </Row>
            ) : (
              // <Alert severity="warning">This escort is not accepting booking right Now!</Alert>

              <h2
                style={{ textAlign: "center", color: "#E100FF", marginTop: 30 }}
              >
                This Escort is not accepting booking right Now!
              </h2>
            )}
          </div>

          <Dialog
            open={this.state.isOpen}
            maxWidth="md"
            maxHeight="md"
            keepMounted
            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <div style={{ textAlign: "right" }}>
              <HighlightOffIcon
                onClick={() => this.handleClose()}
                className="HighlightOffIco"
                style={{
                  height: 30,
                  width: 30,
                  color: "black",
                  textAlign: "right",
                }}
              />
            </div>
            <DialogTitle
              id="alert-dialog-slide-title"
              style={{ textAlign: "center" }}
            >
              <img src={kookyLogo} alt="" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                style={{ textAlign: "center", marginTop: 30 }}
              >
                <textarea
                  style={{
                    width: 620,
                    borderRadius: 60,
                    boxSizing: "borderBox",
                    height: 50,
                    paddingLeft: 10,
                    paddingTop: 10,
                  }}
                  ref={(textarea) => (this.escortUrl = textarea)}
                  value={this.state.copyUrl}
                ></textarea>
                &nbsp;&nbsp;
                <Button
                  style={{ marginTop: -40 }}
                  onClick={() => this.copyCodeToClipboard()}
                >
                  Copy
                </Button>
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Facebook url={url} shareText={shareText} />
              <Twitter url={url} shareText={shareText} />
              {/* <a href="https://www.facebook.com">
                <FacebookIcon
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#E100FF",
                    color: "white",
                  }}
                />
              </a>{" "}
              <a href="https://www.instagram.com/">
                <InstagramIcon
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#E100FF",
                    color: "white",
                  }}
                />
              </a>{" "}
              <a href="https://twitter.com/">
                {" "}
                <TwitterIcon
                  style={{
                    marginRight: 250,
                    width: 50,
                    height: 50,
                    backgroundColor: "#E100FF",
                    color: "white",
                  }}
                />{" "}
              </a> */}
            </DialogActions>
          </Dialog>
        </Container>
        <Footer />
      </>
    );
  }
}
