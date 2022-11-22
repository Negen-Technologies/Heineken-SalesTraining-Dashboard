import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Collapse,
  Avatar,
  Divider,
  Space,
  Empty,
  Modal,
  Form,
  Input,
} from "antd";
import {
  DeleteOutlined,
  LeftCircleFilled,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import {
  getAllModuleSuccess,
  moduleCreate,
  AllModuleEdit,
  AllModuleDelete,
} from "../../store/index";
import withAuth from "../../utils/protectRoute";
import URLst, { primary_color } from "../../utils/constants";
import { useRouter } from "next/router";
const { Panel } = Collapse;

function view_course(props) {
  const [visible,setvisible]=useState(false)
  const router = useRouter();
  console.log(router.query);
  const { id, element } = router.query;
  let data = [];
  let moduleId=[]
  let passedData = JSON.parse(element);
  console.log("DATA ", passedData);

  // props.modules.forEach((element) => {
  //   data.push({ ...element, key: element.id });
  // });
  // useEffect(() => {
  //   props.getAllModuleSuccess(10, 1);
  // }, [id]);


  return (
    <div>
      <Row>
        <Col
          span={16}
          style={{
            padding: "0px 50px",
          }}
        >
          {" "}
          <Space
            style={{
              margin: "6px 0px",
            }}
          >
            <LeftCircleFilled
              style={{ fontSize: "20px", color: primary_color }}
              onClick={() => {
                router.back();
              }}
            />
            <div style={{ fontSize: "20px", fontWeight: 500 }}>
              Active Courses
            </div>
            <div style={{ fontSize: "20px", fontWeight: 600 }}>|</div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: primary_color,
              }}
            >
              Course Outline
            </div>
          </Space>
          <div
            style={{
              width: "auto",
              backgroundColor: primary_color,
              height: "2px",
            }}
          ></div>
          <Collapse
            collapsible="header"
            defaultActiveKey={"1"}
            style={{ margin: "20px 0px" }}
          >
            <Panel header={"name"} key="1">
              {passedData.modules.map((e, i) => {
                return (
                  <Collapse
                    collapsible="header"
                    defaultActiveKey="1"
                    style={{ margin: "10px 0px" }}
                    key={e.id}
                  >
                    <Panel
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
                                  // router.push(`Courses/view-course?id=${e.id}`);
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
                            style={{
                              backgroundColor: "red",
                              margin: "0px 2px",
                            }}
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
                      {e.lessons.length == 0 ? (
                        <div>
                          <Empty description="No Lesson" />
                        </div>
                      ) : (
                        e.lessons.map((el, ii) => {
                          return (
                            <div key={ii}>
                              <div>
                                Lesson {ii + 1}: {el.title}
                              </div>
                              <Divider style={{ margin: "7px 0px" }} />
                            </div>
                          );
                        })
                      )}
                    </Panel>
                  </Collapse>
                );
              })}
            </Panel>
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
            Edit Course
          </Button>

          <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
            onClick={()=>{setvisible(true);}}
          >
            Add Module
          </Button>
        </Col>
      </Row>
      <Modal visible={visible} onCancel={()=>{setvisible(false)}}>
        <Form
          onFinish={(e) => {
            console.log(e);
            passedData.modules.forEach(element => {
              moduleId.push(element.id)
            });
            props.moduleCreate(e, id, moduleId);
          }}
        >
          <Form.Item name="title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="summary">
            <Input placeholder="Summary" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Module
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     courses: state.allcourses.allcourses,
//     count: state.allcourses.count,
//     coursesPending: state.allcourses.loading,
//     coursesError: state.allcourses.error,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getSingleCourseSuccess: (id) =>
//       dispatch(getSingleCourseSuccess(id)),
//     AllCourseEdit: (id, courses, edited) =>
//       dispatch(AllCourseEdit(id, courses, edited)),
//     AllCourseDelete: (id, courses) => dispatch(AllCourseDelete(id, courses)),
//     courseCreate: (formData) => dispatch(courseCreate(formData)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withAuth(view_course));

const mapStateToProps = (state) => {
  return {
    modules: state.allmodules.allmodules,
    count: state.allmodules.count,
    modulesPending: state.allmodules.loading,
    modulesError: state.allmodules.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllModuleSuccess: (limit, page) =>
      dispatch(getAllModuleSuccess(limit, page)),
    AllModuleEdit: (id, modules, edited) =>
      dispatch(AllModuleEdit(id, modules, edited)),
    AllModuleDelete: (id, modules) => dispatch(AllModuleDelete(id, modules)),
    moduleCreate: (id, formData, moduleId) =>
      dispatch(moduleCreate(id, formData, moduleId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(view_course));
