import React, { Component } from "react";
import { Button } from "react-bootstrap";
import User from "../../../images/avatar1.png";
import { postData } from "../../FetchNodeServices";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import kookyLogo from "../../../images/logo.png";
import ImageCropper from "../../imageCropper/imageCropper";
import Popup from "../../popup/popup";

export default class UploadProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      userImage: "",
      isOpen: false,
      open:false,
      crop: {
        unit: "px",
       width:255,
  

        aspect: 16 / 9,
      
      },
      croppedImage: "",
    };
  }
  next = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    try {
      const currentImage = this.state.userImage
        ? this.state.userImage.split("profileImg/")[1]
        : null;
      let files = event.target.files; // image will come at this place
      let reader = new FileReader(); // Reader will read the image
      reader.readAsDataURL(files[0]); // now it is converting the image into base-64
      reader.onload = async (e) => {
        // when it gets any event on loading, it shows the result, and set it in a state.
        this.setState({ userImage: e.target.result });
        const body = {
          profileImage: e.target.result,
          id: this.props.userId,
          username: this.props.username,
          currentImage: currentImage,
        };
        const result = await postData("escort/upload-profile-image", body);
        console.log("result", result);
      };
    } catch (e) {}
  };

  componentDidMount = () => {
    console.log("this.props new", this.props);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profileImage !== this.props.profileImage) {
      this.setState({
        userImage: this.props.profileImage,
        photo: this.props.profileImage,
      });
    }
  }

  handlePopupClose = () => {
    this.setState({ isOpen: false });
  };

  // handleDelete = async () => {
  //   var body = { id: this.props.location.email };
  //   console.log(body);
  //   var result = await postData("user/deleteuser", body);
  //   console.log(result);
  //   if (result) {
  //     console.log("deleted", result.data);
  //   } else {
  //     console.log("not deleted");
  //   }
  // };
  getCroppedImage = (url) => {
    console.log("URL: ", url);
    this.generateDownload(url);
  };

  generateDownload = (url) => {
    const previewUrl = url;
    var base64Image = new Buffer(previewUrl, "binary").toString("base64");
    console.log("previewUrl: ", previewUrl);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", previewUrl, true);
    xhr.responseType = "blob";
    xhr.onload = (e) => {
      var reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target.result;
        this.setState({ croppedImage: res });
        // setCoverImage(res);
        // upCover(res);
      };
      var file = xhr.response;
      console.log("file: ", file);
      reader.readAsDataURL(file);
    };
    xhr.send();
    console.log(base64Image, "image path");
  };

  onUploadClick = async () => {
    const currentImage = this.state.userImage
      ? this.state.userImage.split("profileImg/")[1]
      : null;
    const body = {
      profileImage: this.state.croppedImage,
      id: this.props.userId,
      username: this.props.username,
      currentImage: currentImage,
    };
    const result = await postData("escort/upload-profile-image", body);
    this.setState({ isOpen: false, userImage: result.profileImg });
    console.log("result", result);
  };

  handleOpen = () =>{
    this.setState({
      open:true
    })
  }
  handleClose = () => {
    this.setState({
      open:false
    })
  }
  render() {
    return (
      <>
        {this.state.isOpen ? (
          <Popup
            handleClose={this.handlePopupClose}
            content={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ImageCropper
                  getCroppedImage={this.getCroppedImage}
                  img={this.state.userImage}
                  crop={this.state.crop}
                />
                <Button
                  style={{
                    marginTop: "2vh",
                  }}
                  onClick={this.onUploadClick}
                >
                  Submit
                </Button>
              </div>
            }
          />
        ) : (
          ""
        )}
        <div className="avatar-wrapper">
          <div className="upload-button" style={{ height: "255px" }}>
            <img
              src={this.state.userImage ? this.state.userImage : User}
              alt=""
              style={{
                width: "fit-content",
                height: "inherit",
              }}
            />
          </div>
          <div
            className="edit-user"
            onClick={() => this.setState({ isOpen: true })}
          >
            <span className="flaticon-pen"></span>
            {/* <input
              className="file-upload"
              type="file"
              value={this.state.photo}
              name="photo"
              onChange={this.next}
              imgextension={[".jpg", ".gif", ".png", ".gif", ".pdf"]}
            /> */}
          </div>
          <div className="delect-account">
            <Button
              className="btn-delet"
              variant="false"
              onClick={() => this.handleOpen()}
            >
              Delete Account
            </Button>
          </div>
        </div>
        <Dialog
            open={this.state.open}
            // TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
          <DialogTitle id="customized-dialog-title" onClose={()=>this.handleClose()} style={{textAlign:"center"}}>
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
                  marginTop: 20,
                }}
              >
                <h4>Are you sure want to delete this account permanantlty !</h4>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
          <Button onClick={()=>this.handleClose()} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>this.handleClose()} color="primary">
            Agree
          </Button>
        </DialogActions>
          </Dialog>
      </>
    );
  }
}
