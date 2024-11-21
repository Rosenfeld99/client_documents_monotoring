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
  console.log(dataToChart);

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

      }
    ],
    axisX: {
      margin: 14,
      labelAutoFit: true, // Ensures labels fit without skipping
      labelWrap: true,    // Wraps long labels
      interval: dataToChart?.length > 10 ? 1 : undefined, // Show every label without skipping
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
          <div className="text-[#8c8c8c]">תקלות פתוחות בחתך נושא</div>
        </div>
        {/* <div className="px-7 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">
          <button>היום</button>
        </div> */}
        <div className='min-w-52 w-fit'>

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
