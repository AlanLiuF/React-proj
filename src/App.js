import { BrowserRouter, Routes, Route } from 'react-router-dom';   /* React-Router */
import { ToastContainer } from 'react-toastify';    /* toast是负责alert的package */
import 'react-toastify/dist/ReactToastify.css';
import {Landing, Error, Register, ProtectedRoute} from './pages';
/* dashboard由很多页面组成：*/
import { Profile, AddJob, AllJobs, Stats, SharedLayout } from './pages/dashboard';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'             /* dashboard是home */
          element={
          /* 把sharedlayout用protectedRoute wrap起来（没登录就进不来 */
          <ProtectedRoute>       {/* 其实，我们是把所有dashboard pages都restrict access了 */}
            <SharedLayout />     
          </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />      {/* http://localhost:3000/ */}
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path = 'landing' element = {<Landing />} />
        <Route path = 'register' element = {<Register />} />
        <Route path = '*' element = {<Error />} />   
      </Routes>
      <ToastContainer position = 'top-center'/>
    </BrowserRouter>
  );
}

export default App;
