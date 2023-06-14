import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

/* 每次add job了，就调用 */
export const createJob = createAsyncThunk('job/createJob', createJobThunk);   /* sent content to server */
/* 如果没有createJobThunk进行封装，那么createJob函数就是这样的:
export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    try {
      const resp = await customFetch.post('/jobs', job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
      if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
*/

/* 这个delete调用了showLoading和isLoading */
export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

/* editJob功能：每次edit job了，就调用 */
export const editJob = createAsyncThunk('job/editJob', editJobThunk);




const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    /* addJob页面的每次用户输入都在这里manage state */
    handleChange: (state, { payload: { name, value } }) => {    /* control state */
      state[name] = value;   /* 这里的name可以是position, company, status, ...; value就是对应的值 */
    },
    clearValues: () => {      /* 负责重写所有输入栏 */
      return {
        ...initialState,      /* 每次点clear button, set values to default state */
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {      /* 在allJob点击edit, 直接回到add job page, 可以编辑这个job信息 */
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
    /* createJob */
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Created');
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
    /* deleteJob */
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
    /* editJob */
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Modified...');
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
