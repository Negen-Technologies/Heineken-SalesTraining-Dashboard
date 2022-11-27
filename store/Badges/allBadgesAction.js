/** @format */

import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./allBadgesActionTypes";

export const allbadgePending = () => {
  return {
    type: actionTypes.ALL_BADGE_PENDING,
    isPending: true,
  };
};
export const allbadgeSuccess = (data) => {
  return {
    type: actionTypes.ALL_BADGE_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const badgeCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_BADGE_SUCCESS,
    data: data,
  };
};

export const updatebadgeSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_BADGE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deletebadgeSuccess = (data) => {
  return {
    type: actionTypes.DELETE_BADGE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const allbadgeFail = (error) => {
  return {
    type: actionTypes.ALL_BADGE_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllBadgeSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allbadgePending());

    axios({
      method: "get",
      url: URLst + `v1/badges?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allbadgeSuccess(res.data));
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
        dispatch(allbadgeFail(errorData));
      });
  };
};

export const badgeCreate = (formData) => {
  return (dispatch) => {
    dispatch(allbadgePending());
    const token = localStorage.getItem("token");
    axios
      .post(URLst + "v1/badges", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(badgeCreateSuccess(res.data));
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
        dispatch(allbadgeFail(errorData));
      });
  };
};

export const AllBadgeEdit = (id, badges, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(allbadgePending());

    axios({
      method: "patch",
      url: URLst + `v1/badges/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        let newData = [...badges];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index] = res.data;

        dispatch(updatebadgeSuccess(newData));
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
        dispatch(allbadgeFail(errorData));
      });
  };
};

export const AllBadgeDelete = (id, badges) => {
  var filtereddata = badges.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allbadgePending());

    axios({
      method: "delete",
      url: URLst + `v1/badges/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deletebadgeSuccess(filtereddata));
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
        dispatch(allbadgeFail(errorData));
      });
  };
};
