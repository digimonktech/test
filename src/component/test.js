import io from "socket.io-client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Test = () => {
  const socket = io("http://localhost:8008", {
    autoConnect: false,
  });
  const [msg, setMsg] = useState("");
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Enter Message"
      />
      <Button
        onClick={() => {
          console.log("Clicked");
          console.log(socket.connect());
        }}
      >
        Connect
      </Button>
      <Button
        onClick={() => {
          console.log("Clicked");
          socket.disconnect();
        }}
      >
        Disconnect
      </Button>
    </div>
  );
};

export default Test;
