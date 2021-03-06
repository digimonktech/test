import React, { Component } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { postData } from "../../FetchNodeServices";
import kookyLogo from "../../../images/logo.png";

export default class GetVerified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "Request send Successfully",
      file: "",
      uploadedImage: "",
      button:"Add",
      open: false,
      lstyle:{display:'none'},
    };
  }
  handleClose = async () => {
    this.setState({
      open: false,
    });
  };

  next = (event) => {
    event.preventDefault();
    console.log(event);
    // this.setState({ [event.target.name]: event.target.value });
    try {
      let files = event.target.files; // image will come at this place
      console.log("Fiels: ", files);
      let reader = new FileReader(); // Reader will read the image
      reader.readAsDataURL(files[0]); // now it is converting the image into base-64
      reader.onload = async (e) => {
        // when it gets any event on loading, it shows the result, and set it in a state.
        this.setState({ uploadedImage: e.target.result });
      };
    } catch (e) {}
  };

  uploadFiles = async () => {
    this.setState({
      button:"",
      lstyle:{display:'block'},
    })


    const body = {
      verificationImage: this.state.uploadedImage,
    };
    const uploadImg = await postData("escort/send-verification-request", body);
    if (!uploadImg.response) {
      console.log("res: ", uploadImg);
      this.setState({
        button:"Add",
        open:true,
        lstyle:{display:'none'},
        uploadedImage:""
      })
    } else {
      console.log("err: ", uploadImg.response);
      this.setState({
        button:"Add",
        lstyle:{display:'none'},

      })
    }
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
            <DialogTitle id="alert-dialog-slide-title" style={{textAlign:"center"}}>
            <img src={kookyLogo} alt="" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" style={{position:"relative", textAlign:"center", minWidth:620,minHeight:50,marginTop:20}}>
            <h4>   {this.state.result} </h4>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <div className="getverfied">
            <h2>Get Verified</h2>
            <p>
              Kindly upload a photo identity proof to get a verified tag on your
              profile.
            </p>
            {this.state.uploadedImage ? (
              <>
                <img
                  src={this.state.uploadedImage}
                  alt="img"
                  width="400"
                  height="auto"
                />
                <Alert variant="danger">ID Proof Updated</Alert>
              </>
            ) : (
              ""
            )}
            <Form.Group>
              <Form.Label>ID Proof</Form.Label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => this.next(e)}
                accept="image/*"
              />
            </Form.Group>
            <Form.Group className="text-right text-uppercase">
              <Button
                type="submit"
                className="uppercase"
                onClick={() => this.uploadFiles()}
              >
              {this. state.button} <CircularProgress style={this.state.lstyle} color="white" />
              </Button>
            </Form.Group>
          </div>
        </div>
      </>
    );
  }
}
