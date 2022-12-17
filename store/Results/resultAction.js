import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./resultActionTypes";

export const allresultPending = () => {
  return {
    type: actionTypes.RESULT_PENDING,
    isPending: true,
  };
};
export const allresultSuccess = (data) => {
  return {
    type: actionTypes.RESULT_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const allresultFail = (error) => {
  return {
    type: actionTypes.RESULT_FAILED,
    error: error,
    isPending: false,
  };
};

export const getTraineeResultSuccess = (lesson, trainee) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allresultPending());

    axios({
      method: "get",
      url: URLst + `v1/results?lesson=${lesson}&trainee=${trainee}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allresultSuccess(res.data));
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
        dispatch(allresultFail(errorData));
      });
  };
};
