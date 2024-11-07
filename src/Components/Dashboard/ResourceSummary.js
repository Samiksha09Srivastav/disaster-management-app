import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const ResourceSummary = () => {
  const data = {
    labels: ['Medical Supplies', 'Food', 'Shelter', 'Others'],
    datasets: [{
      label: 'Resources Available',
      data: [40, 30, 20, 10],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="resource-summary p-4  w-96 bg-white shadow-md rounded-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Resource Summary</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ResourceSummary;
