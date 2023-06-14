/* dashboard里更改用户信息的页面 */

import { useState } from 'react';
import { FormRow } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components'
import { updateUser } from '../../features/user/userSlice';     /* userSlice里的功能 */

const Profile = () => {
    const {isLoading, user} = useSelector((store) => store.user);     /* 获得用户profile信息 */
    const dispatch = useDispatch();

    const [userData,setUserData] = useState({     /* 根据user object新建一个useState */
        name:user?.name ||'',
        email:user?.email ||'',
        lastName:user?.lastName ||'',
        location:user?.location ||'',
    });

    /* 整个事情的逻辑：先建立userData, 每次用户输入，就通过handleChange来control state来同步到input到userData, 
    最后点save changes就能调用handleSubmit来进一步调用userSlice里的updateUser. 
    updateUser这个函数里的async (user, thunkAPI)里的user其实就是userData, 
    通过updateUser.fulfilled的state.user = user, 我们实现了当更新时也能control userSlice的state  */
    const handleChange = (e) =>{    /* 每次用户在栏里输入，就控制name, email, lstName, loca */
        const name = e.target.name;
        const value = e.target.value;
        setUserData({...userData, [name]:value});
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, lastName, location } = userData;
        if (!name || !email || !lastName || !location) {
          toast.error('Please Fill Out All Fields');
          return;
        }
        /* 如果没问题，就更新用户信息 */
        dispatch(updateUser(userData));     /* 把接到的userData更新到后台server */
    };

    
   
    
    return (
        <Wrapper>
        <form className='form' onSubmit={handleSubmit}>
          <h3>profile</h3>
  
          <div className='form-center'>
            <FormRow
              type='text'
              name='name'
              value={userData.name}    /* controlled input */
              handleChange={handleChange}
            />
            <FormRow
              type='text'
              labelText='last name'
              name='lastName'
              value={userData.lastName}
              handleChange={handleChange}
            />
            <FormRow
              type='email'
              name='email'
              value={userData.email}
              handleChange={handleChange}
            />
            <FormRow
              type='text'
              name='location'
              value={userData.location}
              handleChange={handleChange}
            />
            <button className='btn btn-block' type='submit' disabled={isLoading}>
              {isLoading ? 'Please Wait...' : 'save changes'}
            </button>
          </div>
        </form>
        </Wrapper>
    );
};

export default Profile;



const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`