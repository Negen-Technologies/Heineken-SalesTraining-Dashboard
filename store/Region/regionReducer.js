import * as actionTypes from "./regionActionTypes";

const initialState = {
  error: null,
  loading: false,
  allregions: [],
  count: 0,
};

const allregionsStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allregionsSuccess = (state, action) => {

  return {
    ...state,

    allregions: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allregionsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createRegionSuccess = (state, action) => {
  return {
    ...state,
    allregions: [...state.allregions, action.data],
    error: null,
    loading: false,
  };
};

const updateRegionSuccess = (state, action) => {
  return {
    ...state,
    allregions: action.data,
    error: null,
    loading: false,
  };
};

const deleteRegionSuccess = (state, action) => {
  return {
    ...state,
    allregions: action.data,
    error: null,
    loading: false,
  };
};



const allregionsreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGION_PENDING:
      return allregionsStart(state, action);
    case actionTypes.REGION_SUCCESS:
      return allregionsSuccess(state, action);
    case actionTypes.REGION_FAILED:
      return allregionsFail(state, action);
    case actionTypes.CREATE_REGION_SUCCESS:
      return createRegionSuccess(state, action);
    case actionTypes.UPDATE_REGION_SUCCESS:
      return updateRegionSuccess(state, action);
    case actionTypes.DELETE_REGION_SUCCESS:
      return deleteRegionSuccess(state, action);
    default:
      return state;
  }
};

export default allregionsreducer;
