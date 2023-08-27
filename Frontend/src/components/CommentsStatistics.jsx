import React from 'react';
import ApexCharts from 'react-apexcharts';

const CommentsStatistics = () => {
  const pieOptions = {
    labels: ['Apples', 'Bananas', 'Cherries', 'Dates'],
  };

  const barOptions = {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
  };

  const columnOptions = {
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  };

  const lineOptions = {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
  };

  const areaOptions = {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
  };

  const donutOptions = {
    labels: ['Red', 'Green', 'Blue'],
  };

  const series = [
    {
      name: 'Series 1',
      data: [30, 40, 45, 50, 49, 60, 70],
    },
  ];

  return (
    <div className='overflow-y-scroll p-8'>
      <h2>Pie Chart</h2>
      <ApexCharts
        options={pieOptions}
        series={[20, 25, 15, 40]}
        type="pie"
        height={300}
      />

      <h2>Bar Chart</h2>
      <ApexCharts
        options={barOptions}
        series={series}
        type="bar"
        height={300}
      />

      <h2>Column Chart</h2>
      <ApexCharts
        options={columnOptions}
        series={series}
        type="bar"
        height={300}
      />

      <h2>Line Chart</h2>
      <ApexCharts
        options={lineOptions}
        series={series}
        type="line"
        height={300}
      />

      <h2>Area Chart</h2>
      <ApexCharts
        options={areaOptions}
        series={series}
        type="area"
        height={300}
      />

      <h2>Donut Chart</h2>
      <ApexCharts
        options={donutOptions}
        series={[44, 55, 13]}
        type="donut"
        height={300}
      />
    </div>
  );
};

export default CommentsStatistics;
