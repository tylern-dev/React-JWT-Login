import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../utils/AuthService';


export default function loginAuth(AuthComponent) {
  return class AuthWrapped extends React.Component {
    static propTypes = {
      changeAuth: PropTypes.func,
      history: PropTypes.object,
    }

    state = {
      email: '',
      password: '',
      newPassword: '',
    }

    Auth = new AuthService();

    changeValue = (event) => {
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }

    loginUser = (event) => {
      event.preventDefault();
      this.Auth.signIn(this.state.email.toLowerCase(), this.state.password, (response) => {
        console.log('AUTH RES', response);
        if (response.status === 200) {
          this.props.changeAuth();
          this.props.history.push('/dashboard');
        }
      });
      // this.setState({ redirectToRefer: true });
    };

    signUpUser = (event) => {
      event.preventDefault();
      this.Auth.signUp(this.state.email.toLowerCase(), this.state.password, (response) => {
        // console.log('HOC', response);
        if (response.status === 201) {
          this.props.changeAuth();
          this.props.history.push('/profile/create');
        }
      });
    }

    changePassword = (event) => {
      event.preventDefault();
      console.log(event);
      const token = localStorage.getItem('tkid');
      this.Auth.changePassword(token,
        { currentPassword: this.state.password, newPassword: this.state.newPassword },
      );
    }

    authProps = {
      changeValue: this.changeValue,
      loginUser: this.loginUser,
      signUpUser: this.signUpUser,
      changePassword: this.changePassword,
    };

    render() {
      return (
        <AuthComponent {...this.props} {...this.authProps} />
      );
    }
  };
}
