import React from "react";

import _ from "lodash";

const PollingResultSection = ({ asyncStuff }) => (
  <div className="Section">
    <div className="HeaderSection">Polling results</div>
    <div className="Actions"></div>
    {_.keys(asyncStuff).map(key => (
      <div key={key}>
        Polling result{" "}
        {(asyncStuff[key].pollingResult.isReady && "READY") || "NOT READY"}
      </div>
    ))}
  </div>
);

export default PollingResultSection;
