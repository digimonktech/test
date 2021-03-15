import React from 'react'
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
export default function NewRequest() {
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
       ],
       rows: [
         {
           name: "Jessika",
           age: "25",
           gender: "Female",
           bodyshape: "36 D–26–35",
           city: "Bangkok",
           height: "152 cm",
           status: (
             <>
               <button className="btn btn-sm btn-success mr-1">Accept</button>
               <button className="btn btn-sm btn-secondary">Reject</button>
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
           status: (
             <>
               <button className="btn btn-sm btn-success mr-1">Accept</button>
               <button className="btn btn-sm btn-secondary">Reject</button>
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
           status: (
             <>
               <button className="btn btn-sm btn-success mr-1">Accept</button>
               <button className="btn btn-sm btn-secondary">Reject</button>
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
           status: (
             <>
               <button className="btn btn-sm btn-success mr-1">Accept</button>
               <button className="btn btn-sm btn-secondary">Reject</button>
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
           status: (
             <>
               <button className="btn btn-sm btn-success mr-1">Accept</button>
               <button className="btn btn-sm btn-secondary">Reject</button>
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
           status: (
             <>
               <button className="btn btn-sm btn-success mr-1">Accept</button>
               <button className="btn btn-sm btn-secondary">Reject</button>
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
        <div className="edit-profilebox">
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
        </div>
      </>
    );
}
