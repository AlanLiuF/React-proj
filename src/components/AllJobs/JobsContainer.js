/* 整个检索(searchContainer)并呈现(JobsContainer)这件事的逻辑:
用户在SearchContainer的栏里输入了筛选条件，这些条件被allJobsSlice里的handleChange接下，意味着
被allJobsSlice里的state所控制.（某栏输入后立马filter, 没有统一的submit button)
在jobsContainer里，用useEffect调用getAllJobs(), 这个函数从server的url里取jobs数据，并通过fulfilled里的
state.jobs = payload.jobs让allJobsSlice里的state填充上jobs. 之后我们再从store.allJobs得到jobs property, 
把它用map render到底下return的JSX里，呈现在UI.
*/

import { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import { getAllJobs } from '../../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';


const JobsContainer = () => {
  const {
    jobs,    /* 一个列表：每个元素是一个job */
    isLoading,
    page,     /* 当前所处的页码 */
    totalJobs,   /* jobs的总数 */
    numOfPages,   /* 总页数 */
    search,          /* searchContainer里的第一个栏 */
    searchStatus,    /* searchContainer里的第二个栏 */
    searchType,      /* searchContainer里的第三个栏 */
    sort,            /* searchContainer里的第四个栏 */
  } = useSelector((store) => store.allJobs); /*相比于jobSlice, allJobsSlice更加宏观 */
  const dispatch = useDispatch();



  /* 每当当前所处页面(page), 关键词检索(search), 栏里用户选的状态(searchStatus)
  等变化的时候，就dispatch getAllJobs这个函数 */
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);



  if (isLoading) {     /* 如果在载入，就显示正在载入 */
    return <Loading />;
  }

  if (jobs.length === 0) {    /* 如果have no job to display: */
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found   {/* 如果只有一个job, 就单数 */}
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;      
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}   {/* 当大于一页的时候才有PageBtnContainer */}
    </Wrapper>
  );
};
export default JobsContainer;
