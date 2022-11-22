import * as actionTypes from "./moduleActionTypes";

const initialState = {
  error: null,
  loading: false,
  allmodules: [],
  count: 0,
};

const allmodulesStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allmodulesSuccess = (state, action) => {
  return {
    ...state,

    allmodules: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allmodulesFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createmoduleSuccess = (state, action) => {
  return {
    ...state,
    allmodules: [...state.allmodules, action.data],
    error: null,
    loading: false,
  };
};

const updatemoduleSuccess = (state, action) => {
  return {
    ...state,
    allmodules: action.data,
    error: null,
    loading: false,
  };
};

const deletemoduleSuccess = (state, action) => {
  return {
    ...state,
    allmodules: action.data,
    error: null,
    loading: false,
  };
};

const allmodulesreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODULE_PENDING:
      return allmodulesStart(state, action);
    case actionTypes.MODULE_SUCCESS:
      return allmodulesSuccess(state, action);
    case actionTypes.MODULE_FAILED:
      return allmodulesFail(state, action);
    case actionTypes.CREATE_MODULE_SUCCESS:
      return createmoduleSuccess(state, action);
    case actionTypes.UPDATE_MODULE_SUCCESS:
      return updatemoduleSuccess(state, action);
    case actionTypes.DELETE_MODULE_SUCCESS:
      return deletemoduleSuccess(state, action);
    default:
      return state;
  }
};

export default allmodulesreducer;
