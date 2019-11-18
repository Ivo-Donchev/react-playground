import React from "react";
import axios from "axios";

import {
  AsyncApiSection,
  WebsocketSection,
  PollingResultSection
} from "./components";

import "./styles.css";

const websocketUrl = "ws://localhost:8000/async-results/";

export const callAsyncResult = async websocketIdentifier => {
  return axios.post(
    "http://localhost:8000/some-data/async/",
    {
      websocket_identifier: websocketIdentifier,
      data: { somekey: "somevalue" }
    },
    {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/"
    }
  );
};

class App extends React.Component {
  state = {
    websocket: null,
    asyncStuff: null,
    websocketData: [],
    websocketIdentifier: null
  };
  callAsyncAPI = async () =>
    callAsyncResult(this.state.websocketIdentifier).then(response => {
      const newAsyncStuff = {
        [response.data.identifier]: {
          asyncApi: {},
          pollingResult: {}
        }
      };

      this.setState(state => ({
        ...state,
        asyncStuff: {
          ...state.asyncStuff,
          ...newAsyncStuff
        }
      }));
    });

  addAsyncApiCall = () => {
    this.callAsyncAPI();
  };

  componentDidMount() {
    this.connectWebsocket();
  }

  connectWebsocket = () => {
    this.setState({
      websocket: null,
      websocketData: [],
      websocketIdentifier: null
    });

    let websocket = new WebSocket(websocketUrl);
    websocket.onclose = e => {
      console.error("Socket closed unexpectedly");
    };

    websocket.onmessage = e => {
      this.setState(state => ({
        ...state,
        websocketData: [...state.websocketData, e.data]
      }));
      const data = JSON.parse(e.data);

      if (data.type === "channel_name") {
        this.setState({ websocketIdentifier: data.data });
      }
      if (data.type === "data_ready") {
        this.setState(state => ({
          ...state,
          asyncStuff: {
            ...state.asyncStuff,
            [data.identifier]: {
              pollingResult: {
                isReady: true
              }
            }
          }
        }));
      }
    };

    this.setState({ websocket });
  };

  disconnectWebsocket = () => {
    this.state.websocket.close();
    this.setState({
      websocket: null
    });
  };

  render() {
    console.log(this.state.asyncStuff);
    return (
      <div className="App">
        <div className="header">Websockets and Async APIs</div>
        <div className="Sections">
          <AsyncApiSection
            addAsyncApiCall={this.addAsyncApiCall}
            asyncStuff={this.state.asyncStuff}
          />
          <PollingResultSection asyncStuff={this.state.asyncStuff} />
          <WebsocketSection
            data={this.state.websocketData}
            websocket={this.state.websocket}
            connectWebsocket={this.connectWebsocket}
            disconnectWebsocket={this.disconnectWebsocket}
          />
        </div>
      </div>
    );
  }
}

export default App;
