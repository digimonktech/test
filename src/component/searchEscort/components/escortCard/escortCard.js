import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import { Link } from "react-router-dom";
import Avatar from "../../../../images/avatar1.png";

import Report from "../report/report";
// import Popup from "../../../popup/popup";

export default class EscortCard extends Component {
  constructor() {
    super();
    this.state = {
      lowOutCallPrice: "",
      report: false,
    };
  }

  componentDidMount() {
    console.log("escort prop", this.props.escort);
    let rate = this.props.escort.outCallRate;
    const list = [];

    rate.forEach((rate) => {
      list.push(rate.rate);
    });
    list.sort(function (a, b) {
      return b - a;
    });
    list.reverse();

    this.setState({
      lowOutCallPrice: list[0],
    });
  }
  
  openReport = () => {
    this.setState({ report: true });
  };
  closeReport = () => {
    this.setState({ report: false });
  };

  render() {
    const { escort } = this.props;
    return (
      <>
        <Col>
          <div className="s-online mb-4">
            <div className="online-live">
              {escort.isOnline === true ? (
                <div>
                  <i className="fas fa-circle"></i> Online
                </div>
              ) : (
                <div>
                  <i className="fas fa-circle" style={{ color: "White" }}></i>{" "}
                  Offline
                </div>
              )}
            </div>
            <div className="verified">
              {escort.isVerified ? "Verified" : ""}
            </div>
            <Link
              to={{
                pathname: `/viewEscort/${escort._id}`,
                state: { details: this.props.details },
              }}
            >
              <img
                src={escort.profileImg || Avatar}
                width="auto"
                height="500"
                alt=""
                // onClick={() =>
                //   this.setState({ type: "detail", selectedEscort: escort })
                // }
                style={{ cursor: "pointer" }}
              />
            </Link>
            <div className="online-user-text">
              <Row xs={2} md={2} lg={2}>
                <Col>
                  <h3
                    // onClick={() =>
                    //   this.setState({
                    //     type: "detail",
                    //     selectedEscort: escort,
                    //   })
                    // }
                    style={{ cursor: "pointer" }}
                  >
                    <Link
                      to={{
                        pathname: `/viewEscort/${escort._id}`,
                        state: { details: this.props.details },
                      }}
                    >
                      {escort.name.split(" ")[0]}, {escort.age || "N/A"}
                    </Link>
                    <span>
                      <span style={{ marginRight: "3vw" }}>
                        <i className="fas fa-share-alt"></i>
                      </span>
                      {/* <span className="heart-user">
                        <i className="far fa-heart"></i>
                      </span> */}
                    </span>
                  </h3>
                </Col>
                <Col>
                  <p className="newb" style={{color:"#E100FF",fontSize:20}}>
                    {/* New{" "} */}
                    {escort.city
                      ? escort.city
                          .replace("_", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())
                      : ""}{" "}
                    Escort
                  </p>
                </Col>
              </Row>
              <p>{escort.about || "Not Avaliable"}</p>
              <Row xs={2} md={2} lg={2}>
                <Col>
                  <span>
                    {escort.height || "N/A"} cm| {escort.bodyShape || "N/A"}
                  </span>
                  <div className="pricebox">
                    ${this.state.lowOutCallPrice || "N/A"}
                  </div>
                </Col>
                <Col className="text-right">
                  <div
                    className="ratinguser"
                    // onClick={() => this.props.handleReview(escort._id)}
                  >
                    <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      emptyStarColor={"#707070"}
                      value={escort.recivedStarts / escort.numOfUserRated || 0}
                      starColor={"#DFD800"}
                      // editing={false}
                      onStarClick={() => this.props.handleReview(escort._id)}
                      renderStarIcon={() => (
                        <span className="flaticon-star"></span>
                      )}
                    />
                    <span onClick={this.openReport}>
                      <i className="fas fa-bug"></i> Report
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="user-booknow">
              <Link
                to={{
                  pathname: `/viewEscort/${escort._id}`,
                  state: { details: this.props.details },
                }}
              >
                <i className="flaticon-edit"></i> Book Now
              </Link>
              <Link to="#">
                <i className="fas fa-comments"></i> Chat Now
              </Link>
            </div>
          </div>
        </Col>
        <Report show={this.state.report}  escort={escort}  send={this.sendReport} close={this.closeReport} />
        {/* <Popup /> */}
      </>
    );
  }
}
