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

const DonutChart = ({ dataToChart, isAllReportsVisible }) => {

  if (!dataToChart || !dataToChart.label || !dataToChart.label.length) {
    return <div>אין נתונים להצגה</div>;
  }
  const total = dataToChart?.totalPieReports;

  // Add a plugin for drawing percentage on the pie slices
  // const percentagePlugin = {
  //   id: 'percentagePlugin',
  //   beforeDraw: (chart) => {
  //     const { ctx, chartArea: { width, height }, data } = chart;
  //     const datasets = data.datasets[0].data;
  //     const total = datasets.reduce((acc, value) => acc + value, 0);

  //     ctx.save();
  //     datasets.forEach((value, index) => {
  //       const percentage = ((value / total) * 100).toFixed(1) + '%';
  //       const meta = chart.getDatasetMeta(0).data[index];
  //       const position = meta.tooltipPosition();

  //       ctx.font = '12px Arial';
  //       ctx.fillStyle = '#000'; // Change text color if needed
  //       ctx.textAlign = 'center';
  //       ctx.fillText(percentage, position.x, position.y);
  //     });
  //     ctx.restore();
  //   },
  // };
  // const percentagePlugin = {
  //   id: 'percentagePlugin',
  //   afterDraw: (chart) => {
  //     const { ctx, data } = chart;
  //     const datasets = data.datasets[0];

  //     const total = datasets?.data?.reduce((a, b) => a + b);

  //     ctx.save();
  //     datasets.data.forEach((value, index) => {
  //       const meta = chart.getDatasetMeta(0);

  //       if (meta.data[index].startAngle == meta.data[index].endAngle) return; // Skip hidden slices
  //       console.log(value, dataToChart?.totalPieReports);

  //       const percentage = ((value / total) * 100).toFixed(1) + '%';
  //       const label = data.labels ? data.labels[index] : '';
  //       const position = meta.data[index].tooltipPosition();

  //       // Set contrasting text color based on slice color
  //       const sliceColor = datasets.backgroundColor[index];
  //       // ctx.fillStyle = getContrastColor(sliceColor);

  //       // Draw percentage text

  //       ctx.font = `bold ${data.labels.length > 10 ? "8px" : "12px"}  Arial`;
  //       ctx.textAlign = 'center';
  //       ctx.textBaseline = 'middle';
  //       ctx.fillText(label, position.x, data.labels.length > 10 ? position.y - 7 : position.y - 12);
  //       ctx.fillText(percentage, position.x, position.y);
  //     });
  //     ctx.restore();
  //   },
  // };

  // good-const percentagePlugin = {
  //   id: 'percentagePlugin',
  //   afterDraw: (chart) => {
  //     const { ctx, data, tooltip } = chart;
  //     const datasets = data.datasets[0];

  //     if (!datasets || !datasets.data.length) return;

  //     const total = datasets.data.reduce((a, b) => a + b, 0);

  //     ctx.save();
  //     const isTooltipActive = tooltip && tooltip.opacity !== 0; // Check if any tooltip is active

  //     if (!isTooltipActive) {
  //       datasets.data.forEach((value, index) => {
  //         const meta = chart.getDatasetMeta(0);

  //         if (meta.data[index].startAngle === meta.data[index].endAngle) return; // Skip hidden slices

  //         const percentage = ((value / total) * 100).toFixed(1) + '%';
  //         let label = "";

  //         // check if the label is longer than 10 charecter
  //         if (data.labels) {
  //           console.log(data.labels[index].length);

  //           if (data.labels[index].length > 10) {
  //             label = data.labels[index].slice(0, 10)
  //           }
  //           else label = data.labels[index]
  //         }
  //         const position = meta.data[index].tooltipPosition();

  //         ctx.font = `bold ${data.labels.length > 10 ? '8px' : '12px'} Arial`;
  //         ctx.textAlign = 'center';
  //         ctx.textBaseline = 'middle';
  //         ctx.fillText(label, position.x, data.labels.length > 10 ? position.y - 7 : position.y - 12);
  //         ctx.fillText(percentage, position.x, position.y);
  //       });
  //     }
  //     ctx.restore();
  //   },
  // };

  const percentagePlugin = {
    id: 'percentagePlugin',
    afterDraw: (chart) => {
      const { ctx, data, tooltip } = chart;
      const datasets = data.datasets[0];

      if (!datasets || !datasets.data.length) return;

      const total = datasets.data.reduce((a, b) => a + b, 0);

      // Calculate the number of visible slices
      const meta = chart.getDatasetMeta(0);
      const visibleSlices = meta.data.filter(slice => slice.startAngle !== slice.endAngle).length;

      ctx.save();
      const isTooltipActive = tooltip && tooltip.opacity !== 0; // Check if any tooltip is active

      if (!isTooltipActive) {
        datasets.data.forEach((value, index) => {
          if (meta.data[index].startAngle === meta.data[index].endAngle) return; // Skip hidden slices

          const percentage = ((value / total) * 100).toFixed(1) + '%';
          let label = "";

          // Check if the label is longer than 10 characters
          if (data.labels) {
            if (data.labels[index].length > 10) {
              label = data.labels[index].slice(0, 10) + '...'; // Add ellipsis for long labels
            } else {
              label = data.labels[index];
            }
          }

          const position = meta.data[index].tooltipPosition();
          console.log(visibleSlices * 0.5);

          // Dynamically calculate font size based on the number of visible slices
          const baseFontSize = 16; // Maximum font size for fewer slices
          const minFontSize = 8;  // Minimum font size for many slices
          const fontSize = Math.max(
            minFontSize,
            baseFontSize - Math.floor(visibleSlices * 0.6) // Reduce size as slices increase
          );

          ctx.font = `bold ${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Render label
          ctx.fillText(label, position.x, position.y - fontSize); // Adjust Y position based on font size

          // Render percentage
          ctx.font = `bold ${fontSize - 2}px Arial`; // Slightly smaller font for percentages
          ctx.fillText(percentage, position.x, position.y + fontSize - 4);
        });
      }
      ctx.restore();
    },
  };





  const data = {
    labels: dataToChart.label,
    // labels: dataToChart.label,

    datasets: [
      {
        label: 'פניות ',
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
        labels: {
          // usePointStyle: true, // Optional for modern legend points
          boxWidth: 5,        // Box size for legend items
        },
      },
      datalbels: {
        formatter: (value, ctx) => {
          console.log(value, ctx);

        }
      },
      // tooltip: {
      //   backgroundColor: 'black',
      //   color: 'white',
      //   callbacks: {
      //     label: function (tooltipItem) {
      //       const label = tooltipItem.chart.data.labels[tooltipItem.dataIndex - dataToChart?.closeReportsData.length];
      //       const value = tooltipItem.raw;
      //       console.log(dataToChart?.totalPieReports);

      //       const percentage = ((value / dataToChart?.totalPieReports) * 100).toFixed(2);

      //       return `פניות:${value},  אחוזים :${percentage}%`;
      //     },
      //   },
      // },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // const label = tooltipItem.chart.data.labels[tooltipItem.dataIndex - dataToChart?.closeReportsData.length];
            const value = tooltipItem.raw;
            const percentage = ((value / dataToChart?.totalPieReports) * 100).toFixed(2);

            return `פניות:${value},  אחוזים :${percentage}%`;
          },
        },
        // position: 'custom',
        // positioner: function (tooltipItems, coordinates) {
        //   // Customize the position here
        //   return {
        //     x: coordinates.x + 20, // Shift 20px to the right
        //     y: coordinates.y + 10, // Shift 10px downward
        //   };
        // },
      },

    },
  };

  return (
    <div className='relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text font-semibold">פילוח פניות</div>
          <div className="text-[#8c8c8c]">             {isAllReportsVisible ? "פניות פתוחות וסגורות בחתך נושאים" : "פניות פתוחות בחתך נושאים"} (לחצו על הכותרות לסינון)
          </div>
        </div>
      </div>
      <div className="mt-3 w-[75%] ">
        <Pie width={500}
          height={220} data={data} options={options} plugins={[percentagePlugin]} />
      </div>
    </div>
  );
};

export default DonutChart;

// import React, { useRef } from 'react';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register necessary components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const DonutChart = ({ dataToChart, isAllReportsVisible }) => {
//   const chartRef = useRef(null);

//   const drawPercentages = (chart) => {
//     const { ctx, data } = chart;
//     const datasets = data.datasets[0].data;
//     const total = datasets.reduce((acc, value) => acc + value, 0);
//     const labels = data.labels;

//     ctx.save();
//     datasets.forEach((value, index) => {
//       const percentage = ((value / total) * 100).toFixed(1) + '%';
//       const meta = chart.getDatasetMeta(0).data[index];
//       const position = meta.tooltipPosition();

//       const label = labels[index];
//       // Draw the percentage text
//       ctx.font = datasets.length > 8 ? '12px Arial' : "12px Arial";
//       ctx.fillStyle = '#000'; // Adjust text color here
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle'; // Align text vertically
//       ctx.fillText(`${label}: ${percentage}`, position.x, position.y);
//       // ctx.fillText(percentage, position.x, position.y);
//     });
//     ctx.restore();
//   };

//   const data = {
//     labels: dataToChart.label,
//     datasets: [
//       {
//         label: 'פניות',
//         data: [...dataToChart.openReportsData, ...dataToChart.closeReportsData],
//         backgroundColor: dataToChart.pieColors,
//         borderColor: 'rgba(90, 106, 207, 0)',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => {
//             const value = tooltipItem.raw;
//             const percentage = ((value / dataToChart.totalPieReports) * 100).toFixed(2);
//             return `פניות:${value}, אחוזים :${percentage}%`;
//           },
//         },
//       },
//     },
//     animation: {
//       onComplete: () => {
//         if (chartRef.current) {
//           drawPercentages(chartRef.current);
//         }
//       },
//     },
//   };

//   return (
//     <div className="relative">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-text font-semibold">פילוח פניות</div>
//           <div className="text-[#8c8c8c]">
//             {isAllReportsVisible
//               ? 'פניות פתוחות וסגורות בחתך נושאים'
//               : 'פניות פתוחות בחתך נושאים'}{' '}
//             (לחצו על הכותרות לסינון)
//           </div>
//         </div>
//       </div>
//       <div className="mt-3 w-[90%] h-[90%]">
//         <Pie ref={chartRef} data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default DonutChart;

