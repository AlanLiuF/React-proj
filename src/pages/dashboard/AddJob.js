import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
/* clearValues是清空输入栏 */
import {handleChange,clearValues,createJob,editJob} from '../../features/job/jobSlice';
import { useEffect } from 'react';


const AddJob = () => {    /* 从jobSlice里取一些需要的变量 */
  const {
    isLoading,
    position,    /* 输入栏之一 */
    company,     /* 输入栏之一 */
    jobLocation,   /* 输入栏之一 */
    jobType,       /* 输入栏之一 */
    jobTypeOptions,
    status,       /* 输入栏之一 */
    statusOptions,
    isEditing,    /* 如果从All Jobs page的edit进入addjob page, 那title就是edit job */
    editJobId,
  } = useSelector((store) => store.job);
  
  const { user } = useSelector((store) => store.user);  /* 从userSlice里取一些需要的变量 */
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {    /* 如果没填全，就报错 */
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {    /* 如果是edit, 就调用editJob; (如果是add, 就调用createJob) */
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    /* 如果是第一次添加，就用createJob在server里POST用户输入 */
    dispatch(createJob({ position, company, jobLocation, jobType, status }));   /* 把用户输入传入createJob */
  };

  /* 和profile page略有不同，这个page没建立useState, 每次handleinput的时候，直接通过jobSlice的state来control */
  const handleJobInput = (e) => {  /* handleJobInput调用了jobSlice里的handlechange，相当于control state */
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };


  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: 'jobLocation',
          value: user.location,   /* 每次打开页面，location自动是user profile里的location */
        })
      );
    }
  }, []);


  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormRowSelect        /* 这里是带下拉框的用户输入栏 */
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type*/}  
          <FormRowSelect        /* 这里是带下拉框的用户输入栏 */
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}    /* 每次点submit旁边那个clear键，就清空user inputs */
            >
              clear
            </button>

            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
