import Axios from 'axios';

const API = Axios.create({ 
      baseURL: "http://localhost:8800",
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
      },
});

API.interceptors.request.use((req) => {
      if(localStorage.getItem('userProfile')) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userProfile')).token}` || ""; 
      }
      return req;
});
//USER  REGISTRATION
export const userRegistration = (formdata) => API.post('/register', formdata);
//USER LOGIN
export const userSignIn = (formdata) => API.post('/login', formdata);

//CREATE MEMORIES
export const fetchAllMemories = () => API.get('/memories');

//GET MEMORIES
export const createMemory = (formdata) => API.post('/creatememory', formdata);

//UPDATE MEMORIES
export const updateMemory = (id, formdata) => API.put(`/updatememory/${id}`, formdata);
//UPDATE MEMORIES
export const likeAndDislikeMemory = (id, creator) => API.put(`/like-and-dislike/${id}`, {creator});

//DELETE MEMORIES
export const deleteMemory = (id) => API.delete(`/deletememory/${id}`);