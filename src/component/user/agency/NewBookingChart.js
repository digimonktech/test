import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { Dropdown } from "react-bootstrap";

import { getData } from "../../FetchNodeServices";

export default class NewBookingChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          opposite: false,
        },
      },
      selectedDays: 7,
    };
  }

  componentDidMount() {
    this.handleDayChange();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedDays !== this.state.selectedDays) {
      this.handleDayChange();
    }
  }

  handleDayChange = async () => {
    const result = await getData(
      `booking/get-all-booking-of-n-days/${this.props.agencyId}-${this.state.selectedDays}`
    );
    if (!result.response) {
      const details = result.data.data;
      //        agencyId: "6093d2236be66c24f05587cb"
      //        date: "2021-05-18T00:00:00.000Z"
      //        totalBooking: 2
      console.log("result", details);
      let start = new Date();
      start.setDate(start.getDate() - (this.state.selectedDays - 1));
      let dates = [];
      for (let d = start; d <= new Date(); d.setDate(d.getDate() + 1)) {
        let newDate = new Date(d).toDateString().split(" ");
        dates.push(newDate[2] + " " + newDate[1] + " " + newDate[3]);
      }
      for (const i in details) {
        const t = new Date(details[i].date).toDateString().split(" ");
        details[i].date = t[2] + " " + t[1] + " " + t[3];
      }
      let data = [];
      for (const i in dates) {
        let isPushed = false;
        for (const j in details) {
          if (details[j].date === dates[i]) {
            data.push(details[j]);
            isPushed = true;
            break;
          }
        }
        if (!isPushed) {
          data.push({ date: dates[i], totalBooking: 0 });
        }
      }
      console.log(data);

      let totalBooking = [];
      let labels = [];
      for (const i in data) {
        totalBooking.push(data[i].totalBooking);
        labels.push(data[i].date);
      }
      this.setState({
        series: [
          {
            name: "New Bookings",
            data: totalBooking,
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
            text: "New Bookings",
            align: "left",
          },

          labels: labels,
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
      });
    } else {
      console.log("err", result.response, "\n", result);
    }
  };

  render() {
    return (
      <>
        <div id="chart" className="newbooking">
          <Dropdown>
            <Dropdown.Toggle variant="false" id="dropdown-basic">
              {this.state.selectedDays} days
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <span
                  onClick={(e) => this.setState({ selectedDays: 7 })}
                  value={7}
                >
                  7 days
                </span>
              </Dropdown.Item>
              <Dropdown.Item value={16}>
                <span
                  onClick={(e) => this.setState({ selectedDays: 16 })}
                  value={16}
                >
                  16 days
                </span>
              </Dropdown.Item>
              <Dropdown.Item value={28}>
                <span
                  onClick={(e) => this.setState({ selectedDays: 28 })}
                  value={28}
                >
                  28 days
                </span>
              </Dropdown.Item>
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
