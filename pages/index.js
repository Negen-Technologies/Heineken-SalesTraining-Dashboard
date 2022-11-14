import React, { useEffect } from "react";
import Router from "next/router";
import { LoadingOutlined } from "@ant-design/icons";

export default function index(props) {
  useEffect(() => {
    var token = localStorage.getItem("token");

    if (token == null) {
      Router.push("/Login");
    } else {
      Router.push("/Dashboard");
    }
  });
  return (
    <div
      style={{
        height: "100vh",
        width: "100 vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div>
        <LoadingOutlined style={{ fontSize: 80 }} />
      </div>
    </div>
  );
}
