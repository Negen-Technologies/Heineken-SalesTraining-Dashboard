import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./allUsersActionTypes";

export const alluserPending = () => {
  return {
    type: actionTypes.ALL_USER_PENDING,
    isPending: true,
  };
};
export const alluserSuccess = (data) => {
  return {
    type: actionTypes.ALL_USER_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const userCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data,
  };
};

export const updateUserSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deleteUserSuccess = (data) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const alluserFail = (error) => {
  return {
    type: actionTypes.ALL_USER_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllUserSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alluserPending());

    axios({
      method: "get",
      url: URLst + `v1/users?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(alluserSuccess(res.data));
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
        dispatch(alluserFail(errorData));
      });
  };
};

export const UserCreate = (formData) => {
  return (dispatch) => {
    dispatch(alluserPending());
    const token = localStorage.getItem("token");
    axios
      .post(URLst + "v1/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(userCreateSuccess(res.data));
      })
      .catch((err) => {
        if (err.response.data.code == 401) {
          handle401();
        }

        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        console.log(errorData);
        dispatch(alluserFail(errorData));
      });
  };
};

export const AllUserEdit = (id, users, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(alluserPending());
    delete edited.role;
    delete edited.username;

    axios({
      method: "patch",
      url: URLst + `v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        let newData = [...users];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index] = res.data;

        dispatch(updateUserSuccess(newData));
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
        dispatch(alluserFail(errorData));
      });
  };
};

export const AllUserDelete = (id, users) => {
  var filtereddata = users.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alluserPending());

    axios({
      method: "delete",
      url: URLst + `v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deleteUserSuccess(filtereddata));
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
        dispatch(alluserFail(errorData));
      });
  };
};


export const editUserTerritory = (id, users, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(alluserPending());
    

    axios({
      method: "patch",
      url: URLst + `v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        let newData = [...users];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index] = res.data;

        dispatch(updateUserSuccess(newData));
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
        dispatch(alluserFail(errorData));
      });
  };
};