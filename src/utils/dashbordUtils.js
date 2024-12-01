const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
];





export const translateFieldsToHebrow = {
    problemTimeStart: "זמן פתיחת תקלה",

    problemTimeEnd: "זמן סגירת תקלה",

    userOpenId: "מ.א",

    userOpenName: "שם פותח תקלה",
    deleteAt: "תאריך מחיקה"

}
export const translateFieldsToEnglish = {
    "זמן פתיחת תקלה": "problemTimeStart",

    "זמן סגירת תקלה": "problemTimeEnd",

    "מ.א": "userOpenId",

    "שם פותח תקלה": "userOpenName",
    "תאריך מחיקה": "deleteAt"

}
const colors = [
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





// historyReports->all reports
// label->the label to show in dashbord in x direction
// formatDateToDashbord->if the user want to show by date so nwwd to get func to conver it to hours or day or week...
export const formatDataToChartForBar = (historyReports, label, formatDateToDashboard) => {

    // this is map by the filter that user want to show in dashbord
    const mapObjBySearchType = {}

    let maxHeight = 1
    const openLabelsReports = {};
    const closeLabelsReports = {};
    const openReportsData = [];
    const closeReportsData = [];
    const pieColors = [];
    let totalPieReports = 0
    let index = 0;

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
            : historyReportsItem[label] || "Field Not Found";

        const isReportOpen = historyReportsItem?.reportOpen

        if (isReportOpen) {

            if (!openLabelsReports?.hasOwnProperty(reportLabel)) {
                openLabelsReports[reportLabel] = index;
                openReportsData[index] = 1,
                    pieColors.push(colors[index % colors.length])

                if (!closeLabelsReports?.hasOwnProperty(reportLabel)) {
                    closeLabelsReports[reportLabel] = index;
                    closeReportsData[index] = 0
                }
                index++

            }
            else openReportsData[openLabelsReports[reportLabel]]++;
            totalPieReports++
            maxHeight = openReportsData[openLabelsReports[reportLabel]] && maxHeight < openReportsData[openLabelsReports[reportLabel]] ? openReportsData[openLabelsReports[reportLabel]] : maxHeight
        }
        else {
            if (!closeLabelsReports?.hasOwnProperty(reportLabel)) {
                closeLabelsReports[reportLabel] = index;
                closeReportsData[index] = 1

                pieColors.push(colors[index % colors.length])

                if (!openLabelsReports?.hasOwnProperty(reportLabel)) {
                    openLabelsReports[reportLabel] = index;
                    openReportsData[index] = 0
                }
                index++
            }
            else closeReportsData[closeLabelsReports[reportLabel]]++
            maxHeight = closeReportsData[closeLabelsReports[reportLabel]] && maxHeight < closeReportsData[closeLabelsReports[reportLabel]] ? closeReportsData[closeLabelsReports[reportLabel]] : maxHeight
            totalPieReports++

        }

    }
    console.log(totalPieReports);

    return { label: Object.keys(openLabelsReports), openReportsData, closeReportsData, maxHeight, pieColors, totalPieReports };
};

export const formatDataToChart = (historyReports, label, formatDateToDashbord, field) => {
    const arrayData = [];

    // for donut dashbord there is name key instead label
    const donatDashbord = field === "name" ? true : false;

    if (historyReports?.length == 0) {
        return
    }

    let closeColor = "red"
    let openColor = "#5a6acf"

    // iterate through all reports(historyReports)
    for (let index = 0; index < historyReports?.length; index++) {
        // get the report data
        const historyReportsItem = historyReports[index];

        if (!historyReportsItem[label]) {
            continue
        }
        // historyReportsItem[label]
        // convert all inputs from array to fields in historyReportsItem object
        // (inputs are array)

        // remove unnecessary fields

        //now historyReportsItem is only object with key and value
        console.log(historyReportsItem[label]);

        // if the field is date so convert it to wanted format to dashbord label
        const reportLabel = formatDateToDashbord ? formatDateToDashbord(historyReportsItem[label]) : historyReportsItem[label] || "שדה  לא קיים";

        // check if the report open or close and set colors
        const reportStatusColor = historyReportsItem?.reportOpen ? openColor : closeColor;

        // check if the func is to donat dashbord so get random colos
        const partDonatDashbord = historyReportsItem[label] ? colors[index % colors?.length] : "white"
        const color = donatDashbord ? partDonatDashbord : reportStatusColor

        // find if there is data with the same label and color if not create one else add 1
        const indexData = arrayData?.findIndex((obj) => (obj[field] === reportLabel && obj?.openReport === historyReportsItem?.reportOpen))
        if (indexData == -1) {
            arrayData.push({ [field]: reportLabel, y: 1, openReport: historyReportsItem?.reportOpen, percent: (1 / historyReports?.length) * 100, color })

        } else {
            arrayData[indexData].y++
            arrayData[indexData].percent = ((arrayData[indexData]?.y / historyReports?.length) * 100)
        }
    }
    return arrayData
}

export const listOption = (historyReports, roomInputs) => {
    // if there is no historyReports return 

    if (!historyReports) {
        return
    }
    //copy first report 
    const list = { ...historyReports[0] }

    // remove unnecessary fields
    delete list.reportId
    delete list._id
    delete list.reportOpen
    delete list.inputs

    // iterate through all fields and translate them to hebrew
    for (const key in list) {
        // if the key is in the translateFieldsToHebrow object remove it and add the translated key to the object
        if (translateFieldsToHebrow[key]) {

            list[translateFieldsToHebrow[key]] = list[key]
            delete list[key]
        }
    }

    // iterate through all inputs and isert them to the object
    roomInputs?.forEach((item) => {
        if (item.type !== "textarea") {
            list[item?.label] = item?.label;
        }

    });
    // console.log(list);
    delete list.SLA
    delete list["מ.א של לקוח"]
    delete list["תאריך מחיקה"]
    delete list["זמן סגירת תקלה"]
    return list ? Object.keys(list) : [];
}



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
