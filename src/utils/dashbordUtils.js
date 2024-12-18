import { translateFieldsToHebrow } from "../constant/translateObj";

const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
];

export const colors = [
    "#36A2EB", // Light Blue
    "#FF6384", // Soft Red
    "#FF9F40", // Orange
    "#FFCD56", // Yellow
    "#4BC0C0", // Teal
    "#36B1A4", // Teal Green
    "#FF7B94", // Pale Pink
    "#FF914D", // Coral
    "#FFCC4D", // Golden Yellow
    "#33B5E5", // Bright Sky Blue
    "#FF5E57", // Deep Coral
    "#FFBF69", // Peach
    "#FFA500", // Orange
    "#A0E3E5", // Light Mint
    "#F0E68C"  // Khaki Yellow
];

export const closeColors = [
    "rgba(54, 162, 235, 0.5)", // Light Blue
    "rgba(255, 99, 132, 0.5)", // Soft Red
    "rgba(255, 159, 64, 0.5)", // Orange
    "rgba(255, 205, 86, 0.5)", // Yellow
    "rgba(75, 192, 192, 0.5)", // Teal
    "rgba(54, 177, 164, 0.5)", // Teal Green
    "rgba(255, 123, 148, 0.5)", // Pale Pink
    "rgba(255, 145, 77, 0.5)", // Coral
    "rgba(255, 204, 77, 0.5)", // Golden Yellow
    "rgba(51, 181, 229, 0.5)", // Bright Sky Blue
    "rgba(255, 94, 87, 0.5)", // Deep Coral
    "rgba(255, 191, 105, 0.5)", // Peach
    "rgba(255, 165, 0, 0.5)", // Orange
    "rgba(160, 227, 229, 0.5)", // Light Mint
    "rgba(240, 230, 140, 0.5)"  // Khaki Yellow
];



export const formatHour = (timestamp) => {
    const date = new Date(timestamp);

    // Extract hours and minutes with zero padding if needed
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;

}

export const formatDay = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const formatWeek = (timestamp) => {
    const date = new Date(timestamp);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysDifference = (date - firstDayOfYear) / (24 * 60 * 60 * 1000);
    return `שבוע ${Math.ceil((daysDifference + 1) / 7)}`;

}

export const formatMonth = (timestamp) => {
    const date = new Date(timestamp);
    return monthNames[date.getMonth()];
}




export const formatDataToChartForBar = (historyReports, label, formatDateToDashboard, mode) => {

    // this is map by the filter that user want to show in dashbord

    let maxHeight = 1
    const openLabelsReports = {};
    const closeLabelsReports = {};
    const openReportsData = [];
    const closeReportsData = [];
    const pieColors = [];
    let totalPieReports = 0
    let index = 0;
    const pieMode = mode === "pie" ? "_סגורות" : ""
    console.log(pieMode);

    if (!historyReports || historyReports.length === 0) {
        return []; // Return empty arrays if no data
    }

    // Iterate through all reports
    for (const historyReportsItem of historyReports) {
        if (!historyReportsItem[label]) {
            continue;
        }


        // Format the label if needed
        const reportLabel = formatDateToDashboard
            ? formatDateToDashboard(historyReportsItem[label])
            : historyReportsItem[label].length > 15 ? historyReportsItem[label].slice(0, 8) : historyReportsItem[label] || "Field Not Found";

        const isReportOpen = historyReportsItem?.reportOpen

        if (isReportOpen) {

            if (!openLabelsReports?.hasOwnProperty(reportLabel)) {
                openLabelsReports[reportLabel] = index;
                openReportsData[index] = 1,
                    pieColors.push(colors[index % colors.length])

                // if (!closeLabelsReports?.hasOwnProperty(`${reportLabel}${pieMode}`)) {
                //     // closeLabelsReports[reportLabel] = index;
                //     // closeReportsData[index] = 0
                //     // pieColors.push(closeColors[index % closeColors.length])

                // }
                index++

            }
            else openReportsData[openLabelsReports[reportLabel]]++;
            totalPieReports++
            maxHeight = openReportsData[openLabelsReports[reportLabel]] && maxHeight < openReportsData[openLabelsReports[reportLabel]] ? openReportsData[openLabelsReports[reportLabel]] : maxHeight
        }
        else {
            if (!closeLabelsReports?.hasOwnProperty(`${reportLabel}${pieMode}`)) {
                closeLabelsReports[`${reportLabel}${pieMode}`] = index;
                closeReportsData[index] = 1

                if (!openLabelsReports?.hasOwnProperty(reportLabel)) {
                    openLabelsReports[reportLabel] = index;
                    openReportsData[index] = 0
                    pieColors.push(colors[index % colors.length])

                }
                index++
            }
            else closeReportsData[closeLabelsReports[`${reportLabel}${pieMode}`]]++
            maxHeight = closeReportsData[closeLabelsReports[reportLabel]] && maxHeight < closeReportsData[closeLabelsReports[reportLabel]] ? closeReportsData[closeLabelsReports[reportLabel]] : maxHeight
            totalPieReports++
        }
    }
    if (mode === "pie") {
        // the colors index go with label index so: color[1] will be on chartLabels[1]
        // so here i insert the close label at the end so color array will be end
        for (let index = 0; index < Object.keys(closeLabelsReports)?.length; index++) {
            pieColors.push(closeColors[index % colors.length])
        }
    }
    const chartLabels = mode === "pie" ? [...Object.keys(openLabelsReports), ...Object.keys(closeLabelsReports)] : Object.keys(openLabelsReports)

    return { label: chartLabels, openReportsData, closeReportsData, maxHeight, pieColors, totalPieReports };
};


export const listOption = (historyReports, roomInputs) => {
    // if there is no historyReports return 

    if (!historyReports) {
        return
    }
    //copy first report 
    const list = []
    console.log(roomInputs);


    // iterate through all fields and translate them to hebrew
    // for (const key in list) {
    //     // if the key is in the translateFieldsToHebrow object remove it and add the translated key to the object
    //     if (translateFieldsToHebrow[key]) {

    //         list[translateFieldsToHebrow[key]] = list[key]
    //         delete list[key]
    //     }
    // }


    // iterate through all inputs and isert them to the object
    roomInputs?.forEach((item) => {
        if (item.type !== "textarea") {
            list.push(item?.label);
        }
    });
    list.push("זמן פתיחת תקלה")
    list.push("זמן סגירת תקלה")
    list.push("שם פותח תקלה")
    list.push("מ.א")

    return list ? list : [];
}
// export const listOption = (historyReports, roomInputs) => {
//     // if there is no historyReports return 

//     if (!historyReports) {
//         return
//     }
//     //copy first report 
//     const list = { ...historyReports[0] }

//     // remove unnecessary fields
//     delete list.reportId
//     delete list._id
//     delete list.reportOpen
//     delete list.inputs

//     // iterate through all fields and translate them to hebrew
//     for (const key in list) {
//         // if the key is in the translateFieldsToHebrow object remove it and add the translated key to the object
//         if (translateFieldsToHebrow[key]) {

//             list[translateFieldsToHebrow[key]] = list[key]
//             delete list[key]
//         }
//     }

//     console.log(list);
//     // iterate through all inputs and isert them to the object
//     roomInputs?.forEach((item) => {

//         if (item.type !== "textarea") {
//             list[item?.label] = item?.label;
//         }

//     });
//     console.log(list);
//     delete list.SLA
//     delete list["מ.א של לקוח"]
//     delete list["תאריך מחיקה"]
//     delete list["זמן סגירת תקלה"]
//     return list ? Object.keys(list) : [];
// }



export const showDatesSelect = (e, setDateToggle) => {
    const chooseDatesDiv = document?.querySelector("#chooseDates")

    chooseDatesDiv.classList.add("visibleDiv")
    if (chooseDatesDiv.classList.contains('hiddenDiv')) {
        chooseDatesDiv.classList.remove("hiddenDiv")
    } else {
        chooseDatesDiv.classList.remove("animateHiddenDiv")
    }
    setDateToggle(true)

}

export const hideDatesSelect = (e, setDateToggle) => {
    const chooseDatesDiv = document?.querySelector("#chooseDates")
    console.log("bbb");

    chooseDatesDiv.classList.remove("visibleDiv")
    chooseDatesDiv.classList.add("animateHiddenDiv")
    setDateToggle(false)
}
