import axiosClient from './axiosClient';

const upload = {
  async multi(image) {
    const baseURL =
      'https://workroom.viesoftware.vn:6060/api/uploadfile/google/multifile';
    const configs = { headers: { 'Content-Type': 'multipart/form-data' } };
    const fd = new FormData();
    fd.append('files', image);
    try {
      const res = await axiosClient.post(baseURL, fd, configs);
      if (res.success) return res.data[0];
      else return '';
    } catch (e) {
      return '';
    }
  },
};

export default upload;
