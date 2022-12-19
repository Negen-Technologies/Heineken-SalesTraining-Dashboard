import axios from "axios";
import URLst, { handle401 } from "../../utils/constants";
import * as actionTypes from "./territoryActionTypes";

export const territoryPending = () => {
  return {
    type: actionTypes.TERRITORY_PENDING,
    isPending: true,
  };
};
export const allterritorySuccess = (data) => {
  return {
    type: actionTypes.TERRITORY_SUCCESS,
    isPending: false,
    data: data.results,
    count: data.totalResults,
  };
};

export const territoryCreateSuccess = (data) => {
  return {
    type: actionTypes.CREATE_TERRITORY_SUCCESS,
    data: data,
  };
};

export const updateterritorySuccess = (data) => {
  return {
    type: actionTypes.UPDATE_TERRITORY_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const deleteterritorySuccess = (data) => {
  return {
    type: actionTypes.DELETE_TERRITORY_SUCCESS,
    isPending: false,
    data: data,
  };
};

export const allterritoryFail = (error) => {
  return {
    type: actionTypes.TERRITORY_FAILED,
    error: error,
    isPending: false,
  };
};

export const getAllTerritorySuccess = (limit, page) => {
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(territoryPending());

    axios({
      method: "get",
      url: URLst + `v1/territories?limit=${limit}&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(allterritorySuccess(res.data));
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
        dispatch(allterritoryFail(errorData));
      });
  };
};

export const territoryCreate = (formData) => {
  console.log(formData);
  console.log(formData);
  return (dispatch) => {
    dispatch(territoryPending());
    const token = localStorage.getItem("token");
    axios
      .post(
        URLst + "v1/territories",
        { name: formData.name, subregionId: formData.subregions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        dispatch(territoryCreateSuccess(res.data));
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
        dispatch(allterritoryFail(errorData));
      });
  };
};

export const territoryCreateBulk = (id, data) => {
  return (dispatch) => {
    dispatch(territoryPending());
    const token = localStorage.getItem("token");
    axios
      .post(URLst + `v1/territories/bulkCreate/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(territoryCreateSuccess(res.data));
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
        dispatch(allterritoryFail(errorData));
      });
  };
};

export const AllTerritoryEdit = (id, regions, edited) => {
  const token = localStorage.getItem("token");

  return (dispatch, getState) => {
    dispatch(territoryPending());

    axios({
      method: "patch",
      url: URLst + `v1/territories/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: edited,
    })
      .then((res) => {
        let newData = [...regions];
        let index = newData.findIndex((av) => av.id === res.data.id);

        newData[index] = res.data;

        dispatch(updateterritorySuccess(newData));
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
        dispatch(allterritoryFail(errorData));
      });
  };
};

export const AllTerritoryDelete = (id, regions) => {
  var filtereddata = regions.filter((item) => item.id !== id);
  var token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(territoryPending());

    axios({
      method: "delete",
      url: URLst + `v1/territories/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deleteterritorySuccess(filtereddata));
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
        dispatch(allterritoryFail(errorData));
      });
  };
};
