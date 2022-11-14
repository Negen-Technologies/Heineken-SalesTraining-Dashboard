import { combineReducers } from "redux";
import auth_reducer from "./Authentication/authreducer"; 

const rootReducer = combineReducers({
  auth: auth_reducer,
});

export default rootReducer;
