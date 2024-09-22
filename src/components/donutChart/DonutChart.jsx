import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DonutChart = () => {

  const dataPoints = [
    { name: "תשתיות", y: 40, color: "#5a6acf" },
    { name: "מנו”ר", y: 33, color: "#c7ceff" },
    { name: "דסק תפעול", y: 26, color: "#8593ed" },
  ]

  const options = {
    exportEnabled: false,
    height: 250,
    animationEnabled: true,
    theme: "light",
    data: [{
      type: "doughnut",
      startAngle: 90,
      yValueFormatString: "#,##0.0#",
      radius: "80%", // Controls the size of the doughnut
      innerRadius: "80%", // Controls the width of the doughnut ring
      dataPoints
    }]
  };

  return (
    <div className=' relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text font-semibold">פילוח תקלות</div>
          <div className="text-[#8c8c8c]">תקלות פתוחות בחתך יחידות</div>
        </div>
        <div className="px-7 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">
          <button>היום</button>
        </div>
      </div>
      <div className="m-10 relative">
        <CanvasJSChart options={options} />
        <div className="absolute bottom-0 z-20 w-full">
          <div className=" flex items-center justify-between">
            {dataPoints.map((item, index) => (<div key={index} className=" flex items-center gap-2">
              <div className={`w-3 h-3 bg-[#bbb] rounded`} style={{ backgroundColor: item.color }} />
              <div className="">{item?.name}</div>
            </div>))}
          </div>
        </div>
        <div className=" bg-background h-3 w-16 absolute bottom-0 right-0" />
      </div>
    </div>
  );
};

export default DonutChart;
