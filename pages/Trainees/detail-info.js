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
import FormData from "form-data";

function DetailInfo(props) {
  const [form] = Form.useForm();
  const [visible, setvisible] = useState(false);
  const [isediting, setisediting] = useState(false);
  const [editingkey, seteditingkey] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const router = useRouter();
  const data = [];

  const formData = new FormData();

  props.trainees.forEach((element) => {
    console.log(element);
    data.push({ ...element, key: element.id });
  });

  useEffect(() => {
    const { id } = router.query;
    props.getSingleTrainee(id);
  }, []);

  const editor = (e) => {
    // setImageUrl();

    seteditingkey(e.id);
    form.setFieldsValue({
      name: e.user.name,
      email: e.user.email,
      department: e.department,
    });
    setImageUrl(`${URLst}images/${e.user.image}`);
    setisediting(true);
    setvisible(true);
  };
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
              <Empty description="No Questions" />
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
                    <Row
                      justify="space-around"
                      style={{
                        backgroundColor: "white",
                        borderRadius: 12,
                        padding: "30px 0px",
                      }}
                    >
                      <Space>
                        <Avatar
                          size={100}
                          src={`${URLst}images/${item.user.image}`}
                          // style={{ fontSize: 30 }}
                        />
                        <div>
                          <>
                            {" "}
                            <div style={{ fontSize: "20px", fontWeight: 700 }}>
                              {item.user.name}
                            </div>
                          </>
                          <div>
                            <div style={{ fontSize: "16px", fontWeight: 400 }}>
                              Department: {item.department}
                            </div>
                          </div>
                        </div>
                      </Space>
                      <div style={{ fontSize: "15px", fontWeight: 400 }}>
                        <h1 style={{ fontSize: "20px", fontWeight: 700 }}>
                          Contact Information
                        </h1>

                        <div>Phone: {item.phone}</div>
                        <div>Email: {item.user.email}</div>
                        <div>Username: {item.user.username}</div>
                      </div>
                    </Row>
                  </>
                );
              })}
            </div>
          )}
        </Col>
        <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <ActionsTab />
          {/* <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
            onClick={() => {
              setvisible(true);
              data.forEach((e) => {
                editor(e);
              });
            }}
          >
            Edit Trainee
          </Button> */}
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
)(withAuth(DetailInfo));