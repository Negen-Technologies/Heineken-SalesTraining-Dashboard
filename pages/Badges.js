/** @format */

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Row,
  Col,
  Space,
  InputNumber,
  Divider,
  Empty,
  Modal,
  Form,
  Input,
  Popconfirm,
  Upload,
} from "antd";
import {
  PlayCircleFilled,
  DeleteFilled,
  PlusOutlined,
  QuestionCircleFilled,
  LeftCircleFilled,
  EditFilled,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getAllBadgeSuccess,
  badgeCreate,
  AllBadgeEdit,
  AllBadgeDelete,
} from "./../store";
import withAuth from "./../utils/protectRoute";
import URLst, { primary_color } from "./../utils/constants";
import ActionsTab from "./../Components/SupplimentaryComponents/actionsTab";
import OverviewTab from "./../Components/SupplimentaryComponents/overviewTab";
import { useRouter } from "next/router";
import FormData from "form-data";

function Badges(props) {
  const [form] = Form.useForm();
  const ref = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  //   const [data, setdata] = useState([]);
  const [visible, setvisible] = useState(false);
  const [isediting, setisediting] = useState(false);
  const [editingkey, seteditingkey] = useState("");
  const router = useRouter();
  let data = [];
  const formData = new FormData();

  useEffect(() => {
    props.getAllBadgeSuccess(10, 1);
  }, []);

  props.badges.forEach((element) => {
    data.push({ ...element, key: element.id });
  });

  const editor = (e) => {
    setisediting(true);
    seteditingkey(e.id);
    form.setFieldsValue({
      name: e.name,
      description: e.description,
      code: e.code,
    });
    setImageUrl(`${URLst}images/${e.image}`);
    setvisible(true);
  };
  return props.badgesPending && data.length == 0 ? (
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
          <OverviewTab title={"Badges"} />
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
              <Empty description="No Badges" />
            </div>
          ) : props.badgesPending ? (
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
            <div style={{ overflow: "auto" }}>
              {data.map((e) => {
                return (
                  <Row
                    key={e.id}
                    style={{ margin: "15px 0px" }}
                    // gutter={[1, { xs: 8, sm: 16, md: 24, lg: 24,xl:24 ,span:24}]}
                  >
                    <Col span={6} xl={6} lg={24} md={24} xs={24} sm={24}>
                      <img
                        src={`${URLst}images/${e.image}`}
                        alt="kl"
                        height={150}
                        width={"auto"}
                      />
                    </Col>
                    <Col
                      span={9}
                      xl={9}
                      lg={24}
                      md={24}
                      xs={24}
                      sm={24}
                      style={{ margin: "5px 0px" }}
                    >
                      <h1 style={{ fontSize: 25, fontWeight: 600 }}>
                        {" "}
                        {e.name}
                      </h1>
                      {/* <br /> */}
                      <p>{e.description}</p>
                      <Row justify="start">
                        <Button
                          type="text"
                          onClick={() => {
                            editor(e);
                          }}
                        >
                          <Space style={{ color: "blue" }}>
                            <EditFilled />
                            <div>Edit</div>
                          </Space>
                        </Button>
                        <Popconfirm
                          title={"Are you sure you want to delete this Badge?"}
                          onConfirm={() => {
                            props.AllBadgeDelete(e.id, data);
                          }}
                        >
                          <Button type="text">
                            <Space style={{ color: "red" }}>
                              <DeleteFilled />
                              <div>Delete</div>
                            </Space>
                          </Button>
                        </Popconfirm>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            </div>
          )}
        </Col>
        <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <ActionsTab />
          <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
            onClick={() => {
              setvisible(true);
            }}
          >
            Badge Builder
          </Button>
        </Col>
      </Row>

      <Modal
        title={isediting ? "Edit badges" : "Add badges"}
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
            formData.append("name", e.name);
            formData.append("description", e.description);
            formData.append("code", e.code);
            if (!isediting) {
               formData.append("image", e.image.file.originFileObj);
            }
           
            if (isediting) {
              delete e.image;
              props.AllBadgeEdit(editingkey, data, e);
            } else {
              props.badgeCreate(formData);
            }
          }}
        >
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item name="code">
            <Input placeholder="Code" />
          </Form.Item>
          {isediting ? (
            <></>
          ) : (
            <Form.Item name="image">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={async (file) => {
                  setImageUrl(URL.createObjectURL(file));
                  console.log(file);
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload Image
                    </div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          )}
          <Form.Item>
            <p style={{ color: "red" }}>{props.badgesError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.badgesPending}
            >
              {isediting ? "Edit badge" : "Add badge"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    badges: state.allbadges.allbadges,
    count: state.allbadges.count,
    badgesPending: state.allbadges.loading,
    badgesError: state.allbadges.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBadgeSuccess: (limit, page) =>
      dispatch(getAllBadgeSuccess(limit, page)),
    AllBadgeEdit: (id, badges, edited) =>
      dispatch(AllBadgeEdit(id, badges, edited)),
    AllBadgeDelete: (id, badges) => dispatch(AllBadgeDelete(id, badges)),
    badgeCreate: (formData) => dispatch(badgeCreate(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Badges));
