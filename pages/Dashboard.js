import { React, useEffect } from "react";
import { Button, Row, Col, Progress, Table, Tag, Avatar } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import withAuth from "../utils/protectRoute";
import URLst, { primary_color } from "../utils/constants";
import { CustomCard } from "../Components/CustomCard/CustomCard";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import {
  getAllTraineeSuccess,
  getAllTraineePerTerritory,
  getStatSuccess,
} from "./../store";

function Dashboard(props) {
  const data = [];
  const router = useRouter();
  const role = localStorage.getItem("role");

  props.trainees.forEach((element) => {
    data.push({ ...element, key: element._id });
  });

  useEffect(() => {
    props.getStatSuccess();
    if (role === "staff") {
      props.getAllTraineePerTerritory(3, 1);
    } else {
      props.getAllTraineeSuccess(3, 1);
    }
  }, []);

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
            src={`${URLst}images/${record.user.image}`}
            style={{ backgroundColor: "#10c70e" }}
            icon={<UserOutlined />}
          />
          <a
            style={{ padding: "0px 10px" }}
            onClick={() => {
              // router.push(`Trainees/detail-info?id=${record._id}`);
            }}
          >
            {record.user.name}
          </a>
        </Row>
      ),
    },
    {
      title: "Badges",
      dataIndex: "age",
      key: "age",
      render: (_, record) => (
        <Row>
          {" "}
          {/* <div style={{ color: "red" }}>
            <StarFilled />
          </div> */}
          <Button
            type="link"
            style={{ padding: "0px 10px", color: primary_color }}
            onClick={() => {
              // router.push(`Trainees/badge-detail?id=${record._id}`);
            }}
          >
            {record.badges.length} Badges
          </Button>
        </Row>
      ),
    },
    {
      title: "Progress",
      dataIndex: "percent",
      key: "percent",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            // router.push(`Trainees/course-progress?id=${record._id}`);
          }}
        >
          <Row>
            {" "}
            <div style={{ color: primary_color }}>Course Progress</div>
            <div style={{ padding: "0px 10px" }}>
              <Progress
                percent={record.progress}
                size="small"
                showInfo={false}
                strokeColor={primary_color}
                trailColor={"grey"}
                style={{ width: "150px" }}
              />
            </div>
          </Row>
        </Button>
      ),
    },
    {
      title: "Territory",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <div>
          {" "}
          {record.territories.length == 0 ? (
            <Tag
              color="processing"
              onClick={() => {
                settervisible(true);
                setEditingId(record._id);
              }}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Add to territory
            </Tag>
          ) : (
            <>
              {record.territories.map((e) => {
                return e.name;
              })}
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      {props.statsPending ? (
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
      ) : (
        <div>
          <Row>
            <Col
              span={16}
              xs={24}
              sm={24}
              md={16}
              lg={16}
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
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push("/Trainees");
                    }}
                  >
                    <CustomCard
                      num={props.stats.trainees}
                      text={"Trainees"}
                    />
                  </div>
                </Col>
                <Col span={8} xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push("/Territory");
                    }}
                  >
                    <CustomCard num={props.stats.territories} text={"Territories"} />
                  </div>
                </Col>
                <Col span={8} xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push("/Courses");
                    }}
                  >
                    <CustomCard num={props.stats.lessons}  text={"Lessons"} />
                  </div>
                </Col>
              </Row>

              <div
                style={{
                  backgroundColor: primary_color,
                  padding: 25,
                  borderRadius: 12,
                }}
              >
                <Row justify="space-between">
                  {" "}
                  <h1 style={{ color: "white" }}>Top 3 Trainees</h1>
                  <h1
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => {
                      router.push("/Trainees");
                    }}
                  >
                    {" "}
                    View All
                  </h1>
                </Row>

                <Table
                  scroll={{ x: 200 }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  // showHeader={false}
                  loading={props.traineesPending}
                />
              </div>
            </Col>

            <Col span={6} xs={24} sm={24} md={6} lg={6}>
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
                  router.push("/Trainees");
                }}
              >
                All Trainees
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    trainees: state.alltrainees.alltrainees,
    count: state.alltrainees.count,
    traineesPending: state.alltrainees.loading,
    traineesError: state.alltrainees.error,
    stats: state.allstatsreducer.allstats,
    statsPending: state.allstatsreducer.loading,
    statsError: state.allstatsreducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTraineeSuccess: (limit, page) =>
      dispatch(getAllTraineeSuccess(limit, page)),
    getAllTraineePerTerritory: (limit, page) =>
      dispatch(getAllTraineePerTerritory(limit, page)),
    getStatSuccess: () => dispatch(getStatSuccess()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Dashboard));
