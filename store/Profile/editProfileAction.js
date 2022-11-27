import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./editProfileActionTypes";


export const editProfilePending = () => {
  return {
    type: actionTypes.EDIT_PROFILE_PENDING,
    isPending: true,
  };
};

export const editProfileSuccess = () => {
  return {
    type: actionTypes.EDIT_PROFILE_SUCCESS,
    isPending: false,
  };
};

export const editProfileFail = (error) => {
  return {
    type: actionTypes.EDIT_PROFILE_FAILED,
    error: error,
    isPending: false,
  };
};

export const editProfileAction = (values) => {
  var token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(editProfilePending());
    axios({
      method: "Patch",
      url: URLst + `api/v1/users/updateMe`,
      data: {
        name: values.name,
        username: values.username,
        email: values.email,
        password: value.password,
        url: values.url,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(authSuccess(token, res.data.data));

        dispatch(editProfileSuccess());
      })
      .catch((err) => 
    
      {
        if (err.response.data.code == 401) {
          handle401();
        }
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(editProfileFail(errorData));
      });
  };
};