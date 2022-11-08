
import React, { useEffect } from "react";
import Router from "next/router";

export default function index(props) {
  useEffect(() => {
    Router.push("/Dashboard");
  });
  return <div></div>;
}

