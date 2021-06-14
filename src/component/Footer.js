import React, { Component } from "react";
import { Container, Row, Col, NavLink,Button } from "react-bootstrap";
import FooterLogo from "../images/footer-logo.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import kookyLogo from "../images/logo.png";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }}
     handleOpen = () => {
      this.setState({ isOpen: true });
    };
    handleClose = () => {
      this.setState({ isOpen: false });
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
          <DialogTitle id="alert-dialog-slide-title" style={{textAlign: "center"}}>
          <img src={kookyLogo} alt="" />
            
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{position:"relative", textAlign: "center",minWidth:620,minHeight:50,marginTop:50,marginBottom:50}}>
        <h2>Coming Soon  ...........</h2>
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
                  <h5>Quick Links</h5>
                  <ul>
                    <li>
                      <NavLink href="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink href="/booking">Find a Escort </NavLink>
                    </li>
                    {/* <li>
                      <Link onClick={()=>this.handleOpen()}>Our Blog</Link>
                    </li> */}
                    <li>
                      <NavLink href="/contact-us"> Contact Us</NavLink>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col>
                <div className="footer-text">
                  <h5>Cities</h5>
                  <ul>
                    <li>
                      <NavLink>Bangkok</NavLink>
                    </li>
                    <li>
                      <NavLink>Singapore </NavLink>
                    </li>
                    <li>
                      <NavLink>Manila</NavLink>
                    </li>
                    <li>
                      <NavLink> Angeles City</NavLink>
                    </li>
                    <li>
                      <NavLink> Cebu</NavLink>
                    </li>
                    <li>
                      <NavLink  href="/booking"> View All</NavLink>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col>
              <div className="footer-text">
                  <h5>Country</h5>
                  <ul>
                    <li>
                      <NavLink>Thailand</NavLink>
                    </li>
                    <li>
                      <NavLink>Japan</NavLink>
                    </li>
                    <li>
                      <NavLink>Malaysia</NavLink>
                    </li>
                    <li>
                      <NavLink>China</NavLink>
                    </li>
                    <li>
                      <NavLink>Australia</NavLink>
                    </li>
                    <li>
                      <NavLink  href="/booking">View All</NavLink>
                    </li>
                  </ul>
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
