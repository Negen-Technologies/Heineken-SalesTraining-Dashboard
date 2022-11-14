import React from "react";
import withAuth from "../../utils/protectRoute";
import { primary_color } from "../../utils/constants";
import { Button, Input, Avatar, Upload, Space, Form } from "antd";
import { PlusCircleFilled, LeftCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
const props = {
  onRemove: (file) => {
    setFileList([]);
  },
  onChange: (info) => {},
  beforeUpload: async (file) => {
    // setImageFile(URL.createObjectURL(file));
  },
  //   fileList,
};

function addnew() {
  const router = useRouter();
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
            router.replace("/Trainees");
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
      >
        <h3>Trainee Information</h3>
        <Form.Item>
          {" "}
          <Upload
            {...props}
            showUploadList={{
              showRemoveIcon: false,
              showPreviewIcon: false,
              showDownloadIcon: false,
            }}
            accept=".jpg, .jpeg, .png"
          >
            <Avatar
              offset={5}
              size={{ xs: 60, sm: 60, md: 60, lg: 80, xl: 80, xxl: 80 }}
            >
              <PlusCircleFilled />
            </Avatar>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Department" />
        </Form.Item>
        <h3>Contact Information</h3>
        <Form.Item>
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Email(optional)" />
        </Form.Item>
        <Form.Item>
          <Button style={{ borderRadius: 5 }} type="primary">
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withAuth(addnew);
