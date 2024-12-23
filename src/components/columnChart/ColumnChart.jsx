import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, scales } from 'chart.js';
import CustomSelect from '../../utils/CustomSelect';
import { translateFieldsToEnglish } from '../../utils/constant/translateObj';

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
const ColumnChart = ({ dataToChart, optionsSelect, setColumnChartSelect, isAllReportsVisible }) => {

  const funcSetToSelect = (value) => {
    const label = translateFieldsToEnglish[value] ?? value

    setColumnChartSelect((prev) => ({ ...prev, label }))
  }
  // Data for the chart
  const data = {

    labels: dataToChart && dataToChart?.label,
    datasets: [
      {
        label: 'פניות פתוחות',
        data: dataToChart && dataToChart?.openReportsData,
        borderColor: 'rgba(90, 106, 207, 1)',
        backgroundColor: 'rgba(90, 106, 207, 1)',
        borderWidth: 2,
        borderSkipped: false,
        categoryPercentage: 0.8,  // Width of the category (group of bars) relative to available space
        barPercentage: 1,         // Width of the bars rel
        barPercentage: dataToChart?.label?.length > 1 ? 0.6 : 0.2,
      },
    ],
  };

  if (isAllReportsVisible) {
    data.datasets.push({
      label: 'פניות סגורות',
      data: dataToChart && dataToChart?.closeReportsData,
      borderColor: 'rgba(90, 106, 207, 0.5)',
      backgroundColor: 'rgba(90, 106, 207, 0.5)',
      borderWidth: 2,
      categoryPercentage: 0.8,  // Width of the category (group of bars) relative to available space
      barPercentage: 1,         // Width of the bars rel
      borderSkipped: false,
      barPercentage: dataToChart?.label?.length > 1 ? 0.6 : 0.2,
    },)
  }

  // // Chart options
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },

  //   },
  //   scales: {
  //     x: {
  //       stacked: true,
  //     },

  //     y: {
  //       stacked: true,

  //       // max: dataToChart?.maxHeight + (5 - dataToChart?.maxHeight % 5),

  //       ticks: {
  //         stepSize: dataToChart?.maxHeight > 20 ? 5 : 10, // Optional: Set step size between ticks
  //       },
  //     },
  //   },
  // };
  // Chart options with afterDatasetsDraw hook to draw values above bars

  const legendMarginPlugin = {
    id: 'legendMargin',
    beforeInit(chart) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function fit() {
        originalFit.bind(chart.legend)();
        this.height += 20; // Adjust this value to set the margin below the legend
      };
    },
  };


  // Chart options with a custom plugin
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          // usePointStyle: true, // Optional for modern legend points
          boxWidth: 5,        // Box size for legend items
          padding: 10,         // Adjust padding within legend items
        },

      },
      legendMargin: legendMarginPlugin,
      tooltip: {
        enabled: true,
      },
      // Custom plugin to draw numbers above bars
      datalabels: {
        display: true,
        color: '#000', // Text color
        font: {
          size: 12, // Font size
        },
        align: 'end',
        anchor: 'end',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,

        ticks: {
          stepSize: dataToChart?.maxHeight > 20 ? 5 : 1,
        },
        suggestedMax: dataToChart?.maxHeight + 1,
      },
    },
  };


  const drawNumbersPlugin = {
    id: 'drawNumbers',
    afterDatasetsDraw(chart) {
      // Apply the plugin only to Bar charts
      if (chart.config.type !== 'bar') return;

      const { ctx } = chart;
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);
        meta.data.forEach((bar, index) => {
          const value = dataset.data[index];
          if (value !== undefined) {
            const { x, y } = bar.tooltipPosition();
            ctx.save();
            ctx.fillStyle = '#000';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x, y - 10);
            ctx.restore();
          }
        });
      });
    },
  };

  // Register the plugin
  ChartJS.register(drawNumbersPlugin);

  return (
    <div className='relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text font-semibold">פילוח פניות</div>
          <div className="text-[#8c8c8c]">
            {isAllReportsVisible ? " פניות פתוחות וסגורות בחתך נושאים " : " פניות פתוחות בחתך נושאים "}
            (לחצו על הכותרות לסינון) </div>

        </div>
        {/* <div className="px-7 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">
           <button>היום</button>
         </div> */}
        <div className='min-w-52 w-fit'>
          <CustomSelect defaultValue={"יחידה מטפלת"} setState={funcSetToSelect} options={optionsSelect} />
        </div>
      </div>

      <Bar width={600}
        height={220}
        data={data} options={options} />
      <div className="my-5 relative ">
        <div className=" bg-background h-3 w-16 absolute bottom-0 right-0" />
      </div>
    </div>
  )
};

export default ColumnChart;

// import React from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';
// import CustomSelect from '../../utils/CustomSelect';
// import { translateFieldsToEnglish } from '../../utils/dashbordUtils';
// import useReports from '../../hooks/useReport';

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const ColumnChart = ({ dataToChart, optionsSelect, setColumnChartSelect }) => {

//   const funcSetToSelect = (value) => {
//     const label = translateFieldsToEnglish[value] ?? value

//     setColumnChartSelect((prev) => ({ ...prev, label }))
//   }
//   console.log(dataToChart);

//   const getMaxYValue = () => {
//     let maxYValue = 0;
//     for (let index = 0; index < dataToChart?.length; index++) {
//       maxYValue = dataToChart[index]?.y > maxYValue ? dataToChart[index]?.y : maxYValue
//     }
//     return maxYValue;
//   }

//   const maxYValue = getMaxYValue() + 2
//   const options = {
//     animationEnabled: true,
//     height: 250,
//     data: [
//       {
//         type: "column",
//         dataPointWidth: 10,


//         dataPoints: dataToChart,

//       }
//     ],
//     axisX: {
//       margin: 14,
//       labelAutoFit: true, // Ensures labels fit without skipping
//       labelWrap: true,    // Wraps long labels
//       interval: dataToChart?.length > 10 ? 1 : undefined, // Show every label without skipping
//       // labelAngle: -5, // Rotate labels if needed for better fit
//       labelFontSize: 10, // Adjust label font size if needed
//     },
//     axisY: {
//       // minimum: 0,   // Minimum value for Y-axis
//       maximum: maxYValue, // Maximum value for Y-axis
//       interval: maxYValue > 20 ? 10 : 1  // Interval between ticks
//     }
//   };

//   return (
//     <div className='relative'>
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-text font-semibold">פילוח פניות</div>
//           <div className="text-[#8c8c8c]">פניות פתוחות בחתך נושא</div>
//         </div>
//         {/* <div className="px-7 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">
//           <button>היום</button>
//         </div> */}
//         <div className='min-w-52 w-fit'>

//           <CustomSelect defaultValue={"יחידה מטפלת"} setState={funcSetToSelect} options={optionsSelect} />
//         </div>
//       </div>
//       <div className="my-5 relative ">
//         <CanvasJSChart options={options} />
//         <div className=" bg-background h-3 w-16 absolute bottom-0 right-0" />
//       </div>
//     </div>
//   );
// };

// export default ColumnChart;
