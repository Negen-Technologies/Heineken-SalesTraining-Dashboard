import { combineReducers } from "redux";
import auth_reducer from "./Authentication/authreducer"; 
import avatar_reducer from './Avatar/avatar_reducer'
import allusersreducer from './Users/allUsersReducer'
import allregionsreducer from './Region/regionReducer'
import allcoursesreducer from './Courses/courseReducer'
import allmodulesreducer from './Modules/moduleReducer'
import alllessonsreducer from './Lesson/lessonReducer'
import allquizsreducer from './Quiz/quizReducer'
import allbadgesreducer from './Badges/allBadgesReducer'

const rootReducer = combineReducers({
  auth: auth_reducer,
  avatar_reducer: avatar_reducer,
  allusers: allusersreducer,
  allregions: allregionsreducer,
  allcourses: allcoursesreducer,
  allmodules: allmodulesreducer,
  alllessons: alllessonsreducer,
  allquizs: allquizsreducer,
  allbadges: allbadgesreducer,
});

export default rootReducer;
