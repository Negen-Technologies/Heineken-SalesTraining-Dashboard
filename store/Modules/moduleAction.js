import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./moduleActionTypes";
import { AddModuleToCourse } from "../Courses/courseAction";

export const allmodulePending = () => {
  return {
    type: actionTypes.MODULE_PENDING,
    isPending: true,
  };
};
export const allmoduleSuccess = (data) => {
  return {
    type: actionTypes.MODULE_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const moduleCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_MODULE_SUCCESS,
    data: data,
  };
};

export const updateModuleSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_MODULE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deleteModuleSuccess = (data) => {
  return {
    type: actionTypes.DELETE_MODULE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const allmoduleFail = (error) => {
  return {
    type: actionTypes.MODULE_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllModuleSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allmodulePending());

    axios({
      method: "get",
      url: URLst + `v1/modules?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allmoduleSuccess(res.data));
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
        dispatch(allmoduleFail(errorData));
      });
  };
};

export const moduleCreate = (courseid, formData, modules) => {
  return (dispatch) => {
    dispatch(allmodulePending());
    const token = localStorage.getItem("token");
    axios
      .post(
        URLst + "v1/modules",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        AddModuleToCourse(courseid, res.data.id, modules).then((result) => {
          console.log(result);
          if (result==200) {
            dispatch(moduleCreateSuccess(res.data));
          }
          
        });

        
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
        dispatch(allmoduleFail(errorData));
      });
  };
};

export const AllModuleEdit = (id, modules, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(allmodulePending());

    axios({
      method: "patch",
      url: URLst + `v1/modules/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        let newData = [...modules];
        let index = newData.findIndex((av) => av.id === res.data.id);
         newData[index].title = edited.title;
        newData[index].summary = edited.summary;
        newData[index].order = edited.order;


        dispatch(updateModuleSuccess(newData));
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
        dispatch(allmoduleFail(errorData));
      });
  };
};

export const AllModuleDelete = (id, modules) => {
  var filtereddata = modules.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allmodulePending());

    axios({
      method: "delete",
      url: URLst + `v1/modules/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deleteModuleSuccess(filtereddata));
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
        dispatch(allmoduleFail(errorData));
      });
  };
};
export const AddLessonToModule = async (moduleid, lessonid, lessons) => {
  const token = localStorage.getItem("token");

  let res = await axios({
    method: "patch",
    url: URLst + `v1/modules/${moduleid}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      'lessons': [...lessons, lessonid],
    },
  })
    .then((res) => {
      console.log(res.data);
      return 200;
    })
    .catch((err) => {
      let errorData;
      if (err.response != null) {
        errorData = err.response.data.message;
      } else {
        errorData = err.message;
      }
      console.log(errorData);
      return 400;
    });

  return res;
};
