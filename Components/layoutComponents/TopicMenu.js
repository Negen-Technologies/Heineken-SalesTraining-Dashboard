import React from "react";
import { Menu,Row,Avatar,Col,Popover,Popconfirm } from "antd";
import {
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { primary_color } from "../../utils/constants";
export default function TopicMenu({ items, selectedKey, changeSelectedKey }) {
  const styledTopics = [];
  items.forEach((topic, index) =>
    styledTopics.push(
      <Menu.Item
        style={{
          paddingLeft: "5px",
        }}
        key={index}
        l={topic.link}
        onClick={changeSelectedKey}
        icon={topic.icon}
      >
        {topic.name}{" "}
      </Menu.Item>
    )
  );

  return (
    <>
      <div
        style={{
          height: "120px",
          margin: "12px",
          background: "rgba(56, 255, 255, 0)",
          textAlign: "left",
          marginBottom: "0px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Row align="middle">
          <span className="avatar-item">
            {
              <Avatar
                shape="circle"
                size="default"
                style={{ backgroundColor: primary_color }}
                icon={<UserOutlined />}
              />
            }
          </span>
          <Col>
            {" "}
            <h1
              style={{
                paddingLeft: "10px",
                paddingTop: "5px",
                paddingRight: "5px",
                color: primary_color,
              }}
            >
              {/* Hi, {userData.data.name} */}
              John Doe
            </h1>
            {/* <h6
              style={{
                paddingLeft: "10px",
                paddingTop: "-5px",
                paddingRight: "5px",
                color: primary_color,
              }}
            >
              Training Admin
            </h6> */}
          </Col>

          <Popover
            placement="bottomRight"
            content={
              <div>
                <Row
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Router.push("/profile");
                  }}
                >
                  <UserOutlined
                    style={{ marginRight: "10px", marginTop: "4px" }}
                  />
                  <p>Profile</p>
                </Row>
                <Popconfirm
                  title="Are you sure you want to log out?"
                  onConfirm={() => {
                    // loadingTrue();
                    // router.replace("/Login").then(() => {
                    //   logout();
                    //   loadingFalse();
                    // });
                  }}
                  okText="Logout"
                  cancelText="Cancel"
                >
                  <Row style={{ cursor: "pointer" }}>
                    <LogoutOutlined
                      style={{ marginRight: "10px", marginTop: "4px" }}
                    />
                    <p>Logout</p>
                  </Row>
                </Popconfirm>
              </div>
            }
            trigger="hover"
          >
            <DownOutlined style={{ marginLeft: "8px", color: primary_color }} />
          </Popover>
        </Row>
      </div>

      <Menu
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={["0"]}
        theme="light"
        mode="inline"
      >
        {styledTopics}{" "}
      </Menu>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          margin: "12px",
          marginBottom: "-8px",
          marginLeft: "16px",
          color: "#fff",
          fontSize: "11px",
        }}
      >
        <pre>
          ©2022 Leanbits
          <pre>All Rights Reserved</pre>
        </pre>
      </div>
    </>
  );
}
