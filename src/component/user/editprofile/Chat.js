import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
export default class Chat extends Component {
  render() {
    return (
      <>
        <div className="edit-profilebox">
          <div className="chat-box">
            <div className="chat-title mb-3">
              <div className="user-icon">T</div>
              <div className="chat-text">
                <h5>User 1</h5>
                <span>Online</span>
              </div>
            </div>

            <div className="leftside-chat mb-4">
              <div className="chatbox gray">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut.
              </div>
            </div>

            <div className="leftside-chat justify-content-end mb-4">
              <div className="chatbox puple">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut.
              </div>
            </div>

            <div className="chat-input">
              <Form.Control as="textarea" placeholder="Write your message…" />
              <Button>
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
