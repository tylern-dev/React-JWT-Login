import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputField from '../InputField';
import profileHOC from '../../hoc/profileHOC';


const CreateProfile = ({ submitProfile, changeValue }) => (
  <Fragment>
    <h2>Create Profile</h2>
    <form onSubmit={submitProfile}>
      <InputField label="First Name" for="firstName" type="text" onChange={changeValue} />
      <InputField label="Last Name" for="lastName" type="text" onChange={changeValue} />
      <InputField label="Street Address" for="streetAddress" type="text" onChange={changeValue} />
      <InputField label="City" for="city" type="text" onChange={changeValue} />
      <InputField label="State" for="state" type="text" onChange={changeValue} />
      <InputField label="Zip" for="zip" type="text" size={5} onChange={changeValue} />

      <input type="submit" value="Submit" />
    </form>
  </Fragment>
);

CreateProfile.propTypes = {
  submitProfile: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
};

export default profileHOC(CreateProfile);
