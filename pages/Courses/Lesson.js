import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Space,
  InputNumber,
  Divider,
  Empty,
  Modal,
  Form,
  Input,
  Popconfirm,
} from "antd";
import {
  PlayCircleFilled,
  DeleteFilled,
  QuestionCircleFilled,
  LeftCircleFilled,
  EditFilled,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getAllLessonSuccess,
  AllLessonEdit,
  AllLessonDelete,
  lessonCreate,
} from "../../store";
import withAuth from "../../utils/protectRoute";
import URLst, { primary_color } from "../../utils/constants";
import YoutubeEmbed from "../../Components/YoutubeEmbed/YoutubeEmbed";
import ActionsTab from "../../Components/SupplimentaryComponents/actionsTab";
import OverviewTab from "../../Components/SupplimentaryComponents/overviewTab";
import { useRouter } from "next/router";

function Lesson(props) {
  const [form] = Form.useForm();
  const [videovisible, setvideovisible] = useState(false);
  const [videosource, setvideosource] = useState("");
  const [routervals, setroutervals] = useState({ id: "", element: [] });
  const role = localStorage.getItem("role");

  const [data, setdata] = useState([]);
  const [visible, setvisible] = useState(false);
  const [isediting, setisediting] = useState(false);
  const [editingkey, seteditingkey] = useState("");
  const router = useRouter();
  let smpdata = [];
  let lessonId = [];

  useEffect(() => {
    const { id, element } = router.query;
    console.log(element);
    setroutervals({ id: id, element: JSON.parse(element) });
    props.getAllLessonSuccess(10, 1);
  }, []);

  useEffect(() => {
    if (data.length == 0) {
      props.lessons.forEach((element) => {
        if (routervals.element.includes(element.id)) {
          smpdata.push({ ...element, key: element.id });
        }
      });
      setdata(smpdata);
      smpdata = [];
    } else {
      let ddata = [];
      ddata = routervals.element;
      ddata.push(props.lessons[props.lessons.length - 1].id);
      setroutervals({
        ...routervals,
        element: ddata,
      });

      props.lessons.forEach((element) => {
        if (routervals.element.includes(element.id)) {
          smpdata.push({ ...element, key: element.id });
        }
      });

      setdata(smpdata);
      smpdata = [];
    }
  }, [props.lessons]);

  const editor = (e) => {
    setisediting(true);
    seteditingkey(e.id);
    form.setFieldsValue({
      title: e.title,
      summary: e.summary,
      video_source: e.video_source,
      order: e.order,
    });
    setvisible(true);
  };
  return props.lessonsPending && data.length == 0 ? (
    <div
      style={{
        height: "100vh",
        width: "100 vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div>
        <LoadingOutlined style={{ fontSize: 80 }} />
      </div>
    </div>
  ) : (
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
          <OverviewTab
            title={"Overview"}
            backButton={true}
            onbuttonclick={() => {
              router.back();
            }}
          />
          {data.length == 0 ? (
            <div
              style={{
                height: "50vh",
                width: "100 vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Empty description="No Lessons" />
            </div>
          ) : props.lessonsPending ? (
            <div
              style={{
                height: "50vh",
                width: "100 vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingOutlined style={{ fontSize: 80 }} />
            </div>
          ) : (
            <div style={{ overflow: "auto" }}>
              {data
                .sort((a, b) => a.order - b.order)
                .map((e) => {
                  return (
                    <Row
                      key={e.id}
                      style={{ margin: "15px 0px" }}
                      // gutter={[1, { xs: 8, sm: 16, md: 24, lg: 24,xl:24 ,span:24}]}
                    >
                      <Col span={10} xl={10} lg={24} md={24} xs={24} sm={24}>
                        <img
                          src={`http://img.youtube.com/vi/${
                            e.video_source.split("watch?v=")[1]
                          }/hqdefault.jpg`}
                          height={200}
                          width={"auto"}
                        />
                      </Col>
                      <Col
                        span={9}
                        xl={9}
                        lg={24}
                        md={24}
                        xs={24}
                        sm={24}
                        style={{ margin: "5px 0px" }}
                      >
                        <h1>{e.title}</h1>
                        {/* <br /> */}
                        <p>{e.summary}</p>
                        <Row justify="space-between">
                          <Button
                            type="text"
                            onClick={() => {
                              setvideosource(e.video_source);
                              setvideovisible(true);
                            }}
                          >
                            <Space style={{ color: "green" }}>
                              <PlayCircleFilled />
                              <div>Play</div>
                            </Space>
                          </Button>
                          <Button
                            type="text"
                            onClick={() => {
                              router.push(`Lesson/quiz?id=${e.id}`);
                            }}
                          >
                            <Space style={{ color: "green" }}>
                              <QuestionCircleFilled />
                              <div>Quizes</div>
                            </Space>
                          </Button>

                          {role === "staff" ? (
                            <></>
                          ) : (
                            <Button
                              type="text"
                              onClick={() => {
                                editor(e);
                              }}
                            >
                              <Space style={{ color: "blue" }}>
                                <EditFilled />
                                <div>Edit</div>
                              </Space>
                            </Button>
                          )}
                          {role === "staff" ? (
                            <></>
                          ) : (
                            <Popconfirm
                              title={
                                "Are you sure you want to delete this Lesson?"
                              }
                              onConfirm={() => {
                                props.AllLessonDelete(e.id, data);
                              }}
                            >
                              <Button type="text">
                                <Space style={{ color: "red" }}>
                                  <DeleteFilled />
                                  <div>Delete</div>
                                </Space>
                              </Button>
                            </Popconfirm>
                          )}
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
            </div>
          )}
        </Col>
        <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <ActionsTab />
          {role === "staff" ? (
            <></>
          ) : (
            <Button
              style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
              type="primary"
              onClick={() => {
                setvisible(true);
              }}
            >
              Lesson Builder
            </Button>
          )}
        </Col>
      </Row>
      <Modal
        title="Lesson"
        width={"50vw"}
        destroyOnClose={true}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        visible={videovisible}
        onCancel={() => {
          setvideovisible(false);
          setvideosource("");
        }}
      >
        <YoutubeEmbed src={videosource.replace("watch?v=", "embed/")} />
      </Modal>
      <Modal
        title={isediting ? "Edit Lessons" : "Add Lessons"}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        visible={visible}
        onCancel={() => {
          setvisible(false);
          setisediting(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          onFinish={(e) => {
            console.log(e);
            if (isediting) {
              props.AllLessonEdit(editingkey, data, e);
            } else {
              data.forEach((element) => {
                lessonId.push(element.id);
              });
              props.lessonCreate(routervals.id, e, lessonId);
            }
          }}
        >
          <Form.Item name="title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="summary">
            <Input.TextArea placeholder="Summary" />
          </Form.Item>
          <Form.Item name="video_source">
            <Input placeholder="Video Link" />
          </Form.Item>
          <Form.Item name="order">
            <InputNumber placeholder="Order" />
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red" }}>{props.lessonsError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.lessonsPending}
            >
              {isediting ? "Edit Lesson" : "Add Lesson"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lessons: state.alllessons.alllessons,
    count: state.alllessons.count,
    lessonsPending: state.alllessons.loading,
    lessonsError: state.alllessons.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLessonSuccess: (limit, page) =>
      dispatch(getAllLessonSuccess(limit, page)),
    AllLessonEdit: (id, lessons, edited) =>
      dispatch(AllLessonEdit(id, lessons, edited)),
    AllLessonDelete: (id, lessons) => dispatch(AllLessonDelete(id, lessons)),
    lessonCreate: (id, formData, lessonId) =>
      dispatch(lessonCreate(id, formData, lessonId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Lesson));
