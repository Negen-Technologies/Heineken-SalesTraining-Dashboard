import React from "react";
import ProfileLayout from "../Components/ProfilePage/ProfileLayout";
import withAuth from "../utils/protectRoute";
import { connect } from "react-redux";
import { editProfileAction } from "../store/Profile/EditProfileAction";

function profile({ userData, editProfile, }) {
  return (
    <div>
      <ProfileLayout
        editProfile={editProfile}
        userData={userData}
        
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
  editProfile: state.editProfile,
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (checkedValues) => dispatch(editProfileAction(checkedValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(profile));