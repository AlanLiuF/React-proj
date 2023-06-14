/* AllJobs由searchContainer (负责查询特定Job的部分) 和JobsContainer (负责展示jobs grids的地方) 组成 */

import { JobsContainer, SearchContainer } from '../../components';

const AllJobs = () => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
export default AllJobs;
