import React, { Component } from 'react'
import Header from "../Header";
import Footer from "../Footer";
import InnerBanner from "./InnerBanner";
import { Container } from 'react-bootstrap';
import {getData} from "../FetchNodeServices"

export default class TermUse extends Component {

  constructor(){
    super();
    this.state={
termUse:[],
    }
  }
  componentDidMount =async()=> {
    window.scrollTo(0, 0);
    const result = await getData("admin/get-all-term");
    if(result){
      console.log(result);
      this.setState({
        termUse:result.data.data
      })
    }
    else{
      console.log(result.response);
    }
  }    

  render() {
    return (
      <>
        <Header />
        <InnerBanner Title="Terms of Use" item="Term of Use" />
        <div className="about-content pt-5 pb-5">
          <Container>
            <div className="abouttext">
            <ol type="1">
              { this.state.termUse.map((term,idx)=>(
              <li >{term.termContent}
                </li>
              ))}
              </ol>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
