import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


/* FIGURE OUT HOW TO UPDATE THE NAVBAR DASHBOARD WITH USER'S NAME INSTEAD OF 'DASHBOARD'. THIS NEEDS TO HAPPEN WHEN THE USER CHANGES THE NAME IN THE PROFILE PAGE */

class ProfileContainer extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Fragment>
        <Link to={`${match.url}/changePassword`} >Change Password</Link>
      </Fragment>
    );
  }
}

export default ProfileContainer;
