import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import useContextStore from '../../hooks/useContextStore';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ dataToChart }) => {

  if (!dataToChart || !dataToChart.label || !dataToChart.label.length) {
    return <div>אין נתונים להצגה</div>;
  }


  const data = {
    labels: dataToChart.label,
    // labels: dataToChart.label,

    datasets: [
      {
        label: 'תקלות ',
        data: [...dataToChart?.openReportsData, ...dataToChart.closeReportsData],
        backgroundColor: dataToChart?.pieColors,
        // backgroundColor: ["red", "blue"],
        borderColor: 'rgba(90, 106, 207, 0)',
        // borderWidth: 2,

      },

    ],
  };

  const options = {
    responsive: true,
    type: "pie",
    plugins: {
      legend: {
        position: 'top',

      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.chart.data.labels[tooltipItem.dataIndex - dataToChart?.closeReportsData.length];
            const value = tooltipItem.raw;
            console.log(dataToChart?.totalPieReports);

            const percentage = ((value / dataToChart?.totalPieReports) * 100).toFixed(2);

            return `תקלות:${value},  אחוזים :${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className='relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text font-semibold">פילוח תקלות</div>
          <div className="text-[#8c8c8c]">תקלות פתוחות בחתך נושאים</div>
        </div>
      </div>
      <div className="relative w-5/6 h-5/6">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;
