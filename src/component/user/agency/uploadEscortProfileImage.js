import React, { Component } from "react";
import { Button } from "react-bootstrap";
import User from "../../../images/avatar1.png";
import { postData } from "../../FetchNodeServices";

import ImageCropper from "../../imageCropper/imageCropper";
import Popup from "../../popup/popup";

export default class UploadEscortProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      userImage: "",
      isOpen: false,
      crop: {
        unit: "%",
        width: 255,
        aspect: 9 / 9,
      },
      croppedImage: "",
    };
  }

  componentDidMount = () => {
    console.log("this.props new", this.props);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profileImage !== this.props.profileImage) {
      console.log(":PUDAING")
      this.setState({
        userImage: this.props.profileImage,
        photo: this.props.profileImage,
      });
    }
  }

  handlePopupClose = () => {
    this.setState({ isOpen: false });
  };

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
    this.props.handleProfileImgChange(body);
    this.setState({ isOpen: false, userImage: body.profileImage });
  };

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
          </div>
        </div>
      </>
    );
  }
}
