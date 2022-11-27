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

import { connect } from "react-redux";
import {
  getAllTraineeSuccess,
  AllTraineeEdit,
  AllTraineeDelete,
  traineeCreate,
} from "./../store";
import withAuth from "./../utils/protectRoute";
import URLst, { primary_color } from "./../utils/constants";
import ActionsTab from "./../Components/SupplimentaryComponents/actionsTab";
import OverviewTab from "./../Components/SupplimentaryComponents/overviewTab";
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
function Trainees(props) {
  const [visible, setvisible] = useState(false);
  const router = useRouter();
  const form = Form.useForm();

  const data = [];

  props.trainees.forEach((element) => {
    console.log(element);
    data.push({ ...element, key: element._id });
  });
  useEffect(() => {
    props.getAllTraineeSuccess(10, 1);
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
            src={`${URLst}images/${record.user.image}`}
            style={{ backgroundColor: "#10c70e" }}
            icon={<UserOutlined />}
          />
          <a
            style={{ padding: "0px 10px" }}
            onClick={() => {
              router.push(`Trainees/detail-info?id=${record._id}`);
            }}
          >
            {record.user.name}
          </a>
        </Row>
      ),
    },
    {
      title: "Points",
      dataIndex: "age",
      key: "age",
      render: (text, record) => (
        <Row>
          {" "}
          <div style={{ color: "red" }}>
            <StarFilled />
          </div>
          <Button
            type="link"
            style={{ padding: "0px 10px", color: primary_color }}
            onClick={() => {
              router.push(`Trainees/badge-detail?id=${record._id}`);
            }}
          >
            {record.badges.length} Points
          </Button>
        </Row>
      ),
    },
    {
      title: "Progress",
      dataIndex: "percent",
      key: "percent",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            router.push(`Trainees/course-progress?id=${record._id}`);
          }}
        >
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
        </Button>
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
              <Popconfirm
                title={"Are you sure you want to delete this Trainee?"}
                onConfirm={() => {
                  props.AllTraineeDelete(record.id, data);
                }}
              >
                {" "}
                <DeleteOutlined
                  onClick={() => {
                    props.AllTraineeDelete(record.id, data);
                  }}
                />
              </Popconfirm>
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
            scroll={{ x: 200 }}
            style={{ margin: "20px 0px" }}
            loading={props.traineesPending}
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
const mapStateToProps = (state) => {
  return {
    trainees: state.alltrainees.alltrainees,
    count: state.alltrainees.count,
    traineesPending: state.alltrainees.loading,
    traineesError: state.alltrainees.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTraineeSuccess: (limit, page) =>
      dispatch(getAllTraineeSuccess(limit, page)),
    AllTraineeEdit: (id, trainees, edited) =>
      dispatch(AllTraineeEdit(id, trainees, edited)),
    AllTraineeDelete: (id, trainees) =>
      dispatch(AllTraineeDelete(id, trainees)),
    traineeCreate: (formData) => dispatch(traineeCreate(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Trainees));

// export default withAuth(Trainees);
