import React, { useEffect, useRef, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'
import DonutChart from '../components/donutChart/DonutChart'
import ColumnChart from '../components/columnChart/ColumnChart'
import useReports from '../hooks/useReport'
import useUsers from '../hooks/useUsers'
import { formatDataToChart, formatDay, formatHour, formatMonth, formatWeek, listOption } from '../utils/dashbordUtils'

const DashboardPage = () => {
    const { singleOptoin } = useContextStore()
    const [searchParams] = useSearchParams()
    const { getReports, historyReports } = useReports()
    const { currentUser } = useUsers()
    // this states are to chart and they get what user want to show and if it is date also func date is need
    const [ColumnChart1Select, setColumnChart1Select] = useState({ label: "יחידה מטפלת", dateFunc: null })

    const [ColumnChart2Select, setColumnChart2Select] = useState({ label: "יחידה מטפלת", dateFunc: null })
    // get the number of response of reports 
    const [reportResponseRoom, setReportResponseRoom] = useState()
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())

    useEffect(() => {
        setReportResponseRoom(historyReports?.paginatedResults?.filter((rep) => rep.report["יחידה מטפלת"] === searchParams.get("room")))
    }, [historyReports])

    useEffect(() => {
        const getReportObj = {
            limitResultsIndex: -1,// -1 is get all reports 
            indexToSkip: 0,
            dates: {
                fromDate,
                toDate
            },
            statusReport: "both",
            userId: currentUser?.userId,
            spaceWorkName: searchParams.get('sw'),
            subSpaceWorkName: searchParams.get('subSW'),
            roomName: searchParams.get('room'),
        }
        getReports(getReportObj)
    }, [currentUser, toDate, fromDate])

    useEffect(() => {
        const fromDateObj = new Date(fromDate?.setHours(2));
        const toDateObj = new Date(toDate?.setHours(23))
        // Calculate the difference in milliseconds
        const differenceInMs = Math.abs(toDateObj?.getTime() - fromDateObj?.getTime());

        // Convert milliseconds to hours
        const differenceInHours = differenceInMs / (1000 * 60 * 60);


        console.log(ColumnChart1Select?.label === "problemTimeStart", ColumnChart1Select?.label === "problemTimeEnd", ColumnChart1Select?.label === "deleteAt");

        if (ColumnChart1Select?.label === "problemTimeStart" || ColumnChart1Select?.label === "problemTimeEnd" || ColumnChart1Select?.label === "deleteAt") {
            if (differenceInHours < 24) {
                console.log(formatHour);
                setColumnChart1Select((prev) => ({ ...prev, dateFunc: formatHour }))
            }
            else if (differenceInHours > 24 && differenceInHours < 168) {
                setColumnChart1Select((prev) => ({ ...prev, dateFunc: formatDay }))
            }
            else if (differenceInHours > 168 && differenceInHours < 720) {
                setColumnChart1Select((prev) => ({ ...prev, dateFunc: formatWeek }))
            }
            else {
                setColumnChart1Select((prev) => ({ ...prev, dateFunc: formatMonth }))
            }
        }
        else {
            setColumnChart1Select((prev) => ({ ...prev, dateFunc: null }))
        }
    }, [fromDate, toDate])

    console.log(ColumnChart1Select);



    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]
    const resetDates = () => {
        setFromDate(new Date())
        setToDate(new Date())
    }
    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`

    const options = singleOptoin?.subSpaceWork?.find((subSW) => subSW.name == searchParams.get("subSW"))?.lobbyOption
    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"דשבורד"}
            navLeft={str}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showBall={true}
            showExcel={true}

            optionDisaled={"בחירת חדר"}
            options={options}
            showSelectOption={true}
        >
            <div className='justify-end  relative -top-10 left-10  flex gap-32 fixd '>
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
            <section className='mx-10 grid grid-cols-3 gap-[1px] bg-border'>

                <div className="bg-background pl-10">
                    <DonutChart optionsSelect={listOption(historyReports?.paginatedResults)} setColumnChartSelect={setColumnChart1Select} dataToChart={formatDataToChart(historyReports?.paginatedResults, ColumnChart1Select?.label, ColumnChart1Select?.dateFunc, "name")} />

                </div>
                <div className="col-span-2 bg-background pr-10">
                    <ColumnChart optionsSelect={listOption(historyReports?.paginatedResults)} setColumnChartSelect={setColumnChart1Select} dataToChart={formatDataToChart(historyReports?.paginatedResults, ColumnChart1Select?.label, ColumnChart1Select?.dateFunc, "label")} />
                </div>
                <div className="col-span-2 bg-background pl-10 pt-10">
                    <ColumnChart optionsSelect={listOption(historyReports?.paginatedResults)} setColumnChartSelect={setColumnChart2Select} dataToChart={formatDataToChart(historyReports?.paginatedResults, ColumnChart2Select?.label, ColumnChart2Select?.dateFunc, "label")} />
                </div>
                <div className="bg-background pr-10 pt-10">
                    <div className="flex items-center justify-between h-full">
                        <div className=' h-full'>
                            <button className="px-3 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">{`תקלות בטיפול ${searchParams.get('room')}`}</button>
                            <div className=" text-6xl font-bold text-text text-center h-full flex items-center justify-center">{reportResponseRoom?.length}</div>
                        </div>
                        <div className=' h-full'>
                            <button className="px-3 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">תקלה בטיפול רמ”מ</button>
                            <div className=" text-6xl font-bold text-text text-center h-full flex items-center justify-center">{historyReports?.paginatedResults?.length - reportResponseRoom?.length}</div>
                        </div>

                    </div>
                </div>
            </section>
        </TemplatePage>
    )
}

export default DashboardPage