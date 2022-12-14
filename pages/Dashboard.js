import { React } from "react";
import { Button, Row, Col, Progress, Table, Tag, Avatar } from "antd";
import { UserOutlined, StarFilled } from "@ant-design/icons";
import withAuth from "../utils/protectRoute";
import { primary_color } from "../utils/constants";
import { CustomCard } from "../Components/CustomCard/CustomCard";
import { useRouter } from "next/router";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Row>
        {" "}
        <Avatar
          shape="circle"
          size="small"
          src={`https://joeschmoe.io/api/v1/${record.age}`}
          style={{ backgroundColor: "#008751" }}
          icon={<UserOutlined />}
        />
        <div style={{ padding: "0px 10px" }}>{text}</div>
      </Row>
    ),
  },
  {
    title: "Points",
    dataIndex: "age",
    key: "age",
    render: (text) => (
      <Row>
        {" "}
        {/* <div style={{ color: "red" }}>
          <StarFilled />
        </div> */}
        <div style={{ padding: "0px 10px", color: primary_color }}>
          {text} Points
        </div>
      </Row>
    ),
  },
  {
    title: "Progress",
    dataIndex: "address",
    key: "address",
    render: (text) => (
      <Row>
        {" "}
        <div style={{ color: primary_color }}>Course Progress</div>
        <div style={{ padding: "0px 10px" }}>
          <Progress
            percent={30}
            size="small"
            showInfo={false}
            strokeColor={primary_color}
            trailColor={"grey"}
            style={{ width: "200px" }}
          />
        </div>
      </Row>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 125,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 100,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 75,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <Row>
        <Col
          span={16} xs={24} sm={24} md={16} lg={16}
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
            <Col span={8} xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <CustomCard num={25} text={"Trainees"} />
            </Col>
            <Col span={8} xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <CustomCard num={36} text={"Logins in 24 Hours"} />
            </Col>
            <Col span={8} xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <CustomCard num={214} text={"Lessons"} />
            </Col>
          </Row>

          <div
            style={{
              backgroundColor: primary_color,
              padding: 25,
              borderRadius: 12,
            }}
          >
            <h1 style={{ color: "white" }}>Top 3 Trainees</h1>
            <Table
              scroll={{ x: 200 }}
              columns={columns}
              dataSource={data}
              pagination={false}
              showHeader={false}
            />
          </div>
        </Col>

        <Col span={6} xs={24} sm={24} md={6} lg={6} >
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

          <Button
            style={{ width: "202px", margin: "20px 0px" }}
            type="primary"
            onClick={() => {
              router.push('/Trainees');
            }}
          >
            All Trainees
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Dashboard);
