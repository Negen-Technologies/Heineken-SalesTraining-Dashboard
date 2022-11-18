import * as actionTypes from "./allUsersActionTypes";

const initialState = {
  error: null,
  loading: false,
  allusers: [],
  count: 0,
};

const alluserStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const alluserSuccess = (state, action) => {
  // users=[...state.allusers,action.data]
  //
  //

  return {
    ...state,
    // allusers: state.allusers.concat(action.data),
    allusers: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const alluserFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createUserSuccess = (state, action) => {
 return {
   ...state,
   allusers: [...state.allusers, action.data],
   error: null,
   loading: false,
 };
};

const updateUserSuccess = (state, action) => {

  return {
    ...state,
    allusers: action.data,
    error: null,
    loading: false,
  };
};

const deleteUserSuccess = (state, action) => {

  return {
    ...state,
    allusers: action.data,
    error: null,
    loading: false,
  };
};

const allusersreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_USER_PENDING:
      return alluserStart(state, action);
    case actionTypes.ALL_USER_SUCCESS:
      return alluserSuccess(state, action);
    case actionTypes.ALL_USER_FAILED:
      return alluserFail(state, action);
    case actionTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    default:
      return state;
  }
};

export default allusersreducer;
