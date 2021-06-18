import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { postData } from "../../FetchNodeServices";
import kookyLogo from "../../../images/logo.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";

export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      open: false,
      result: "Photo Upload Successfully",
      lstyle: { display: "none" },
      button: "Upload",
    };
  }

  uploadMultipleFiles = (e) => {
    this.setState({ lstyle: { display: "block" }, button: "" });
    let files = e.target.files;
    let reader = new FileReader();
    try {
      reader.readAsDataURL(files[0]);

      reader.onload = (e) => {
        const newfiles =
          this.state.file.length < 5
            ? [...this.state.file, e.target.result]
            : [...this.state.file];
        console.log("file: ", newfiles);
        this.setState({
          file: newfiles,
          lstyle: { display: "none" },
          button: "Upload",
        });
      };
    } catch {
      return;
    }
  };

  uploadFiles = async (e) => {
    this.setState({ lstyle: { display: "block" }, button: "" });
    e.preventDefault();
    console.log("files: ", this.state.file);
    const body = {
      image: this.state.file,
      id: this.props.userId,
      username: this.props.username,
    };
    const result = await postData("escort/upload-images", body);
    if (!result.response) {
      // this.props.handleEscortImageUploads(result.data);
      this.setState({
        open: true,
        lstyle: { display: "none" },
        button:"Upload",
      });
      console.log("Uploaded: ", result);
    } else {
      console.log("Err: ", result.response);
    }
  };

  componentDidMount() {
    this.props.handleUpdateProfile();
    this.setState({ file: this.props.images || [] });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.images !== this.props.images) {
      this.setState({ file: this.props.images || [] });
    }
  }

  handleClose = async () => {
    this.setState({
      open: false,
      lstyle: { display: "none" },
      button: "Upload",
    });
  };
  removeClick = async (idx) => {
    console.log("Removed clicked: ", idx);
    let newArray = [...this.state.file];
    const removedUrl = newArray.splice(idx, 1);
    this.setState({ file: newArray });
    const body = {
      id: this.props.userId,
      url: removedUrl[0],
    };
    const result = await postData("escort/delete-images/", body);
    if (!result.response) {
      console.log("result: ", result);
      // this.props.handleEscortImageDelete(result.data);
      this.setState({
        open: true,
        result: "Photo revomed successfully",
        lstyle: { display: "none" },
        button: "Upload",
      });
    } else {
      console.log("err: ", result.response);
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
                  minWidth: 570,
                  minHeight: 50,
                  marginTop: 20,
                }}
              >
                <h4> {this.state.result} </h4>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
          <form>
            <div className="uploadimgae-title">
              <h3>
                Upload upto 5 Photos{" "}
                <span>({this.state.file.length} Photos)</span>
              </h3>
            </div>

            <div className="form-group multi-preview">
              {this.state.file.map((url, idx) => (
                <div className="uploadimg-arry" key={idx}>
                  <span
                    className="fa fa-close"
                    onClick={() => this.removeClick(idx)}
                  ></span>
                  <img src={url} alt="..." />
                </div>
              ))}
            </div>
            {this.state.file.length < 5 ? (
              <div className="form-group">
                <Form.Label>Upload Photos</Form.Label>
                <div className="uploadimgrdiv">
                  <div className="dsd">
                    <div className="uploadboxnew">
                      <i className="flaticon-cloud-computing"></i>
                      <h4>Drag and drop files</h4>
                      <span>Or</span>
                      <button>Browse files</button>
                      <input
                        type="file"
                        className="form-control"
                        onChange={this.uploadMultipleFiles}
                        accept="image/*"
                        multiple
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <Form.Group className="text-right">
              <Button
                type="submit"
                className="uppercase"
                onClick={this.uploadFiles}
              >
                {this.state.button}{" "}
                <CircularProgress style={this.state.lstyle} color="white" />
              </Button>
            </Form.Group>
          </form>
        </div>
      </>
    );
  }
}
