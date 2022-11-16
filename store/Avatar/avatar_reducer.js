import * as avatarTypes from "./avatar_actionTypes";

const initialState = {
  error: null,
  loading: false,
  data: [],
};

const avatarStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const avatarCreateSuccess = (state, action) => {
  return {
    ...state,
    data: [...state.data, action.data],
    error: null,
    loading: false,
  };
};
const avatarGetSuccess = (state, action) => {
  return {
    ...state,
    data: action.data,
    error: null,
    loading: false,
  };
};

const avatarEditSuccess = (state, action) => {

  return {
    ...state,
    data: action.data,
    error: null,
    loading: false,
  };
};
const avatarDeleteSuccess = (state, action) => {
  const newUsers = state.data.filter((user) => {
    return user.id !== action.data.id;
  });
  return {
    ...state,
    data: action.data,
    error: null,
    loading: false,
  };
};

const avatarFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const avatar_reducer = (state = initialState, action) => {
  switch (action.type) {
    case avatarTypes.AVATAR_START:
      return avatarStart(state, action);
    case avatarTypes.AVATAR_CREATE_SUCCESS:
      return avatarCreateSuccess(state, action);
    case avatarTypes.AVATAR_GET_SUCCESS:
      return avatarGetSuccess(state, action);
    case avatarTypes.AVATAR_EDIT_SUCCESS:
      return avatarEditSuccess(state, action);
    case avatarTypes.AVATAR_DELETE_SUCCESS:
      return avatarDeleteSuccess(state, action);
    case avatarTypes.AVATAR_FAIL:
      return avatarFail(state, action);
    default:
      return state;
  }
};

export default avatar_reducer;
