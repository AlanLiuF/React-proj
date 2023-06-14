/* store.js是负责整合所有slice的 */
/* store是一个用来装slices的商店，每种slice都对不同的object行使了不同的功能 */
import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './features/job/jobSlice';       /* 所有的和addjob页有关的都放在这个slice */
import userSlice from './features/user/userSlice';     /* 所有和user有关的都放在这个slice */
import allJobsSlice from './features/allJobs/allJobsSlice';   /* 所有的和alljob页有关的都放在这个slice */
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});