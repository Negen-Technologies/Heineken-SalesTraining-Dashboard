import { connect } from "react-redux";
import { messageNull, successMessage } from "../../store/index";
import Router from "next/router";

import { notification, message } from "antd";

function Message(props) {
  // const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    notification.success({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };
  // ? notification.success({
  //     message: "Notification Title",
  //     description:
  //       "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  //     style: { backgroundColor: "#198754" },
  //   })
  console.log(props.visible ? "VISIBLE" : "NOT VISIBLE");
  return (
    <>
      <div>
        {props.visible
          ? notification.success({
              message: "Action Successful",

              // style: { backgroundColor: "#198754", color:'white' },
              placement: "topLeft",
            })
          : // message.success({
            //   content:"Successfully created",
            //   style:{
            //     marginTop: '5vh'
            //   }
            // })

            ""}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    visible: state.messageReducer.msgVisible,
    msg: state.messageReducer.msg,
    // message: state.message,
    type: state.messageReducer.msgType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    messageNull: () => dispatch(messageNull()),
    loadingFalse: () => dispatch(loadingFalse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
