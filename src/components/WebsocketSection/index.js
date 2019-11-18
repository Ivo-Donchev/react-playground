import React from "react";

const WebsocketSection = ({
  data,
  websocket,
  connectWebsocket,
  disconnectWebsocket
}) => (
  <div className="Section">
    <div className="HeaderSection">
      Websocket {(websocket && "CONNECTED") || "NOT CONNECTED"}
    </div>
    <div className="Actions">
      <div className="WSButton Connect" onClick={connectWebsocket}>
        Connect
      </div>
      <div className="WSButton Disconnect" onClick={disconnectWebsocket}>
        Disconnect
      </div>
    </div>
    <div className="Monitor">
      {data.map(el => (
        <div key={el}>{el}</div>
      ))}
    </div>
  </div>
);

export default WebsocketSection;
