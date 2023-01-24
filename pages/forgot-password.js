import React, { useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { primary_color } from "../utils/constants";
import { connect } from "react-redux";
import { forgotPassword } from "../store/index";
import Router from "next/router";

function ForgotPassword({ userData, forgotPassword }) {


  const onFinish = (data) => {
    console.log(data)
    forgotPassword({
      email: data.email,
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100 vw",
        backgroundColor: primary_color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row style={{ height: "50vh", width: "100vw" }}>
        <Col
          span={12}
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={{ span: 6, offset: 6 }}
          xxl={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/Seleda-Logo-04.png"
            style={{ width: "100%", maxWidth: "300px", height: "auto" }}
          />
        </Col>

        <Col
          span={12}
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={12}
          xxl={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col
            xs={22}
            sm={22}
            md={16}
            lg={16}
            xl={10}
            xxl={10}
            span={14}
            style={{
              backgroundColor: "#eee",
              borderRadius: 12,
            }}
          >
            <Row style={{ margin: "20px 30px" }}>
              <Col
                span={12}
                style={{ color: "black", fontWeight: 700, fontSize: "16px" }}
              >
                <div>Forgot Password</div>
              </Col>
            </Row>
            <hr style={{ backgroundColor: "red" }} />
            <div>
              <Form
                name="basic"
                style={{ margin: "30px 0px" }}
                autoComplete="off"
                onFinish={onFinish}
              >
               
                <Form.Item
                  style={{ margin: "20px 30px" }}
                  label='Email'
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input style={{ borderRadius: 6 }} placeholder="Email" />
                </Form.Item>

                <Form.Item style={{ margin: "20px 30px" }}>
                  {userData.successMes === null ? (
                    <></>
                  ) : (
                    <>
                      <p style={{ color: "green", fontSize: "16px" }}>
                        {userData.successMes}
                      </p>
                    </>
                  )}
                  {userData.error == null ? (
                    <div></div>
                  ) : (
                    <div>
                      {/* <br /> */}
                      <p style={{ color: "red" }}>{userData.error}</p>
                    </div>
                  )}
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ borderRadius: 14, padding: "5px 35px" }}
                    loading={userData.loading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

// export default Login;
const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (value) => dispatch(forgotPassword(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
