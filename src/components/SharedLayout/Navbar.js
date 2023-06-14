import Wrapper from '../../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from '../Logo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, clearStore } from '../../features/user/userSlice';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);       /* 用来show/hide dropdown的logout的 */
  const { user } = useSelector((store) => store.user);    /* 用于在navbar右上显示姓名的 */
  const dispatch = useDispatch();

  const toggle = () => {           /* toggle sidebar */
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}    /* 每次点击就toggle */
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>    {/* 选择是否显示dropdown */}
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => dispatch(clearStore('Logging out...'))}      /* 每次点log out, 就退出登录 */
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
