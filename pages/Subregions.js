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
  Menu
} from "antd";
import { DownOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import {
getAllSubRegionSuccess,
subregionCreate,
AllSubRegionEdit,
AllSubRegionDelete,
getAllRegionSuccess
} from "../store";
import withAuth from "../utils/protectRoute";
import URLst, { primary_color } from "../utils/constants";
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
    dataIndex === "role" ? (
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

const SubRegions = (props) => {
  const [form] = Form.useForm();
  
  var numEachPage = 10;
  var data = [];
  const [isVisible, setVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [loadedpage, setLoadedPage] = useState([1]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedRegionName, setSelectedRegionName] = useState('');


  props.subregions.forEach((element) => {
    data.push({ ...element, key: element.id });
  });
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    props.getAllSubRegionSuccess(numEachPage, 1);
    props.getAllRegionSuccess()
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

    props.AllSubRegionEdit(key, props.subregions, row);
  };

  //*********** Deleting function ***********//
  const handleDelete = (key) => {
    props.AllSubRegionDelete(key, props.subregions);
  };

  const handleChange = (pageNumber, size) => {
    numEachPage = size;
    setCurrent(pageNumber);
    props.getAllSubRegionSuccess(numEachPage, pageNumber);
    setLoadedPage([...loadedpage, pageNumber]);
  };

  const handleMenuClick = (id) => {
      console.log(id)
    setSelectedRegion(id.key)
    setSelectedRegionName(id.name)
  }

  const handleSelectChange = (value) => {
      setSelectedRegion(value)
      setSelectedRegionName(value)
  }

  const menus = Object.entries(props.regions).map((key) => {
    return (
      <Menu.Item key={key[1].id}>
        {key[1].name}
      </Menu.Item>
    )
  });
 const menu = () => {
    return (
      <Menu onClick={handleMenuClick}>
        {menus}
      </Menu>
    )
 }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true
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
            All Subregions
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
              loading={props.subregionsPending}
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
            Add Subregion
          </Button>
        </Col>
      </Row>

      <Modal
        title="Subregion"
        visible={isVisible}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setVisible(false);
        }}
      >

<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    
        
          <Form
          form={form}
          onFinish={(doc) => {
            props.subregionCreate(doc);
          }}
        >
            <Form.Item name="regions" label="Regions">
                <Select
                  name="regions"
                  style={{ width: "100%" }}
                  value={selectedRegionName}
                  onChange={handleSelectChange}
                  placeholder='Select Region'
                  options= {props.regions.map((region) => {
                    return (
                        {
                            value: region.id,
                            label:region.name
                        }
                    );
                  })}
                >
                </Select>
              </Form.Item>
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red" }}>{props.subregionsError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.subregionsPending}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
              </Space>
          
       
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subregions: state.allsubregions.allsubregions,
    count: state.allsubregions.count,
    subregionsPending: state.allsubregions.loading,
    subregionsError: state.allsubregions.error,
    regions: state.allregions.allregions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSubRegionSuccess: (limit, page) =>
    dispatch(getAllSubRegionSuccess(limit, page)),
    getAllRegionSuccess: () =>
    dispatch(getAllRegionSuccess()),
    AllSubRegionEdit: (id, subregions, edited) =>
    dispatch(AllSubRegionEdit(id, subregions, edited)),
    AllSubRegionDelete: (id, subregions) => dispatch(AllSubRegionDelete(id, subregions)),
    subregionCreate: (formData) => dispatch(subregionCreate(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(SubRegions));