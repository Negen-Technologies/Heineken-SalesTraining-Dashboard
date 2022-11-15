import { React, useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Progress,
  Table,
  Input,
  Avatar,
  Modal,
  Form,
} from "antd";
import {
  UserOutlined,
  StarFilled,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import withAuth from "../utils/protectRoute";
import { primary_color } from "../utils/constants";
import { useRouter } from "next/router";

let origindata = [
  {
    key: "1",
    name: "John Brown",
    age: 0,
    address: "New York No. 1 Lake Park",
    percent: 0,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 0,
    address: "London No. 1 Lake Park",
    percent: 0,
  },
  {
    key: "3",
    name: "Joe Black",
    age: 0,
    address: "Sidney No. 1 Lake Park",
    percent: 0,
  },
];
function Trainees() {
  var [data, setData] = useState(origindata);
  const [visible, setvisible] = useState(false);
  const router = useRouter();
  const form=Form.useForm()
  useEffect(() => {
    // localStorage.setItem("trainee_data", JSON.stringify(data));

    var tr_da = localStorage.getItem("trainee_data");
    if (tr_da == (undefined || null)) {
      localStorage.setItem("trainee_data", JSON.stringify(data));
    } else {
      var tt = JSON.parse(localStorage.getItem("trainee_data"));
      setData(tt);
    }
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Row>
          {" "}
          <Avatar
            shape="circle"
            size="small"
            src={`https://joeschmoe.io/api/v1/${record.key}`}
            style={{ backgroundColor: "#10c70e" }}
            icon={<UserOutlined />}
          />
          <div style={{ padding: "0px 10px" }}>{text}</div>
        </Row>
      ),
    },
    {
      title: "Points",
      dataIndex: "age",
      key: "age",
      render: (text) => (
        <Row>
          {" "}
          <div style={{ color: "red" }}>
            <StarFilled />
          </div>
          <div style={{ padding: "0px 10px", color: primary_color }}>
            {text} Points
          </div>
        </Row>
      ),
    },
    {
      title: "Progress",
      dataIndex: "percent",
      key: "percent",
      render: (text) => (
        <Row>
          {" "}
          <div style={{ color: primary_color }}>Course Progress</div>
          <div style={{ padding: "0px 10px" }}>
            <Progress
              percent={text}
              size="small"
              showInfo={false}
              strokeColor={primary_color}
              trailColor={"grey"}
              style={{ width: "150px" }}
            />
          </div>
        </Row>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <Row>
          
          {/* <Avatar
          size="small"
          style={{
            backgroundColor: primary_color,
            margin: "0px 2px",
          }}
          icon={<EyeOutlined />}
        /> */}
          <Avatar
            size="small"
            style={{ backgroundColor: "red", margin: "0px 2px" }}
            icon={
              <DeleteOutlined
                onClick={() => {
                  var filtereddata = data.filter(
                    (item) => item.key !== record.key
                  );
                  setData(filtereddata);
                  localStorage.setItem(
                    "trainee_data",
                    JSON.stringify(filtereddata)
                  );
                }}
              />
            }
          />
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col
          span={18}
          style={{
            padding: "0px 50px",
          }}
        >
          <Row>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: primary_color,
              }}
            >
              All Trainees
            </h1>
            <Input
              placeholder="Name"
              suffix={<SearchOutlined />}
              style={{
                width: "150px",
                height: "30px",

                borderRadius: 22,
                margin: "0px 10px",
              }}
            />
          </Row>

          <div
            style={{
              width: "auto",
              backgroundColor: primary_color,
              height: "2px",
            }}
          ></div>

          <Table
            style={{ margin: "20px 0px" }}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </Col>

        <Col span={6}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: primary_color,
            }}
          >
            Actions
          </h1>
          <div
            style={{
              width: "auto",
              backgroundColor: primary_color,
              height: "2px",
            }}
          ></div>

          <Button
            style={{ width: "202px", margin: "20px 0px" }}
            type="primary"
            onClick={() => {
              router.push("/Trainees/add-new");
            }}
          >
            Add Trainee
          </Button>
        </Col>
      </Row>

      <Modal
        visible={visible}
        onCancel={() => {
          setvisible(false);
        }}
      >
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          onFinish={(doc) => {
            // console.log(JSON.stringify(doc));
            // var t_data = localStorage.getItem("trainee_data");
            // var final = JSON.parse(t_data);
            // final = [
            //   ...final,
            //   {
            //     name: doc.name,
            //     username: doc.username,
            //     department: doc.department,
            //     phone: doc.phone,
            //     email: doc.email,
            //   },
            // ];
            // localStorage.setItem("trainee_data", JSON.stringify(final));
            // console.log(final);
          }}
        >
          <h3>Trainee Information</h3>

          <Form.Item name="name">
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item name="username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="department">
            <Input placeholder="Department" />
          </Form.Item>
          <h3>Contact Information</h3>
          <Form.Item name="phone">
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Email(optional)" />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ borderRadius: 5 }}
              type="primary"
              htmlType="submit"
            >
              Edit Trainee
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default withAuth(Trainees);
