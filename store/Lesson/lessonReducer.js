import * as actionTypes from "./lessonActionTypes";

const initialState = {
  error: null,
  loading: false,
  alllessons: [],
  count: 0,
};

const alllessonsStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const alllessonsSuccess = (state, action) => {
  return {
    ...state,

    alllessons: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const alllessonsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createlessonSuccess = (state, action) => {
  return {
    ...state,
    alllessons: [...state.alllessons, action.data],
    error: null,
    loading: false,
  };
};

const updatelessonSuccess = (state, action) => {
  return {
    ...state,
    alllessons: action.data,
    error: null,
    loading: false,
  };
};

const deletelessonSuccess = (state, action) => {
  return {
    ...state,
    alllessons: action.data,
    error: null,
    loading: false,
  };
};

const alllessonsreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LESSON_PENDING:
      return alllessonsStart(state, action);
    case actionTypes.LESSON_SUCCESS:
      return alllessonsSuccess(state, action);
    case actionTypes.LESSON_FAILED:
      return alllessonsFail(state, action);
    case actionTypes.CREATE_LESSON_SUCCESS:
      return createlessonSuccess(state, action);
    case actionTypes.UPDATE_LESSON_SUCCESS:
      return updatelessonSuccess(state, action);
    case actionTypes.DELETE_LESSON_SUCCESS:
      return deletelessonSuccess(state, action);
    default:
      return state;
  }
};

export default alllessonsreducer;
