import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice';


export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);       /* 往server中post用户输入 */
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {     /* 如果用户名/密码不匹配 (判断这件事server内部做了），就print Invalid credential */
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


/* 用在dashboard-profile page */
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);   /* 往url里更新user */
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};


/* axios.js里unauthorized的情况下调用的函数 */
export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
