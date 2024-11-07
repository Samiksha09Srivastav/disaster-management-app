import React from 'react';
// For Chart.js and React Chart.js 2
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, LineElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement
);


const AlertSummary = () => {
  const data = {
    labels: ['Fire', 'Flood', 'Earthquake', 'Other'],
    datasets: [{
      label: 'Number of Alerts',
      data: [12, 5, 8, 3],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
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
    <div className="alert-summary p-4 bg-white shadow-md w-96 h-64 rounded-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Alert Summary</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AlertSummary;
