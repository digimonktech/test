import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import noMemberImage from "../../../images/Group 4071.png";
import Edit from "./Edit";
export default class MemberTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      editType: true,
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
      rows: [],
      selectedIndex: -1,
      selectedEscort: {},
    };
  }

  componentDidMount() {
    console.log(this.props.escortList);
    this.setState({
      rows: this.props.escortList.map((escort, idx) => {
        return {
          name: escort.name,
          age: escort.age,
          gender: escort.gender,
          bodyshape: escort.bodyShape,
          city: escort.city,
          height: escort.height,
          status: (
            <button
              className="btn btn-active"
              name={idx}
              onClick={this.changeSelected}
            >
              Active
            </button>
          ),
          action: (
            <>
              <button
                className="btn btn-active"
                name={idx}
                onClick={(e) => {
                  this.changeSelected(e);
                }}
                style={{
                  padding: "0",
                }}
              >
                <button
                  className="flaticon-trash btn btn-active"
                  name={idx}
                ></button>
              </button>
              &nbsp;
              &nbsp;
              &nbsp; 
              <button
                className="btn btn-success"
                name={idx}
                onClick={(e) => {
                  this.changeSelected(e, "edit");
                }}
                style={{
                  padding: "0",
                }}
              >
                <button
                  className="flaticon-edit btn btn-success"
                  name={idx}
                ></button>
              </button>
            </>
          ),
        };
      }),
    });
  }

  changeSelected = (e, type) => {
    this.setState({
      selectedIndex: e.target.name,
      selectedEscort: this.props.escortList[e.target.name],
      type: type,
    });
  };

  cancleEdit = () => {
    console.log(this.state);
    this.setState({ type: "" });
  };

  render() {
    return (
      <>
        {this.state.type !== "edit" ? (
          this.state.rows.length ? (
            <div style={{ minHeight: 350 }}>
              <MDBDataTableV5
                searching={false}
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={{
                  columns: this.state.columns,
                  rows: this.state.rows,
                }}
              />
            </div>
          ) : (
            <img src={noMemberImage} alt="no memeber Yet"  style={{marginLeft:"35%", marginTop:40,marginBottom:40}}/>
       
          )
        ) : (
          <Edit
            escort={this.state.selectedEscort}
            agencyId={this.props.agencyId}
            cancleEdit={this.cancleEdit}
            handleUpdate={this.props.handleUpdate}
          />
        )}
      </>
    );
  }
}
