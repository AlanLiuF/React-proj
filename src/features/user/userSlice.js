import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from './userThunk';



const initialState = {     /* 后面管这个叫state */
  isLoading: false,
  isSidebarOpen: false,         /* dashboard里用户toggle sidebar */
  user: getUserFromLocalStorage(),      /* 初始状态应该是在local storage里的状态 */
};


export const registerUser = createAsyncThunk(
  /* 第一个参数：prefix */
  'user/registerUser',        /* 命名 descriptive name */
  /* 第二个参数:async funct: 
  receives dispatch and getState as arguments and can dispatch actions and access the Redux store state. */
  async (user, thunkAPI) => {     /* Register page的用户输入被传入到user这个变量里 */
    return registerUserThunk('/auth/register', user, thunkAPI);     /* 被封装在userThunk里 */
  }
);


export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {     /* Login page的用户输入被传入到user这个变量里 */
    return loginUserThunk('/auth/login', user, thunkAPI);
  }
);


/* 为了实现dashboard-profile中更新user信息：PATCH /auth/updateUser */
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {   /* 这里的user就是profile里的userData */
    /* 保证只有特定的user本身才能更新自己的信息 */
    return updateUserThunk('/auth/updateUser', user, thunkAPI);
  }
);


/* 1.axios.js里unauthorized的情况下调用的函数 */
/* 2.navbar右上角log out user时调用的函数 */
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {    /* The reducers: object that defines the actions that can be dispatched to modify the state. */
    toggleSidebar: (state) => {       /* dashboard的SharedLayout的用于toggle sidebar的reducer */
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {     /* 用于log out user的reducer */
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {      /* 当registerUser在pending时, isLoading是true */
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {   /* 当registerUser完成时 */
        const { user } = payload;   /* payload就是what we return in registerUser的post (即resp.data) */
        state.isLoading = false;
        state.user = user;       /* control state */
        addUserToLocalStorage(user);    /* 如果成功，就把`user`加进local storage */
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;       /* 当registerUser失败时, isLoading是false */
        toast.error(payload);
      })
      /* 对loginUser也操作一组一样的： */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      /* 对更新用户也操作一组一样的 */
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      /* clearStore */
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error..');
      });
  },
});

/* 把togglesidebar和logoutuser导出, 以便之后在navbar中dispatch */
export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
