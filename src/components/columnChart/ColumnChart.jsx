import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import CustomSelect from '../../utils/CustomSelect';
import { translateFieldsToEnglish } from '../../utils/dashbordUtils';
import useReports from '../../hooks/useReport';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ColumnChart = ({ dataToChart, optionsSelect, setColumnChartSelect }) => {

  const funcSetToSelect = (value) => {
    const label = translateFieldsToEnglish[value] ?? value

    setColumnChartSelect((prev) => ({ ...prev, label }))
  }

  const getMaxYValue = () => {
    let maxYValue = 0;
    for (let index = 0; index < dataToChart?.length; index++) {
      maxYValue = dataToChart[index]?.y > maxYValue ? dataToChart[index]?.y : maxYValue
    }
    return maxYValue;
  }

  const maxYValue = getMaxYValue() + 2
  const options = {
    animationEnabled: true,
    height: 250,
    data: [
      {
        type: "column",
        dataPointWidth: 10,


        dataPoints: dataToChart,
        // dataPoints: [
        //   { label: "Apple", y: 10, color: "#5a6acf" },
        //   { label: "Orange", y: 15, color: "#5a6acf" },
        //   { label: "Banana", y: 25, color: "#5a6acf" },
        //   { label: "Mango", y: 30, color: "#5a6acf" },
        //   { label: "Grape abd text", y: 28, color: "#5a6acf" },
        // ],
      }
    ],
    axisX: {
      margin: 14,
      labelAutoFit: true, // Ensures labels fit without skipping
      labelWrap: true,    // Wraps long labels
      // viewportMinimum: 0, // Start from the first label
      // viewportMaximum: dataToChart.length - 1, // End at the last label
      interval: dataToChart.length > 10 ? 1 : undefined, // Show every label without skipping
      // labelAngle: -5, // Rotate labels if needed for better fit
      labelFontSize: 10, // Adjust label font size if needed
    },
    axisY: {
      // minimum: 0,   // Minimum value for Y-axis
      maximum: maxYValue, // Maximum value for Y-axis
      interval: maxYValue > 20 ? 10 : 1  // Interval between ticks
    }
  };

  return (
    <div className='relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text font-semibold">פילוח תקלות</div>
          <div className="text-[#8c8c8c]">תקלות פתוחות בחתך יחידות</div>
        </div>
        {/* <div className="px-7 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">
          <button>היום</button>
        </div> */}
        <div className='w-44'>

          <CustomSelect defaultValue={"יחידה מטפלת"} setState={funcSetToSelect} options={optionsSelect} />
        </div>
      </div>
      <div className="my-5 relative ">
        <CanvasJSChart options={options} />
        <div className=" bg-background h-3 w-16 absolute bottom-0 right-0" />
      </div>
    </div>
  );
};

export default ColumnChart;
