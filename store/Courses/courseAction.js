import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./courseActionTypes";

export const allcoursePending = () => {
  return {
    type: actionTypes.COURSE_PENDING,
    isPending: true,
  };
};
export const allcourseSuccess = (data) => {
  return {
    type: actionTypes.COURSE_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const courseCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_COURSE_SUCCESS,
    data: data,
  };
};

export const updateCourseSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_COURSE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deleteCourseSuccess = (data) => {
  return {
    type: actionTypes.DELETE_COURSE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const allcourseFail = (error) => {
  return {
    type: actionTypes.COURSE_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllCourseSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allcoursePending());

    axios({
      method: "get",
      url: URLst + `v1/courses?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allcourseSuccess(res.data));
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
        dispatch(allcourseFail(errorData));
      });
  };
};

export const getSingleCourseSuccess = (id) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allcoursePending());

    axios({
      method: "get",
      url: URLst + `v1/courses/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);

        dispatch(
          allcourseSuccess({
            results: [res.data],
            totalResults: 1,
          })
        );
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
        dispatch(allcourseFail(errorData));
      });
  };
};

export const courseCreate = (formData) => {
  return (dispatch) => {
    dispatch(allcoursePending());
    const token = localStorage.getItem("token");
    axios
      .post(
        URLst + "v1/courses",
        // { name: formData.name },
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        dispatch(courseCreateSuccess(res.data));
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
        dispatch(allcourseFail(errorData));
      });
  };
};

export const AllCourseEdit = (id, courses, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(allcoursePending());

    axios({
      method: "patch",
      url: URLst + `v1/courses/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        let newData = [...courses];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index].title = edited.title;
        newData[index].summary = edited.summary;

        dispatch(updateCourseSuccess(newData));
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
        dispatch(allcourseFail(errorData));
      });
  };
};

export const AllCourseDelete = (id, courses) => {
  var filtereddata = courses.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allcoursePending());

    axios({
      method: "delete",
      url: URLst + `v1/courses/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deleteCourseSuccess(filtereddata));
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
        dispatch(allcourseFail(errorData));
      });
  };
};

export const AddModuleToCourse = async (courseid, moduleid, modules) => {
  const token = localStorage.getItem("token");

  let res=await axios({
    method: "patch",
    url: URLst + `v1/courses/${courseid}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      "modules": [...modules, moduleid],
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
