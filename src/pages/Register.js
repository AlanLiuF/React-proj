import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import styled from 'styled-components';    /* 允许我们在Javascript里写css, 并且针对unique js文件 */ 
import {toast} from 'react-toastify';
/* redux的使用: useSelector允许我们在任何文件里选择store.js里的properties. */
            /* useDispatch允许我们访问并执行Slice里定义的reducers functions */
import { useSelector, useDispatch } from 'react-redux';   
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';


const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,    /* 保证初始状态是login page */
  };

function Register() {
    const [values, setValues] = useState(initialState);     /* values就代表name, email. pw, isMemebr */

    const {user, isLoading} = useSelector((store) => store.user);    /* 以备访问store.js里的properties */
    const dispatch = useDispatch();

    const nagivate = useNavigate();     /* 负责引向dashboard */

    /* 每次输入都要被update state */
    const handleChange = (e) => {      /* 这是为了setValues来控制state的 */
        const name = e.target.name;    /* e就是用户输入, 要做成controlled inputs */
        const value = e.target.value;    
        setValues({ ...values, [name]: value });   /* 这里的name可以是name/email/pw; value就是用户输入 */
    };


    /* 每当用户点submit, 就用loginuser和registerUser和后台server交互 */
    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {    /* 当不是member的情况下没有提供name, 也要提示 */
          toast.error('Please fill out all fields');
          return;     /* return是保证下面不执行的 */
        }
        if (isMember) {    /* 当是会员的时候，调用loginUser函数，函数的作用是往后台server里post用户输入信息 */
          dispatch(loginUser({ email: email, password: password }));    
          return;
        }
        dispatch(registerUser({name: name, email: email, password: password}));
    };
    

    const toggleMember = () => {
      setValues({...values, isMember: !values.isMember});
    };

    useEffect(() => {     /* 导航到dashboard页面 */
    if (user) {
      setTimeout(() => {     /* 两秒后导航走: delay the execution of callback funct */
        nagivate('/');
      }, 2000);
    }
    }, [user]);     /* listen for change on user: triggers a redirect to ('/') if the user value is truthy. */
    
    
    
    return (
      <Wrapper className = 'full-page'> 
        <form className = 'form' onSubmit = {onSubmit}>
        
          <Logo />

          {/* 如果是member就显示login, 如果不是就显示注册： */}
          <h3> {values.isMember ? 'Login' : 'Register'} </h3>

          {/* 下面是form的设计，已经在components文件夹中封装好了 */}
          {/* name field: （只有当需要注册的时候才被display) */}
          {!values.isMember && (<FormRow 
            type = 'text' 
            name = "name" 
            value = {values.name}     /* controlled input */
            handleChange = {handleChange} 
          />)}
          {/* email field: */}
          <FormRow 
            type = 'email' 
            name = "email" 
            value = {values.email} 
            handleChange = {handleChange} 
          />
          {/* password field: */}
          <FormRow 
            type = 'password' 
            name = "password" 
            value = {values.password} 
            handleChange = {handleChange} 
          />
          <button type = 'submit' className = 'btn btn-block' disabled = {isLoading}> 
            submit 
          </button>

          {/* 如果当前是login页面，就显示not a member yet */}
          <p> {values.isMember ? 'Not a member yet?' : 'Already a member?' }
            <button type = 'button' onClick = {toggleMember} className = "member-btn">
              {values.isMember ? 'Register' : 'Login'}    {/* button里的内容根据情况填register或者login */}
            </button>
          </p>

        </form>
      </Wrapper>
    )
}






const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`

export default Register;