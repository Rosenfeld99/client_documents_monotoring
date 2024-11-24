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

    const handleDeleteReport = async ({
        userId,
        reportId,
        dateRequst,
        spaceWorkName,
        subSpaceWorkName,
        roomName
    }) => {
        console.log( userId,
            reportId,
            dateRequst,
            spaceWorkName,
            subSpaceWorkName,
            roomName);
        
        try {
            const deleteReport = await axios.post("http://localhost:3001/reports/deleteReport", {
                userId,
                reportId,
                dateRequst,
                spaceWorkName,
                subSpaceWorkName,
                roomName,
            })

            console.log(deleteReport);
            notify("SUCCESS", "תקלה נמחקה בהצלחה")


        } catch (error) {
            console.log(error);

        }

    }

    const handleCloseReport = async ({
        userId,
        reportId,
        dateRequst,
        spaceWorkName,
        subSpaceWorkName,
        roomName, }) => {
        try {
            const closeReport = await axios.put("http://localhost:3001/reports/finishReport", {
                userId,
                reportId,
                dateRequst,
                spaceWorkName,
                subSpaceWorkName,
                roomName,
            })

            console.log(closeReport);
            notify("SUCCESS", "תקלה נסגרה בהצלחה")


        } catch (error) {
            console.log(error);

        }

    }

    const getReportsByConditions = async ({ indexToSkip, statusReport, dates, limitResultsIndex, userId, spaceWorkName, subSpaceWorkName, roomName }) => {
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:3001/reports/getReportsFormatToTable", {
                userId, indexToSkip, statusReport, spaceWorkName, subSpaceWorkName, roomName, dates
            })
            console.log(data);
            setHistoryReports(data);
            setColumns(data.columnsList)
            setFilteredData(data.data)
            setColumnVisibility(
                data.columnsList?.reduce((acc, column) => ({
                    ...acc, [column.key]: true, _id: false,
                    "סטאטוס תקלה": false,
                    "תאריך מחיקת תקלה": false
                }), {})
            )


        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }



    return { addReport, getReportsByConditions, handleCloseReport, handleDeleteReport, historyReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, loading, setLoading }

}

export default useReports