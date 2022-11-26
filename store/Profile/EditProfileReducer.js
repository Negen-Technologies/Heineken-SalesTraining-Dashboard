import * as actionTypes from "./editProfileActionTypes";


const initialState = {
  isPending: false,
  error: null,
  message:null
};



const editProfileStart = (state,) => {
  return  {
    ...state,
    message:null,
    error: null,
    isPending: true
  }
};

const editProfileSuccess = (state, action) => {
  return {
    ...state,
    message: action.payload,
    error: null,
    isPending: false
  }
};

const editProfileFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    isPending: false
  }}



export const editProfileReducer = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_PROFILE_PENDING:
      return editProfileStart(state, );
    case actionTypes.EDIT_PROFILE_SUCCESS:
      return editProfileSuccess(state, action);
    case actionTypes.EDIT_PROFILE_FAILED:
      return editProfileFail(state, action);
    default:
      return state;
  }
};