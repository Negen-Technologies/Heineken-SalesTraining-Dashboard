import * as actionTypes from "./territoryActionTypes";

const initialState = {
  error: null,
  loading: false,
  allterritory: [],
  count: 0,
};

const allterritoryStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const allterritorySuccess = (state, action) => {

  return {
    ...state,
    allterritory: action.data,
    error: null,
    loading: false,
    count: action.count,
  };
};

const allterritoryFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const createterritorySuccess = (state, action) => {
  return {
    ...state,
    allterritory: [...state.allterritory, action.data],
    error: null,
    loading: false,
  };
};

const updateterritorySuccess = (state, action) => {
  return {
    ...state,
    allterritory: action.data,
    error: null,
    loading: false,
  };
};

const deleteterritorySuccess = (state, action) => {
  return {
    ...state,
    allterritory: action.data,
    error: null,
    loading: false,
  };
};



const allterritoryreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TERRITORY_PENDING:
      return allterritoryStart(state, action);
    case actionTypes.TERRITORY_SUCCESS:
      return allterritorySuccess(state, action);
    case actionTypes.TERRITORY_FAILED:
      return allterritoryFail(state, action);
    case actionTypes.CREATE_TERRITORY_SUCCESS:
      return createterritorySuccess(state, action);
    case actionTypes.UPDATE_TERRITORY_SUCCESS:
      return updateterritorySuccess(state, action);
    case actionTypes.DELETE_TERRITORY_SUCCESS:
      return deleteterritorySuccess(state, action);
    default:
      return state;
  }
};

export default allterritoryreducer;
