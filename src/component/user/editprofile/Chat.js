import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import noChatImage from "../../../images/Group 4055@2x.png";

export default class Chat extends Component {
  render() {
    return (
      <>
        <div className="edit-profilebox"  style={{minHeight:350}}>
          <div className="chat-box">
            {/* <div className="chat-title mb-3">
              <div className="user-icon">T</div>
              <div className="chat-text">
                <h5>NO User </h5>
                <span>Online</span>
              </div>
            </div> */}

            <div className="leftside-chat mb-4">
              <div className="chatbox gray">
              <img  style={{position:'relative', textAlign:'center',marginLeft:250,marginTop:30}} width="250" height="250"src={noChatImage} alt="" /> 
              </div>
            </div>

            {/* <div className="leftside-chat justify-content-end mb-4">
              <div className="chatbox puple">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut.
              </div>
            </div> */}

            {/* <div className="chat-input">
              <Form.Control as="textarea" placeholder="Write your message…" />
              <Button>
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </Button>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}
