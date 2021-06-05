import React, { Component } from "react";
import { getData } from "../../FetchNodeServices";
export default class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountries: [],
    };
  }

  componentDidMount = async () => {
    const countries = await getData("admin/get-all-country");
    if (!countries.response) {
      const data = countries.data.data;
      this.setState({ allCountries: data });
    } else {
      console.log(countries.response);
    }
  };
  render() {
    return (
      <>
        <ul className="region">
          {this.state.allCountries.map((country, idx) => (
            <li
              key={idx}
              disabled={country.isAvaliable}
              onClick={() => {
                if (country.isAvaliable) {
                  this.props.changeTab("city");
                  this.props.handleFilter("country", country.code3);
                }
              }}
              style={{ color: country.isAvaliable ? "black" : "#a9a9a9" }}
            >
              {country.name} {country.isAvaliable ? "" : "(Coming Soon)"}
            </li>
          ))}
        </ul>
      </>
    );
  }
}
