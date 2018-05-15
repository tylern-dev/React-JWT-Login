import React from 'react';
import ProfileService from '../utils/ProfileService';

/* FIGURE OUT HOW TO UPDATE THE NAVBAR DASHBOARD WITH USER'S NAME INSTEAD OF 'DASHBOARD'. THIS NEEDS TO HAPPEN WHEN THE USER CHANGES THE NAME IN THE PROFILE PAGE */

// using this HOC for profile operations ie pw change and account edits

export default function profileHOC(ProfileComponent) {
  return class ProfileWrapped extends React.Component {
  state={
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
  }

  UpdateProfile = new ProfileService();

  changeValue = (event) => {
    // console.log('typing', event);
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  }

  submitProfile = (event) => {
    event.preventDefault();
    // console.log('click', event);
    const userProfile = { ...this.state };
    // post the data to the user document
    this.UpdateProfile.updateProfile(userProfile)
      .then((res) => {
        console.log('Response--->', res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  profileProps = {
    submitProfile: this.submitProfile,
    changeValue: this.changeValue,
    changePassword: this.changePassword,
  }

  render() {
    return (
      <ProfileComponent {...this.props} {...this.profileProps} />
    );
  }
  };
}
