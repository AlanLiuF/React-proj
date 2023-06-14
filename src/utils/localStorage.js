/* 建立local storage，让我们显示在UI上的数据不会随着刷新或者navigate away而丢失 */
/* 之后，会在userSlice里调用这三个函数 */

export const addUserToLocalStorage = (user) => {      /* takes a user object as a param and stores it in the localStorage */
    localStorage.setItem('user', JSON.stringify(user));    /* 只能存储JSON格式 */
};
  
/* we use this when we log out */
export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};
  
export const getUserFromLocalStorage = () => { 
    const result = localStorage.getItem('user');   
    const user = result ? JSON.parse(result) : null;    /* 如果localStorage里有东西, 就parse JSON格式的res into user*/
    return user;
};