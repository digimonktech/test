import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { postData } from "../../../FetchNodeServices";

export default class Report extends Component {
  constructor() {
    super();
    this.state = {
      subject:"",
     description:""
    }
  }
  
  sendReport=async()=>{
   const body={
      escortId: this.props.escort._id,
      subject:this.state.subject ,
      description:this.state.description,
    }
    console.log(body)
     const result = await postData( "admin/add-new-report",body)
  console.log(result)
  if(!result.responce)
  {
    this.setState({
      subject:"",
      description:""
    })
  }
 else
 {
  console.log("fail",result.responce)

 }
  }

  render() {
    const { escort } = this.props;
    console.log("this check escort",escort);
    return (
      <Modal
        size="lg"
        show={this.props.show}
        onHide={this.props.close}
        className="modal-center"
      >
        <Modal.Header className="send-report">
          <Modal.Title>Send Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Write Subject</Form.Label>
            <Form.Control type="text" value={this.state.subject} onChange={(e)=>this.setState({
              subject:e.target.value
            })}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"  value={this.state.description}
            onChange={(e)=>this.setState({
              description:e.target.value
            })}
            />
          </Form.Group>
          <Form.Group>
            <Button className="mr-2" onClick={()=>this.sendReport()}>
              Send
            </Button>
            <Button
              className="btn-outline-dark"
              variant="false"
              onClick={this.props.close}
            >
              Cancel
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    );
  }
}
