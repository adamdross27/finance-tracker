// client/src/components/Chart/Chart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import { Chart } from 'chart.js';

Chart.register(ArcElement);

const CategoryChart = ({ data }) => {
  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      <Pie
        data={{
          labels: data.map((item) => item.category),
          datasets: [
            {
              data: data.map((item) => item.amount),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
          ],
        }}
      />
    </div>
  );
};

export default CategoryChart;
