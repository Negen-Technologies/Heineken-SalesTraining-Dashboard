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
  Avatar,
  Collapse,
  Card,
  Radio,
} from "antd";
import {
  PlayCircleFilled,
  DeleteFilled,
  LeftCircleFilled,
  EditFilled,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getAllQuizSuccess,
  quizCreate,
  AllQuizEdit,
  AllQuizDelete,
} from "../../../store";
import withAuth from "../../../utils/protectRoute";
import URLst, { primary_color } from "../../../utils/constants";
import ActionsTab from "../../../Components/SupplimentaryComponents/actionsTab";
import OverviewTab from "../../../Components/SupplimentaryComponents/overviewTab";
import { useRouter } from "next/router";
const { Panel } = Collapse;

function Quiz(props) {
  const [form] = Form.useForm();
  const [visible, setvisible] = useState(false);
  const [isediting, setisediting] = useState(false);
  const [editingkey, seteditingkey] = useState("");
  const [choicearr, setchoicearr] = useState([1, 2]);
  const [choicedict, setchoicedict] = useState({});
  const [initalvals, setinitalvals] = useState([]);

  const router = useRouter();
  const data = [];

  const { id } = router.query;

  props.quizs.forEach((element) => {
    data.push({ ...element, key: element.id });
  });
  useEffect(() => {
    props.getAllQuizSuccess(10, 1);
  }, []);

  const editor = (e) => {
    let optionnum = [];

    e.choices.forEach((e, i) => {
      optionnum.push(i + 1);
    });
    setchoicearr(optionnum);
    setinitalvals(e.choices);
    seteditingkey(e.id);
    form.setFieldsValue({
      question: e.question,
      answer: e.answer,
    });
    setisediting(true);
    setvisible(true);
  };
  return props.quizsPending && data.length == 0 ? (
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
              <Empty description="No Questions" />
            </div>
          ) : props.quizsPending ? (
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
            <div
              style={{
                height: "90vh",
                width: "100 vw",
                overflow: "auto",
              }}
            >
              <Card>
                {data.map((e) => {
                  return (
                    <Collapse
                      collapsible="header"
                      // defaultActiveKey="1"
                      style={{ margin: "10px 0px" }}
                    >
                      <Panel
                        header={e.question}
                        style={{ margin: "5px 0px" }}
                        extra={
                          <Row>
                            <Avatar
                              size="small"
                              style={{
                                backgroundColor: primary_color,
                                margin: "0px 2px",
                              }}
                              icon={
                                <EditFilled
                                  onClick={() => {
                                    editor(e);
                                  }}
                                />
                              }
                            />
                            <Avatar
                              size="small"
                              style={{
                                backgroundColor: "red",
                                margin: "0px 2px",
                              }}
                              icon={
                                <DeleteFilled
                                  onClick={() => {
                                    props.AllQuizDelete(e.id, data);
                                  
                                  }}
                                />
                              }
                            />
                          </Row>
                        }
                      >
                        <div>
                          {e.choices.map((ell, i) => {
                            return (
                              <div>
                                <div
                                  style={{
                                    color:
                                      e.answer == i + 1 ? "green" : "black",
                                  }}
                                >
                                  Option {i + 1}: {ell}
                                </div>
                                <hr />
                              </div>
                            );
                          })}
                        </div>
                      </Panel>
                    </Collapse>
                  );
                })}
              </Card>
            </div>
          )}
        </Col>
        <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <ActionsTab />
          <Button
            style={{ width: "202px", margin: "8px 0px", borderRadius: 6 }}
            type="primary"
            onClick={() => {
              setvisible(true);
            }}
          >
            Quiz Builder
          </Button>
        </Col>
      </Row>
      <Modal
        title={isediting ? "Edit quizs" : "Add quizs"}
        closable={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        visible={visible}
        onCancel={() => {
          setvisible(false);
          setchoicearr([1, 2]);
          setisediting(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          onFinish={(e) => {
            const sortable = Object.entries(choicedict)
              .sort(([a], [b]) => a - b)
              .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
            console.log(Object.values(sortable));

            e["choices"] = Object.values(sortable);
            e["lesson"] = id;
            console.log(e);
            if (isediting) {
              props.AllQuizEdit(editingkey, data, e);
            } else {
              props.quizCreate(e);
            }
          }}
        >
          <Form.Item
            name="question"
            rules={[
              {
                required: true,
                message: "Question is required",
              },
            ]}
          >
            <Input placeholder="Question" />
          </Form.Item>
          <Form.Item
            name="answer"
            rules={[
              {
                required: true,
                message: "Choice is required",
              },
            ]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {choicearr.map((el) => {
                  return (
                    <Radio value={el} name={el}>
                      {" "}
                      <Input
                        placeholder={`Choice ${el}`}
                        // initalvals[el - 1]
                        value={`${isediting ? initalvals[el - 1] : ""} `}
                        onBlur={(e) => {
                          let obj = choicedict;
                          obj[el] = e.target.value;
                          setchoicedict(obj);
                        }}
                      />
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Space>
              {" "}
              <Button
                type="dashed"
                onClick={() => {
                  let newdd = [...choicearr];
                  newdd.push(choicearr.length + 1);
                  setchoicearr(newdd);
                }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Button
                type="dashed"
                disabled={choicearr.length < 3}
                onClick={() => {
                  let newd = [...choicearr];
                  newd.pop();
                  setchoicearr(newd);
                }}
                icon={<MinusCircleOutlined />}
              >
                Remove field
              </Button>
            </Space>
          </Form.Item>

          <Form.Item>
            <p style={{ color: "red" }}>{props.quizsError}</p>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.quizsPending}
            >
              {isediting ? "Edit quiz" : "Add quiz"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    quizs: state.allquizs.allquizs,
    count: state.allquizs.count,
    quizsPending: state.allquizs.loading,
    quizsError: state.allquizs.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuizSuccess: (limit, page) =>
      dispatch(getAllQuizSuccess(limit, page)),
    AllQuizEdit: (id, quizs, edited) =>
      dispatch(AllQuizEdit(id, quizs, edited)),
    AllQuizDelete: (id, quizs) => dispatch(AllQuizDelete(id, quizs)),
    quizCreate: (formData) => dispatch(quizCreate(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Quiz));
