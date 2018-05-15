import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/router/PrivateRoute';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import ProfileContainer from './ProfileContainer';
import ChangePassword from '../components/profile/ChangePassword';
import CreateProfile from '../components/profile/CreateProfile';
import NotFound from './NotFound';
// import resetPassword from '../components/resetPassword';

const Main = ({ changeAuth, isAuth }) => (
  // had to use render in order to pass props
  <Switch>
    <Route exact path="/" render={prop => <Home {...prop} />} />
    <Route path="/signup" render={prop => <Signup {...prop} updateIsLoggedIn={this.updateIsLoggedIn} changeAuth={changeAuth} />} />
    <Route path="/login" render={prop => <Login {...prop} updateIsLoggedIn={this.updateIsLoggedIn} changeAuth={changeAuth} />} />
    <PrivateRoute path="/dashboard" component={Dashboard} isAuth={isAuth} />
    <PrivateRoute exact path="/profile" component={ProfileContainer} isAuth={isAuth} />
    <PrivateRoute exact path="/profile/changePassword" component={ChangePassword} isAuth={isAuth} />
    {/* THERE NEEDS A CREATE PROFILE LINK HERE FOR SIGNUP TO WORK */}
    <PrivateRoute exact path="/profile/create" component={CreateProfile} isAuth={isAuth} />
    {/* <PrivateRoute exact path="/resetPassword" component={resetPassword} isAuth={isAuth} /> */}
    <Route component={NotFound} />
  </Switch>
);

Main.propTypes = {
  changeAuth: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};
export default Main;
