import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./lessonActionTypes";
import { AddLessonToModule } from "../Modules/moduleAction";

export const alllessonPending = () => {
  return {
    type: actionTypes.LESSON_PENDING,
    isPending: true,
  };
};
export const alllessonSuccess = (data) => {
  return {
    type: actionTypes.LESSON_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const lessonCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_LESSON_SUCCESS,
    data: data,
  };
};

export const updatelessonSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_LESSON_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deletelessonSuccess = (data) => {
  return {
    type: actionTypes.DELETE_LESSON_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const alllessonFail = (error) => {
  return {
    type: actionTypes.LESSON_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllLessonSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alllessonPending());

    axios({
      method: "get",
      url: URLst + `v1/lessons?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(alllessonSuccess(res.data));
      })
      .catch((err) => {
        var errorData;
        if (err.response.data.code == 401) {
          handle401();
        }
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        console.log(errorData);
        dispatch(alllessonFail(errorData));
      });
  };
};

export const lessonCreate = (moduleid, formData, lessons) => {
  console.log(formData);
  return (dispatch) => {
    dispatch(alllessonPending());
    const token = localStorage.getItem("token");
    axios
      .post(
        URLst + "v1/lessons",
        formData,
    
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        AddLessonToModule(moduleid, res.data.id, lessons).then((result) => {
          console.log(result);
          if (result == 200) {
            dispatch(lessonCreateSuccess(res.data));
          }
        });
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          if (err.response.data.code == 401) {
            handle401();
          }
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        console.log(errorData);
        dispatch(alllessonFail(errorData));
      });
  };
};

export const AllLessonEdit = (id, lessons, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(alllessonPending());

    axios({
      method: "patch",
      url: URLst + `v1/lessons/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data:edited,
    })
      .then((res) => {
        console.log(res.data)
        let newData = [...lessons];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index].summary = edited.summary;
        newData[index].title = edited.title;
        newData[index].video_source = edited.video_source;
        newData[index].order = edited.order;
        newData[index].active = edited.active;


        dispatch(updatelessonSuccess(newData));
      })
      .catch((err) => {
        var errorData;
        if (err.response.data.code == 401) {
          handle401();
        }
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        console.log(errorData);
        dispatch(alllessonFail(errorData));
      });
  };
};

export const AllLessonDelete = (id, lessons) => {
  // var filtereddata = lessons.filter((item) => item.id !== id);
  let newData = [...lessons];
  let index = newData.findIndex((av) => av.id === id);
  newData[index].active = false;

  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alllessonPending());

    axios({
      method: "delete",
      url: URLst + `v1/lessons/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deletelessonSuccess(newData));
      })
      .catch((err) => {
        var errorData;
        if (err.response.data.code == 401) {
          handle401();
        }
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(alllessonFail(errorData));
      });
  };
};
