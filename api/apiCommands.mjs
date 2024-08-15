import axios from './axiosConfig.mjs'

const loginUser = (email, password) => {
    const url = '/users/login'
    const data = {
      user: {
        email: email,
        password: password
      }
    };
    
    return axios.post(url, data)
      .catch(error => {
        console.error('Error:', error);
      });
};

export {loginUser}