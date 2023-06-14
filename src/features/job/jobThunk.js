import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';

/* AddJob page用 */
export const createJobThunk = async (job, thunkAPI) => { /* job就是position, company, jobLocation, jobType, status */
  try {
    const resp = await customFetch.post('/jobs', job);     /* 有了interceptor, 不需要header认证了 */
    thunkAPI.dispatch(clearValues());    /* 点过submit了，页面自动被清空 */
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};



export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());   /* 先让loading着，因为JobsContainers正在using it */
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());    /* 如果成功了，就得再render一次get all jobs */
    return resp.data.msg;       /* 在extreReducer里toast payload的时候，能显示Success! Job Removed. */
  } catch (error) {
    thunkAPI.dispatch(hideLoading());   /* 如果报错，就停止loading, 不然会有infinite spinner */
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};


/* AddJob page用 */
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
