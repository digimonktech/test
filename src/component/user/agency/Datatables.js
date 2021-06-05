import React from "react";
import { MDBDataTableV5 } from "mdbreact";

export default class WithCheckBoxes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          label: "Name",
          field: "name",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Name",
          },
        },
        {
          label: "Age",
          field: "age",
          width: 270,
        },
        {
          label: "Gender",
          field: "gender",
          width: 200,
        },
        {
          label: "City",
          field: "city",
          sort: "asc",
          width: 100,
        },
        {
          label: "Height",
          field: "height",
          sort: "disabled",
          width: 150,
        },
      ],
      row: [],
    };
  }
  componentDidMount() {
    this.setState({
      rows: this.props.escortList.map((escort) => {
        return {
          name: escort.name,
          age: escort.age,
          gender: escort.gender,
          city: escort.city,
          height: escort.height,
        };
      }),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.escortList !== this.props.escortList) {
      this.setState({
        rows: this.props.escortList.map((escort) => {
          return {
            name: escort.name,
            age: escort.age,
            gender: escort.gender,
            city: escort.city,
            height: escort.height,
          };
        }),
      });
    }
  }
  render() {
    return (
      <>
        <MDBDataTableV5
          searching={false}
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={{ columns: this.state.columns, rows: this.state.rows }}
        />
      </>
    );
  }
}
