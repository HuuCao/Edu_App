import axiosClient from './axiosClient';

const subject = {
  getSubject(params = {}) {
    const url = '/subject';
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: localStorage.accessToken || sessionStorage.accessToken,
      },
    });
  },
};

export default subject;
