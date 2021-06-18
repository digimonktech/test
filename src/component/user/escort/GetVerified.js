import React, { Component } from "react";
import { Form, Alert, Button } from "react-bootstrap";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

export default class GetVerified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      result: "Password Update Successfully",
    };
  }
  handleClose = async () => {
    this.setState({
      open: false,
    });
  };
  render() {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
      <>
        <div className="edit-profilebox">
          <Dialog
            open={this.state.open}
            // TransitionComponent={Transition}
            keepMounted
            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Alert Notification"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {this.state.result}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
          <div className="getverfied">
            <h2>Get Verified</h2>
            <p>
            Kindly upload a photo identity proof to get a verified tag on your profile.</p>
            <Alert variant="danger">ID Proof Updated</Alert>
            <Form.Group>
              <Form.Label>ID Proof</Form.Label>
              <Form.File className="form-control" />
            </Form.Group>
            <Form.Group className="text-right text-uppercase">
              <Button type="submit" className="uppercase">
                Add
              </Button>
            </Form.Group>
          </div>
        </div>
      </>
    );
  }
}
