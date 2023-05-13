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
  Image,
} from "antd";
import {
  PlayCircleFilled,
  DeleteFilled,
  QuestionCircleFilled,
  LeftCircleFilled,
  EditFilled,
  EyeOutlined,
  LoadingOutlined,
  CheckOutlined,
  CloseCircleOutlined,
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
    if (router.isReady) {
      const { id, element } = router.query;
      console.log(element);
      setroutervals({ id: id, element: JSON.parse(element) });
      props.getAllLessonSuccess(1000, 1);
    }
  }, [router.isReady]);

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
      pdf: e.pdf,
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
                        {e.video_source === undefined ? (
                          <Image
                            width="auto"
                            height={200}
                            src="error"
                            fallback="data:image/png;base64,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"
                          />
                        ) : (
                          <img
                            src={`http://img.youtube.com/vi/${
                              e.video_source.includes("watch?v=")
                                ? e.video_source.split("watch?v=")[1]
                                : e.video_source.split(".be/")[1]
                            }/hqdefault.jpg`}
                            height={200}
                            width={"auto"}
                          />
                        )}
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
                              if (e.video_source === undefined) {
                                window.open(e.pdf)
                              } else {
                                setvideosource(e.video_source);
                                setvideovisible(true);
                              }
                            }}
                          >
                            <Space style={{ color: "green" }}>
                              <PlayCircleFilled />
                              <div>
                                {e.video_source === undefined ? "Open Pdf" : "Play"}
                              </div>
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

                          {role === "staff" || role === "supervisor" ? (
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
                          {role === "staff" || role === "supervisor" ? (
                            <></>
                          ) : (
                            <>
                              {e.active ? (
                                <>
                                  <Popconfirm
                                    title={
                                      "Are you sure you want to deactivate this Lesson?"
                                    }
                                    onConfirm={() => {
                                      props.AllLessonDelete(e.id, data);
                                    }}
                                  >
                                    <Button type="text">
                                      <Space style={{ color: "red" }}>
                                        <CloseCircleOutlined />
                                        <div>Deactivate</div>
                                      </Space>
                                    </Button>
                                  </Popconfirm>
                                </>
                              ) : (
                                <Popconfirm
                                  title={
                                    "Are you sure you want to activate this Lesson?"
                                  }
                                  onConfirm={() => {
                                    let newdic = e;
                                    newdic.active = true;
                                    props.AllLessonEdit(
                                      newdic.id,
                                      data,
                                      newdic
                                    );
                                  }}
                                >
                                  <Button type="text">
                                    <Space style={{ color: "green" }}>
                                      <CheckOutlined />
                                      <div>Activate</div>
                                    </Space>
                                  </Button>
                                </Popconfirm>
                              )}
                            </>
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
          {role === "staff" || role === "supervisor" ? (
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
        {/* e.video_source.includes("watch?v=")?
                            e.video_source.split("watch?v=")[1]:
                            e.video_source.split(".be/")[1] */}
        <YoutubeEmbed
          src={
            videosource.includes("watch?v=")
              ? videosource.replace("watch?v=", "embed/")
              : videosource.replace("youtu.be/", "www.youtube.com/embed/")
          }
        />
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
          <Form.Item name="pdf">
            <Input placeholder="PDF Link" />
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
