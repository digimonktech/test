import React, { Component } from "react";
import { Button } from "react-bootstrap";
import User from "../../../images/avatar1.png";
import { postData } from "../../FetchNodeServices";
export default class UploadProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      userImage: "",
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
          id: this.props.agencyId,
          username: this.props.username,
          currentImage: currentImage,
        };
        const result = await postData("agency/upload-agency-profile-img", body);
        console.log("result", result);
      };
    } catch (e) {}
  };

  componentDidMount = () => {};

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profileImage !== this.props.profileImage) {
      this.setState({ userImage: this.props.profileImage });
    }
  }

  render() {
    return (
      <>
        <div className="avatar-wrapper">
          <div className="upload-button">
            <img
              src={this.state.userImage ? this.state.userImage : User}
              alt=""
            />
          </div>
          <div className="edit-user">
            <span className="flaticon-pen"></span>
            <input
              className="file-upload"
              type="file"
              value={this.state.photo}
              name="photo"
              onChange={this.next}
              imgextension={[".jpg", ".gif", ".png", ".gif", ".pdf"]}
            />
          </div>
          <div className="delect-account">
            <Button className="btn-delet" variant="false">
              Delete Account
            </Button>
          </div>
        </div>
      </>
    );
  }
}
