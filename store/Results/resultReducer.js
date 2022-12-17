import * as actionTypes from "./resultActionTypes";

const initialState = {
  error: null,
  loading: false,
  allresults: [],
  count: 0,
};

const allresultsStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allresultsSuccess = (state, action) => {
  return {
    ...state,

    allresults: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allresultsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const allresultsreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESULT_PENDING:
      return allresultsStart(state, action);
    case actionTypes.RESULT_SUCCESS:
      return allresultsSuccess(state, action);
    case actionTypes.RESULT_FAILED:
      return allresultsFail(state, action);
    default:
      return state;
  }
};

export default allresultsreducer;
