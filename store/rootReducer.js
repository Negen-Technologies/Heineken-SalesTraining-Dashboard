import { combineReducers } from "redux";
import auth_reducer from "./Authentication/authreducer"; 
import avatar_reducer from './Avatar/avatar_reducer'
import allusersreducer from './Users/allUsersReducer'
import allregionsreducer from './Region/regionReducer'
import allsubregionsreducer from './Subregion/subregionReducer'
import allcoursesreducer from './Courses/courseReducer'
import allmodulesreducer from './Modules/moduleReducer'
import alllessonsreducer from './Lesson/lessonReducer'
import allquizsreducer from './Quiz/quizReducer'
import allbadgesreducer from './Badges/allBadgesReducer'
import alltraineesreducer from './Trainee/traineeReducer'
import allterritoryreducer from './Territory/territoryReducer'
import allprofilereducer from "./Profile/EditProfileReducer";
import allresultsreducer from "./Results/resultReducer"
import allstatsreducer from "./Stats/statReducer"
import {messageReducer} from './Messages/messagesReducers'

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
  alltrainees: alltraineesreducer,
  allsubregions: allsubregionsreducer,
  allterritory: allterritoryreducer,
  allprofile: allprofilereducer,
  allresultsreducer:allresultsreducer,
  allstatsreducer:allstatsreducer,
  messageReducer:messageReducer
});

export default rootReducer;
