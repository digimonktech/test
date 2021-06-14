import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { Dropdown } from "react-bootstrap";
export default class Revenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "New Bookings",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
      ],
      options: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },

        title: {
          text: "Revenue",
          align: "left",
        },

        labels: [
          "01 Jan 2001",
          "02 Jan 2001",
          "03 Jan 2001",
          "04 Jan 2001",
          "05 Jan 2001",
          "06 Jan 2001",
          "07 Jan 2001",
          "08 Jan 2001",
          "09 Jan 2001",
          "10 Jan 2001",
          "11 Jan 2001",
          "12 Jan 2001",
        ],
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          opposite: false,
        },
        legend: {
          horizontalAlign: "left",
        },
      },
    };
  }
  render() {
    return (
      <>
        <div id="chart" className="newbooking">
          <Dropdown>
            <Dropdown.Toggle variant="false" id="dropdown-basic">
              7 days
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">7 days</Dropdown.Item>
              <Dropdown.Item href="#/action-2">16 days</Dropdown.Item>
              <Dropdown.Item href="#/action-3">28 days</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={250}
          />
        </div>
      </>
    );
  }
}
