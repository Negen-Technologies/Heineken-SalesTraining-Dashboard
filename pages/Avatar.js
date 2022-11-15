/** @format */

import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, Card, Modal } from "antd";
import { primary_color } from "../utils/constants";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import {
  avatarCreate,
  avatarGet,
  avatarEdit,
  avatarDelete,
} from "../store/index";
import FormData from "form-data";
import {
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
function Avatar({ data, avatarCreate, avatarGet, loading }) {
  const formData = new FormData();
  const [isVisible, setVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editingkey, seteditingkey] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    avatarGet();
  }, []);

  const onFill = (e) => {
    form.setFieldsValue({
      name: e.name,
      description: e.description,
    });
  };
  const finalCard = data.map((ele) => {
    return (
      <Col span={8} key={ele.id}>
        {" "}
        <Card
          style={{
            width: 250,
          }}
          cover={
            <img
              alt="example"
              src={`https://api.seleda.hahu.one/${ele.image}`}
            />
          }
          actions={[
            <EditOutlined
              key="edit"
              onClick={() => {
                seteditingkey(ele.id);
                setEditing(true);
                onFill(ele);
                setVisible(true);
              }}
            />,
            <DeleteOutlined
              key="setting"
              onClick={() => {
                avatarDelete(ele.id, data);
              }}
            />,
          ]}
        >
          <Meta
            //   avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={ele.name}
            description={ele.description}
          />
        </Card>
      </Col>
    );
  });

  const handleCancel = () => {
    setVisible(false);
    setEditing(false);
    seteditingkey(null);
  };
  return (
    <div>
      {data.length == 0 ? (
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
        <Row>
          <Col
            span={18}
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
              All Avatars
            </h1>

            <div
              style={{
                width: "auto",
                backgroundColor: primary_color,
                height: "2px",
                marginBottom: "20px",
              }}
            ></div>
            <Row gutter={[2, 16]}> {finalCard}</Row>
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

            <Button
              style={{ width: "202px", margin: "20px 0px" }}
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              Add Avatar
            </Button>
          </Col>
        </Row>
      )}
      <Modal
        title="Avatar"
        visible={isVisible}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={(doc) => {
            //   console.log(doc);
            formData.append("name", doc.name);
            formData.append("description", doc.description);
            if (isEditing) {
              avatarEdit(doc, editingkey);
            } else {
              avatarCreate(formData);
            }
          }}
        >
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="image"
              type="file"
              onChange={(e) => {
                formData.append("image", e.target.files[0]);
              }}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.avatar_reducer.data,
    loading: state.avatar_reducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    avatarCreate: (value) => dispatch(avatarCreate(value)),
    avatarGet: () => dispatch(avatarGet()),
    avatarEdit: (value, id) => dispatch(avatarEdit(value, id)),
    avatarDelete: (id, data) => dispatch(avatarDelete(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Avatar));
