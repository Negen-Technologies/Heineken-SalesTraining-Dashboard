webpackHotUpdate_N_E("pages/Login",{

/***/ "./store/index.js":
/*!************************!*\
  !*** ./store/index.js ***!
  \************************/
/*! exports provided: authStart, authSuccess, authFail, logout, authLogin, avatarStart, avatarCreateSuccess, avatarGetSuccess, avatarEditSuccess, avatarDeleteSuccess, avatarFail, avatarEdit, avatarCreate, avatarGet, avatarDelete, alluserPending, alluserSuccess, userCreateSuccess, updateUserSuccess, deleteUserSuccess, alluserFail, getAllUserSuccess, UserCreate, AllUserEdit, AllUserDelete, allregionPending, allregionSuccess, regionCreateSuccess, updateRegionSuccess, deleteRegionSuccess, allregionFail, getAllRegionSuccess, regionCreate, AllRegionEdit, AllRegionDelete, allcoursePending, allcourseSuccess, courseCreateSuccess, updateCourseSuccess, deleteCourseSuccess, allcourseFail, getAllCourseSuccess, getSingleCourseSuccess, courseCreate, AllCourseEdit, AllCourseDelete, AddModuleToCourse, allmodulePending, allmoduleSuccess, moduleCreateSuccess, updateModuleSuccess, deleteModuleSuccess, allmoduleFail, getAllModuleSuccess, moduleCreate, AllModuleEdit, AllModuleDelete, AddLessonToModule, alllessonPending, alllessonSuccess, lessonCreateSuccess, updatelessonSuccess, deletelessonSuccess, alllessonFail, getAllLessonSuccess, lessonCreate, AllLessonEdit, AllLessonDelete, allquizPending, allquizSuccess, quizCreateSuccess, updatequizSuccess, deletequizSuccess, allquizFail, getAllQuizSuccess, quizCreate, AllQuizEdit, AllQuizDelete, allbadgePending, allbadgeSuccess, badgeCreateSuccess, updatebadgeSuccess, deletebadgeSuccess, allbadgeFail, getAllBadgeSuccess, badgeCreate, AllBadgeEdit, AllBadgeDelete */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Authentication_authactions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Authentication/authactions */ \"./store/Authentication/authactions.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"authStart\", function() { return _Authentication_authactions__WEBPACK_IMPORTED_MODULE_0__[\"authStart\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"authSuccess\", function() { return _Authentication_authactions__WEBPACK_IMPORTED_MODULE_0__[\"authSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"authFail\", function() { return _Authentication_authactions__WEBPACK_IMPORTED_MODULE_0__[\"authFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"logout\", function() { return _Authentication_authactions__WEBPACK_IMPORTED_MODULE_0__[\"logout\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"authLogin\", function() { return _Authentication_authactions__WEBPACK_IMPORTED_MODULE_0__[\"authLogin\"]; });\n\n/* harmony import */ var _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Avatar/avatar_actions */ \"./store/Avatar/avatar_actions.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarStart\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarStart\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarCreateSuccess\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarCreateSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarGetSuccess\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarGetSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarEditSuccess\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarEditSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarDeleteSuccess\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarDeleteSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarFail\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarEdit\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarEdit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarCreate\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarCreate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarGet\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarGet\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"avatarDelete\", function() { return _Avatar_avatar_actions__WEBPACK_IMPORTED_MODULE_1__[\"avatarDelete\"]; });\n\n/* harmony import */ var _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Users/allUsersAction */ \"./store/Users/allUsersAction.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"alluserPending\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"alluserPending\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"alluserSuccess\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"alluserSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"userCreateSuccess\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"userCreateSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateUserSuccess\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"updateUserSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deleteUserSuccess\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"deleteUserSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"alluserFail\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"alluserFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getAllUserSuccess\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"getAllUserSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"UserCreate\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"UserCreate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllUserEdit\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"AllUserEdit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllUserDelete\", function() { return _Users_allUsersAction__WEBPACK_IMPORTED_MODULE_2__[\"AllUserDelete\"]; });\n\n/* harmony import */ var _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Region/regionAction */ \"./store/Region/regionAction.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allregionPending\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"allregionPending\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allregionSuccess\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"allregionSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"regionCreateSuccess\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"regionCreateSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateRegionSuccess\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"updateRegionSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deleteRegionSuccess\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"deleteRegionSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allregionFail\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"allregionFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getAllRegionSuccess\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"getAllRegionSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"regionCreate\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"regionCreate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllRegionEdit\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"AllRegionEdit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllRegionDelete\", function() { return _Region_regionAction__WEBPACK_IMPORTED_MODULE_3__[\"AllRegionDelete\"]; });\n\n/* harmony import */ var _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Courses/courseAction */ \"./store/Courses/courseAction.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allcoursePending\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"allcoursePending\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allcourseSuccess\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"allcourseSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"courseCreateSuccess\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"courseCreateSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateCourseSuccess\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"updateCourseSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deleteCourseSuccess\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"deleteCourseSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allcourseFail\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"allcourseFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getAllCourseSuccess\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"getAllCourseSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getSingleCourseSuccess\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"getSingleCourseSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"courseCreate\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"courseCreate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllCourseEdit\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"AllCourseEdit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllCourseDelete\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"AllCourseDelete\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AddModuleToCourse\", function() { return _Courses_courseAction__WEBPACK_IMPORTED_MODULE_4__[\"AddModuleToCourse\"]; });\n\n/* harmony import */ var _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Modules/moduleAction */ \"./store/Modules/moduleAction.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allmodulePending\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"allmodulePending\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allmoduleSuccess\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"allmoduleSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"moduleCreateSuccess\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"moduleCreateSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateModuleSuccess\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"updateModuleSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deleteModuleSuccess\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"deleteModuleSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allmoduleFail\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"allmoduleFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getAllModuleSuccess\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"getAllModuleSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"moduleCreate\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"moduleCreate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllModuleEdit\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"AllModuleEdit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllModuleDelete\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"AllModuleDelete\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AddLessonToModule\", function() { return _Modules_moduleAction__WEBPACK_IMPORTED_MODULE_5__[\"AddLessonToModule\"]; });\n\n/* harmony import */ var _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Lesson/lessonAction */ \"./store/Lesson/lessonAction.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"alllessonPending\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"alllessonPending\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"alllessonSuccess\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"alllessonSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lessonCreateSuccess\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"lessonCreateSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updatelessonSuccess\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"updatelessonSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deletelessonSuccess\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"deletelessonSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"alllessonFail\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"alllessonFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getAllLessonSuccess\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"getAllLessonSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lessonCreate\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"lessonCreate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllLessonEdit\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"AllLessonEdit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllLessonDelete\", function() { return _Lesson_lessonAction__WEBPACK_IMPORTED_MODULE_6__[\"AllLessonDelete\"]; });\n\n/* harmony import */ var _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Quiz/quizAction */ \"./store/Quiz/quizAction.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allquizPending\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"allquizPending\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allquizSuccess\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"allquizSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"quizCreateSuccess\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"quizCreateSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updatequizSuccess\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"updatequizSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deletequizSuccess\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"deletequizSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allquizFail\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"allquizFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getAllQuizSuccess\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"getAllQuizSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"quizCreate\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"quizCreate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllQuizEdit\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"AllQuizEdit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllQuizDelete\", function() { return _Quiz_quizAction__WEBPACK_IMPORTED_MODULE_7__[\"AllQuizDelete\"]; });\n\n/* harmony import */ var _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Badges/allBadgesAction */ \"./store/Badges/allBadgesAction.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allbadgePending\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"allbadgePending\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allbadgeSuccess\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"allbadgeSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"badgeCreateSuccess\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"badgeCreateSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updatebadgeSuccess\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"updatebadgeSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deletebadgeSuccess\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"deletebadgeSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allbadgeFail\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"allbadgeFail\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getAllBadgeSuccess\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"getAllBadgeSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"badgeCreate\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"badgeCreate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllBadgeEdit\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"AllBadgeEdit\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AllBadgeDelete\", function() { return _Badges_allBadgesAction__WEBPACK_IMPORTED_MODULE_8__[\"AllBadgeDelete\"]; });\n\n\n\n\n\n\n\n\n\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"./node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3RvcmUvaW5kZXguanM/OTEwMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9zdG9yZS9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL0F1dGhlbnRpY2F0aW9uL2F1dGhhY3Rpb25zXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9BdmF0YXIvYXZhdGFyX2FjdGlvbnNcIlxuZXhwb3J0ICogZnJvbSBcIi4vVXNlcnMvYWxsVXNlcnNBY3Rpb25cIlxuZXhwb3J0ICogZnJvbSBcIi4vUmVnaW9uL3JlZ2lvbkFjdGlvblwiXG5leHBvcnQgKiBmcm9tIFwiLi9Db3Vyc2VzL2NvdXJzZUFjdGlvblwiXG5leHBvcnQgKiBmcm9tIFwiLi9Nb2R1bGVzL21vZHVsZUFjdGlvblwiXG5leHBvcnQgKiBmcm9tIFwiLi9MZXNzb24vbGVzc29uQWN0aW9uXCJcbmV4cG9ydCAqIGZyb20gXCIuL1F1aXovcXVpekFjdGlvblwiXG5leHBvcnQgKiBmcm9tIFwiLi9CYWRnZXMvYWxsQmFkZ2VzQWN0aW9uXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./store/index.js\n");

/***/ })

})