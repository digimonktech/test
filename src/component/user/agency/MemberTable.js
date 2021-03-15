import React from 'react'
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import Edit from "./Edit"
export default function MemberTable() {
  function ChangeTab  (type) {
  setEdittype(false)
     setType("edit")
    
  };

 const [type, setType] = React.useState(
   "edit"
 );
  const [edittype, setEdittype] = React.useState(
  true
 );
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
          sort: "asc",
          width: 270,
        },
        {
          label: "Gender",
          field: "gender",
          sort: "asc",
          width: 200,
        },
        {
          label: "Body Shape",
          field: "bodyshape",
          sort: "asc",
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
          sort: "asc",
          width: 150,
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: 150,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 150,
        },
      ],
      rows: [
        {
          name: "Jessika",
          age: "25",
          gender: "Female",
          bodyshape: "36 D–26–35",
          city: "Bangkok",
          height: "152 cm",
          status: <button className="btn btn-active">Active</button>,
          action: (
            <>
              <Link to="#" className="delete">
                <i className="flaticon-trash"></i>
              </Link>
              <Link to="#"  onClick={()=> ChangeTab("edit")}  className="edit">
                <i className="flaticon-edit"></i>
              </Link>
            </>
          ),
        },
        {
          name: "Jessika",
          age: "25",
          gender: "Female",
          bodyshape: "36 D–26–35",
          city: "Bangkok",
          height: "152 cm",
          status: <button className="btn btn-active">Active</button>,
          action: (
            <>
              <Link to="#" className="delete">
                <i className="flaticon-trash"></i>
              </Link>
              <Link to="#"  className="edit">
                <i className="flaticon-edit"></i>
              </Link>
            </>
          ),
        },
        {
          name: "Jessika",
          age: "25",
          gender: "Female",
          bodyshape: "36 D–26–35",
          city: "Bangkok",
          height: "152 cm",
          status: <button className="btn btn-active">Active</button>,
          action: (
            <>
              <Link to="#" className="delete">
                <i className="flaticon-trash"></i>
              </Link>
              <Link to="#" className="edit">
                <i className="flaticon-edit"></i>
              </Link>
            </>
          ),
        },
        {
          name: "Jessika",
          age: "25",
          gender: "Female",
          bodyshape: "36 D–26–35",
          city: "Bangkok",
          height: "152 cm",
          status: <button className="btn btn-active">Active</button>,
          action: (
            <>
              <Link to="#" className="delete">
                <i className="flaticon-trash"></i>
              </Link>
              <Link to="#" className="edit">
                <i className="flaticon-edit"></i>
              </Link>
            </>
          ),
        },
      ],
    });
    const [checkbox1, setCheckbox1] = React.useState("");

    const showLogs2 = (e) => {
      setCheckbox1(e);
    };

    return (
      <>
      {edittype ? 
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
        :<Edit/>}
      </>
    );
}
