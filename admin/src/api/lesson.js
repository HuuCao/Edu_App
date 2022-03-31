import axiosClient from './axiosClient';

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGYwN2Q2N2ZmOWM3YTJjYTBmMDFkOWYiLCJmdWxsbmFtZSI6Ikh1dSBDYW8iLCJtYWlsIjoiaGNhbzIxMDhAZ21haWwuY29tIiwicGhvbmUiOiIwNzk4MDEyNDE2IiwiYmlydGhkYXkiOiIyMS8wOC8yMDAwIiwiY3JlYXRlZEF0IjoiRnJpIEp1bCAxNiAyMDIxIDAxOjI0OjM4IEdNVCswNzAwIChJbmRvY2hpbmEgVGltZSkiLCJpc19hY3RpdmUiOnRydWUsImF2YXRhciI6IiAiLCJoaXN0b3J5IjpbXSwiY2xhc3NJRCI6MCwicm9sZSI6InRlYWNoZXIiLCJpZFVzZXIiOjEzLCJsYXN0TG9naW4iOiJUaHUgSnVsIDE1IDIwMjEgMTg6MjQ6NTMgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsImV4cCI6MjQ5MDc2NzUzOCwiaWF0IjoxNjI2NzY3NTM4fQ.DeaQXYLeRWW6QWYOcDl6ZtSqjcInT7Uvh4cfmpmOf1iSy5N-w1SK7_Y4USvstdp32sGNRh_9M91EjGkcem5CVHVZk1SNKAD573VdQhBjBMJb8pHii7gFuFH32OT9HlMo8yCGp6yNIzAY2Qi6a1tn90u6uqwp-ez5XrxfK9uqS_Q';
const lesson = {
  getLessonByID: (params = {}) => {
    const url = '/lesson/getlessondetail';
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: localStorage.accessToken || sessionStorage.accessToken,
      },
    });
  },
  addLesson(data) {
    const url = '/lesson/insertlesson';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: localStorage.accessToken || sessionStorage.accessToken,
      },
    });
  },
  updateLesson(id, data) {
    const url = '/lesson/updateLesson?lessonID=' + id;
    return axiosClient.post(url, data, {
      headers: {
        Authorization: localStorage.accessToken || sessionStorage.accessToken,
      },
    });
  },
};
export default lesson;
