import React, { lazy, Suspense, useCallback, useContext, useEffect, useRef, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'
import useReports from '../hooks/useReport'
import useUsers from '../hooks/useUsers'
import { formatDataToChartForBar, formatDay, formatHour, formatMonth, formatWeek, hideDatesSelect, listOption, showDatesSelect } from '../utils/dashbordUtils'
import useSpaceWork from '../hooks/useSpaceWork'
import { ContextStore } from '../context/contextStore'
import "../pages/style.css"
import useSocket from '../hooks/useSocket'

const DonutChart = lazy(() => import('../components/donutChart/DonutChart'));
const ColumnChart = lazy(() => import('../components/columnChart/ColumnChart'));

const DashboardPage = () => {
    const { countRoomReports } = useContext(ContextStore)

    const { singleOptoin } = useContextStore()
    const [searchParams] = useSearchParams()
    const { historyReports, getAllReports } = useReports()
    const { currentUser } = useUsers()
    const { inputs } = useSpaceWork()
    // this states are to chart and they get what user want to show and if it is date also func date is need
    const [ColumnChart1Select, setColumnChart1Select] = useState({ label: "יחידה מטפלת", dateFunc: null })
    const [ColumnChart2Select, setColumnChart2Select] = useState({ label: "יחידה מטפלת", dateFunc: null })
    // get the number of response of reports 
    console.log(historyReports);


    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const { changeRoom } = useSocket()

    const [dateToggle, setDateToggle] = useState(false)

    // convert time to hours,days,week to show them in dashbord axiosX
    const chartDatesConvert = useCallback(
        (label, setState, differenceInHours) => {
            if (label === "problemTimeStart" || label === "problemTimeEnd" || label === "deleteAt") {

                if (!dateToggle) {
                    setState((prev) => ({ ...prev, dateFunc: formatDay }))
                    return
                }
                if (differenceInHours < 24) {
                    setState((prev) => ({ ...prev, dateFunc: formatHour }))
                }
                else if (differenceInHours > 24 && differenceInHours < 168) {
                    setState((prev) => ({ ...prev, dateFunc: formatDay }))
                }
                else if (differenceInHours > 168 && differenceInHours < 720) {
                    setState((prev) => ({ ...prev, dateFunc: formatWeek }))
                }
                else {
                    setState((prev) => ({ ...prev, dateFunc: formatMonth }))
                }
            }
        }
        , [dateToggle])


    useEffect(() => {
        // 1. Report Fetching Logic
        if (currentUser?.userId) {
            const getReportObj = {
                limitResultsIndex: -1, // -1 is get all reports
                indexToSkip: 0,
                dates: {
                    fromDate,
                    toDate
                },
                getBetweenDates: dateToggle,
                statusReport: dateToggle ? "both" : "open",
                userId: currentUser?.userId,
                spaceWorkName: searchParams.get('sw'),
                subSpaceWorkName: searchParams.get('subSW'),
                roomName: searchParams.get('room'),
            };
            getAllReports(getReportObj); // Only runs when `currentUser`, `fromDate`, `toDate`, or `dateToggle` changes
        }

        // 2. Chart Date Conversion Logic
        const fromDateObj = new Date(fromDate?.setHours(2));
        const toDateObj = new Date(toDate?.setHours(23));

        // Calculate the difference in milliseconds
        const differenceInMs = Math.abs(toDateObj?.getTime() - fromDateObj?.getTime());
        // Convert milliseconds to hours
        const differenceInHours = differenceInMs / (1000 * 60 * 60);

        // This logic only runs when the labels for the charts change (or the `fromDate`/`toDate` change)
        if (
            (ColumnChart1Select?.label === "problemTimeStart" || ColumnChart1Select?.label === "problemTimeEnd" || ColumnChart1Select?.label === "deleteAt") ||
            (ColumnChart2Select?.label === "problemTimeStart" || ColumnChart2Select?.label === "problemTimeEnd" || ColumnChart2Select?.label === "deleteAt")
        ) {
            chartDatesConvert(ColumnChart1Select?.label, setColumnChart1Select, differenceInHours);
            chartDatesConvert(ColumnChart2Select?.label, setColumnChart2Select, differenceInHours);
        } else {
            setColumnChart1Select((prev) => ({ ...prev, dateFunc: null }));
            setColumnChart2Select((prev) => ({ ...prev, dateFunc: null }));
        }
    }, [currentUser, fromDate, toDate, dateToggle, ColumnChart1Select?.label, ColumnChart2Select?.label]);



    useEffect(() => {
        const localSW = localStorage.getItem("sw");
        const localSubSP = localStorage.getItem("subSW");
        const localRoom = localStorage.getItem("room");
        changeRoom(localSW, localSubSP, localRoom, dateToggle ? "dashboard_both" : "dashboard_open")
    }, [dateToggle])


    const resetDates = () => {
        setFromDate(new Date())
        setToDate(new Date())
    }
    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`
    console.log(
    );
    const options = singleOptoin?.subSpaceWork?.find((subSW) => subSW.name == searchParams.get("subSW"))?.lobbyOption
    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"דשבורד"}
            navLeft={str}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={["accessOption"]} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showBall={true}
            showExcel={true}

            optionDisaled={"בחירת חדר"}
            options={options}
            showSelectOption={true}
        >
            <div className='justify-end  relative -top-10 left-10  flex gap-20 fixd '>

                <div className=" bg-accent border-2 p-1  gap-2 text-md font-semibold border-border shadow-md rounded-lg flex justify-between items-center">
                    <p className={`text-text font-semibold `}>
                        תקלות לפי תאריכים
                    </p>
                    <label className="switch">
                        <input id='datesCheckBox' checked={dateToggle} onClick={(e) => dateToggle ? hideDatesSelect(e, setDateToggle) : showDatesSelect(e, setDateToggle)} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div id='chooseDates' className=' hiddenDiv flex gap-10'>
                    <div className=" bg-accent border-2 p-1 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-between items-center hover:scale-110 duration-150">
                        <button onClick={resetDates} className='px-3'>היום</button>
                    </div>
                    <div className=" bg-accent border-2 p-1 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-between items-center hover:scale-110 duration-150">
                        <button className='px-3'>מ-</button>
                        {/* the value is fromDate state. and check if chosen fromDate is later than toDate so alert to user */}
                        <input className='outline-none' value={fromDate?.toISOString()?.split('T')[0]} onChange={(e) => e?.target?.valueAsDate > toDate ? alert("תאריכים לא תקינים") : setFromDate(e?.target?.valueAsDate)
                        } type="date" />
                    </div>
                    <div className=" bg-accent border-2 p-1 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-between items-center hover:scale-110 duration-150">
                        <button className='px-3'>עד</button>
                        {/* the value is toDate state. and check if chosen toDate is earlier than fromDate so alert to user */}
                        <input className='outline-none' value={toDate?.toISOString()?.split('T')[0]} onChange={(e) => e?.target?.valueAsDate.setHours(23, 59) < fromDate ? alert("תאריכים לא תקינים") : setToDate(e?.target?.valueAsDate)} type="date" />
                    </div>
                </div>

            </div>
            <section className='mx-10 grid grid-cols-3 gap-[1px] bg-border'>
                <div className="bg-background pl-10">
                    <Suspense fallback={<div>wait loading...</div>}>
                        <DonutChart optionsSelect={listOption(historyReports?.data, inputs)} isAllReportsVisible={dateToggle} setColumnChartSelect={setColumnChart1Select} dataToChart={formatDataToChartForBar(historyReports?.data, ColumnChart1Select?.label, ColumnChart1Select?.dateFunc, "pie")} />
                    </Suspense>

                </div>
                <div className="col-span-2 bg-background pr-10">
                    <Suspense fallback={<div>wait loading...</div>}>
                        <ColumnChart optionsSelect={listOption(historyReports?.data, inputs)} isAllReportsVisible={dateToggle} setColumnChartSelect={setColumnChart1Select} dataToChart={formatDataToChartForBar(historyReports?.data, ColumnChart1Select?.label, ColumnChart1Select?.dateFunc, "label")} />
                    </Suspense>
                </div>
                <div className="col-span-2 bg-background pl-10 pt-10">
                    <Suspense fallback={<div>wait loading...</div>}>
                        <ColumnChart optionsSelect={listOption(historyReports?.data, inputs)} isAllReportsVisible={dateToggle} setColumnChartSelect={setColumnChart2Select} dataToChart={formatDataToChartForBar(historyReports?.data, ColumnChart2Select?.label, ColumnChart2Select?.dateFunc, "label")} />
                    </Suspense>
                </div>

                <div className="bg-background pr-10 pt-10">
                    <div className="flex flex-wrap items-center justify-between h-[40%]">
                        <div className=' h-full flex flex-col gap-1'>
                            <button className="px-3 cursor-default py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center ">{`תקלות פתוחות- ${searchParams.get('room')}`}</button>
                            <div className=" text-6xl font-bold text-text text-center h-full flex items-center justify-center">{countRoomReports?.roomResponseOpen?.length}</div>
                        </div>
                        <div className=' h-full flex flex-col'>
                            <button className="px-3  cursor-default py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center ">תקלות פתוחות- רמ”מ</button>
                            <div className=" text-6xl font-bold text-text text-center h-full flex items-center justify-center">{countRoomReports?.otherResponseOpen?.length}</div>
                        </div>
                        <div className={` h-full ${!dateToggle && "mx-auto"} flex flex-col`}>
                            <button className="px-3 cursor-default py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center ">  {dateToggle ? `תקלות סגורות-${searchParams.get('room')}` : "תקלות שנפתחו היום"}   </button>
                            <div className=" text-6xl font-bold text-text text-center h-full flex items-center justify-center">{countRoomReports?.roomResponseClose?.length}</div>
                        </div>
                        {dateToggle &&
                            <div className=' h-full flex flex-col'>
                                <button className="px-3  cursor-default py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center ">תקלות סגורות-רמ"מ</button>
                                <div className=" text-6xl font-bold text-text text-center h-full flex items-center justify-center">{countRoomReports?.otherResponseClose?.length}</div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </TemplatePage>
    )
}

export default DashboardPage