import { combineReducers } from "redux";
import auth_reducer from "./Authentication/authreducer"; 
import avatar_reducer from './Avatar/avatar_reducer'

const rootReducer = combineReducers({
  auth: auth_reducer,
  avatar_reducer: avatar_reducer,
});

export default rootReducer;
