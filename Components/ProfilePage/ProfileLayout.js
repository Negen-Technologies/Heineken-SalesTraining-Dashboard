import React, { useState, useEffect } from "react";
import {
  Input,
  Form,
  Space,
  Button,
  Modal,

  Select,
} from "antd";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { EditOutlined } from "@ant-design/icons";
import { editProfileAction } from "../../store/Profile/editProfileAction";
import URLst,{ primary_color } from "../utils/constants";
import FormData from "form-data";

function ProfileLayout({
  editProfileData,
  userData,

  editProfile,
}) {
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const formData = new FormData();
  const router = useRouter();

  useEffect(() => {
    if (userData.token) {
  

      form.setFieldsValue({
        name: userData.data.name,
        username: userData.data.username,
        email: userData.data.email,
        password: userData.data.password,
        
        
      });
    }
  });


  function success() {
    Modal.success({
      title: editProfileData.message,
    });
  }
  if (editProfileData.message) {
    success();
  }
  const onSubmit = (checkedValues) => {


    editProfile(checkedValues);
  };

  return (
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
          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: primary_color,
            }}
          >
            User Profile
          </h1>
          <div
            style={{
              width: "auto",
              backgroundColor: primary_color,
              height: "2px",
              marginBottom: "20px",
            }}
          ></div>{" "}
          <Form form={form} component={false}>

        <Form
          size="large"
          form={form}
          labelCol={{ span: 4 }}
          onFinish={(checkedValues) => onSubmit(checkedValues)}
          wrapperCol={{
            xs: { span: 16, offset: 1 },
            sm: { span: 16, offset: 3 },
            md: { span: 12, offset: 4 },
            lg: { span: 12, offset: 6 },
            xl: { span: 12, offset: 6 },
          }}
        >
         
          <Form.Item name="name"
           rules={[{ required: true, message: "" }]}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item name="username"
          rules={[{ required: true, message: "" }]}>
            <Input placeholder="Username" />
          </Form.Item>
        <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                
              },
              {
                required: true,
                
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password">
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red" }}>{props.usersError}</p>
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginLeft: 30 }}
              loading={editProfileData.isPending}
              disabled={uploading}
            >
              Submit
            </Button>
           
          </Form.Item>
        </Form>
        </Form>
        </Col>
        <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: primary_color,
            }}
          >
            Admin Profile
          </h1>
          <div
            style={{
              width: "auto",
              backgroundColor: primary_color,
              height: "2px",
            }}
          ></div>

<div style={{ marginBottom: 40, marginTop: "5%" }}>
           
                 <Space size={12}>
      <Image
        width={200}
        src={`${URLst}images/${record.image}`}
        placeholder={
          <Image
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            width={200}
          />
        }
      />
                <EditOutlined />
              </Space>
            {/* </Upload>  */}
          </div>
        </Col>
      </Row>

      </div>

  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.auth,
    editProfileData: state.editProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (checkedValues) =>
      dispatch(editProfileAction(checkedValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);