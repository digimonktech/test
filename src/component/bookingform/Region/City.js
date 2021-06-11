import React, { Component } from "react";
import { getData } from "../../FetchNodeServices";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";

export default class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCities: [],
    };
  }
  componentDidMount = async () => {
    const cities = await getData(
      `admin/get-all-city-by-country/${this.props.country}`
    );
    console.log(cities.data.data);
    this.setState({ allCities: cities.data.data });
  };
  render() {
    return (
      <>
        <ul className="region">
          {this.state.allCities.map((city, idx) => {
            const isAvaliable =
              city.femaleEscort.inCallAvaliable ||
              city.femaleEscort.outCallAvaliable ||
              city.maleEscort.inCallAvaliable ||
              city.maleEscort.outCallAvaliable ||
              city.transgenderEscort.inCallAvaliable ||
              city.transgenderEscort.outCallAvaliable;
            return (
              <li
                key={idx}
                onClick={() => {
                  if (isAvaliable) {
                    this.props.handleFilter("city", city);
                    this.props.stepper.next();
                  }
                }}
                style={{ color: isAvaliable ? "black" : "#a9a9a9" }}
              >
                {city.city} {isAvaliable ? "" : "(Coming Soon)"}
              </li>
            );
          })}
        </ul>

          </>
    );
  }
}

// data[i].femaleEscort.inCallAvaliable ||
//             data[i].femaleEscort.outCallAvaliable ||
//             data[i].maleEscort.inCallAvaliable ||
//             data[i].maleEscort.outCallAvaliable ||
//             data[i].transgenderEscort.inCallAvaliable ||
//             data[i].transgenderEscort.outCallAvaliable,
