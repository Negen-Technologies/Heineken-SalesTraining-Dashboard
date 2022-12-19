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
  Popconfirm,
  Upload,
  Space,
  Select,
  Tag,
} from "antd";
import {
  UserOutlined,
  StarFilled,
  SearchOutlined,
  UploadOutlined,
  DeleteOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import Papa from "papaparse";
import { connect } from "react-redux";
import {
  getAllTraineeSuccess,
  AllTraineeEdit,
  AllTraineeDelete,
  traineeCreate,
  getAllTerritorySuccess,
  getAllSubRegionSuccess,
  getAllRegionSuccess,
  traineeBulkCreate,
  getAllTraineePerTerritory,
  ActivateTrainee,
} from "./../store";
import withAuth from "./../utils/protectRoute";
import URLst, { primary_color, exportToExcel } from "./../utils/constants";
import ActionsTab from "./../Components/SupplimentaryComponents/actionsTab";
import OverviewTab from "./../Components/SupplimentaryComponents/overviewTab";
import { useRouter } from "next/router";

function Trainees(props) {
  var numEachPage = 10;

  const role = localStorage.getItem("role");

  const [visible, setvisible] = useState(false);
  const [tervisible, settervisible] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubRegion, setSelectedSubRegion] = useState("");
  const [selectedTerritory, setselectedTerritory] = useState("");
  const [current, setCurrent] = useState(1);

  const [File, setFile] = useState(null);
  const [FileList, setFileList] = useState([]);

  const router = useRouter();

  const data = [];

  props.trainees.forEach((element) => {
    data.push({ ...element, key: element._id });
  });

  useEffect(() => {
    if (localStorage.getItem("role") === "staff") {
      props.getAllTraineePerTerritory(10, 1);
    } else {
      props.getAllTraineeSuccess(10, 1);
    }
    props.getAllTerritorySuccess(10, 1);
    props.getAllSubRegionSuccess(10, 1);
    props.getAllRegionSuccess(10, 1);
  }, []);

  const handleChange = (pageNumber, size) => {
    numEachPage = size;
    setCurrent(pageNumber);
    props.getAllTraineeSuccess(numEachPage, pageNumber);
  };

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
      title: "Badges",
      dataIndex: "age",
      key: "age",
      render: (_, record) => (
        <Row>
          {" "}
          {/* <div style={{ color: "red" }}>
            <StarFilled />
          </div> */}
          <Button
            type="link"
            style={{ padding: "0px 10px", color: primary_color }}
            onClick={() => {
              router.push(`Trainees/badge-detail?id=${record._id}`);
            }}
          >
            {record.badges.length} Badges
          </Button>
        </Row>
      ),
    },
    {
      title: "Progress",
      dataIndex: "percent",
      key: "percent",
      render: (_, record) => (
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
                percent={record.progress}
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
      title: "Territory",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <div>
          {" "}
          {record.territories.length == 0 ? (
            <Tag
              color="processing"
              onClick={() => {
                settervisible(true);
                setEditingId(record._id);
              }}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Add to territory
            </Tag>
          ) : (
            <>
              {record.territories.map((e) => {
                return e.name;
              })}
            </>
          )}
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <Space>
          {record.active ? (
            <Popconfirm
              title={"Are you sure you want to deactivate this trainee?"}
              onConfirm={() => {
                props.AllTraineeDelete(record._id, data);
              }}
            >
              {" "}
              {/* <p style={{ color: "red", margin: "0px 2px", cursor: "pointer" }}>
                Deactivate
              </p> */}
              <Tag color="volcano" style={{ cursor: "pointer" }}>
                Deactivate
              </Tag>
            </Popconfirm>
          ) : (
            <Popconfirm
              title={"Are you sure you want to activate this trainee?"}
              onConfirm={() => {
                props.ActivateTrainee(record._id, data, {
                  active: true,
                });
              }}
            >
              {" "}
              <Tag color="success" style={{ cursor: "pointer" }}>
                Activate
              </Tag>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col
          span={18}
          xs={24}
          sm={24}
          md={24}
          lg={18}
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
              {localStorage.getItem("role") === "staff" ? (
                <>Trainees under my territory</>
              ) : (
                <>All Trainees</>
              )}
            </h1>
            {/* <Input
              placeholder="Name"
              suffix={<SearchOutlined />}
              style={{
                width: "150px",
                height: "30px",

                borderRadius: 22,
                margin: "0px 10px",
              }}
            /> */}
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
        </Col>

        <Col span={6} xs={24} sm={24} md={6} lg={6}>
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
          {role === "staff" ? (
            <></>
          ) : (
            <>
              <Button
                style={{ width: "202px", margin: "10px 0px" }}
                type="primary"
                onClick={() => {
                  router.push("/Trainees/add-new");
                }}
              >
                Add Trainee
              </Button>

              <Button
                style={{ width: "202px", margin: "10px 0px" }}
                type="primary"
                onClick={() => {
                  setvisible(true);
                }}
              >
                Bulk Add Trainees
              </Button>

              <Button
                style={{ width: "202px", margin: "5px 0px" }}
                type="primary"
                onClick={() => {
                  let newdata = [];
                  data.forEach((e) => {
                    delete e.currentCourse;
                    delete e.currentLesson;
                    delete e.currentModule;
                    delete e.createdAt;
                    delete e.hasChangedPassword;
                    delete e.updatedAt;
                    delete e.avatar;
                    delete e.key;
                    delete e._id;
                    delete e.__v;

                    let terr =
                      e.territories.length === 0 ? "" : e.territories[0].name;
                    let name = e.user.name;
                    let username = e.user.username;
                    let email = e.user.email;

                    delete e.user;

                    newdata.push({
                      name: name,
                      username: username,
                      email: email,
                      ...e,
                      badges: e.badges.length,
                      territories: terr,
                    });
                  });

                  exportToExcel(newdata, "Trainees");
                }}
              >
                Export Table
              </Button>
            </>
          )}
        </Col>
      </Row>

      <Modal
        title="Bulk Add Trainees"
        visible={visible}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setvisible(false);
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
                console.log({ data: results.data });

                props.traineeBulkCreate({ data: results.data });
              },
            });
          }}
        >
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
              loading={props.traineesPending}
            >
              Add Trainees
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
          setEditingId("");
        }}
      >
        <Form
          onFinish={(e) => {
            console.log(selectedTerritory);
            props.AllTraineeEdit(editingId, data, {
              territories: [selectedTerritory],
            });
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
                  value: regions.name,
                  label: regions.name,
                };
              })}
            />
          </Form.Item>
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
                .filter((e) => e.regionId.name === selectedRegion)
                .map((subregion) => {
                  return {
                    value: subregion.name,
                    label: subregion.name,
                  };
                })}
            />
          </Form.Item>

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
                .filter((e) => e.subregionId.name === selectedSubRegion)
                .map((territory) => {
                  return {
                    value: territory.id,
                    label: territory.name,
                  };
                })}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{ borderRadius: 5 }}
              loading={props.traineesPending}
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
}
const mapStateToProps = (state) => {
  return {
    trainees: state.alltrainees.alltrainees,
    count: state.alltrainees.count,
    traineesPending: state.alltrainees.loading,
    traineesError: state.alltrainees.error,
    subregions: state.allsubregions.allsubregions,
    regions: state.allregions.allregions,
    territory: state.allterritory.allterritory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSubRegionSuccess: (limit, page) =>
      dispatch(getAllSubRegionSuccess(limit, page)),
    getAllRegionSuccess: (l, p) => dispatch(getAllRegionSuccess(l, p)),
    getAllTerritorySuccess: (limit, page) =>
      dispatch(getAllTerritorySuccess(limit, page)),

    getAllTraineeSuccess: (limit, page) =>
      dispatch(getAllTraineeSuccess(limit, page)),
    getAllTraineePerTerritory: (limit, page) =>
      dispatch(getAllTraineePerTerritory(limit, page)),
    AllTraineeEdit: (id, trainees, edited) =>
      dispatch(AllTraineeEdit(id, trainees, edited)),
    ActivateTrainee: (id, trainees, edited) =>
      dispatch(ActivateTrainee(id, trainees, edited)),

    AllTraineeDelete: (id, trainees) =>
      dispatch(AllTraineeDelete(id, trainees)),
    traineeBulkCreate: (formData) => dispatch(traineeBulkCreate(formData)),
    traineeCreate: (formData) => dispatch(traineeCreate(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Trainees));

// export default withAuth(Trainees);
