// Make API Calls here

import axios from 'axios';

const THE_NEUK_API_URL = 'http://localhost:3000/api'
let TOKEN = localStorage.getItem("auth_token");

module.exports = {
  getUser: function() {
    var requestUrl = `${THE_NEUK_API_URL}/users/me`;

    return axios({
      method: 'get',
      url: requestUrl,
      headers: { 'Authorization': TOKEN }
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      if(error.response.status === 401) {
        throw new Error("Your logged in session expired. Please try logging in again");

      } else {
        throw new Error(error.message);
      }
    });
  },

  loginUser: function(user) {
    var requestUrl = `${THE_NEUK_API_URL}/login`;

    return axios({
      method: 'post',
      url: requestUrl,
      data: {
        email:    user.username,
        password: user.password
      }
    }).then(function(response) {
      TOKEN = response.data.token;
      return response.data;
    }).catch(function(error) {
      if(error.response.status === 401) {
        throw new Error("Login failed. Please try again");
      } else {
        throw new Error(error.message);
      }
    });
  },

  registerUser: function(user) {
    var requestUrl = `${THE_NEUK_API_URL}/register`;

    return axios({
      method: 'post',
      url: requestUrl,
      data: {
        first_name:   user.first_name,
        last_name:    user.last_name,
        email:        user.email,
        phone_number: user.phone_number,
        password:     user.password
      }
    }).then(function(response) {
      TOKEN = response.data.token;
      return response.data;
    }).catch(function(error) {
      if(error.response.status === 401) {
        throw new Error("Register failed. Please try again");
      } else {
        throw new Error(error.message);
      }
    });
  },

  updateUser: function(user) {
    var requestUrl = `${THE_NEUK_API_URL}/users/${user.id}`;

    return axios({
      method: 'put',
      url: requestUrl,
      headers: { 'Authorization': TOKEN },
      data: { 'user': user },
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      if(error.response.status === 401) {
        throw new Error("Your details were not updated. Please try again");
      } else {
        throw new Error(error.message);
      }
    });
  }
}
