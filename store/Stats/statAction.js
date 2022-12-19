import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./statActionTypes";

export const allstatPending = () => {
  return {
    type: actionTypes.STAT_PENDING,
    isPending: true,
  };
};
export const allstatSuccess = (data) => {
  return {
    type: actionTypes.STAT_SUCCESS,
    isPending: false,
    data: data,
    count: data.totalstats,
  };
};

export const allstatFail = (error) => {
  return {
    type: actionTypes.STAT_FAILED,
    error: error,
    isPending: false,
  };
};

export const getStatSuccess = () => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allstatPending());

    axios({
      method: "get",
      url: URLst + `v1/stats/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allstatSuccess(res.data));
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
        dispatch(allstatFail(errorData));
      });
  };
};
