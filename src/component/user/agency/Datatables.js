import React from "react";
import { MDBDataTableV5 } from "mdbreact";

export default function WithCheckBoxes() {
  const [datatable, setDatatable] = React.useState({
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
    rows: [
      {
        name: "Jessika",
        age: "25",
        gender: "Female",
        city: "Bangkok",
        height: "152 cm",
      },
      {
        name: "Jessika",
        age: "25",
        gender: "Female",
        city: "Bangkok",
        height: "152 cm",
      },
      {
        name: "Jessika",
        age: "25",
        gender: "Female",
        city: "Bangkok",
        height: "152 cm",
      },
      {
        name: "Jessika",
        age: "25",
        gender: "Female",
        city: "Bangkok",
        height: "152 cm",
      },
      {
        name: "Jessika",
        age: "25",
        gender: "Female",
        city: "Bangkok",
        height: "152 cm",
      },
    ],
  });
  const [checkbox1, setCheckbox1] = React.useState("");

  const showLogs2 = (e) => {
    setCheckbox1(e);
  };

  return (
    <>
      <MDBDataTableV5
        searching={false}
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={datatable}
        checkbox
        headCheckboxID="id2"
        bodyCheckboxID="checkboxes2"
        getValueCheckBox={(e) => {
          showLogs2(e);
        }}
        multipleCheckboxes
      />
    </>
  );
}
