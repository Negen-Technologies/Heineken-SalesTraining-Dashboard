import * as actionTypes from "./statActionTypes";

const initialState = {
  error: null,
  loading: false,
  allstats: {},
  count: 0,
};

const allstatsStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allstatsSuccess = (state, action) => {
  return {
    ...state,

    allstats: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allstatsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const allstatsreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STAT_PENDING:
      return allstatsStart(state, action);
    case actionTypes.STAT_SUCCESS:
      return allstatsSuccess(state, action);
    case actionTypes.STAT_FAILED:
      return allstatsFail(state, action);
    default:
      return state;
  }
};

export default allstatsreducer;
