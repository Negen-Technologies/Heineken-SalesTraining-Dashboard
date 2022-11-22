import * as actionTypes from "./courseActionTypes";

const initialState = {
  error: null,
  loading: false,
  allcourses: [],
  count: 0,
};

const allcoursesStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allcoursesSuccess = (state, action) => {
  return {
    ...state,

    allcourses: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allcoursesFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createcourseSuccess = (state, action) => {
  return {
    ...state,
    allcourses: [...state.allcourses, action.data],
    error: null,
    loading: false,
  };
};

const updatecourseSuccess = (state, action) => {
  return {
    ...state,
    allcourses: action.data,
    error: null,
    loading: false,
  };
};

const deletecourseSuccess = (state, action) => {
  return {
    ...state,
    allcourses: action.data,
    error: null,
    loading: false,
  };
};

const allcoursesreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COURSE_PENDING:
      return allcoursesStart(state, action);
    case actionTypes.COURSE_SUCCESS:
      return allcoursesSuccess(state, action);
    case actionTypes.COURSE_FAILED:
      return allcoursesFail(state, action);
    case actionTypes.CREATE_COURSE_SUCCESS:
      return createcourseSuccess(state, action);
    case actionTypes.UPDATE_COURSE_SUCCESS:
      return updatecourseSuccess(state, action);
    case actionTypes.DELETE_COURSE_SUCCESS:
      return deletecourseSuccess(state, action);
    default:
      return state;
  }
};

export default allcoursesreducer;
