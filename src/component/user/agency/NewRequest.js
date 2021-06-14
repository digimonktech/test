import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { getData, postData } from "../../FetchNodeServices";
import noRequestImage from "../../../images/Group 4070@2x.png";
export default class NewRequest extends React.Component {
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
      ],
      rows: [],
    };
  }
  componentDidMount = async () => {
    console.log(this.props.agencyId);
    const allRequest = await getData(
      `agency/get-all-request-by-agency/${this.props.agencyId}`
    );
    if (!allRequest.response && allRequest.data.data.length) {
      console.log(allRequest);
      const requests = allRequest.data.data;
      let rows = [];
      for (const i in requests) {
        console.log(requests);
        const escortDetails = await getData(
          `escort/get-escort-details/${requests[i].escortId}`
        );
        if (!escortDetails.response && escortDetails.data.data) {
          console.log(escortDetails);
          rows.push({
            name: escortDetails.data.data.name,
            age: escortDetails.data.data.age,
            gender: escortDetails.data.data.gender,
            bodyshape: escortDetails.data.data.bodyShape,
            city: escortDetails.data.data.city,
            height: escortDetails.data.data.height,
            status: (
              <>
                {!requests[i].isAccepted && !requests[i].isRejected ? (
                  <>
                    <button
                      className="btn btn-sm btn-success mr-1"
                      onClick={() => this.acceptRequest(requests[i]._id, i)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => this.rejectRequest(requests[i]._id, i)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    {requests[i].isAccepted ? (
                      <button className="btn btn-sm btn-success mr-1" disabled>
                        Accepted
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-secondary" disabled>
                        Rejected
                      </button>
                    )}
                  </>
                )}
              </>
            ),
          });
        }
      }
      console.log("Request: ", rows);
      this.setState({ rows: rows });
    }
  };

  acceptRequest = async (id, idx) => {
    const accept = await postData("agency/accept-escort-request", {
      requestId: id,
    });
    if (!accept.response) {
      let newRows = [...this.state.rows];
      let update = newRows[idx];
      update.status = (
        <button className="btn btn-sm btn-success mr-1" disabled>
          Accepted
        </button>
      );
      newRows[idx] = update;
      this.setState({
        rows: newRows,
      });
    }
  };

  rejectRequest = async (id, idx) => {
    const reject = await postData("agency/reject-escort-request", {
      requestId: id,
    });
    if (!reject.response) {
      let newRows = [...this.state.rows];
      let update = newRows[idx];
      update.status = (
        <button className="btn btn-sm btn-secondary" disabled>
          Rejected
        </button>
      );
      newRows[idx] = update;
      this.setState({
        rows: newRows,
      });
    } else {
      console.log(reject.response);
    }
  };

  render() {
    console.log(this.state.rows);
    return (
      <>
        <div className="edit-profilebox" style={{ minHeight: 350 }}>
          {this.state.rows.length ? (
            <MDBDataTableV5
              searching={false}
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={{ columns: this.state.columns, rows: this.state.rows }}
            />
          ) : (
            <img src={noRequestImage} alt="no memeber Yet"  style={{marginLeft:"35%", marginTop:40,marginBottom:40}}/>
        
          )}
        </div>
      </>
    );
  }
}
