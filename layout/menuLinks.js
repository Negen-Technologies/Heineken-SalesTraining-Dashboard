import {
  AuditOutlined,
  DashboardOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
  FileDoneOutlined,
  UsergroupAddOutlined,
  UserOutlined 
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
    name: "Reports",
    link: "/Reports",
    icon: <FileDoneOutlined style={{ fontSize: "26px" }} />,
  },
  {
    name: "Settings",
    link: "/Settings",
    icon: <SettingOutlined style={{ fontSize: "26px" }} />,
  },
];

export const adminroutes = [
  "/HomePage",
  "/students",
  "/UserManagment",
  "/assignClass",
  "/notifications",
  "/adminAttendancePage",
  "/transcripts",
  "/report-cards",
  "/gradeChange",
  "/gradeChangeLogs",
  "/SingleStudent",
  "/profile",
];
