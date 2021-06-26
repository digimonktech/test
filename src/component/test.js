import io from "socket.io-client";
import React from "react";
import { Button } from "react-bootstrap";

const Test = () => {
  const socket = io("http://localhost:8008");
  console.log(socket);

  return (
    <div>
      <Button
        onClick={() => {
          console.log("Clicked");
          // connect();
        }}
      >
        Connect
      </Button>
      <Button
        onClick={() => {
          console.log("Clicked");
          // socket.disconnect();
        }}
      >
        Disconnect
      </Button>
    </div>
  );
};

export default Test;
