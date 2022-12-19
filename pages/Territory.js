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
  Menu,
  Tag,
  Upload,
} from "antd";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

import { connect } from "react-redux";
import {
  getAllTerritorySuccess,
  territoryCreate,
  AllTerritoryEdit,
  AllTerritoryDelete,
  getAllSubRegionSuccess,
  territoryCreateBulk,
} from "../store";
import withAuth from "../utils/protectRoute";
import URLst, { primary_color, exportToExcel } from "../utils/constants";
import { ContinuousLegend } from "@antv/g2/lib/dependents";

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

const Territory = (props) => {
  const [form] = Form.useForm();
  const role = localStorage.getItem("role");

  var numEachPage = 10;
  var data = [];
  const [isVisible, setVisible] = useState(false);
  const [bulkVisible, setbulkVisible] = useState(false);

  const [File, setFile] = useState(null);
  const [FileList, setFileList] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loadedpage, setLoadedPage] = useState([1]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubRegionName, setSelectedSubRegionName] = useState("");

  props.territory.forEach((element) => {
    data.push({ ...element, key: element.id });
  });
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    props.getAllTerritorySuccess(numEachPage, 1);
    props.getAllSubRegionSuccess(numEachPage, 1);
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

    props.AllTerritoryEdit(key, props.territory, row);
  };

  //*********** Deleting function ***********//
  const handleDelete = (key) => {
    props.AllTerritoryDelete(key, props.territory);
  };

  const handleChange = (pageNumber, size) => {
    numEachPage = size;
    setCurrent(pageNumber);
    props.getAllTerritorySuccess(numEachPage, pageNumber);
    setLoadedPage([...loadedpage, pageNumber]);
  };

  const handleMenuClick = (id) => {
    console.log(id);
    setSelectedRegion(id.key);
    setSelectedSubRegionName(id.name);
  };

  const handleSelectChange = (value) => {
    setSelectedRegion(value);
    setSelectedSubRegionName(value);
  };

  const menus = Object.entries(props.subregions).map((key) => {
    return <Menu.Item key={key[1].id}>{key[1].name}</Menu.Item>;
  });
  const menu = () => {
    return <Menu onClick={handleMenuClick}>{menus}</Menu>;
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
            All Territories
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
              loading={props.territoryPending}
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
            <div>
              {" "}
              <Button
                style={{ width: "202px", margin: "5px 0px" }}
                type="primary"
                onClick={() => {
                  form.resetFields();

                  setVisible(true);
                }}
              >
                Add Territories
              </Button>
              <Button
                style={{ width: "202px", margin: "5px 0px" }}
                type="primary"
                onClick={() => {
                  setbulkVisible(true);
                }}
              >
                Bulk Add Territories
              </Button>
            </div>
          )}
          <Button
            style={{ width: "202px", margin: "5px 0px" }}
            type="primary"
            onClick={() => {
              let newdata = [];
              data.forEach((e) => {
                let Territory = e.name;
                let Subregion = e.subregionId.name;
                let Region = e.subregionId.regionId.name;

                newdata.push({
                  Territory: Territory,
                  Subregion: Subregion,
                  Region: Region,
                });
              });
              exportToExcel(newdata, "Territories");
            }}
          >
            Export Table
          </Button>
        </Col>
      </Row>

      <Modal
        title="Territory"
        visible={isVisible}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Form
            form={form}
            onFinish={(doc) => {
              props.territoryCreate(doc);
            }}
          >
            <Form.Item name="subregions" label="Subregions">
              <Select
                name="subregions"
                style={{ width: "100%" }}
                value={selectedSubRegionName}
                onChange={handleSelectChange}
                placeholder="Select Subregion"
                options={props.subregions.map((subregion) => {
                  return {
                    value: subregion.id,
                    label: subregion.name,
                  };
                })}
              ></Select>
            </Form.Item>
            <Form.Item name="name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item>
              <p style={{ color: "red" }}>{props.territoryError}</p>
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={props.territoryPending}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Modal>

      <Modal
        title="Bulk Add Territories"
        visible={bulkVisible}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setbulkVisible(false);
          setFile(null);
          setFileList([]);
        }}
      >
        <Form
          name="formupload"
          onFinish={(e) => {
            Papa.parse(File, {
              header: true,
              skipEmptyLines: true,
              complete: function (results) {
                
                props.territoryCreateBulk(e.subregions, { data: results.data });
              },
            });
          }}
        >
          <Form.Item name="subregions" label="Subregions">
            <Select
              name="subregions"
              style={{ width: "100%" }}
              value={selectedSubRegionName}
              onChange={handleSelectChange}
              placeholder="Select Subregion"
              options={props.subregions.map((subregion) => {
                return {
                  value: subregion.id,
                  label: subregion.name,
                };
              })}
            ></Select>
          </Form.Item>
          <Form.Item>
            <Upload
              accept=".CSV"
              onRemove={() => {
                setFile(null);
                setFileList([]);
              }}
              fileList={FileList}
              beforeUpload={async (file) => {
                setFile(file);
                setFileList([file]);
              }}
            >
              <Button
                disabled={File == null ? false : true}
                icon={<UploadOutlined />}
              >
                Click to Upload File
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{ borderRadius: 5 }}
              type="primary"
              htmlType="submit"
              loading={props.territoryPending}
            >
              Add Territories
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subregions: state.allsubregions.allsubregions,
    count: state.allterritory.count,
    territoryPending: state.allterritory.loading,
    territoryError: state.allterritory.error,
    territory: state.allterritory.allterritory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSubRegionSuccess: (l, p) => dispatch(getAllSubRegionSuccess(l, p)),
    getAllTerritorySuccess: (limit, page) =>
      dispatch(getAllTerritorySuccess(limit, page)),
    AllTerritoryEdit: (id, territory, edited) =>
      dispatch(AllTerritoryEdit(id, territory, edited)),
    AllTerritoryDelete: (id, territory) =>
      dispatch(AllTerritoryDelete(id, territory)),
    territoryCreate: (formData) => dispatch(territoryCreate(formData)),
    territoryCreateBulk: (id, formData) =>
      dispatch(territoryCreateBulk(id, formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Territory));
