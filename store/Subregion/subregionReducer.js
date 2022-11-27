import * as actionTypes from "./subregionActionTypes";

const initialState = {
  error: null,
  loading: false,
  allsubregions: [],
  count: 0,
};

const allsubregionsStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allsubregionsSuccess = (state, action) => {

  return {
    ...state,
    allsubregions: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allsubregionsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createsubRegionSuccess = (state, action) => {
  return {
    ...state,
    allsubregions: [...state.allsubregions, action.data],
    error: null,
    loading: false,
  };
};

const updatesubRegionSuccess = (state, action) => {
  return {
    ...state,
    allsubregions: action.data,
    error: null,
    loading: false,
  };
};

const deleteSubRegionSuccess = (state, action) => {
  return {
    ...state,
    allsubregions: action.data,
    error: null,
    loading: false,
  };
};



const allsubregionsreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUB_REGION_PENDING:
      return allsubregionsStart(state, action);
    case actionTypes.SUB_REGION_SUCCESS:
      return allsubregionsSuccess(state, action);
    case actionTypes.SUB_REGION_FAILED:
      return allsubregionsFail(state, action);
    case actionTypes.CREATE_SUB_REGION_SUCCESS:
      return createsubRegionSuccess(state, action);
    case actionTypes.UPDATE_SUB_REGION_SUCCESS:
      return updatesubRegionSuccess(state, action);
    case actionTypes.DELETE_SUB_REGION_SUCCESS:
      return deleteSubRegionSuccess(state, action);
    default:
      return state;
  }
};

export default allsubregionsreducer;
