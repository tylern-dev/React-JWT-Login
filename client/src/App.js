import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Main from './containers/Main';
import AuthService from './utils/AuthService';

class App extends React.Component {
  state={
    isAuthenticated: false,
    user: {},

  }

  componentDidMount() {
    const token = this.Auth.getToken;
    if (token) {
      this.Auth.tokenCheck(token, (res) => {
        if (res) {
          console.log('RES from app.js', res);
          this.setState({
            isAuthenticated: true,
          });
        }
      });
    }
  }

  Auth = new AuthService();

  // ChangeAuth helps keep track of the state if the user is logged in or not
  changeAuth = () => {
    this.setState({
      isAuthenticated: true,
    });
  }

  logout = () => {
    localStorage.removeItem('tkid');
    this.setState({
      isAuthenticated: false,
    });
  }

  updateUserState = () => {};

  render() {
    return (
      <Fragment>
        <Navbar auth={this.state.isAuthenticated} logout={this.logout} />
        <Main changeAuth={this.changeAuth} isAuth={this.state.isAuthenticated} />
      </Fragment>
    );
  }
}

export default App;
