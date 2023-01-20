import React, { useState,useEffect } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { primary_color } from "../utils/constants";
import { connect } from "react-redux";
import { resetPassword } from "../store/index";
import { useRouter } from "next/router";

function ResetPassword({ userData, resetPassword }) {
  const router = useRouter();
  const [Tokenval,setTokenval]=useState(null)
  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      setTokenval(token);
    }
  }, [router.isReady]);

  const onFinish = (data) => {
    console.log(Tokenval);
    console.log(data);
    resetPassword({
      password: data.password,
      token: Tokenval,
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
      <Col
        span={18}
        xs={24}
        sm={24}
        md={24}
        lg={20}
        xl={18}
        xxl={18}
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
              <div>Reset Password</div>
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
                name="password"
                style={{ margin: "20px 30px" }}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value !== undefined) {
                        if (/\d/.test(value) && /[a-zA-Z]/.test(value)) {
                          return Promise.resolve();
                        }
                        if (value.length < 8) {
                          return Promise.reject(
                            new Error(
                              "Password needs to contain at least 8 characters!"
                            )
                          );
                        }
                        return Promise.reject(
                          new Error(
                            "Password needs to contain at least one number and one character!"
                          )
                        );
                      }

                      return Promise.reject(new Error("Password is required!"));
                    },
                  },
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="confirm"
                style={{ margin: "20px 30px" }}
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
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
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    borderRadius: 8,
                    padding: "5px 35px",
                    margin: "0px 30px",
                  }}
                  loading={userData.loading}
                >
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Col>
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
    resetPassword: (value) => dispatch(resetPassword(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
