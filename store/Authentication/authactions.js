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
export const forgotSuccess = (mes) => {
  return {
    type: actionTypes.FORGOT_SUCCESS,
    mes: mes,
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

export const forgotPassword = (value) => {
  return (dispatch) => {
    dispatch(authStart());

    axios
      .post(URLst + "v1/auth/forgot-password", {
        email: value.email,
      })
      .then((res) => {
        console.log(res);
        
        // dispatch(loadingTrue);
        dispatch(
          forgotSuccess(
            "A link to reset your password has been sent via your email."
          )
        );
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


export const resetPassword = (value) => {
  return (dispatch) => {
    dispatch(authStart());

    axios
      .post(URLst + `v1/auth/reset-password?token=${value.token}`, {
        password: value.password,
      })
      .then((res) => {
        console.log(res);
        
        dispatch(
          forgotSuccess(
            "Your password has been successfully reset. Please login to continue."
          )
        );
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
