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
  Avatar,
  Tag,
} from "antd";
import { connect } from "react-redux";
import {
  getAllUserSuccess,
  AllUserEdit,
  AllUserDelete,
  UserCreate,
  getAllTerritorySuccess,
  getAllSubRegionSuccess,
  getAllRegionSuccess,
  editUserTerritory,
} from "../store";
import withAuth from "../utils/protectRoute";
import URLst, { primary_color, exportToExcel } from "../utils/constants";
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
  const role = localStorage.getItem("role");
  const [userRole, setuserRole] = useState("");

  let numEachPage = 10;
  let data = [];
  const [isVisible, setVisible] = useState(false);
  const [tervisible, settervisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubRegion, setSelectedSubRegion] = useState("");
  const [selectedTerritory, setselectedTerritory] = useState("");
  const [current, setCurrent] = useState(1);
  const [loadedpage, setLoadedPage] = useState([1]);
  const [editingKey, setEditingKey] = useState("");

  props.users.forEach((element) => {
    //  let terr= element.territory === null?'':element.territory.name
    data.push({ ...element, key: element.id });
  });

  useEffect(() => {
    props.getAllUserSuccess(numEachPage, 1);
    props.getAllTerritorySuccess(10, 1);
    props.getAllSubRegionSuccess(10, 1);
    props.getAllRegionSuccess(10, 1);
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
      title: "Location",
      dataIndex: "",
      render: (_, record) =>
        record.role === "admin" ? (
          <div></div>
        ) : record.role === "supervisor" ? (
          <div>
            {record.region === null ? (
              <Tag
                onClick={() => {
                  setuserRole("supervisor");

                  setEditingKey(record.id);
                  settervisible(true);
                }}
                color="success"
                style={{ cursor: "pointer" }}
              >
                Add to region
              </Tag>
            ) : (
              <div>{record.region.name}</div>
            )}
          </div>
        ) : record.role === "staff" ? (
          <div>
            {record.subregion === null ? (
              <Tag
                onClick={() => {
                  setuserRole("staff");

                  settervisible(true);

                  setEditingKey(record.id);
                }}
                color="success"
                style={{ cursor: "pointer" }}
              >
                Add to subregion
              </Tag>
            ) : (
              <div>{record.subregion.name}</div>
            )}
          </div>
        ) : (
          <div>
            {record.territory === null ? (
              <Tag
                onClick={() => {
                  settervisible(true);

                  setEditingKey(record.id);
                }}
                color="success"
                style={{ cursor: "pointer" }}
              >
                Add to territory
              </Tag>
            ) : (
              <div>{record.territory.name}</div>
            )}
          </div>
        ),
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
            <Tag color="processing" style={{ cursor: "pointer" }}>
              Edit
            </Tag>
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
          <Tag color="volcano" style={{ cursor: "pointer" }}>
            Delete
          </Tag>
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

          <Button
            style={{ width: "202px", margin: "5px 0px" }}
            type="primary"
            onClick={() => {
              let newdata = [];
              data.forEach((e) => {
                delete e.isEmailVerified;
                delete e.key;
                let terr = e.territory === null ? "" : e.territory.name;
                newdata.push({ ...e, territory: terr });
              });

              exportToExcel(newdata, "UserManagement");
            }}
          >
            Export Table
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
              {/* <Select.Option value={"user"}>User</Select.Option> */}
              <Select.Option value={"admin"}>Admin</Select.Option>
              <Select.Option value={"supervisor"}>FSM</Select.Option>
              <Select.Option value={"staff"}>BUM</Select.Option>
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

      <Modal
        title="Add To Territory"
        visible={tervisible}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          settervisible(false);
          setEditingKey("");
          setuserRole("");
        }}
      >
        <Form
          onFinish={(e) => {
            let toSend =
              userRole === "supervisor"
                ? { region: selectedRegion }
                : userRole === "staff"
                ? { subregion: selectedSubRegion }
                : {
                    territory: selectedTerritory,
                  };
            console.log(toSend);
            props.editUserTerritory(editingKey, props.users, toSend);
          }}
        >
          <Form.Item name="Region" label="Region">
            <Select
              name="Region"
              style={{ width: "100%" }}
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e);
              }}
              placeholder="Select Region"
              options={props.regions.map((regions) => {
                return {
                  value: regions.id,
                  label: regions.name,
                };
              })}
            />
          </Form.Item>
          {userRole === "supervisor" ? (
            <></>
          ) : (
            <div>
              <Form.Item name="Subregion" label="Subregion">
                <Select
                  name="subregions"
                  style={{ width: "100%" }}
                  value={selectedSubRegion}
                  onChange={(e) => {
                    setSelectedSubRegion(e);
                  }}
                  placeholder="Select Subregion"
                  options={props.subregions
                    .filter((e) => e.regionId.id === selectedRegion)
                    .map((subregion) => {
                      return {
                        value: subregion.id,
                        label: subregion.name,
                      };
                    })}
                />
              </Form.Item>
              {userRole === "staff" ? (
                <></>
              ) : (
                <div>
                  <Form.Item name="Territory" label="Territory">
                    <Select
                      name="Territory"
                      style={{ width: "100%" }}
                      value={selectedTerritory}
                      onChange={(e) => {
                        setselectedTerritory(e);
                      }}
                      placeholder="Select Territory"
                      options={props.territory
                        .filter((e) => e.subregionId.id === selectedSubRegion)
                        .map((territory) => {
                          return {
                            value: territory.id,
                            label: territory.name,
                          };
                        })}
                    />
                  </Form.Item>
                </div>
              )}
            </div>
          )}

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{ borderRadius: 5 }}
              loading={props.usersPending}
              type="primary"
              htmlType="submit"
            >
              Add To Territory
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
    subregions: state.allsubregions.allsubregions,
    regions: state.allregions.allregions,
    territory: state.allterritory.allterritory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserSuccess: (limit, page) =>
      dispatch(getAllUserSuccess(limit, page)),
    AllUserEdit: (id, users, edited) =>
      dispatch(AllUserEdit(id, users, edited)),
    editUserTerritory: (id, users, edited) =>
      dispatch(editUserTerritory(id, users, edited)),

    AllUserDelete: (id, users) => dispatch(AllUserDelete(id, users)),
    UserCreate: (formData) => dispatch(UserCreate(formData)),
    getAllSubRegionSuccess: (limit, page) =>
      dispatch(getAllSubRegionSuccess(limit, page)),
    getAllRegionSuccess: (l, p) => dispatch(getAllRegionSuccess(l, p)),
    getAllTerritorySuccess: (limit, page) =>
      dispatch(getAllTerritorySuccess(limit, page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(UserManagment));
