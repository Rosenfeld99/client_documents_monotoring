import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, scales } from 'chart.js';
import CustomSelect from '../../utils/CustomSelect';
import { translateFieldsToEnglish } from '../../constant/translateObj';

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ColumnChart = ({ dataToChart, optionsSelect, setColumnChartSelect }) => {

  const funcSetToSelect = (value) => {
    const label = translateFieldsToEnglish[value] ?? value

    setColumnChartSelect((prev) => ({ ...prev, label }))
  }
  // Data for the chart
  const data = {

    labels: dataToChart && dataToChart?.label,
    datasets: [
      {
        label: 'תקלות פתוחות',
        data: dataToChart && dataToChart?.openReportsData,
        borderColor: 'rgba(90, 106, 207, 1)',
        backgroundColor: 'rgba(90, 106, 207, 1)',
        borderWidth: 2,
        borderSkipped: false,
        categoryPercentage: 0.8,  // Width of the category (group of bars) relative to available space
        barPercentage: 1,         // Width of the bars rel
        barPercentage: dataToChart?.label?.length > 1 ? 0.6 : 0.2,
      },
      {
        label: 'תקלות סגורות',
        data: dataToChart && dataToChart?.closeReportsData,
        borderColor: 'rgba(90, 106, 207, 0.5)',
        backgroundColor: 'rgba(90, 106, 207, 0.5)',
        borderWidth: 2,
        categoryPercentage: 0.8,  // Width of the category (group of bars) relative to available space
        barPercentage: 1,         // Width of the bars rel
        borderSkipped: false,
        barPercentage: dataToChart?.label?.length > 1 ? 0.6 : 0.2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },

    },
    scales: {
      x: {
        stacked: true,
      },

      y: {
        stacked: true,

        // max: dataToChart?.maxHeight + (5 - dataToChart?.maxHeight % 5),

        ticks: {
          stepSize: dataToChart?.maxHeight > 20 ? 5 : 10, // Optional: Set step size between ticks
        },
      },
    },
  };

  return (
    <div className='relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text font-semibold">פילוח תקלות</div>
          <div className="text-[#8c8c8c]">  תקלות פתוחות בחתך נושאים (לחצו על הכותרות לסינון)</div>
        </div>
        {/* <div className="px-7 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">
           <button>היום</button>
         </div> */}
        <div className='min-w-52 w-fit'>
          <CustomSelect defaultValue={"יחידה מטפלת"} setState={funcSetToSelect} options={optionsSelect} />
        </div>
      </div>
      <Bar style={{ height: "30px" }} data={data} options={options} />
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
//           <div className="text-text font-semibold">פילוח תקלות</div>
//           <div className="text-[#8c8c8c]">תקלות פתוחות בחתך נושא</div>
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
