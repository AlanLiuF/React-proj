/* 用来做JobsContainer.js的 */
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment';
import { deleteJob, setEditJob } from '../../features/job/jobSlice';


const Job = ({
  _id,    /* 这些是props that we pass in from <Job key={job._id} {...job} /> in JobsContainer */
  position,   /* 传入Job里，以便在return的JSX中render */
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {

  const dispatch = useDispatch();

  const date = moment(createdAt).format('MMM Do, YYYY');    /* 获取时间，作为之后的date JobInfo component */

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>   {/* display首字母作为icon */}
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />    {/* JobInfo component */}
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  setEditJob({       /* 每次点击，触发setEditJob */
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteJob(_id))}     /* 每次点击，触发deleteJob */
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
