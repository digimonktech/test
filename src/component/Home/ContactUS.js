import React, { Component } from 'react'
import Header from "../Header"
import Footer from "../Footer"
import InnerBanner from './InnerBanner'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {postData} from "../FetchNodeServices";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import kookyLogo from "../../images/logo.png";


export default class ContactUS extends Component {
  constructor() {
    super();
    this.state = {
    fullName:"",
    email:"",
    message:"",
    lstyle: { display: "none" },
    button: "SEND",
    open: false,
    result : "Your Request Send Successfully"
  }
}

  componentDidMount() {
    window.scrollTo(0, 0);
  }

SubmitContactReport=async()=>{
  this.setState({
    lstyle: { display: "block" },
    button: "",
  })
const  body={
  fullName:this.state.fullName,
  email:this.state.email,
  message:this.state.message,
}
console.log(body);
const result = await postData("admin/add-new-contactUsReport",body)

if(result){
  console.log('result',result);
  this.setState({
    fullName:"",
    email:"",
    message:"",
    result:"Your Request Send Successfully",
    lstyle: { display: "none" },
    button: "SEND",
    open: true,
  })
}
else{
  console.log('result res',result.response)
  this.setState({

    lstyle: { display: "none" },
    button: "SEND",
    result:"Something Went Weong !",
    open: true,
  })
}
}

handleClose = async () => {
  this.setState({
    open: false,
    lstyle: { display: "none" },
    button: "SEND",
  });
};

  render() {
    return (
      <>
       <Dialog
          open={this.state.open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose()}
          maxWidth="md"
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            style={{ textAlign: "center" }}
          >
            <img src={kookyLogo} alt="" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{textAlign:"center"}}>
              {this.state.result}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
  Close
            </Button>
          </DialogActions>
        </Dialog>
        <Header />
        <InnerBanner Title="Contact Us" item="Contact Us" />
        <div className="about-content pt-5 pb-5">
          <Container>
            <div className="contact-bg pt-5 pb-5 pl-5 pr-5">
              <Row>
                <Col md={{ offset: 4, md: 8 }}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" value={this.state.fullName} onChange={(e)=>this.setState({
                        fullName: e.target.value,
                      })}/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={this.state.email} onChange={(e)=>this.setState({
                        email: e.target.value,
                      })}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={3} value={this.state.message} onChange={(e)=>this.setState({
                        message: e.target.value,
                      })} />
                    </Form.Group>
                    <Form.Group>
                      <Button className="uppercase" onClick={()=>this.SubmitContactReport()}>                {this.state.button}{" "}
                <CircularProgress style={this.state.lstyle} color="white" /></Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
