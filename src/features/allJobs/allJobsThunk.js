import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';


export const getAllJobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;
  /* server的url是与不同筛选条件相对应的 */
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);    /* 从特定的url里取数据 */
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};


/* 服务于Stats page的函数 */
export const showStatsThunk = async (_, thunkAPI) => {   /* not pass param */
  try {
    const resp = await customFetch.get('/jobs/stats');
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
