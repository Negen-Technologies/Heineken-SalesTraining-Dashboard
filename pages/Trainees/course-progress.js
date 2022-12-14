import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Space,
  Empty,
  Modal,
  Form,
  Input,
  Avatar,
  Collapse,
  Card,
  List,
  Radio,
  Upload,
} from "antd";
import {
  PlayCircleFilled,
  DeleteFilled,
  LeftCircleFilled,
  EditFilled,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getAllTraineeSuccess,
  getSingleTrainee,
  AllTraineeEdit,
  AllTraineeDelete,
  traineeCreate,
} from "../../store";
import withAuth from "../../utils/protectRoute";
import URLst, { primary_color } from "../../utils/constants";
import ActionsTab from "../../Components/SupplimentaryComponents/actionsTab";
import OverviewTab from "../../Components/SupplimentaryComponents/overviewTab";
import { useRouter } from "next/router";
const { Panel } = Collapse;

function CourseProgress(props) {
  const [form] = Form.useForm();
  const [visible, setvisible] = useState(false);
  const [isediting, setisediting] = useState(false);
  const [editingkey, seteditingkey] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const router = useRouter();
  const data = [];

  props.trainees.forEach((element) => {
    console.log(element);
    // data.push({ ...dummydata, key: dummydata._id });

    data.push({ ...element, key: element._id });
  });

  useEffect(() => {
    const { id } = router.query;
    props.getSingleTrainee(id);
  }, []);

  return props.traineesPending && data.length == 0 ? (
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
          span={18}
          xs={24}
          sm={24}
          md={18}
          lg={18}
          xl={18}
          xxl={18}
          style={{
            padding: "0px 50px",
          }}
        >
          <OverviewTab
            title={"Trainee"}
            backButton={true}
            onbuttonclick={() => {
              router.back();
            }}
            dividerText={"Detail Information"}
          />
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
              <Empty description="No Badges Earned" />
            </div>
          ) : props.traineesPending ? (
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
            <div
              style={{
                height: "90vh",
                width: "100 vw",
                overflow: "auto",
              }}
            >
              {data.map((item) => {
                return (
                  <>
                    <h1 style={{ fontSize: "30px", fontWeight: 600 }}>
                      Current Course
                    </h1>
                    {item.currentCourse==null?<></>:<Collapse defaultActiveKey={1}>
                      <Panel
                        header={
                          <div style={{ fontSize: "20px", fontWeight: 500 }}>
                            {item.currentCourse.title}
                          </div>
                        }
                        key="1"
                      >
                        {item.currentCourse.modules.length == 0 ? (
                          <div>
                            <Empty description="No Module" />
                          </div>
                        ) : (
                          item.currentCourse.modules
                            .sort((a, b) => a.order - b.order)
                            .map((el, ii) => {
                              // el.id==item.currentModule.id
                              console.log(el.lessons);

                              return (
                                <Collapse key={ii}>
                                  <Panel
                                    style={
                                      el.order < item.currentModule.order
                                        ? {
                                            backgroundColor: "#4BB543",
                                          }
                                        : el.order == item.currentModule.order
                                        ? {
                                            backgroundColor: "#1677FF",
                                          }
                                        : {
                                            backgroundColor: "#FAFAFA",
                                          }
                                    }
                                    header={
                                      <span
                                        style={
                                          el.order < item.currentModule.order
                                            ? { color: "white" }
                                            : el.order ==
                                              item.currentModule.order
                                            ? {
                                                color: "white",
                                              }
                                            : {
                                                color: "black",
                                              }
                                        }
                                      >
                                        Module {el.order}: {el.title}
                                      </span>
                                    }
                                    key="1"
                                  >
                                    {el.lessons
                                      .sort((a, b) => a.order - b.order)
                                      .map((ep) => {
                                        return (
                                          <h1>
                                            Lesson {ep.order}: {ep.title}
                                          </h1>
                                        );
                                      })}
                                  </Panel>
                                </Collapse>
                              );
                            })
                        )}
                      </Panel>
                    </Collapse>}
                  </>
                );
              })}

              
            </div>
          )}
        </Col>
        <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <ActionsTab />
         
        </Col>
      </Row>
      <Modal
        title={isediting ? "Edit trainees" : "Add trainees"}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        visible={visible}
        onCancel={() => {
          setvisible(false);
          setImageUrl(null);
          setisediting(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          onFinish={(e) => {
            console.log(e);

            formData.append("department", e.department);
            var g = {
              user: {
                name: e.name,
                email: e.email,
              },
              department: e.department,
            };

            props.AllTraineeEdit(editingkey, data, g);
            // if (isediting) {
            //
            // } else {
            //   props.traineeCreate(e);
            // }
          }}
        >
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="department">
            <Input placeholder="Department" />
          </Form.Item>

          <Form.Item>
            <p style={{ color: "red" }}>{props.traineesError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.traineesPending}
            >
              {isediting ? "Edit trainee" : "Add trainee"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    trainees: state.alltrainees.alltrainees,
    count: state.alltrainees.count,
    traineesPending: state.alltrainees.loading,
    traineesError: state.alltrainees.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTraineeSuccess: (limit, page) =>
      dispatch(getAllTraineeSuccess(limit, page)),
    getSingleTrainee: (id) => dispatch(getSingleTrainee(id)),

    AllTraineeEdit: (id, trainees, edited) =>
      dispatch(AllTraineeEdit(id, trainees, edited)),
    AllTraineeDelete: (id, trainees) =>
      dispatch(AllTraineeDelete(id, trainees)),
    traineeCreate: (formData) => dispatch(traineeCreate(formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(CourseProgress));
