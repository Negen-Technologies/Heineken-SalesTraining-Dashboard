import { Action } from "@antv/g2";
import * as actionTypes from "./EditProfileActionTypes";

const initialState = {
  error: null,
  loading: false,
  allprofile: {},
  count: 0,
};

const allprofileStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allprofileSuccess = (state, action) => {
console.log('in reducer: ', action.data)
  return {
    ...state,
    allprofile: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allprofileFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};


const updateprofileSuccess = (state, action) => {

  return {
    ...state,
    allprofile: action.data,
    error: null,
    loading: false,
  };
};



const allprofilereducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_PROFILE_PENDING:
      return allprofileStart(state, action);
    case actionTypes.ALL_PROFILE_SUCCESS:
      return allprofileSuccess(state, action);
    case actionTypes.ALL_PROFILE_FAILED:
      return allprofileFail(state, action);
   
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return updateprofileSuccess(state, action);
    default:
      return state;
  }
};

export default allprofilereducer;
