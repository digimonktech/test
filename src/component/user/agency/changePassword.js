import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { postData } from "../../FetchNodeServices";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import kookyLogo from "../../../images/logo.png";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      getMsg: "",
      open: false,
      button:"Update",
      lstyle:{display:'none'},
      result: "Password Update Successfully",
      errors: {},
    };
  }

  handlePasswordUpdate = async (e) => {
    
    this.setState({
      lstyle:{display:'block'},
      button:"",
    });
    e.preventDefault();
    const body = {
      oldPassword: this.state.oldPassword,
      password: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
      id: this.props.agencyId,
    };
    const result = await postData("agency/change-password", body);
    setTimeout(() => {
    if (result.response) {
      console.log(result.response);
      this.setState({ errors: result.response.data.errors ,lstyle:{display:'none'},button:"update"});
    } else {
      this.setState({ open: true, lstyle:{display:'none'},button:"update" });
    }},3000);
  };
  handleClose = async () => {
    this.setState({
      open: false,
      lstyle:{display:'none'},button:"update"
    });
  };
  render() {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
      <>
        <div className="edit-profilebox" style={{minHeight:350}}>
          <Dialog
            open={this.state.open}
            // TransitionComponent={Transition}
            keepMounted
            maxWidth="md"

            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title" style={{textAlign:"center"}}>
            <img src={kookyLogo} alt="" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" style={{position:"relative", minWidth:620,minHeight:50,marginTop:20}}>
              <h3>  {this.state.result} </h3>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
          <Form.Group>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Old password"
              value={this.state.oldPassword}
              onChange={(e) => this.setState({ oldPassword: e.target.value })}
            ></Form.Control>
            <label
              style={{
                display: this.state.errors.password ? "block" : "none",
                color: "red",
              }}
            >
              {this.state.errors.password}
            </label>
          </Form.Group>
          <Row xs={1} md={2} lg={2}>
            <Col>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New password"
                  value={this.state.newPassword}
                  onChange={(e) =>
                    this.setState({ newPassword: e.target.value })
                  }
                ></Form.Control>
                <label
                  style={{
                    display: this.state.errors.newPassword ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.newPassword}
                </label>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password password again"
                  value={this.state.confirmPassword}
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                ></Form.Control>
                <label
                  style={{
                    display: this.state.errors.confirmPassword
                      ? "block"
                      : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.confirmPassword}
                </label>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="text-right text-uppercase">
            <Button
              type="submit"
              className="uppercase"
              onClick={this.handlePasswordUpdate}
            >
                                              {this. state.button} <CircularProgress style={this.state.lstyle} color="white" />

            </Button>
            <label
              style={{
                display: this.state.getMsg ? "block" : "none",
                color: "green",
              }}
            >
              {this.state.getMsg}
            </label>
          </Form.Group>
        </div>
      </>
    );
  }
}
