import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import { userCreateSuccess } from "../Users/allUsersAction";
import * as actionTypes from "./traineeActionTypes";
import { territoryCreate } from "../Territory/territoryAction";
import { successMessage } from "../index";

export const alltraineePending = () => {
  return {
    type: actionTypes.TRAINEE_PENDING,
    isPending: true,
  };
};
export const alltraineeSuccess = (data) => {
  return {
    type: actionTypes.TRAINEE_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const traineeCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_TRAINEE_SUCCESS,
    data: data,
  };
};

export const updatetraineeSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_TRAINEE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deletetraineeSuccess = (data) => {
  return {
    type: actionTypes.DELETE_TRAINEE_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const alltraineeFail = (error) => {
  return {
    type: actionTypes.TRAINEE_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllTraineePerTerritory = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alltraineePending());

    axios({
      method: "get",
      url: URLst + `v1/users/trainees?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(alltraineeSuccess(res.data));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const getAllSatffsPerRegion = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alltraineePending());

    axios({
      method: "get",
      url: URLst + `v1/users/staffs?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(alltraineeSuccess(res.data));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const getAllTraineeSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alltraineePending());

    axios({
      method: "get",
      url: URLst + `v1/trainees?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(alltraineeSuccess(res.data));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const getSingleTrainee = (id) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alltraineePending());

    axios({
      method: "get",
      url: URLst + `v1/trainees/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);

        dispatch(alltraineeSuccess({ results: [res.data] }));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const getSingleTraineePerTerritory = (id) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alltraineePending());

    axios({
      method: "get",
      url: URLst + `v1/users/trainees?_id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(alltraineeSuccess(res.data));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const assignTraineeToCourse = (courseId, traineeId, trainees) => {

  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alltraineePending());

    axios({
      method: "patch",
      url: URLst + `v1/trainees/enroll/${traineeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        course: courseId,
      },
    })
      .then((res) => {
        console.log(res.data);

        let newData = [...trainees];
        let index = newData.findIndex((av) => av._id === res.data.id); 
        newData[index].currentCourse = res.data.currentCourse
        newData[index].currentLesson = res.data.currentLesson
        newData[index].currentModule = res.data.currentModule
        dispatch(successMessage("mes"));
        dispatch(updatetraineeSuccess(newData));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const traineeCreate = (formData) => {
  console.log(formData);
  return (dispatch) => {
    dispatch(alltraineePending());
    const token = localStorage.getItem("token");
    axios
      .post(
        URLst + "v1/trainees",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(successMessage("mes"));

        dispatch(traineeCreateSuccess(res.data));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const traineeBulkCreate = (formData) => {
  console.log(formData);
  return (dispatch) => {
    dispatch(alltraineePending());
    const token = localStorage.getItem("token");
    axios
      .post(
        URLst + "v1/trainees/bulk-create",
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(successMessage("mes"));

        dispatch(traineeCreateSuccess(res.data));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const AllTraineeEdit = (id, trainees, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(alltraineePending());

    axios({
      method: "patch",
      url: URLst + `v1/trainees/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        console.log(res.data);
        let newData = [...trainees];
        let index = newData.findIndex((av) => av._id === res.data.id);
        console.log(newData[index]);
        newData[index].territories = res.data.territories;

        // newData[index].user.name = edited.name;
        // newData[index].user.email = edited.email;
        // newData[index].department = edited.department;
        // newData[index].user.image = res.data;
        dispatch(successMessage("mes"));

        dispatch(updatetraineeSuccess(newData));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const AllTraineeDelete = (id, trainees) => {
  var filtereddata = trainees.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(alltraineePending());

    axios({
      method: "delete",
      url: URLst + `v1/trainees/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deletetraineeSuccess(filtereddata));
      })
      .catch((err) => {
        var errorData;
        if (err.response.data.code == 401) {
          handle401();
        }
        if (err.response != null) {
          errorData = err.response.data.message;
          console.log(errorData);
        } else {
          errorData = err.message;
        }
        dispatch(alltraineeFail(errorData));
      });
  };
};

export const ActivateTrainee = (id, trainees, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(alltraineePending());

    axios({
      method: "patch",
      url: URLst + `v1/trainees/activate/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // data: edited,
    })
      .then((res) => {
        console.log(res.data);
        let newData = [...trainees];
        let index = newData.findIndex((av) => av.id === res.data.id);
        dispatch(updatetraineeSuccess(newData));
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
        dispatch(alltraineeFail(errorData));
      });
  };
};
