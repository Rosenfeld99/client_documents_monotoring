import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ColumnChart = () => {
  const options = {
    animationEnabled: true,
    height: 250,
    data: [
      {
        type: "column",
        dataPointWidth: 50,
        dataPoints: [
          { label: "Apple", y: 10, color: "#5a6acf" },
          { label: "Orange", y: 15, color: "#5a6acf" },
          { label: "Banana", y: 25, color: "#5a6acf" },
          { label: "Mango", y: 30, color: "#5a6acf" },
          { label: "Grape abd text", y: 28, color: "#5a6acf" },
        ],
      }
    ],
    axisX: {
      margin: 14
    }
  };

  return (
    <div className='relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text font-semibold">פילוח תקלות</div>
          <div className="text-[#8c8c8c]">תקלות פתוחות בחתך יחידות</div>
        </div>
        <div className="px-7 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">
          <button>היום</button>
        </div>
      </div>
      <div className="my-10 relative ">
        <CanvasJSChart options={options} />
        <div className=" bg-background h-3 w-16 absolute bottom-0 right-0" />
      </div>
    </div>
  );
};

export default ColumnChart;
