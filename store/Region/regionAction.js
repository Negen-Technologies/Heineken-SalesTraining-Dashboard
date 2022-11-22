import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./regionActionTypes";

export const allregionPending = () => {
  return {
    type: actionTypes.REGION_PENDING,
    isPending: true,
  };
};
export const allregionSuccess = (data) => {
  return {
    type: actionTypes.REGION_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const regionCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_REGION_SUCCESS,
    data: data,
  };
};

export const updateRegionSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_REGION_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deleteRegionSuccess = (data) => {
  return {
    type: actionTypes.DELETE_REGION_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const allregionFail = (error) => {
  return {
    type: actionTypes.REGION_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllRegionSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allregionPending());

    axios({
      method: "get",
      url: URLst + `v1/regions?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allregionSuccess(res.data));
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
        dispatch(allregionFail(errorData));
      });
  };
};

export const regionCreate = (formData) => {
  return (dispatch) => {
    dispatch(allregionPending());
    const token = localStorage.getItem("token");
    axios
      .post(URLst + "v1/regions", {name:formData.name}, {
        headers: {
        
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(regionCreateSuccess(res.data));
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
        dispatch(allregionFail(errorData));
      });
  };
};

export const AllRegionEdit = (id, regions, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(allregionPending());
    

    axios({
      method: "patch",
      url: URLst + `v1/regions/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        let newData = [...regions];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index] = res.data;

        dispatch(updateRegionSuccess(newData));
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
        dispatch(allregionFail(errorData));
      });
  };
};

export const AllRegionDelete = (id, regions) => {
  var filtereddata = regions.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allregionPending());

    axios({
      method: "delete",
      url: URLst + `v1/regions/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deleteRegionSuccess(filtereddata));
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
        dispatch(allregionFail(errorData));
      });
  };
};
