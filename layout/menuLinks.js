import {
  AuditOutlined,
  DashboardOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
  FileDoneOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UngroupOutlined,
  // <UsergroupAddOutlined />
} from "@ant-design/icons";


export const adminmenu = [
  {
    name: "Dashboard",
    link: "/Dashboard",
    icon: <DashboardOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "User Managment",
    link: "/UserManagment",
    icon: <UsergroupAddOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Courses",
    link: "/Courses",
    icon: <ReadOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Trainees",
    link: "/Trainees",
    icon: <TeamOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Badges",
    link: "/Badges",
    icon: <AuditOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Avatar",
    link: "/Avatar",
    icon: <UserOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Region",
    link: "/Regions",
    icon: <UngroupOutlined style={{ fontSize: "26px" }} />,
  },
  
  {
    name: "Subregion",
    link: "/Subregions",
    icon: <UngroupOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Territories",
    link: "/Territory",
    icon: <UngroupOutlined style={{ fontSize: "26px" }} />,
  },
];

export const adminroutes = [
  "/Dashboard",
  "/UserManagment",
  "/Courses",
  "/Trainees",
  "/Badges",
  "/Avatar",
  "/Regions",
  "/Subregions",
  "/Territory"
];