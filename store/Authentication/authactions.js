import axios from "axios";
import * as actionTypes from "./authactionTypes";
import URLst from "../../utils/constants";
// import { loadingTrue } from "../Loading/loadingAction";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, data) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("name", data.name);
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);
  localStorage.setItem("id", data.id);

  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    data: data,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authLogin = (value) => {
  return (dispatch) => {
    dispatch(authStart());

    axios
      .post(URLst + "v1/auth/login", {
        username: value.username,
        password: value.password,
      })
      .then((res) => {
        // console.log(res.data);
        const token = res.data.tokens.access.token;
        const data = res.data.user;
        // dispatch(loadingTrue);
        dispatch(authSuccess(token, data));
      })
      .catch((err) => {
        var errorData;
        if (err.response != null) {
          errorData = err.response.data.message;
        } else {
          errorData = err.message;
        }
        dispatch(authFail(errorData));
      });
  };
};
