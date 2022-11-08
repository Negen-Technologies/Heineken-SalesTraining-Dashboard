import React from "react";
import { Button, Row, Col, Collapse, Avatar, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import withAuth from "../utils/protectRoute";
import { primary_color } from "../utils/constants";
import { CustomCard } from "../Components/CustomCard/CustomCard";

function Courses() {
  return (
    <div>
      <Row>
        <Col
          span={16}
          style={{
            padding: "0px 50px",
          }}
        >
          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: primary_color,
            }}
          >
            Overview
          </h1>
          <div
            style={{
              width: "auto",
              backgroundColor: primary_color,
              height: "2px",
            }}
          ></div>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col span={8}>
              <CustomCard num={1} text={"Courses"} />
            </Col>
            <Col span={8}>
              <CustomCard num={14} text={"Modules"} />
            </Col>
            <Col span={8}>
              <CustomCard num={214} text={"Lessons"} />
            </Col>
          </Row>

          <Collapse accordion defaultActiveKey={["1"]}>
            <Collapse.Panel
              style={{ fontSize: 18, fontWeight: 600 }}
              header="Essential Sales Training"
              key="1"
              extra={
                <Row>
                  <Avatar
                    size="small"
                    style={{
                      backgroundColor: primary_color,
                      margin: "0px 2px",
                    }}
                    icon={<EditOutlined />}
                  />
                  <Avatar
                    size="small"
                    style={{ backgroundColor: "red", margin: "0px 2px" }}
                    icon={<DeleteOutlined />}
                  />
                </Row>
              }
            >
              <div
                style={{ fontSize: 14, fontWeight: 400, color: primary_color }}
              >
                <Collapse
                  defaultActiveKey={["1"]}
                  ghost
                  expandIconPosition={"right"}
                >
                  <Collapse.Panel
                    header="Module 1: Introduction to Heiniken products"
                    key="1"
                    // style={{ color: 'red' }}
                  >
                    <div style={{color:'black'}}>
                      <div>Heiniken Beer</div>
                      <div>Walia Beer</div>
                      <div>Harar Beer</div>
                      <div>Bedele Beer</div>
                      <div>Harar Beer</div>
                      <div>Bedele Beer</div>
                    </div>
                  </Collapse.Panel>
                </Collapse>

                <Divider style={{ margin: "7px 0px" }} />
                <div>Module 2: Grooming and business etiquette</div>
                <Divider style={{ margin: "7px 0px" }} />
                <div>Module 3: Customer handling</div>
                <Divider style={{ margin: "7px 0px" }} />
                <div>Module 4: Outlet relations</div>
                <Divider style={{ margin: "7px 0px" }} />
              </div>
            </Collapse.Panel>
          </Collapse>
        </Col>

        <Col span={6}>
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
          <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
          >
            Course Builder
          </Button>
          <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
          >
            View Courses
          </Button>
          <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
          >
            View Trainees
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Courses);
