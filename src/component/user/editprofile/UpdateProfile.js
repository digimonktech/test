import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
import { postData } from "../../FetchNodeServices";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import kookyLogo from "../../../images/logo.png";

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getconfirmpassword: "",
      getpassword: "",
      getOldPassword: "",
      open: false,
      getMsg: "",
      button:"Update",
      lstyle:{display:'none'},
      result: "Password Update Successfully",
      errors: {},
    };
  }
  handlePassword = async () => {
    this.setState({
      lstyle:{display:'block'},
      button:"",
    });
    const { getconfirmpassword, getpassword, getOldPassword } = this.state;
    var body = {
      confirmPassword: getconfirmpassword,
      password: getpassword,
      oldPassword: getOldPassword,
      id: this.props.userId,
    };
    var result = await postData("user/change-password", body);
    setTimeout(function() {
    if (result.response) {
      this.setState({ errors: result.response.data.errors,   lstyle:{display:'none'},
      button:"Update",
      });
    } else {
      this.setState({ open: true, lstyle:{display:'none'}, button:"Update" });
    }
  }.bind(this), 2000)
  };

  handleClose = async () => {
    this.setState({
      open: false,
      lstyle:{display:'none'}, button:"Update"
    });
  };
  render() {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
      <>
        <div className="edit-profilebox" style={{minHeight:350}}>
          <Form.Group>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your old password"
              value={this.state.getOldPassword}
              onChange={(e) =>
                this.setState({ getOldPassword: e.target.value })
              }
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
                  placeholder="Enter your New Password"
                  value={this.state.getpassword}
                  onChange={(e) =>
                    this.setState({ getpassword: e.target.value })
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
                  placeholder="ReEnter your New Password"
                  value={this.state.getconfirmpassword}
                  onChange={(e) =>
                    this.setState({ getconfirmpassword: e.target.value })
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
              onClick={() => this.handlePassword()}
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
          <Dialog
            open={this.state.open}
            // TransitionComponent={Transition}
          maxWidth="md"

            keepMounted
            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title" style={{textAlign: "center"}}>
            <img src={kookyLogo} alt="" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" style={{position:"relative", textAlign:"center", minWidth:620,minHeight:50,marginTop:20}}>
            <h3>    {this.state.result} </h3>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}
