import React from "react";

import _ from "lodash";

const AsyncApiSection = ({ addAsyncApiCall, asyncStuff }) => (
  <div className="Section">
    <div className="HeaderSection">Async API calls</div>
    <div className="Actions">
      <div className="AddButton" onClick={addAsyncApiCall}>
        +
      </div>
    </div>
    {_.keys(asyncStuff).map(key => (
      <div key={key}>Async API call {key}</div>
    ))}
  </div>
);

export default AsyncApiSection;
