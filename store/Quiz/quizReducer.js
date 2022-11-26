import * as actionTypes from "./quizActionTypes";

const initialState = {
  error: null,
  loading: false,
  allquizs: [],
  count: 0,
};

const allquizsStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allquizsSuccess = (state, action) => {
  return {
    ...state,

    allquizs: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allquizsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createquizSuccess = (state, action) => {
  return {
    ...state,
    allquizs: [...state.allquizs, action.data],
    error: null,
    loading: false,
  };
};

const updatequizSuccess = (state, action) => {
  return {
    ...state,
    allquizs: action.data,
    error: null,
    loading: false,
  };
};

const deletequizSuccess = (state, action) => {
  return {
    ...state,
    allquizs: action.data,
    error: null,
    loading: false,
  };
};

const allquizsreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUIZ_PENDING:
      return allquizsStart(state, action);
    case actionTypes.QUIZ_SUCCESS:
      return allquizsSuccess(state, action);
    case actionTypes.QUIZ_FAILED:
      return allquizsFail(state, action);
    case actionTypes.CREATE_QUIZ_SUCCESS:
      return createquizSuccess(state, action);
    case actionTypes.UPDATE_QUIZ_SUCCESS:
      return updatequizSuccess(state, action);
    case actionTypes.DELETE_QUIZ_SUCCESS:
      return deletequizSuccess(state, action);
    default:
      return state;
  }
};

export default allquizsreducer;
