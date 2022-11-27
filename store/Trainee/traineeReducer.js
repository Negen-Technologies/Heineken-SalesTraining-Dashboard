import * as actionTypes from "./traineeActionTypes";

const initialState = {
  error: null,
  loading: false,
  alltrainees: [],
  count: 0,
};

const alltraineesStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const alltraineesSuccess = (state, action) => {
  return {
    ...state,

    alltrainees: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const alltraineesFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createtraineeSuccess = (state, action) => {
  return {
    ...state,
    alltrainees: [...state.alltrainees, action.data],
    error: null,
    loading: false,
  };
};

const updatetraineeSuccess = (state, action) => {
  return {
    ...state,
    alltrainees: action.data,
    error: null,
    loading: false,
  };
};

const deletetraineeSuccess = (state, action) => {
  return {
    ...state,
    alltrainees: action.data,
    error: null,
    loading: false,
  };
};

const alltraineesreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRAINEE_PENDING:
      return alltraineesStart(state, action);
    case actionTypes.TRAINEE_SUCCESS:
      return alltraineesSuccess(state, action);
    case actionTypes.TRAINEE_FAILED:
      return alltraineesFail(state, action);
    case actionTypes.CREATE_TRAINEE_SUCCESS:
      return createtraineeSuccess(state, action);
    case actionTypes.UPDATE_TRAINEE_SUCCESS:
      return updatetraineeSuccess(state, action);
    case actionTypes.DELETE_TRAINEE_SUCCESS:
      return deletetraineeSuccess(state, action);
    default:
      return state;
  }
};

export default alltraineesreducer;
