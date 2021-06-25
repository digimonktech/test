import React, { Component } from 'react'
import Header from "../Header";
import Footer from "../Footer";
import InnerBanner from "./InnerBanner";
import { Container, Button, Card, Accordion } from "react-bootstrap";
import {getData} from "../FetchNodeServices"
export default class Faq extends Component {

  constructor(){
    super();
    this.state={
faq:[]
    }
  }

  componentDidMount =async()=> {
    window.scrollTo(0, 0);
const result = await getData("admin/get-all-faq");
if(result){
  console.log(result);
  this.setState({
faq:result.data.data
  })
}
else{
  console.log(result.response);
}
  }
  render() {
    console.log('this',this.state.faq);
    return (
      <>
        <Header />
        <InnerBanner Title="FAQ" item="FAQ" />
        <div className="about-content pt-5 pb-5">
          <Container>
            <div className="abouttext">
              <h2>FAQ's</h2>
              <div className="faq-toggle">
                <Accordion defaultActiveKey="0">
                  {this.state.faq.map((faq,idx)=>(
   <Card key={idx}>
                    <Card.Header>
                      <Accordion.Toggle as="a" eventKey={idx.toString()} >
                        <i className="fas fa-long-arrow-alt-right"></i> {faq.question} 
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                       {faq.answer}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                 
                  ))}
               
                </Accordion>
              </div>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
