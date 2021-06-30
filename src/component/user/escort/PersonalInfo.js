import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Multiselect } from "multiselect-react-dropdown";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { postData, getData } from "../../FetchNodeServices";

import kookyLogo from "../../../images/logo.png";

import PhoneInput, {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import countryListAllIsoData from "../../../utils/country.utils";

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getName: "",
      getEmail: "",
      getAge: "",
      getContactNumber: "",
      getBodyShape: "",
      getCountry: "",
      getCity: "",
      getGender: "",
      getBust: "",
      getWaist: "",
      getHips: "",
      getHeight: "",
      getLanguages: [],
      getServices: [],
      getAbout: "",
      msg: "",
      button: "Update",
      lstyle: { display: "none" },
      escortId: "",
      wordCount: 0,
      open: false,
      result: "Profile Updated Successfully",
      allLanguage: ["English", "Hindi", "Japanese", "French"],
      allServices: [],
      serviceObject: [],
      allCountries: [],
      allCities: [],
      bodyType: [],
      errors: {},
    };
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.escortDetail !== this.props.escortDetail) {
      const { escortDetail } = this.props;
      console.log("escortDetailUpdate: ", escortDetail);
      this.setState({
        getName: escortDetail.name,
        getEmail: escortDetail.email,
        getAge: escortDetail.age,
        getContactNumber: escortDetail.contactNumber
          ? escortDetail.countryCode + escortDetail.contactNumber.toString()
          : "",
        getBodyShape: escortDetail.bodyShape,
        getCountry: escortDetail.country,
        getCity: escortDetail.city,
        getGender: escortDetail.gender,
        getBust: escortDetail.measurement ? escortDetail.measurement.bust : "",
        getWaist: escortDetail.measurement
          ? escortDetail.measurement.waist
          : "",
        getHips: escortDetail.measurement ? escortDetail.measurement.hips : "",
        getHeight: escortDetail.height,
        getLanguages: escortDetail.languages,
        getServices: escortDetail.services,
        getAbout: escortDetail.about,
        escortId: escortDetail._id,
      });
    }
    if (prevState.getCountry !== this.state.getCountry) {
      this.handleCountryChange();
    }
  };

  componentDidMount = async () => {
    var check = await getData("admin/get-all-options");
    console.log("check", check);
    this.setState({
      wordCount: check.data.data.escortDescriptionWordLimit,
    });

    const services = await getData("admin/get-all-services");
    if (!services.response) {
      console.log("services data", services.data.data);
      const service = services.data.data;
      const servicesName = services.data.data.map(
        (services) => services.shortName
      );
      this.setState({
        allServices: servicesName,
        serviceObject: service,
      });
    } else {
      console.log("services Data", services.response);
    }

    const bodyType = await getData("admin/get-all-body-type");
    if (!bodyType.response) {
      console.log("bodyType  data", bodyType.data.data);
      const body = bodyType.data.data;
      this.setState({
        bodyType: body,
      });
    } else {
      console.log("bodyType res Data", bodyType.response);
    }
    const { escortDetail } = this.props;
    console.log("escortDetail: ", escortDetail);
    this.setState(
      {
        getName: escortDetail.name,
        getEmail: escortDetail.email,
        getAge: escortDetail.age,
        getContactNumber: escortDetail.contactNumber
          ? escortDetail.countryCode + escortDetail.contactNumber.toString()
          : "",
        getBodyShape: escortDetail.bodyShape,
        getCountry: escortDetail.country || "",
        getCity: escortDetail.city,
        getGender: escortDetail.gender,
        getBust: escortDetail.measurement ? escortDetail.measurement.bust : "",
        getWaist: escortDetail.measurement
          ? escortDetail.measurement.waist
          : "",
        getHips: escortDetail.measurement ? escortDetail.measurement.hips : "",
        getHeight: escortDetail.height,
        getLanguages: escortDetail.languages,
        getServices: escortDetail.services,
        getAbout: escortDetail.about,
        escortId: escortDetail._id,
      },
      () => console.log("state: ", this.state)
    );
    const countries = await getData("admin/get-all-avaliable-country");
    if (!countries.response) {
      const data = countries.data.data;
      console.log("country: ", data);
      this.setState({ allCountries: data });
    }
  };

  handleUpdate = async (e) => {
    this.setState({
      lstyle: { display: "block" },
      button: "",
      errors: {},
    });
    e.preventDefault();
    const { getContactNumber } = this.state;
    if (!getContactNumber) {
      this.setState({
        errors: { contactNumber: "Contact Number is required" },
        lstyle: { display: "none" },
        button: "Update",
      });
      return;
    }
    const phoneNumber = parsePhoneNumber(getContactNumber);
    if (!phoneNumber) {
      this.setState({
        errors: { contactNumber: "Contact Number is required" },
        lstyle: { display: "none" },
        button: "Update",
      });
      return;
    }
    const body = {
      id: this.state.escortId,
      age: this.state.getAge,
      contactNumber: phoneNumber.nationalNumber,
      countryCode: "+" + phoneNumber.countryCallingCode,
      bodyShape: this.state.getBodyShape,
      country: this.state.getCountry,
      city: this.state.getCity,
      gender: this.state.getGender,
      measurement: {
        bust: this.state.getBust,
        waist: this.state.getWaist,
        hips: this.state.getHips,
      },
      height: this.state.getHeight,
      language: this.state.getLanguages,
      services: this.state.getServices,
      about: this.state.getAbout,
      name: this.state.getName,
    };
    const result = await postData("escort/update-escort-profile", body);

    setTimeout(() => {
      if (!result.response) {
        this.setState({
          msg: "update succfull",
          open: true,
          lstyle: { display: "none" },
          button: "Update",
        });
        this.props.handleUpdateProfile();
      } else {
        console.log("ERRO: ", result.response);
        this.setState({
          lstyle: { display: "none" },
          button: "Update",
          errors: result.response.data.errors,
        });
      }
    }, 3000);
    this.setState({ msg: "" });
  };

  handleClose = async () => {
    this.setState({
      open: false,
      lstyle: { display: "none" },
      button: "Update",
    });
  };

  handleWordLimit = (e) => {
    console.log(e.target.value);

    var text = e.target.value;
    let wordLimit = this.state.wordCount;
    for (var i = 0; i <= text.length; i++) {
      if (text.charAt(i) === " ") {
        if (this.state.wordCount > 0) {
          console.log(i);
          wordLimit = wordLimit - 1;
          console.log(wordLimit);
          this.setState({
            getAbout: e.target.value,
          });
        }
      }
    }
    this.setState({
      wordCount: wordLimit,
    });
    console.log("wordl", wordLimit);
    console.log(this.state.wordCount);
  };

  handleCountryChange = async () => {
    const cities = await getData(
      `admin/get-all-city-by-country/${this.state.getCountry || "THA"}`
    );
    console.log("city", cities);
    if (!cities.response) {
      this.setState({ allCities: cities.data.data });
    }
  };
  onLangaugeSelect = (selectedList, selectedItem) => {
    this.setState({ getLanguages: selectedList });
  };

  onLangaugeRemove = (selectedList, removedItem) => {
    this.setState({ getLanguages: selectedList });
  };
  onServiceSelect = (selectedList, selectedItem) => {
    this.setState({ getServices: selectedList });
  };

  onServiceRemove = (selectedList, removedItem) => {
    this.setState({ getServices: selectedList });
  };

  render() {
    return (
      <>
        <div className="edit-profilebox">
        
                <Form>
            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={this.state.getName}
                onChange={(e) => {
                  this.setState({ getName: e.target.value });
                }}
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="xyz@xyz.com"
                value={this.state.getEmail}
                onChange={(e) => this.setState({ getEmail: e.target.value })}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="name">Phone Number</Form.Label>
              <PhoneInput
                international
                defaultCountry="TH"
                countryCallingCodeEditable={false}
                value={this.state.getContactNumber}
                onChange={(e) => this.setState({ getContactNumber: e })}
                className="form-control phoneNumber"
                limitMaxLength={true}
                style={{
                  backgroundColor: this.state.getContactNumber
                    ? "white"
                    : "transparent",
                }}
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
                placeholder="Enter your age here"
                value={this.state.getAge}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (
                    (e.target.value === "" || re.test(e.target.value)) &&
                    e.target.value.length <= 2
                  ) {
                    this.setState({ getAge: e.target.value });
                  }
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="bodyshape">Body Shape</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => {
                  this.setState({ getBodyShape: e.target.value });
                }}
              >
                <option>Select Body Shape</option>
                {this.state.bodyType.map((shape, idx) => (
                  <option
                    value={shape.name}
                    key={idx}
                    selected={this.state.getBodyShape === shape.name}
                  >
                    {shape.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Row xs={1} md={2} lg={2}>
              <Col>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={(e) => {
                      this.setState({ getCountry: e.target.value });
                    }}
                  >
                    <option>Select Country</option>
                    {this.state.allCountries.map((country, idx) => (
                      <option
                        value={country.code3}
                        key={idx}
                        selected={this.state.getCountry === country.code3}
                      >
                        {country.name
                          .replace("_", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={(e) => this.setState({ getCity: e.target.value })}
                  >
                    {this.state.getCountry ? (
                      <>
                        <option>Select City </option>
                        {this.state.allCities.map((city, idx) => (
                          <option
                            value={city.city}
                            key={idx}
                            selected={this.state.getCity === city.city}
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
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label htmlFor="Gender">Gender</Form.Label>
              <div className="form-control gender-mobile">
                <ul className="gender">
                  <li className="malediv">
                    <input
                      type="radio"
                      id="test1"
                      name="radio-group"
                      onClick={(e) => this.setState({ getGender: "male" })}
                      checked={this.state.getGender === "male"}
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
                      onClick={(e) => this.setState({ getGender: "female" })}
                      checked={this.state.getGender === "female"}
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
                      onClick={(e) =>
                        this.setState({ getGender: "transgender" })
                      }
                      checked={this.state.getGender === "transgender"}
                    />
                    <label htmlFor="test3">
                      <i className="flaticon-transgender"></i> Transgender
                    </label>
                  </li>
                </ul>
              </div>
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
                        placeholder="Enter your Bust Size"
                        onChange={(e) => {
                          // const re = /^[0-9\b]+$/;
                          // if (
                          //   (e.target.value === "" ||
                          //     re.test(e.target.value)) &&
                          //   e.target.value.length <= 2
                          // ) {
                          this.setState({ getBust: e.target.value });
                          // }
                        }}
                        value={this.state.getBust}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center bust">
                      <span>Waist</span>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Waist Size"
                        onChange={(e) => {
                          // const re = /^[0-9\b]+$/;
                          // if (
                          //   (e.target.value === "" ||
                          //     re.test(e.target.value)) &&
                          //   e.target.value.length <= 2
                          // ) {
                          this.setState({ getWaist: e.target.value });
                          // }
                        }}
                        value={this.state.getWaist}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center bust">
                      <span>Hips</span>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Hip Size"
                        onChange={(e) => {
                          // const re = /^[0-9\b]+$/;
                          // if (
                          //   (e.target.value === "" ||
                          //     re.test(e.target.value)) &&
                          //   e.target.value.length <= 2
                          // ) {
                          this.setState({ getHips: e.target.value });
                          // }
                        }}
                        value={this.state.getHips}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Height (Enter in cm)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Height (Enter in cm)"
                onChange={(e) => {
                  // const re = /^[0-9\b]+$/;
                  // if (e.target.value === "" || re.test(e.target.value)) {
                  this.setState({ getHeight: e.target.value });
                  // }
                }}
                value={this.state.getHeight}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Languages</Form.Label>
              <Multiselect
                options={this.state.allLanguage}
                isObject={false}
                selectedValues={this.state.getLanguages}
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
                style={{ chips: { background: "#E100FF" } }}
                selectedValues={this.state.getServices}
                onSelect={this.onServiceSelect} // Function will trigger on select event
                onRemove={this.onServiceRemove} // Function will trigger on remove event
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>About me</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Tell us about yourself"
                // onKeyUp={(e) => this.handleWordLimit(e)}
                value={this.state.getAbout}
                maxlength={this.state.wordCount}
                onChange={(e) => {
                  this.setState({ getAbout: e.target.value });
                }}
              />
              <Form.Text style={{ textAlign: "end" }}>
                {this.state.getAbout ? this.state.getAbout.length : 0}/
                {this.state.wordCount}
              </Form.Text>
            </Form.Group>

            <Snackbar open={this.state.open} style={{position: 'relative',width:350,marginTop:40}} onClose={()=>this.handleClose()}>
        <MuiAlert onClose={()=>this.handleClose()} severity="success">
          {this.state.result}
        </MuiAlert>
</Snackbar>

            <Form.Group className="text-right">
              <Button
                type="submit"
                className="uppercase"
                onClick={this.handleUpdate}
              >
                {this.state.button}{" "}
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
