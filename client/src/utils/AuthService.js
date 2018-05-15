/* AuthService handles all of the authentication requests on the server */
// consider changing callbacks to promises

import axios from 'axios';

export default class AuthService {
  constructor() {
    this.getToken = localStorage.getItem('tkid');
  }

  signIn = (email, password, cb) => {
    axios.post('/apiUser/login', { email, password })
      .then((response) => {
        cb(response);
        this.setToken(response.data.ssid);
      })
      .catch((err) => {
        cb(err);
      });
  }

  signUp = (email, password, cb) => {
    axios.post('/apiUser/signUp', { email, password })
      .then((response) => {
        this.setToken(response.data.ssid);
        cb(response);
      })
      .catch((err) => {
        console.log(err);
        cb(err);
      });
  }

  signOut = () => {
    localStorage.clear();
  }

  tokenCheck = (token, cb) => {
    axios({
      method: 'post',
      url: '/apiToken/verifyToken',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log('AUTH SERVICE RES---->', res);
        if (res.status === 200) {
          cb(res);
        } else {
          cb(false);
        }
      })
      .catch((err) => {
        console.log('PrivateRoute Err', err);
        if (err) {
          cb(false);
        }
      },
      );
  };

  changePassword = (token, pwData) =>
    new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: '/apiUser/updatePassword',
        headers: { Authorization: `Bearer ${token}` },
        data: pwData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch();
    })

  setToken = (tokenId) => {
    localStorage.setItem('tkid', tokenId);
  }
}
