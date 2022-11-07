import { React } from "react";
import { Button, Row, Col, Divider } from "antd";
import withAuth from "../utils/protectRoute";
import { primary_color } from "../utils/constants";

function Dashboard() {
  return (
    <div>
      <Row>
        <Col
          span={16}
          style={{
            padding: "0px 30px",
          }}
        >
          <h1>Overview</h1>
          <div
            style={{
              width: "auto",
              backgroundColor: primary_color,
              height: "2px",
            }}
          ></div>

<div
style={{
  width:"auto",
  margin:"15px",
  height:"200px",
  backgroundColor:primary_color
}}
>


</div>


        </Col>




        <Col span={8}>
          <h1
            style={{
              padding: "0px 30px",
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
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Dashboard);
