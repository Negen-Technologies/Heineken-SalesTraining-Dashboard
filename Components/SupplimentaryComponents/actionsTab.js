import React from "react";
import { primary_color } from "../../utils/constants";
function ActionsTab() {
  return (
    <div>
      {" "}
      <h1
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: primary_color,
        }}
      >
        Actions
      </h1>
      <div
        style={{
          width: "auto",
          backgroundColor: primary_color,
          height: "2px",
        }}
      ></div>
      <div style={{ marginBottom: 12 }}></div>
    </div>
  );
}

export default ActionsTab;
