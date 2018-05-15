import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import loginAuthHOC from '../../hoc/loginHOC';
import InputField from '../InputField';

const ChangePassword = ({ changeValue, changePassword }) => (
  <Fragment>
    <form onSubmit={changePassword}>
      <InputField label="Current Password" for="password" type="password" onChange={changeValue} />
      <InputField label="New Password" for="newPassword" type="password" onChange={changeValue} />
      <input type="submit" value="Submit" />
    </form>
  </Fragment>
);

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
};

export default loginAuthHOC(ChangePassword);
