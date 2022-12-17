/** @format */

import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, Card, Modal, Popconfirm } from "antd";
import URLst,{ primary_color } from "../utils/constants";
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
function Avatar({
  data,
  avatarCreate,
  avatarGet,
  avatarEdit,
  avatarDelete,
  loading,
}) {
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
      <Col span={8} xs={24} sm={24} md={24} lg={12} xl={8} xxl={8} key={ele.id}>
        {" "}
        <Card
          style={{
            width: 250,
          }}
          cover={<img alt="example" src={`${URLst}images/${ele.image}`} style={{ width: '100%',maxWidth: '300px',height: 'auto' }}/>}
          actions={[
            <EditOutlined
              key="edit"
              onClick={() => {
                form.resetFields();
                seteditingkey(ele.id);
                setEditing(true);
                onFill(ele);
                setVisible(true);
              }}
            />,
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => {
                avatarDelete(ele.id, data);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined key="setting" />
            </Popconfirm>,
            // <DeleteOutlined key="setting" onClick={()=>{avatarDelete(ele.id,data);}}/>,
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
    <div
      style={{
        height: "100vh",
        width: "100 vw",
        overflow: "auto",
      }}
    >
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
          <Col span={6}  xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
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
                form.resetFields();

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
              disabled={isEditing}
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
