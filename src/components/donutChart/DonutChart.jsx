import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import useReports from '../../hooks/useReport';
import "./mmo.css"

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DonutChart = ({ dataToChart }) => {
  // console.log(dataToChart);
  const { getReports, historyReports } = useReports()
  console.log(dataToChart);

  const options = {
    exportEnabled: false,
    height: 250,
    animationEnabled: true,
    theme: "light",
    toolTip: {
      backgroundColor: "#333",  // Background color of the tooltip
      borderColor: "#aaa",      // Border color of the tooltip
      fontColor: "#fff",        // Text color inside the tooltip
      fontSize: 14,             // Font size of the tooltip text
      fontStyle: "bold",
      label: "ffde",            // Font style (optional)
      cornerRadius: 5,
      contentFormatter: function (e) {
        // Manually format tooltip content with inline styles
        return `
          <div style="text-align: end; color: #fff; font-size: 14px;">
            <b>${e?.entries[0]?.dataPoint?.openReport ? "תקלות פתוחות" : "תקלות סגורות"} <br>
            <b style="color: #5a6acf;">${e?.entries[0]?.dataPoint?.name}</b>: ${e?.entries[0]?.dataPoint?.y} <br>
            <b style="color: #c7ceff;">אחוזים: ${e?.entries[0]?.dataPoint?.percent?.toFixed(2)}%</b>
          </div>`;
      }                // Tooltip corner radius
    },
    data: [{
      // type: "doughnut",  // Changed from "doughnut" to "pie"
      type: "pie",  // Changed from "doughnut" to "pie"
      startAngle: 90,
      yValueFormatString: "#,##0.0#",
      radius: "80%",           // Controls the size of the pie
      // toolTipContent: "<b>{name}</b>: {y} <br /> <b>אחוזים:{percent}%</b> ",
      // toolTipContent: "<div style='text-align: left;'><b>{name}</b>: {y} <br /> <b>אחוזים: {percent}%</b></div>",

      dataPoints: dataToChart   // Use your data here
    }]
  };

  // const options = {
  //   exportEnabled: false,
  //   height: 250,
  //   animationEnabled: true,
  //   theme: "light",
  //   toolTip: {
  //     backgroundColor: "#333",  // Background color of the tooltip
  //     borderColor: "#aaa",      // Border color of the tooltip
  //     fontColor: "#fff",        // Text color inside the tooltip
  //     fontSize: 14,             // Font size of the tooltip text
  //     fontStyle: "bold",
  //     label: "ffde",// Font style (optional)
  //     cornerRadius: 5           // Tooltip corner radius
  //   },
  //   data: [{
  //     type: "doughnut",
  //     startAngle: 90,
  //     yValueFormatString: "#,##0.0#",
  //     radius: "80%", // Controls the size of the doughnut
  //     innerRadius: "80%", // Controls the width of the doughnut ring
  //     toolTipContent: "<b>{name}</b>: {y}",
  //     // dataPoints
  //     // dataToChart
  //     dataPoints: dataToChart
  //   }]
  // };

  return (

    <div className='relative '>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text font-semibold">פילוח תקלות</div>
          <div className="text-[#8c8c8c]">תקלות פתוחות בחתך נושא</div>
        </div>
        {/* <div className="px-7 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">
          <button>היום</button>
        </div> */}
      </div>
      <div className="relative ">
        <CanvasJSChart options={options} />
        <div className="absolute -bottom-8 shadow-sm overflow-auto rounded-sm h-16 z-20 w-full">
          <div className="flex flex-wrap">
            {dataToChart?.map((item, index) => (<div key={index} className=" flex items-center gap-1 mx-2">
              <div className={`w-3 h-3 bg-[#bbb] rounded`} style={{ backgroundColor: item.color }} />
              <div className="">{item?.name ? item.name : "אין שם"}</div>
            </div>))}
          </div>
        </div>
        <div className=" bg-background h-3 w-16 absolute bottom-0 right-0" />
      </div>
    </div>
  );
};

export default DonutChart;
