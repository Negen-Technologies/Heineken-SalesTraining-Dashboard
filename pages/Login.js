import React,{useState} from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { primary_color } from "../utils/constants";
import { connect } from "react-redux";
import { authLogin } from "../store/index";
import Router from "next/router";

function Login({ userData, authLogin }) {

  const [loading, setLoading] = useState(false);

  if (userData.token) {
    // setLoading(false);
    Router.replace("/Dashboard");
  }

  const onFinish = (data) => {
    setLoading(true);
    
    authLogin({
      username: data.username,
      password: data.password,
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
          <Row style={{ color: "white" }}>
            <Col>
              <p style={{ fontSize: 100, fontWeight: 700 }}>Seleda</p>
            </Col>
            <Col style={{ fontSize: 48, fontWeight: 200 }}>&trade;</Col>
          </Row>
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
              <Col span={12} style={{ color: "red", fontWeight: 400 }}>
                <div>LOGIN TO</div>
                <div>YOUR EXPERIENCE</div>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                Heiniken
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
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input style={{ borderRadius: 6 }} placeholder="Username" />
                </Form.Item>

                <Form.Item
                  style={{ margin: "20px 30px" }}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    style={{ borderRadius: 6 }}
                    placeholder="Password"
                  />
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
                    loading={loading}
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
    authLogin: (value) => dispatch(authLogin(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
