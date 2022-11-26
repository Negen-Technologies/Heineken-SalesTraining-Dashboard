import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./quizActionTypes";


export const allquizPending = () => {
  return {
    type: actionTypes.QUIZ_PENDING,
    isPending: true,
  };
};
export const allquizSuccess = (data) => {
  return {
    type: actionTypes.QUIZ_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const quizCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_QUIZ_SUCCESS,
    data: data,
  };
};

export const updatequizSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_QUIZ_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deletequizSuccess = (data) => {
  return {
    type: actionTypes.DELETE_QUIZ_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const allquizFail = (error) => {
  return {
    type: actionTypes.QUIZ_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllQuizSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allquizPending());

    axios({
      method: "get",
      url: URLst + `v1/questions?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allquizSuccess(res.data));
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
        dispatch(allquizFail(errorData));
      });
  };
};

export const quizCreate = ( formData) => {
  console.log(formData);
  return (dispatch) => {
    dispatch(allquizPending());
    const token = localStorage.getItem("token");
    axios
      .post(
        URLst + "v1/questions",
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        dispatch(quizCreateSuccess(res.data));
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
        dispatch(allquizFail(errorData));
      });
  };
};

export const AllQuizEdit = (id, quizs, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(allquizPending());

    axios({
      method: "patch",
      url: URLst + `v1/questions/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        console.log(res.data);
        let newData = [...quizs];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index].summary = edited.summary;
        newData[index].title = edited.title;
        newData[index].video_source = edited.video_source;
        newData[index].order = edited.order;

        dispatch(updatequizSuccess(newData));
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
        dispatch(allquizFail(errorData));
      });
  };
};

export const AllQuizDelete = (id, quizs) => {
  var filtereddata = quizs.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allquizPending());

    axios({
      method: "delete",
      url: URLst + `v1/questions/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deletequizSuccess(filtereddata));
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
        dispatch(allquizFail(errorData));
      });
  };
};
