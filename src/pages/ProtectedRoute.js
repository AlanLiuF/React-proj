/* 保证没login前没法访问特定页面(dashboard)  */

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {     /* children这里是sharedlayout */
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;     /* if everything is correct, I want to return children */
};

export default ProtectedRoute;