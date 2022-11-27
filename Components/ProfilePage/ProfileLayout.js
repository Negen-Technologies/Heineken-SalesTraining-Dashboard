import React, { useState, useEffect } from "react";
import {
  Avatar,
  Input,
  Form,
  Space,
  Button,
  Modal,
  Row,
  Col,
  Select,
  Image
} from "antd";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
// import { editProfileAction } from "../../store/Profile/EditProfileAction";
import URLst,{ primary_color } from "../../utils/constants";
import FormData from "form-data";

import {
  getProfileSuccess,
  editProfileAction,
  allprofilePending,
 } from "../../store";


function ProfileLayout(props) {
  const [fileList, setFileList] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [imageFile, setImageFile] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
  const formData = new FormData();
  const router = useRouter();

  useEffect(() => {
    props.getProfileSuccess()
    console.log('in layout: ', props.allprofile)

  console.log(props.allprofile)

      form.setFieldsValue({
        name: props.allprofile.name,
        username: props.allprofile.username,
        email: props.allprofile.email,
        role:props.allprofile.role
      });
  
  }, []);

  useEffect(() => {
  

      form.setFieldsValue({
        name: props.allprofile.name,
        username: props.allprofile.username,
        email: props.allprofile.email,
        role:props.allprofile.role
      });
  
  }, [props.allprofile]);

  // function success() {
  //   Modal.success({
  //     title: editProfileData.message,
  //   });
  // }
  // if (editProfileData.message) {
  //   success();
  // }
  const onSubmit = async () => {
    // checkedValues[URLst] = imageUrl;
    const newData = await form.validateFields();

    props.editProfile(props.allprofile, newData);
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
            <Input placeholder="Username" disabled = {true}/>
          </Form.Item>
        <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          {/* <Form.Item name="password">
            <Input placeholder="Password" />
          </Form.Item> */}
          {/* <Form.Item>
            <p style={{ color: "red" }}>{props.usersError}</p>
          </Form.Item> */}

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
              // loading={editProfileData.isPending}
              // disabled={uploading}
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
        src={`${URLst}images/${props.allprofile.image}`}
        placeholder={
          <Image
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            width={200}
          />
        }
      />
                {/* <EditOutlined /> */}
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
    editProfile: state.editProfile,
    allprofile: state.allprofile.allprofile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (profile, edited) =>
      dispatch(editProfileAction(profile, edited)),
    getProfileSuccess: () => dispatch(getProfileSuccess())
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);