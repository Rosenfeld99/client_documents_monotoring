import React, { useContext, useState } from 'react'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { notify } from '../utils/Tastify/notify'
import { useSearchParams } from 'react-router-dom'

function useReports() {
    const { historyReports, setHistoryReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, setReportResponseRoom } = useContext(ContextStore)
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()


    const addReport = async ({ spaceWorkName, subSpaceWorkName, roomName, userId, report }) => {
        try {
            console.log(report);

            const newReport = await axios.post("http://localhost:3001/reports/addReport", {
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                // problemTimeEnd,
                report,
                userId
            })

            console.log(newReport);
            notify("SUCCESS", "תקלה נוצרה בהצלחה")

            alert("התקלה נוצרה בהצלחה")
        } catch (error) {
            console.log(error);
            alert("בעיה ביצירת בתקלה")
        }

    }

    //   "dates": {
    //     "fromOpenDate": "2024-11-07T14:56:23.456+00:00",
    //     "toOpenDate": "2024-11-08T14:56:23.456+00:00"
    // }
    const getAllReports = async ({ dates, statusReport, limitResultsIndex, userId, spaceWorkName, subSpaceWorkName, roomName }) => {
        setLoading(true)

        try {
            const { data } = await axios.post("http://localhost:3001/reports/getReports", {
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                limitResultsIndex,
                statusReport,
                userId,
                dates
            })
            console.log(data);
            setHistoryReports(data);
            setReportResponseRoom(data?.data?.filter((rep) => rep["יחידה מטפלת"] === searchParams.get("room")))


        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }
    const getReportsByConditions = async ({ indexToSkip, statusReport, dates, limitResultsIndex, userId, spaceWorkName, subSpaceWorkName, roomName }) => {
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:3001/reports/getReportsFormatToTable", {
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                statusReport,
                indexToSkip,
                limitResultsIndex,
                userId,
                dates
            })
            console.log(data);
            setHistoryReports(data);
            setColumns(data.columnsList)
            setFilteredData(data.data)
            setColumnVisibility(
                data.columnsList?.reduce((acc, column) => ({ ...acc, [column.key]: true, _id: false }), {})
            )
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }



    return { addReport, getReportsByConditions, getAllReports, historyReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, loading, setLoading }

}

export default useReports