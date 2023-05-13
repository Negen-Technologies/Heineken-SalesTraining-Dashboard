import axios from "axios";
import * as actionTypes from "./avatar_actionTypes";
import URLst, { handle401 } from "../../utils/constants";

// import handle401 from "../../utils/constants"

export const avatarStart = () => {
  return {
    type: actionTypes.AVATAR_START,
  };
};

export const avatarCreateSuccess = (data) => {
  return {
    type: actionTypes.AVATAR_CREATE_SUCCESS,
    data: data,
  };
};

export const avatarGetSuccess = (data) => {
  return {
    type: actionTypes.AVATAR_GET_SUCCESS,
    data: data,
  };
};

export const avatarEditSuccess = (data) => {
  return {
    type: actionTypes.AVATAR_EDIT_SUCCESS,
    data: data,
  };
};

export const avatarDeleteSuccess = (data) => {
  return {
    type: actionTypes.AVATAR_DELETE_SUCCESS,
    data: data,
  };
};
// AVATAR_DELETE_SUCCESS
export const avatarFail = (error) => {
  return {
    type: actionTypes.AVATAR_FAIL,
    error: error,
  };
};

export const avatarEdit = (formData, id) => {
  const token = localStorage.getItem("token");
  return (dispatch, getState) => {
    const { data } = getState().avatar_reducer;

    dispatch(avatarStart());

    axios
      .patch(URLst + `v1/avatars/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let newData = [...data];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index] = res.data;

        dispatch(avatarEditSuccess(newData));
      })
      .catch((err) => {
        if (err.response.data.code == 401) {
          handle401();
        }
        let errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(avatarFail(errorData));
      });
  };
};

export const avatarCreate = (formData) => {
  return (dispatch) => {
    dispatch(avatarStart());
    const token = localStorage.getItem("token");
    axios
      .post(URLst + "v1/avatars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(avatarCreateSuccess(res.data));
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
        dispatch(avatarFail(errorData));
      });
  };
};




export const avatarGet = () => {
  return (dispatch) => {
    dispatch(avatarStart());
    const token = localStorage.getItem("token");
    axios
      .get(URLst + "v1/avatars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(avatarGetSuccess(res.data.results));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(avatarFail(errorData));
      });
  };
};



export const avatarDelete = (id, users) => {
  var filtereddata = users.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(avatarStart());

    axios({
      method: "delete",
      url: URLst + `v1/avatars/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(avatarDeleteSuccess(filtereddata));
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
        dispatch(avatarFail(errorData));
      });
  };
};
