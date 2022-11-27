import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./EditProfileActionTypes";



export const allprofilePending = () => {
  return {
    type: actionTypes.ALL_PROFILE_PENDING,
    isPending: true,
  };
};
export const allprofileSuccess = (data) => {
  console.log('in action: ', data)
  return {
    type: actionTypes.ALL_PROFILE_SUCCESS,
    isPending: false,
    data: data,
    count: data.totalResults,
  };
};


export const updateProfileSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deleteProfileSuccess = (data) => {
  return {
    type: actionTypes.DELETE_PROFILE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const allprofileFail = (error) => {
  return {
    type: actionTypes.ALL_PROFILE_FAILED,
    error: error,
    isPending: false,
  };
};

export const getProfileSuccess = () => {
  var token = localStorage.getItem("token");
  var id = localStorage.getItem("id");

  return (dispatch) => {
    dispatch(allprofilePending());

    axios({
      method: "get",
      url: URLst + `v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allprofileSuccess(res.data));
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
        dispatch(allprofileFail(errorData));
      });
  };
};

export const editProfileAction = (profile, edited) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
console.log(edited)
  return (dispatch, getState) => {
    dispatch(allprofilePending());
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
        console.log('EDITED PRO: ', res)
        // let newData = [...profile];
        // let index = newData.findIndex((av) => av.id === res.data.id);

        // newData[index] = res.data;

        dispatch(updateProfileSuccess(res.data));
      })
      .catch((err) => {
        var errorData;
        console.log('in edit profile action error: ',err.response)
        if (err.response.data.code == 401) {
          handle401();
        }
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        console.log(errorData);
        dispatch(allprofileFail(errorData));
      });
  };
};

