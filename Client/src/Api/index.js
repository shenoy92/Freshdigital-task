import Auth from "../Auth/Auth";
import axios from 'axios'
const API = axios.create({ baseURL: 'https://freshdigital-task.herokuapp.com/'});

API.interceptors.request.use((req) => {
  const token = Auth.getAuthToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginApi = (data) => API.post('/user/login', data);
export const registrationApi=(data)=>API.post('/user/registration', data);
export const profileDataApi = () => API.get('/post');
export const postDataApi=(data)=>API.post('/post',data)
export const likePost = (id) => API.patch(`/post/${id}/likePost`);