import React, { useState, useEffect } from "react";
import { Button, Row, Col, Collapse, Avatar, Divider, Empty } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { CustomCard } from "../Components/CustomCard/CustomCard";
import { connect } from "react-redux";
import {
  getAllCourseSuccess,
  courseCreate,
  AllCourseEdit,
  AllCourseDelete,
} from "../store";
import withAuth from "../utils/protectRoute";
import URLst, { primary_color } from "../utils/constants";
import { useRouter } from "next/router";
import { options } from "less";

function Courses(props) {
  const router = useRouter();

  const numEachPage = 10;
  let data = [];
  let courses = 0;
  let modules = 0;
  let lessons = 0;

  props.courses.forEach((element) => {
    data.push({ ...element, key: element.id });
  });

  if (data.length > 0) {
    courses = data.length;

    data.forEach((e) => {
      modules += e.modules.length;
      e.modules.forEach((ee) => {
        lessons += ee.lessons.length;
      });
    });
    console.log("Courses: ", data.length);
    console.log("Modules: ", modules);
    console.log("Lessons: ", lessons);
  }

  useEffect(() => {
    props.getAllCourseSuccess(numEachPage, 1);
  }, []);

  return data.length == 0 ? (
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
              <CustomCard num={courses} text={"Courses"} />
            </Col>
            <Col span={8}>
              <CustomCard num={modules} text={"Modules"} />
            </Col>
            <Col span={8}>
              <CustomCard num={lessons} text={"Lessons"} />
            </Col>
          </Row>

          <Collapse collapsible="header" accordion defaultActiveKey={["1"]}>
            {data.map((e, i) => {
              return (
                <Collapse.Panel
                  style={{ fontSize: 18, fontWeight: 600 }}
                  header={e.title}
                  key={i + 1}
                  extra={
                    <Row>
                      {" "}
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: primary_color,
                          margin: "0px 2px",
                        }}
                        icon={
                          <EyeOutlined
                            onClick={() => {
                              console.log("hjhj");
                              // router.push(
                              //   `Courses/view-course?id=${e.id}&e=${e}`
                              // );
                              router.push({
                                pathname: "Courses/view-course",
                                query: {
                                  "id":e.id,
                                  "element":JSON.stringify(e)
                                },
                              });
                            }}
                          />
                        }
                      />
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: primary_color,
                          margin: "0px 2px",
                        }}
                        icon={
                          <EditOutlined
                            onClick={() => {
                              console.log("hjhj");
                            }}
                          />
                        }
                      />
                      <Avatar
                        size="small"
                        style={{ backgroundColor: "red", margin: "0px 2px" }}
                        icon={
                          <DeleteOutlined
                            onClick={() => {
                              console.log("jkkjk");
                            }}
                          />
                        }
                      />
                    </Row>
                  }
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: primary_color,
                    }}
                  >
                    {e.modules.length == 0 ? (
                      <div>
                        <Empty description="No Module" />
                      </div>
                    ) : (
                      e.modules.map((el, ii) => {
                        return (
                          <div key={ii}>
                            <div>
                              Module {ii + 1}: {el.title}
                            </div>
                            <Divider style={{ margin: "7px 0px" }} />
                          </div>
                        );
                      })
                    )}
                  </div>
                </Collapse.Panel>
              );
            })}
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
            View Trainees
          </Button>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    courses: state.allcourses.allcourses,
    count: state.allcourses.count,
    coursesPending: state.allcourses.loading,
    coursesError: state.allcourses.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCourseSuccess: (limit, page) =>
      dispatch(getAllCourseSuccess(limit, page)),
    AllCourseEdit: (id, courses, edited) =>
      dispatch(AllCourseEdit(id, courses, edited)),
    AllCourseDelete: (id, courses) => dispatch(AllCourseDelete(id, courses)),
    courseCreate: (formData) => dispatch(courseCreate(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Courses));
