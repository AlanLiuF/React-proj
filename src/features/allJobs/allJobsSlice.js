import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

const initialFiltersState = {
  /* 前四个分别是search栏的第四个栏 */
  search: '',
  searchStatus: 'all',    /* 延用jobSlice里的status和statusOptions */
  searchType: 'all',      /* jobType和jobTypeOptions */
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  jobs: [],     /* 列表里的每个元素就roughly相当于jobSlice里的一个state */
  totalJobs: 0,     /* will change based on our search request */
  numOfPages: 1,   /* will change based on our search request */
  page: 1,     /* looking for first page */
  stats: {},     /* Stats页面相关的数据 */
  monthlyApplications: [],    /* Stats页面相关的数据 */
  ...initialFiltersState,
};

/* getAllJobs这个函数不带任何参数, 所以async (_, thunkAPI)的第一个param是_ */
export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);

/* Stats页面用的*/
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {   /* 在这里建立showLoading和hideLoading,并在jobSlice里调用. (deleteJob需要用) */ 
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {    /* filter search时候用 */
      state.page = 1;
      state[name] = value;   /* 每次在search container改变值，state value is going to change accordingly */
    },
    clearFilters: (state) => {   /* 点击clear filters button时调用 */
      return { ...state, ...initialFiltersState };    /* 把state都初始化 */
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /* 对getAllJobs进行pending, fulfilled, rejected情况下的设置 */
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        /* jobs的state-control: 让state等于resp.data里的jobs */
        state.jobs = payload.jobs;    /* 本来state.jobs是空列表，但dispatch getAllJobs之后里面有了东西 */
        state.numOfPages = payload.numOfPages;   /* state-control */
        state.totalJobs = payload.totalJobs;       /* state-control */
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      /* 对showStats也进行同样的设置 */
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        /* 这个showStats的get request从url里return两个东西:
        defaultStats:{pending:24,interview:27,declined:24},
        monthlyApplications:[{date:"Nov 2021",count:5},{date:"Dec 2021",count:4} ]
        */
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
