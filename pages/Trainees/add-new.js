import React, { useState } from "react";
import withAuth from "../../utils/protectRoute";
import { primary_color } from "../../utils/constants";
import { Button, Input, message, Upload, Space, Form } from "antd";
import {
  PlusCircleFilled,
  LeftCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { traineeCreate } from "../../store";
import { connect } from "react-redux";

import { useRouter } from "next/router";
import FormData from "form-data";

function Addnew(props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);
  const formData = new FormData();

  return (
    <div>
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
        <div style={{ fontSize: "20px", fontWeight: 500 }}>Trainees</div>
        <div style={{ fontSize: "20px", fontWeight: 600 }}>|</div>
        <div
          style={{ fontSize: "20px", fontWeight: 500, color: primary_color }}
        >
          New Trainees
        </div>
      </Space>

      <div
        style={{
          width: "auto",
          backgroundColor: primary_color,
          height: "2px",
        }}
      ></div>
      <br />
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={(e) => {
          console.log(e);
          formData.append("name", e.name);
          formData.append("username", e.username);
          formData.append("email", e.email);
          formData.append("phone", e.phone);
          formData.append("department", e.department);
          formData.append("file", e.image.file.originFileObj);
          props.traineeCreate(formData);
        }}
      >
        <h3>Trainee Information</h3>
        <Form.Item
          name="image"
          
          rules={[
            {
              validator: (_, value) => {
                if (value !== undefined) {
                  if (value.file.size > 1048576) {
                    return Promise.reject(new Error("Image is too large!"));
                  }
                  console.log();
                  //
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Image is required!"));
              },
            },
          ]}
        >
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

        <Form.Item name="name">
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="department">
          <Input placeholder="Department" />
        </Form.Item>
        <h3>Contact Information</h3>
        <Form.Item name="phone">
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "email is required!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <p style={{ color: "red" }}>{props.traineesError}</p>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ borderRadius: 5 }}
            type="primary"
            htmlType="submit"
            loading={props.traineesPending}
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>
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
    traineeCreate: (formData) => dispatch(traineeCreate(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Addnew));
