import React, { useContext, useState } from 'react'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { notify } from '../utils/Tastify/notify'

function useReports() {
    const { historyReports, setHistoryReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility } = useContext(ContextStore)
    const [loading, setLoading] = useState(true)

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


        } catch (error) {
            console.log(error);

        }

    }

    //   "dates": {
    //     "fromOpenDate": "2024-11-07T14:56:23.456+00:00",
    //     "toOpenDate": "2024-11-08T14:56:23.456+00:00"
    // }
    const getReportsByConditions = async ({ indexToSkip, statusReport, dates, limitResultsIndex, userId, spaceWorkName, subSpaceWorkName, roomName }) => {
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:3001/reports/getReportsFormatToTable", {
                userId, indexToSkip, statusReport, spaceWorkName, subSpaceWorkName, roomName
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



    return { addReport, getReportsByConditions, historyReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, loading, setLoading }

}

export default useReports