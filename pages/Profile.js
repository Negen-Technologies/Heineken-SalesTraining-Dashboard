import React, { useEffect } from "react";
import ProfileLayout from "../Components/ProfilePage/ProfileLayout";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import {
  getProfileSuccess,
  editProfileAction,
  allprofilePending,
 } from "../store";

function profile(props) {
  useEffect(() => {
    // props.getProfileSuccess();
    // console.log('+++++')
    // console.log(props.allprofile)
  }, []);
  return (
    <div>
      <ProfileLayout
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // allprofile: state.allprofile.allprofile,
    // allprofilePending: state.allprofile.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getProfileSuccess: () => dispatch(getProfileSuccess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(profile));