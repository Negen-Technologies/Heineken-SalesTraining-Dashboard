import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./subregionActionTypes";

export const allsubregionPending = () => {
  return {
    type: actionTypes.SUB_REGION_PENDING,
    isPending: true,
  };
};
export const allsubregionSuccess = (data) => {
  return {
    type: actionTypes.SUB_REGION_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const subregionCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_SUB_REGION_SUCCESS,
    data: data,
  };
};

export const updatesubRegionSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_SUB_REGION_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deletesubRegionSuccess = (data) => {
  return {
    type: actionTypes.DELETE_SUB_REGION_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const allsubregionFail = (error) => {
  return {
    type: actionTypes.SUB_REGION_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllSubRegionSuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allsubregionPending());

    axios({
      method: "get",
      url: URLst + `v1/subregions?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allsubregionSuccess(res.data));
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
        dispatch(allsubregionFail(errorData));
      });
  };
};

export const subregionCreate = (formData) => {
  console.log(formData);
  return (dispatch) => {
    dispatch(allsubregionPending());
    const token = localStorage.getItem("token");
    axios
      .post(URLst + "v1/subregions", {name:formData.name, regionId: formData.regions}, {
        headers: {
        
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(subregionCreateSuccess(res.data));
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
        dispatch(allsubregionFail(errorData));
      });
  };
};

export const AllSubRegionEdit = (id, regions, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(allsubregionPending());
    

    axios({
      method: "patch",
      url: URLst + `v1/subregions/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        let newData = [...regions];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index] = res.data;

        dispatch(updatesubRegionSuccess(newData));
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
        dispatch(allsubregionFail(errorData));
      });
  };
};

export const AllSubRegionDelete = (id, regions) => {
  var filtereddata = regions.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(allsubregionPending());

    axios({
      method: "delete",
      url: URLst + `v1/subregions/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deletesubRegionSuccess(filtereddata));
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
        dispatch(allsubregionFail(errorData));
      });
  };
};
