import React, { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';
const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {/* 如果是barChart, 就显示文字Area chart（方便调成area chart) */}
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {/* 根据选择来display barchart或者areaChart的component */}
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}   {/* data就是monthlyApplications */}
    </Wrapper>
  );
};
export default ChartsContainer;
