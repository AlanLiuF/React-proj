/* 另一种auth的方法，与customFetch.interceptors实现同样功能 */
const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};

export default authHeader;
