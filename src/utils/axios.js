/* 这是back-end server, 用来make HTTP requests and responses. */

import axios from 'axios';
import { clearStore } from '../features/user/userSlice';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({       /* 为了不每次都写很长的链接 */
    baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',    /* endpoint */
});


/*  handling authentication: 这个可以统一搞定token */
customFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;    /* 用header来认证 */
    }
    return config;
});

/* 万一有unauthorized permission, 就log out */
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
    if (error.response.status === 401) {      /* 401: unauthorized permission */
      thunkAPI.dispatch(clearStore());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;