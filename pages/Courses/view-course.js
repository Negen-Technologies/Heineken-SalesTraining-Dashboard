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
  Popconfirm,
  InputNumber,
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

function View_course(props) {
  const [form] = Form.useForm();
  const [data,setdata]=useState([])
  const [routervals, setroutervals] = useState({
    id: "",
    element: [],
    courseName:"",
  });
  const [visible, setvisible] = useState(false);
  const [isediting, setisediting] = useState(false);
  const [editingkey, seteditingkey] = useState("");
  const router = useRouter();
  console.log(router.query);


  // const { id, element, courseName } = router.query;
  let smpdata = [];
  let moduleId = [];
  let lessonId = [];

  // let passedModules = JSON.parse(element);

  useEffect(() => {
    const { id, element, courseName } = router.query;
     console.log(element);
    setroutervals({
      id: id,
      element: JSON.parse(element),
      courseName: courseName,
    });
    props.getAllModuleSuccess(10, 1);
  }, []);

  useEffect(() => {
   
    if (data.length == 0) {
      props.modules.forEach((element) => {
        if (routervals.element.includes(element.id)) {
          smpdata.push({ ...element, key: element.id });
        }
      });
      setdata(smpdata)
      smpdata=[]
    } else {
      let ddata = [];
      ddata = routervals.element;
      ddata.push(props.modules[props.modules.length - 1].id);
      setroutervals({
        ...routervals,
        element: ddata,
      });
      props.modules.forEach((element) => {
        smpdata.push({ ...element, key: element.id });
      });
     
      setdata(smpdata);
      smpdata = [];
    }
  
  }, [props.modules]);

  const editor = (e) => {
    setisediting(true);
    seteditingkey(e.id);
    form.setFieldsValue({
      title: e.title,
      summary: e.summary,
      order:e.order
    });
    setvisible(true);
  };

  return props.modulesPending && data.length == 0 ? (
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
         span={16} xs={24} sm={24} md={16} lg={16}
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
              {routervals.courseName}
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
              <Empty description="No Modules" />
            </div>
          ) : props.modulesPending ? (
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
            <Collapse
              collapsible="header"
              defaultActiveKey={"1"}
              style={{ margin: "20px 0px" }}
            >
              <Panel header={"Modules"} key="1">
                {data
                  .sort((a, b) => a.order - b.order)
                  .map((e, i) => {
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
                                      e.lessons.forEach((el) => {
                                        lessonId.push(el.id);
                                      });

                                      router.push({
                                        pathname: "Lesson",
                                        query: {
                                          id: e.id,

                                          element: JSON.stringify(lessonId),
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
                                      "Are you sure you want to delete this Module?\n\n(Deleting this Module will also delete the lessons of the course)"
                                    }
                                    onConfirm={() => {
                                      props.AllModuleDelete(e.id, data);
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </Popconfirm>
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
          )}
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
          <div style={{ marginBottom: 12 }}></div>

          <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
            onClick={() => {
              setvisible(true);
            }}
          >
            Add Module
          </Button>
        </Col>
      </Row>
      <Modal
        title={isediting ? "Edit Modules" : "Add Modules"}
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
              props.AllModuleEdit(editingkey, data, e);
            } else {
              data.forEach((element) => {
                moduleId.push(element.id);
              });
              props.moduleCreate(routervals.id, e, moduleId);
            }
          }}
        >
          <Form.Item name="title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="summary">
            <Input.TextArea placeholder="Summary" />
          </Form.Item>
          <Form.Item name="order">
            <InputNumber placeholder="Order" />
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red" }}>{props.modulesError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.modulesPending}
            >
              {isediting ? "Edit Module" : "Add Module"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

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
)(withAuth(View_course));
