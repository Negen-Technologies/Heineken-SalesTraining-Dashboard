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
  Tag,
} from "antd";
import { connect } from "react-redux";
import {
  getAllRegionSuccess,
  regionCreate,
  AllRegionEdit,
  AllRegionDelete,
} from "../store";
import withAuth from "../utils/protectRoute";
import URLst, { primary_color } from "../utils/constants";

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
    dataIndex === "role" ? <Input disabled={true} /> : <Input />;

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

const Regions = (props) => {
  const [form] = Form.useForm();
  const role = localStorage.getItem("role");

  var numEachPage = 10;
  var data = [];
  const [isVisible, setVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [loadedpage, setLoadedPage] = useState([1]);
  props.regions.forEach((element) => {
    data.push({ ...element, key: element.id });
  });
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    props.getAllRegionSuccess(numEachPage, 1);
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

    props.AllRegionEdit(key, props.regions, row);
  };

  //*********** Deleting function ***********//
  const handleDelete = (key) => {
    props.AllRegionDelete(key, props.regions);
  };

  const handleChange = (pageNumber, size) => {
    numEachPage = size;
    setCurrent(pageNumber);
    props.getAllRegionSuccess(numEachPage, pageNumber);
    setLoadedPage([...loadedpage, pageNumber]);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
        ) : role == "staff" ? (
          <></>
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
      render: (_, record) =>
        role == "staff" ? (
          <></>
        ) : (
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
        inputType: "text",
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
            All Regions
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
              loading={props.regionsPending}
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
          {role == "staff" ? (
            <></>
          ) : (
            <Button
              style={{ width: "202px", margin: "20px 0px" }}
              type="primary"
              onClick={() => {
                form.resetFields();

                setVisible(true);
              }}
            >
              Add Region
            </Button>
          )}
        </Col>
      </Row>

      <Modal
        title="Region"
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
            props.regionCreate(doc);
          }}
        >
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item>
            <p style={{ color: "red" }}>{props.regionsError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.regionsPending}
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
    regions: state.allregions.allregions,
    count: state.allregions.count,
    regionsPending: state.allregions.loading,
    regionsError: state.allregions.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRegionSuccess: (limit, page) =>
      dispatch(getAllRegionSuccess(limit, page)),
    AllRegionEdit: (id, regions, edited) =>
      dispatch(AllRegionEdit(id, regions, edited)),
    AllRegionDelete: (id, regions) => dispatch(AllRegionDelete(id, regions)),
    regionCreate: (formData) => dispatch(regionCreate(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Regions));
