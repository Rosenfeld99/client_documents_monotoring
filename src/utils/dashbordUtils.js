const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
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

// historyReports->all reports
// label->the label to show in dashbord in x direction
// formatDateToDashbord->if the user want to show by date so nwwd to get func to conver it to hours or day or week...
export const formatDataToChart = (historyReports, label, formatDateToDashbord, field) => {
    const arrayData = [];

    // for donut dashbord there is name key instead label
    const donatDashbord = field === "name" ? true : false;

    if (historyReports?.length == 0) {
        return
    }

    let closeColor = "blue"
    let openColor = "#5a6acf"

    // iterate through all reports(historyReports)
    for (let index = 0; index < historyReports?.length; index++) {
        // get the report data
        const historyReportsItem = historyReports[index]?.report;
        // historyReportsItem[label]
        // convert all inputs from array to fields in historyReportsItem object
        // (inputs are array)
        historyReportsItem?.inputs?.forEach((item) => {
            historyReportsItem[item?.name] = item?.value;
        });
        // remove unnecessary fields
        delete historyReportsItem?.inputs
        //now historyReportsItem is only object with key and value

        // if the field is date so convert it to wanted format to dashbord label
        const reportLabel = formatDateToDashbord ? formatDateToDashbord(historyReportsItem[label]) : historyReportsItem[label];

        // check if the report open or close and set colors
        const reportStatusColor = historyReportsItem?.reportOpen ? openColor : closeColor;

        // check if the func is to donat dashbord so get random colos
        const color = donatDashbord ? colors[index % colors?.length] : reportStatusColor

        // find if there is data with the same label and color if not create one else add 1
        const indexData = arrayData?.findIndex((obj) => (obj[field] === reportLabel))
        if (indexData == -1) {
            arrayData.push({ [field]: reportLabel, y: 1, percent: (1 / historyReports?.length) * 100, color })

        } else {
            arrayData[indexData].y++
            arrayData[indexData].percent = ((arrayData[indexData]?.y / historyReports?.length) * 100)
        }
    }
    return arrayData
}

export const listOption = (historyReports) => {
    // if there is no historyReports return 
    if (!historyReports) {
        return
    }
    //copy first report 
    const list = { ...historyReports[0]?.report }

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
    historyReports[0]?.report?.inputs?.forEach((item) => {
        list[item?.name] = item?.value;
    });
    // console.log(list);

    return list ? Object.keys(list) : [];
}