/* 整个检索(searchContainer)并呈现(JobsContainer)这件事的逻辑:
用户在SearchContainer的栏里输入了筛选条件，这些条件被allJobsSlice里的handleChange接下，意味着
被allJobsSlice里的state所控制.（某栏输入后立马filter, 没有统一的submit button)
在jobsContainer里，用useEffect调用getAllJobs(), 这个函数从server的url里取jobs数据，并通过fulfilled里的
state.jobs = payload.jobs让allJobsSlice里的state填充上jobs. 之后我们再从store.allJobs得到jobs property, 
把它用map render到底下return的JSX里，呈现在UI.
*/

import { FormRow, FormRowSelect } from '..';   /* 以便text input和selectinput */
import Wrapper from '../../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../../features/allJobs/allJobsSlice';
import { useState, useMemo } from 'react';

const SearchContainer = () => {
  /* 把search改为localSearch, 只有当user stop typing才update the global value `search` */
  const [localSearch, setLocalSearch] = useState('');

  /* 能look for ‘search, searchStatus’等properties是因为initialFiltersState在allJobsSlice里 */
  /* 不再需要search, 因为变成上面的localSearch了 */
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);

  /* 从jobSlice里取这两个变量用于当作return的JSX的form的options lists */
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    /* 每次用户改变筛选条件时候，调用allJobsSlice里的handleChange */
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  /* handleChange长这样:
  handleChange: (state, { payload: { name, value } }) => {   
  state.page = 1;
  state[name] = value;     */


  /* purpose of debouncing is to delay the execution of a function until a 
  certain period of time has passed without the function being called again. */
  const debounce = () => {     /* debounce: search something with delay */
    let timeoutID;    /* a variable store the identifier returned by the setTimeout function */
    return (e) => {
      setLocalSearch(e.target.value);    /* update local search */
      clearTimeout(timeoutID);    /* any previously scheduled dispatches are canceled before scheduling a new one. */
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);    /* one second after stop typing, we want to update global search/dispatch action*/
    };
  };
  /* we only want to run debounce once when the application (component) loads */
  const optimizedDebounce = useMemo(() => debounce(), []);



  const handleSubmit = (e) => {   /* 每次点击clear filter button, 就执行allJobsSlice里的clearFilters */
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());    
  };


  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}     /* value represent localSearch */
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}   /* 必须得有all option, 保留全集 */
          />

          {/* search by type*/}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}      /* 调用 clearFilters() */
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
