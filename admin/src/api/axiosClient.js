import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
  // timeout: 3000,
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;

    return response.data;
  },
  (error) => {
    //handle error
    console.log(error);
    throw error;
  }
);

export default axiosClient;
