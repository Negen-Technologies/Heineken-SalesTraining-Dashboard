import React, { useState, useEffect } from "react";
import { Avatar, Badge, Button, Col, Drawer, Row, Input } from "antd";
import {
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  BellOutlined,
  SearchOutlined
} from "@ant-design/icons";
import useWindowSize from "../../utils/windowsSize";

import { connect } from "react-redux";
// import {
//   authSuccess,
//   logout,
//   loadingFalse,
//   loadingTrue,
// } from "../../store/index";
import Router, { useRouter } from "next/router";
import { primary_color } from "../../utils/constants";
function NavBar({
  menu,
  userData,
  authSuc,
  logout,
  loadingFalse,
  loadingTrue,
}) {
  const [visible, setVisible] = useState(false);
  const [Avatarimage, setAvatarimage] = useState("");

  const { width } = useWindowSize();
  // var router = useRouter();

  return (
    <nav
      style={{
        backgroundColor: "#298a40",
        paddingLeft: "2rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Row style={{ paddingRight: "20px" }} justify="space-between">
        <Col>
          <Button
            style={width > 992 ? { display: "none" } : {}}
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
          />
          <Drawer
            bodyStyle={{
              backgroundColor: primary_color,
              padding: "0",
            }}
            headerStyle={{
              paddingLeft: "2rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            closable={false}
            placement="left"
            onClick={() => setVisible(false)}
            onClose={() => setVisible(false)}
            visible={visible}
          >
            {menu}
          </Drawer>
          <a href="/">
            {/* <img style={{ height: "42px", padding:"0" }} src="/school-logo.png" alt="logo" /> */}
            <h3
              style={{
                marginTop: "10px",
                color: "white",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Trainees
            </h3>
          </a>
        </Col>
        <Col>
          <Row align="middle">
            <Input
              suffix={<SearchOutlined />}
              style={{
                width: "150px",
                
                borderRadius: 22,
              }}
            ></Input>

            {/* <input
            placeholder="Keywords"
              style={{
                width: "150px",
                
                backgroundColor: primary_color,
                borderColor:'grey',
                borderRadius: 22,
              }}
            ></input> */}
            <div
              style={{
                width: "1px",
                backgroundColor: "gray",
                height: "40px",
                margin: "0px 10px",
              }}
            ></div>
            <span className="avatar-item">
              {
                <Avatar
                  shape="circle"
                  size="default"
                  style={{ backgroundColor: "#10c70e" }}
                  icon={<BellOutlined />}
                />
              }
            </span>
          </Row>
        </Col>
      </Row>
    </nav>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     userData: state.auth,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     authSuc: (token, data) => dispatch(authSuccess(token, data)),
//     logout: () => dispatch(logout()),
//     loadingFalse: () => dispatch(loadingFalse()),
//     loadingTrue: () => dispatch(loadingTrue()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBar;
