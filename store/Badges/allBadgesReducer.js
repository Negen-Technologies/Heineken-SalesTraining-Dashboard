import * as actionTypes from "./allBadgesActionTypes";

const initialState = {
  error: null,
  loading: false,
  allbadges: [],
  count: 0,
};

const allbadgeStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allbadgeSuccess = (state, action) => {

  return {
    ...state,
   
    allbadges: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allbadgeFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createbadgeSuccess = (state, action) => {
  return {
    ...state,
    allbadges: [...state.allbadges, action.data],
    error: null,
    loading: false,
  };
};

const updatebadgeSuccess = (state, action) => {
  return {
    ...state,
    allbadges: action.data,
    error: null,
    loading: false,
  };
};

const deletebadgeSuccess = (state, action) => {
  return {
    ...state,
    allbadges: action.data,
    error: null,
    loading: false,
  };
};

const allbadgesreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_BADGE_PENDING:
      return allbadgeStart(state, action);
    case actionTypes.ALL_BADGE_SUCCESS:
      return allbadgeSuccess(state, action);
    case actionTypes.ALL_BADGE_FAILED:
      return allbadgeFail(state, action);
    case actionTypes.CREATE_BADGE_SUCCESS:
      return createbadgeSuccess(state, action);
    case actionTypes.UPDATE_BADGE_SUCCESS:
      return updatebadgeSuccess(state, action);
    case actionTypes.DELETE_BADGE_SUCCESS:
      return deletebadgeSuccess(state, action);
    default:
      return state;
  }
};

export default allbadgesreducer;
