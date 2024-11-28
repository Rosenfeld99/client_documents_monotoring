import React, { useContext, useState } from 'react'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { notify } from '../utils/Tastify/notify'
import { useSearchParams } from 'react-router-dom'

function useReports() {
    const { historyReports, setHistoryReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, setCountRoomReports } = useContext(ContextStore)
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()


    const addReport = async ({ spaceWorkName, subSpaceWorkName, roomName, userId, report }) => {
        try {

            const newReport = await axios.post("http://localhost:3001/reports/addReport", {
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                // problemTimeEnd,
                report,
                userId
            })

            notify("SUCCESS", "תקלה נוצרה בהצלחה")

        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה ביצירת תקלה")
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
        console.log(userId,
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

    const getAllReports = async ({ dates, getBetweenDates, statusReport, limitResultsIndex, userId, spaceWorkName, subSpaceWorkName, roomName }) => {
        setLoading(true)

        try {
            const { data } = await axios.post("http://localhost:3001/reports/getReports", {
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                getBetweenDates,
                limitResultsIndex,
                statusReport,
                userId,
                dates
            })
            console.log(data);
            setHistoryReports(data);
            console.log(data);
            const roomResponse = []
            const otherResponse = []
            const todayCloseResponse = []
            const todayOpenReports = []

            for (let index = 0; index < data?.data?.length; index++) {
                if (data?.data[index]["יחידה מטפלת"] === searchParams.get("room")) {
                    roomResponse.push(data?.data[index])
                }
                else {
                    otherResponse.push(data?.data[index])
                }
                const currentDate = new Date()
                const reportDate = new Date(data?.data[index].problemTimeStart)
                const dateCurrentStr = currentDate.toISOString().split('T')[0];
                const dateReportStr = reportDate.toISOString().split('T')[0];

                if (dateCurrentStr === dateReportStr) {
                    if (data?.data[index].problemTimeEnd) {
                        todayCloseResponse.push(data?.data[index])
                    }
                    else {
                        todayOpenReports.push(data?.data[index])
                    }
                }
            }
            setCountRoomReports({
                roomResponse,
                otherResponse,
                todayCloseResponse,
                todayOpenReports
            })


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



    return { addReport, getReportsByConditions, handleCloseReport, handleDeleteReport, getAllReports, historyReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, loading, setLoading }

}

export default useReports