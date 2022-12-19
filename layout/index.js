import React, { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "antd";
import TopicMenu from "../Components/layoutComponents/TopicMenu";
import NavBar from "../Components/layoutComponents/NavBar";
import SideBar from "../Components/layoutComponents/SideBar";
import { adminmenu } from "./menuLinks";
import { connect } from "react-redux";

export function index(props) {
  const router = useRouter();
  const items =
    localStorage.getItem("role") === "staff"
      ? adminmenu.filter((e) => e.link !== "/UserManagment")
      : adminmenu;
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem("selectedKey") || "0"
  );
  const [breakpointBool, setBreakpointBool] = useState(false);

  const changeSelectedKey = (event, path = null) => {
    localStorage.setItem("selectedKey", event.key);
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
    path === null ? router.push(items[key].link) : router.push(path);
  };
  const Menu = (
    <TopicMenu
      items={items}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  return (
    <div>
      <Layout>
        <NavBar menu={Menu} style={{ padding: 0 }} />
        <Layout>
          <SideBar
            menu={Menu}
            onBreakpoint={(broken) => {
              setBreakpointBool(broken);
            }}
            theme="dark"
          />
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Layout.Content
              style={
                breakpointBool
                  ? { margin: "24px 16px 0", height: "100 vh" }
                  : {
                      margin: "24px 16px 0",
                      overflow: "initial",
                      height: "100 vh",
                    }
              }
            >
              {props.children}
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
      ;
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(index);


