import { useEffect } from 'react';
/* Stats页面是由StatsContainer和ChartsContainer组成 */
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());      /* 在这里调用showStats */
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />     {/* 显示job状态 (pending/interview/declined)： */}
      {/* 显示柱状图/区域图来统计每个月分别投了多少： */}
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
