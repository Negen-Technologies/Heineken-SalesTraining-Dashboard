import React from "react";
import { primary_color } from "../../utils/constants";

export const CustomCard = ({ num, text }) => (
  <div
    style={{
      width: "auto",
      margin: "20px 0px",
      height: "120px",
      backgroundColor: primary_color,
      borderRadius: "12px",
      maxWidth: "250px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <div style={{ margin: "22px" }}>
      <div style={{ color: "white", fontSize: 30, fontWeight: 700 }}>{num}</div>

      <p style={{ color: "white", fontSize: 16, fontWeight: 300 }}>{text}</p>
    </div>
  </div>
);
