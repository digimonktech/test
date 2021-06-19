import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import jwt_decode from "jwt-decode";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UploadEscortProfileImage from "./uploadEscortProfileImage";
import kookyLogo from "../../../images/logo.png";

import { postData, getData } from "../../FetchNodeServices";

import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";

export default class Edit extends Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      file: [null],
      escort: {},
      escortName: "",
      escortEmail: "",
      escortUsername: "",
      escortPassword: "",
      escortContactNumber: "",
      escortAge: "",
      escortBodyShape: "",
      escortCountry: "",
      escortCity: "",
      escortGender: "",
      escortMeasurement: {},
      escortBust: "",
      escortWaist: "",
      escortHips: "",
      escortHeight: "",
      escortLangauges: [],
      escortServices: [],
      escortProfileImg: {},
      escortImg: [],
      isOpen: false,
      button: "Update",
      button1: "Add",
      lstyle: { display: "none" },
      result: "Added Successful",
      result1: "Updated Successfully ",
      allLanguage: ["English", "Hindi", "Japanese", "Franch"],
      allServices: [],
      msg: "",
      currImg: "",
      errors: {},
      allCountries: [],
      allCities: [],
      allBodyShape: [],
      serviceObject:[],
    };
  }

  componentDidMount = async () => {
    const { escort } = this.props;
    const services = await getData("admin/get-all-services");
    if (!services.response) {
      // console.log("services data", services.data.data);
      const service = services.data.data;
      const servicesName = services.data.data.map(services => services.shortName)
      this.setState({
        allServices: servicesName,
        serviceObject:service})
    } else {
      // console.log("services Data", services.response);
    }

    const bodyType = await getData("admin/get-all-body-type");
    if (!bodyType.response) {
       console.log("bodyType  data", bodyType.data.data);
      const body = bodyType.data.data;
      this.setState({
        allBodyShape: body
      })
    } else {
      // console.log("bodyType res Data", bodyType.response);
    }
    this.setState({
     
      escort: this.props.escort,
      currImg: escort.profileImg || "",
      escortName: !escort ? "" : escort.name,
      escortEmail: !escort ? "" : escort.email,
      escortContactNumber: escort.contactNumber
        ? escort.countryCode + escort.contactNumber.toString()
        : "",
      escortAge: !escort ? "" : escort.age,
      escortBodyShape: !escort ? "" : escort.bodyShape,
      escortCountry: !escort ? "" : escort.country,
      escortCity: !escort ? "" : escort.city,
      escortGender: !escort ? "" : escort.gender,
      escortBust: !escort
        ? ""
        : escort.measurement
        ? escort.measurement.bust
        : "",
      escortWaist: !escort
        ? ""
        : escort.measurement
        ? escort.measurement.waist
        : "",
      escortHips: !escort
        ? ""
        : escort.measurement
        ? escort.measurement.hips
        : "",
      escortHeight: !escort ? "" : escort.height,
      escortLangauges: !escort ? [] : escort.languages,
      escortServices: !escort ? [] : escort.services,
      escortImg: escort.images || [],
    });
    const countries = await getData("admin/get-all-country");
    if (!countries.response) {
      const data = countries.data.data;
      this.setState({ allCountries: data });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.escortCountry !== this.state.escortCountry) {
      this.handleCountryChange();
    }
  }

  handleCountryChange = async () => {
    const cities = await getData(
      `admin/get-all-city-by-country/${this.state.escortCountry}`
    );
    console.log(cities.data.data);
    this.setState({ allCities: cities.data.data });
  };

  uploadMultipleFiles = (e) => {
    // this.setState({ lstyle: { display: "block" }, button: "" });
    let files = e.target.files;
    let reader = new FileReader();
    try {
      console.log(files);
      reader.readAsDataURL(files[0]);

      reader.onload = (e) => {
        const newfiles =
          this.state.escortImg.length < 5
            ? [...this.state.escortImg, e.target.result]
            : [...this.state.escortImg];
        console.log("file: ", newfiles);
        this.setState({
          escortImg: newfiles,
          // lstyle: { display: "none" },
          // button: "Save",
        });
      };
    } catch (err) {
      console.log(err);
      return;
    }
  };

  removeClick = async (idx) => {
    console.log("Removed clicked: ", idx);
    let newArray = [...this.state.escortImg];
    const removedUrl = newArray.splice(idx, 1);
    this.setState({ escortImg: newArray });
    if (this.props.escort) {
      const body = {
        id: this.props.escort._id,
        url: removedUrl[0],
      };
      const result = await postData("escort/delete-images/", body);
      if (!result.response) {
        console.log("result: ", result);
        // this.props.handleEscortImageDelete(result.data);
        this.setState({
          open: true,
          result: "Image revomed successfully",
          lstyle: { display: "none" },
          button: "Save",
        });
      } else {
        console.log("err: ", result.response);
      }
    }
  };

  handleProfileImgChange = (body) => {
    console.log(body);
    this.setState({ escortProfileImg: body });
  };

  handleSubmit = async (e) => {
    this.setState({
      lstyle: { display: "block" },
      button: "",
      button1: "",
    });
    e.preventDefault();
    const token = localStorage.getItem("TOKEN");
    const decode = jwt_decode(token);
    const { escortContactNumber } = this.state;
    this.setState({ errors: {} });
    if (!escortContactNumber) {
      this.setState({
        errors: { contactNumber: "Contact Number is required" },
        lstyle: { display: "none" },
        button: "Update",
        button1: "Add",
      });
      return;
    }
    const phoneNumber = parsePhoneNumber(escortContactNumber);
    if (!phoneNumber) {
      this.setState({
        errors: { contactNumber: "Contact Number is required" },
        lstyle: { display: "none" },
        button: "Update",
        button1: "Add",
      });
      return;
    }
    const body = {
      agencyId: this.props.agencyId,
      agencyName: decode.name,
      escortId: this.props.escort ? this.props.escort._id : "",
      escortName: this.state.escortName,
      escortEmail: this.state.escortEmail,
      escortUsername: this.state.escortUsername,
      escortPassword: this.state.escortPassword,
      escortCountryCode: "+" + phoneNumber.countryCallingCode,
      escortContactNumber: phoneNumber.nationalNumber,
      escortAge: this.state.escortAge,
      escortBodyShape: this.state.escortBodyShape,
      escortCountry: this.state.escortCountry,
      escortCity: this.state.escortCity,
      escortGender: this.state.escortGender,
      escortBust: this.state.escortBust,
      escortWaist: this.state.escortWaist,
      escortHips: this.state.escortHips,
      escortHeight: this.state.escortHeight,
      escortLangauges: this.state.escortLangauges,
      escortServices: this.state.escortServices,
      escortProfileImg: this.state.escortProfileImg,
    };
    console.log(body);
    if (Object.keys(this.props.escort).length) {
      const updateDetails = await postData(
        "agency/update-escort-details-by-agency",
        body
      );
      if (!updateDetails.response) {
        console.log(updateDetails);
        let newBody = {
          ...body.escortProfileImg,
          id: updateDetails.data._id,
          username: body.escortUsername,
        };
        const result = await postData("escort/upload-profile-image", newBody);
        if (!result.response) {
          this.setState({
            msg: updateDetails.msg,
            isOpen: true,
            lstyle: { display: "none" },
            button: "Update",
            button1: "Add",
          });
          const images = {
            image: this.state.escortImg,
            id: newBody.id,
            username: newBody.username,
          };
          const imagesURL = await postData("escort/upload-images", images);
          if (!imagesURL.response) {
            this.setState({
              isOpen: true,
              lstyle: { display: "none" },
              button: "Update",
              button1: "Add",
            });
            console.log("imagesUpload: ", imagesURL);
          } else {
            this.setState({
              errors: updateDetails.response.data.errors,
              lstyle: { display: "none" },
              button: "Update",
              button1: "Add",
            });
          }
        }
        this.props.handleUpdate();
      } else {
        console.log(updateDetails.response);
        this.setState({
          lstyle: { display: "none" },
          button: "Update",
          button1: "Add",
        });
      }
    } else {
      const newEscort = await postData(
        "agency/register-escort-by-agency",
        body
      );
      if (!newEscort.response) {
        console.log(newEscort.data._id);
        let newBody = {
          ...body.escortProfileImg,
          id: newEscort.data._id,
          username: body.escortUsername,
        };
        console.log(newBody);
        const result = await postData("escort/upload-profile-image", newBody);
        if (!result.response) {
          this.setState({
            isOpen: true,
            lstyle: { display: "none" },
            button: "Update",
            button1: "Add",
          });
          console.log("imageUpload", result);

          const images = {
            image: this.state.escortImg,
            id: newBody.id,
            username: newBody.username,
          };
          const imagesURL = await postData("escort/upload-images", images);
          if (!imagesURL.response) {
            this.setState({
              isOpen: true,
              lstyle: { display: "none" },
              button: "Update",
              button1: "Add",
            });
            console.log("imagesUpload: ", imagesURL);
          } else {
            this.setState({
              errors: newEscort.response.data.errors,
              lstyle: { display: "none" },
              button: "Update",
              button1: "Add",
            });
          }
        } else {
          console.log("err: ", result.response);
        }
      } else {
        console.log("err", newEscort.response);
        this.setState({
          errors: newEscort.response.data.errors,
          lstyle: { display: "none" },
          button: "Update",
          button1: "Add",
        });
      }
    }
  };

  onLangaugeSelect = (selectedList, selectedItem) => {
    this.setState({ escortLangauges: selectedList });
  };

  onLangaugeRemove = (selectedList, removedItem) => {
    this.setState({ escortLangauges: selectedList });
  };

  onServiceSelect = (selectedList, selectedItem) => {
    this.setState({ escortServices: selectedList });
  };

  onServiceRemove = (selectedList, removedItem) => {
    this.setState({ escortServices: selectedList });
  };

  handleClose = async () => {
    this.setState({
      isOpen: false,
      lstyle: { display: "none" },
      button: "Update",
      button1: "Add",
    });
  };

  render() {
    const { escort } = this.state;
    return (
      <>
        <div className="edit-profilebox">
          <Dialog
            open={this.state.isOpen}
            // TransitionComponent={Transition}
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
                  marginTop: 20,
                }}
              >
                <h4>
                  {" "}
                  {Object.keys(this.props.escort).length
                    ? this.state.result1
                    : this.state.result}{" "}
                </h4>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Escort Name"
                value={this.state.escortName}
                disabled={escort.name ? true : false}
                onChange={(e) => this.setState({ escortName: e.target.value })}
              ></Form.Control>
              <label
                style={{
                  display: this.state.errors.name ? "block" : "none",
                  color: "red",
                }}
              >
                {this.state.errors.name}
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Escort Email"
                value={this.state.escortEmail}
                disabled={escort.email ? true : false}
                onChange={(e) => this.setState({ escortEmail: e.target.value })}
              ></Form.Control>
              <label
                style={{
                  display: this.state.errors.email ? "block" : "none",
                  color: "red",
                }}
              >
                {this.state.errors.email}
              </label>
            </Form.Group>

            {Object.keys(this.props.escort).length === 0 ? (
              <>
                <Form.Group>
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Escort Username"
                    value={this.state.escortUsername}
                    onChange={(e) =>
                      this.setState({ escortUsername: e.target.value })
                    }
                  ></Form.Control>
                  <label
                    style={{
                      display: this.state.errors.username ? "block" : "none",
                      color: "red",
                    }}
                  >
                    {this.state.errors.username}
                  </label>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Password will be auto generated and sent to escort email address"
                    disabled
                  ></Form.Control>
                </Form.Group>
              </>
            ) : (
              ""
            )}
            <Form.Group>
              <Form.Label htmlFor="contactNumber">Contact Number</Form.Label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="TH"
                value={this.state.escortContactNumber}
                limitMaxLength={true}
                onChange={(e) => {
                  this.setState({ escortContactNumber: e });
                }}
                className="form-control phoneNumber"
                style={{
                  backgroundColor: this.state.escortContactNumber
                    ? "white"
                    : "transparent",
                }}
                disabled={escort.contactNumber ? true : false}
              />
              <label
                style={{
                  display: this.state.errors.contactNumber ? "block" : "none",
                  color: "red",
                }}
              >
                {this.state.errors.contactNumber}
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="age">Age (in Years)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Escort Age"
                value={this.state.escortAge}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (
                    (e.target.value === "" || re.test(e.target.value)) &&
                    e.target.value.length <= 2
                  ) {
                    this.setState({ escortAge: e.target.value });
                  }
                }}
              ></Form.Control>
              <label
                style={{
                  display: this.state.errors.age ? "block" : "none",
                  color: "red",
                }}
              >
                {this.state.errors.age}
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="bodyshape">Body Shape</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => {
                  this.setState({ escortBodyShape: e.target.value });
                }}
              >
               <option>Select Body Shape</option>
                {this.state.allBodyShape.map((shape, idx) => (
                  <option
                    value={shape.name}
                    key={idx}
                    selected={this.state.escortBodyShape === shape.name}
                  >
                    {shape.name}
                  </option>
                ))}
              </Form.Control>
              <label
                style={{
                  display: this.state.errors.bodyShape ? "block" : "none",
                  color: "red",
                }}
              >
                {this.state.errors.bodyShape}
              </label>
            </Form.Group>
            <Row xs={1} md={2} lg={2}>
              <Col>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={(e) => {
                      console.log("country: ", e.target.value);
                      this.setState({ escortCountry: e.target.value });
                    }}
                  >
                    <option>Select Country</option>
                    {this.state.allCountries.map((country, idx) => (
                      <option
                        value={country.code3}
                        key={idx}
                        selected={this.state.escortCountry === country.code3}
                      >
                        {country.name
                          .replace("_", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </Form.Control>
                  <label
                    style={{
                      display: this.state.errors.country ? "block" : "none",
                      color: "red",
                    }}
                  >
                    {this.state.errors.country}
                  </label>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={(e) => {
                      console.log("city: ", e.target.value);
                      this.setState({ escortCity: e.target.value });
                    }}
                  >
                    {this.state.escortCountry ? (
                      <>
                        <option>Select City </option>
                        {this.state.allCities.map((city, idx) => (
                          <option
                            value={city.city}
                            key={idx}
                            selected={this.state.escortCity === city.city}
                          >
                            {city.city
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option>Select Country First</option>
                    )}
                    <label
                      style={{
                        display: this.state.errors.city ? "block" : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.city}
                    </label>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label htmlFor="Gender">Gender</Form.Label>
              <div className="form-control">
                <ul className="gender">
                  <li className="malediv">
                    <input
                      type="radio"
                      id="test1"
                      name="radio-group"
                      checked={this.state.escortGender === "male"}
                      onClick={() => this.setState({ escortGender: "male" })}
                    />
                    <label htmlFor="test1">
                      <i className="flaticon-mars"></i> Male
                    </label>
                  </li>
                  <li className="femalediv">
                    <input
                      type="radio"
                      id="test2"
                      name="radio-group"
                      checked={this.state.escortGender === "female"}
                      onClick={() => this.setState({ escortGender: "female" })}
                    />

                    <label htmlFor="test2">
                      <i className="flaticon-venus"></i>Female
                    </label>
                  </li>
                  <li className="transgenderdiv">
                    <input
                      type="radio"
                      id="test3"
                      name="radio-group"
                      checked={this.state.escortGender === "transgender"}
                      onClick={() =>
                        this.setState({ escortGender: "transgender" })
                      }
                    />
                    <label htmlFor="test3">
                      <i className="flaticon-transgender"></i> Transgender
                    </label>
                  </li>
                </ul>
              </div>
              <label
                style={{
                  display: this.state.errors.gender ? "block" : "none",
                  color: "red",
                }}
              >
                {this.state.errors.gender}
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Measurements</Form.Label>
              <Row xs={1} md={3} lg={3}>
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center bust">
                      <span>Bust</span>
                      <Form.Control
                        type="text"
                        placeholder="Enter Escort Bust Size"
                        value={this.state.escortBust}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            (e.target.value === "" ||
                              re.test(e.target.value)) &&
                            e.target.value.length <= 2
                          ) {
                            this.setState({ escortBust: e.target.value });
                          }
                        }}
                      />
                    </div>
                    <label
                      style={{
                        display: this.state.errors.bust ? "block" : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.bust}
                    </label>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center bust">
                      <span>Waist</span>
                      <Form.Control
                        type="text"
                        placeholder="Enter Escort Waist Size"
                        value={this.state.escortWaist}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            (e.target.value === "" ||
                              re.test(e.target.value)) &&
                            e.target.value.length <= 2
                          ) {
                            this.setState({ escortWaist: e.target.value });
                          }
                        }}
                      />
                    </div>
                    <label
                      style={{
                        display: this.state.errors.waist ? "block" : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.waist}
                    </label>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center bust">
                      <span>Hips</span>
                      <Form.Control
                        type="text"
                        placeholder="Enter Escort Hip Size"
                        value={this.state.escortHips}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            (e.target.value === "" ||
                              re.test(e.target.value)) &&
                            e.target.value.length <= 2
                          ) {
                            this.setState({ escortHips: e.target.value });
                          }
                        }}
                      />
                    </div>
                    <label
                      style={{
                        display: this.state.errors.hips ? "block" : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.hips}
                    </label>
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Height (in cm)</Form.Label>
              <Form.Control
                type="text"
                placeholder="type escort height"
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  console.log(
                    "hegiht: ",
                    e.target.value === "" || re.test(e.target.value)
                  );
                  if (e.target.value === "" || re.test(e.target.value)) {
                    console.log("enterign");
                    this.setState({ escortHeight: e.target.value });
                  }
                }}
                value={this.state.escortHeight}
              />
              <label
                style={{
                  display: this.state.errors.height ? "block" : "none",
                  color: "red",
                }}
              >
                {this.state.errors.height}
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Languages</Form.Label>
              <Multiselect
                options={this.state.allLanguage}
                isObject={false}
                selectedValues={this.state.escortLangauges}
                style={{ chips: { background: "#E100FF" } }}
                onSelect={this.onLangaugeSelect} // Function will trigger on select event
                onRemove={this.onLangaugeRemove} // Function will trigger on remove event
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Services</Form.Label>
              <Multiselect
                options={this.state.allServices}
                isObject={false}
                selectedValues={this.state.escortServices}
                style={{ chips: { background: "#E100FF" } }}
                onSelect={this.onServiceSelect} // Function will trigger on select event
                onRemove={this.onServiceRemove} // Function will trigger on remove event
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Upload Profile Image</Form.Label>
              <Col md="4">
                <UploadEscortProfileImage
                  profileImage={this.state.currImg}
                  handleProfileImgChange={this.handleProfileImgChange}
                />
              </Col>
              <label
                style={{
                  display: this.state.errors.escortProfileImg
                    ? "block"
                    : "none",
                  color: "red",
                }}
              >
                {this.state.errors.escortProfileImg}
              </label>
            </Form.Group>

            <Form.Group>
              <div className="form-group">
                <Form.Label>
                  Upload Images (<span>{this.state.escortImg.length}</span>{" "}
                  images)
                </Form.Label>
                <div className="uploadimgrdiv">
                  <div className="form-group multi-preview">
                    {(this.state.escortImg || []).map((url, idx) => (
                      <div className="uploadimg-arry" key={idx}>
                        <span
                          className="fa fa-close"
                          onClick={() => this.removeClick(idx)}
                        ></span>
                        <img src={url} alt="..." />
                      </div>
                    ))}
                  </div>
                  {this.state.escortImg.length < 5 ? (
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
                          multiple
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Form.Group>
            <Form.Group className="text-right">
              <Button
                className="uppercase"
                onClick={this.props.cancleEdit}
                style={{ marginRight: "1vw" }}
              >
                Cancle
              </Button>
              <Button
                type="submit"
                className="uppercase"
                onClick={this.handleSubmit}
              >
                {Object.keys(this.props.escort).length
                  ? this.state.button
                  : this.state.button1}{" "}
                <CircularProgress style={this.state.lstyle} color="white" />
              </Button>
              {/* <label
                style={{
                  display: this.state.msg ? "block" : "none",
                  color: "green ",
                }}
              >
                {this.state.msg}
              </label> */}
            </Form.Group>
          </Form>
        </div>
      </>
    );
  }
}
