import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  Button,
  Row,
  Col,
  Modal,
  Select,
  Space,
  Avatar
} from "antd";
import { connect } from "react-redux";
import {
  getAllUserSuccess,
  AllUserEdit,
  AllUserDelete,
  UserCreate,
} from "../store";
import withAuth from "../utils/protectRoute";
import URLst,{ primary_color } from "../utils/constants";
import FormData from "form-data";


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    dataIndex === "role" || dataIndex === "username" ? (
      <Input disabled={true} />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserManagment = (props) => {
  const [form] = Form.useForm();
  const formData = new FormData();
  var numEachPage = 10;
  var data = [];
  const [isVisible, setVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [loadedpage, setLoadedPage] = useState([1]);
  props.users.forEach((element) => {
    data.push({ ...element, key: element.id });
  });
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    props.getAllUserSuccess(numEachPage, 1);
  }, []);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  //*********** Editing function ***********//

  const save = async (key) => {
    const row = await form.validateFields();
    setEditingKey("");
    
    props.AllUserEdit(key, props.users, row);
  };

  //*********** Deleting function ***********//
  const handleDelete = (key) => {
    props.AllUserDelete(key, props.users);
  };

  const handleChange = (pageNumber, size) => {
    numEachPage = size;
    setCurrent(pageNumber);
    props.getAllUserSuccess(numEachPage, pageNumber);
    setLoadedPage([...loadedpage, pageNumber]);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      render: (_, record) => {
        return (
          <Space>
            <Avatar size="small" src={`${URLst}images/${record.image}`} />
            <p>{record.name}</p>
          </Space>
        );
      },
    },

    {
      title: "Role",
      dataIndex: "role",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "Username",
      dataIndex: "username",
      editable: true,
    },

    {
      title: "",
      dataIndex: "",

      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm
              title="Sure to save?"
              onConfirm={() => save(record.key)}
            >
              <Button
                type="link"
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Button>
            </Popconfirm>
            <Button type="link" onClick={cancel}>
              Cancel
            </Button>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            handleDelete(record.key);
          }}
        >
          <a style={{ color: "red" }}>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div>
      <Row>
        <Col
          span={18}
          xs={24}
          sm={24}
          md={18}
          lg={18}
          xl={18}
          xxl={18}
          style={{
            padding: "0px 50px",
          }}
        >
          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: primary_color,
            }}
          >
            All Users
          </h1>
          <div
            style={{
              width: "auto",
              backgroundColor: primary_color,
              height: "2px",
              marginBottom: "20px",
            }}
          ></div>{" "}
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              style={
                {
                  // paddingTop: 20,
                }
              }
              scroll={{ x: 200 }}
              bordered
              loading={props.usersPending}
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                defaultCurrent: 1,
                total: props.count,
                onChange: handleChange,
                defaultPageSize: numEachPage,
                current: current,
                responsive: true,
                // showSizeChanger: true,
                hideOnSinglePage: true,
                pageSizeOptions: ["10", "20", "50", "100"],
              }}
            />
          </Form>
        </Col>

        <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
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
              form.resetFields();

              setVisible(true);
            }}
          >
            Add User
          </Button>
        </Col>
      </Row>

      <Modal
        title="User Managment"
        visible={isVisible}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form
          form={form}
          onFinish={(doc) => {
            Object.keys(doc).forEach((ele) => {
              formData.append(ele, doc[ele]);
            });

            props.UserCreate(formData);
          }}
        >
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="role">
            <Select placeholder="Role">
              <Select.Option value={"user"}>User</Select.Option>
              <Select.Option value={"admin"}>Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="image"
              type="file"
              onChange={(e) => {
                formData.append("file", e.target.files[0]);
              }}
              accept=".png ,.jpg"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red" }}>{props.usersError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.usersPending}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.allusers.allusers,
    count: state.allusers.count,
    usersPending: state.allusers.loading,
    usersError: state.allusers.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserSuccess: (limit, page) =>
      dispatch(getAllUserSuccess(limit, page)),
    AllUserEdit: (id, users, edited) =>
      dispatch(AllUserEdit(id, users, edited)),
    AllUserDelete: (id, users) => dispatch(AllUserDelete(id, users)),
    UserCreate: (formData) => dispatch(UserCreate(formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(UserManagment));
