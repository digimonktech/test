import React, { Component } from "react";
import { Container, Row, Col, NavLink, Button } from "react-bootstrap";
import FooterLogo from "../images/footer-logo.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import kookyLogo from "../images/logo.png";
import { getData } from "./FetchNodeServices";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      footerlink: true,
      citie: true,
      avaliableCity: [],
      contacticon: true,
    };
  }
  cities = () => {
    this.setState({
      citie: !this.state.citie,
    });
  };
  contactLink = () => {
    this.setState({
      contacticon: !this.state.contacticon,
    });
  };

  FooterLink = () => {
    this.setState({
      footerlink: !this.state.footerlink,
    });
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };

  componentDidMount = async () => {
    const cities = await getData("admin/get-all-city");
    if (!cities.response) {
      let newCities = [];
      for (let i in cities.data.data) {
        if (cities.data.data[i].isActive) {
          newCities.push(cities.data.data[i]);
        }
      }
      this.setState({ avaliableCity: newCities });
      console.log("ciites: ", newCities);
    }
  };

  render() {
    return (
      <>
        <footer className="footer-bg pt-5 pb-3">
          <Container>
            <Dialog
              open={this.state.isOpen}
              keepMounted
              maxWidth="md"
              onClose={() => this.handleClose()}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle
                id="alert-dialog-slide-title"
                style={{ textAlign: "center" }}
              >
                <img src={kookyLogo} alt="" />
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  style={{
                    position: "relative",
                    textAlign: "center",
                    minWidth: 620,
                    minHeight: 50,
                    marginTop: 50,
                    marginBottom: 50,
                  }}
                >
                  <h2>Coming Soon ...........</h2>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.handleClose()} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
            <Row xs={1} md={4} lg={4}>
              <Col>
                <div className="footer-text">
                  <Link to="/">
                    <img src={FooterLogo} alt="" />
                  </Link>
                  <div className="footer-text">
                    {/* <h5>Contact</h5> */}
                    <ul className="contact-icon">
                      <li>
                        <NavLink>
                          <i className="fab fa-facebook-f"></i>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <i className="fab fa-twitter"></i>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <i className="fab fa-instagram"></i>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>

              <Col>
                <div className="footer-text">
                  <h5>
                    Quick Links
                    <i
                      className="fa fa-angle-down"
                      onClick={() => this.FooterLink()}
                    ></i>
                  </h5>
                  {this.state.footerlink ? (
                    <ul>
                      <li>
                        <NavLink href="/">Home</NavLink>
                      </li>
                      <li>
                        <NavLink href="/booking">Find an Escort </NavLink>
                      </li>
                      {/* <li>
                        <NavLink href="#" onClick={() => this.handleOpen()}>
                          Our Blog
                        </NavLink>
                      </li> */}
                      <li>
                        <NavLink href="/contact-us"> Contact Us</NavLink>
                      </li>
                      <li>
                        <NavLink href="/faq"> FAQ</NavLink>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </Col>

              <Col>
                <div className="footer-text">
                  <h5>
                    Cities
                    <i
                      className="fa fa-angle-down"
                      onClick={() => this.cities()}
                    ></i>
                  </h5>
                  {this.state.citie ? (
                    <ul>
                      {this.state.avaliableCity.slice(0, 4).map((city) => (
                        <li>
                          <Link
                            to={{
                              pathname: "/booking",
                              state: { city: city },
                            }}
                          >
                            {city.city}
                          </Link>
                        </li>
                      ))}
                      {this.state.avaliableCity.length <= 4 ? (
                        <li>
                          <NavLink href="/booking"> View All</NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  ) : null}
                </div>
              </Col>

              <Col>
                <div className="footer-text">
                  {this.state.citie ? (
                    <ul>
                      {this.state.avaliableCity.slice(4).map((city) => (
                        <li>
                          <Link
                            to={{
                              pathname: "/booking",
                              state: { city: city },
                            }}
                          >
                            {city.city}
                          </Link>
                        </li>
                      ))}
                      {this.state.avaliableCity.length > 4 ? (
                        <li>
                          <NavLink href="/booking"> View All</NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
        <div className="copyright">All rights reserved to KOOKY </div>
      </>
    );
  }
}
