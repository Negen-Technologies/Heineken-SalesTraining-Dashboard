import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Collapse,
  Avatar,
  Divider,
  Empty,
  Modal,
  Form,
  Input,
  Popconfirm,
} from "antd";
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
import ActionsTab from "../Components/SupplimentaryComponents/actionsTab";
import OverviewTab from "../Components/SupplimentaryComponents/overviewTab";

function Courses(props) {
  const [form] = Form.useForm();
  const [visible, setvisible] = useState(false);
  const [isediting, setisediting] = useState(false);
  const [editingkey, seteditingkey] = useState("");

  const router = useRouter();

  const numEachPage = 10;
  let data = [];
  let moduleIds = [];
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
  }

  useEffect(() => {
    props.getAllCourseSuccess(numEachPage, 1);
  }, []);

  const editor = (e) => {
    setisediting(true);
    seteditingkey(e.id);
    form.setFieldsValue({
      title: e.title,
      summary: e.summary,
    });
    setvisible(true);
  };

  return props.coursesPending && data.length == 0 ? (
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
          <OverviewTab title={"Overview"} />
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

          {data.length == 0 ? (
            <div
              style={{
                height: "50vh",
                width: "100 vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Empty description="No Courses" />
            </div>
          ) : props.coursesPending ? (
            <div
              style={{
                height: "50vh",
                width: "100 vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingOutlined style={{ fontSize: 80 }} />
            </div>
          ) : (
            <Collapse collapsible="header" accordion defaultActiveKey={["1"]}>
              {data
                .map((e, i) => {
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
                                  e.modules.forEach((el) => {
                                    moduleIds.push(el.id);
                                  });

                                  router.push({
                                    pathname: "Courses/view-course",
                                    query: {
                                      id: e.id,
                                      courseName: e.title,
                                      element: JSON.stringify(moduleIds),
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
                                  editor(e);
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
                              <Popconfirm
                                title={
                                  "Are you sure you want to delete this course?\n\n(Deleting this course will also delete modules and lessons of the course)"
                                }
                                onConfirm={() => {
                                  props.AllCourseDelete(e.id, data);
                                }}
                              >
                                <DeleteOutlined />
                              </Popconfirm>
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
                          e.modules
                            .sort((a, b) => a.order - b.order)
                            .map((el, ii) => {
                              return (
                                <div key={ii}>
                                  <div>
                                    Module {el.order}: {el.title}
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
          )}
        </Col>

        <Col span={6}>
          <ActionsTab />
          <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
            onClick={() => {
              setvisible(true);
            }}
          >
            Course Builder
          </Button>
        </Col>
      </Row>
      <Modal
        title={isediting ? "Edit Course" : "Add Course"}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        visible={visible}
        onCancel={() => {
          setvisible(false);
          setisediting(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          onFinish={(e) => {
            console.log(e);
            if (isediting) {
              props.AllCourseEdit(editingkey, data, e);
              // AllCourseEdit: id, courses, edited;
            } else {
              props.courseCreate(e);
            }
          }}
        >
          <Form.Item name="title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="summary">
            <Input.TextArea placeholder="Summary" />
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red" }}>{props.coursesError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.coursesPending}
            >
              {isediting ? "Edit Course" : "Add Course"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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
