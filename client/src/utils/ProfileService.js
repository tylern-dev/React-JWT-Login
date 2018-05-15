/* This Profile Auth service is used to update the user's profile on the server */
import axios from 'axios';

export default class ProfileService {
  constructor() {
    this.token = localStorage.getItem('tkid');
  }

  updateProfile = userData =>
    // const token = localStorage.getItem('tkid');
    // Promise allows for use of .then and .catch
    new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: '/apiUser/profileUpdate',
        headers: { Authorization: `Bearer ${this.token}` },
        data: userData,
      })
        .then((response) => {
          // console.log('updateProfile Update', response);
          resolve(response);
        })
        .catch((err) => {
          // console.log('UpdateProfile Error', err);
          reject(err);
        });
    })
}
