import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const HelpRequestSummary = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Help Requests Over Time',
      data: [20, 30, 25, 35, 40],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderWidth: 1,
      fill: true,
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
    <div className="help-request-summary p-4 bg-white shadow-md rounded-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Help Requests Summary</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default HelpRequestSummary;
