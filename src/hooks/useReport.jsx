import React, { useContext, useState } from 'react'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { notify } from '../utils/Tastify/notify'
import { useSearchParams } from 'react-router-dom'
import useSocket from './useSocket'
import useContextStore from './useContextStore'
import { compareToToday } from '../utils/timeFunc/timeFunc'

function useReports() {
    const { historyReports, currentUser, setHistoryReports, newIdReport, columns, setNewIdReport, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, setCountRoomReports } = useContext(ContextStore)
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()
    const { createReportSocket, deleteReportSocket, updateReportSocket, finishReportSocket } = useSocket()

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


            notify("SUCCESS", "הפנייה נוצרה בהצלחה")

            createReportSocket(newReport?.data?.newReport)


        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה ביצירת פנייה")
        }

    }

    const handleDeleteReport = async ({
        userId,
        MongoReportId,
        dateRequst,
        spaceWorkName,
        subSpaceWorkName,
        roomName,
        reportStatus,
        reportOpen,
    }) => {


        try {
            const deletedReport = await axios.post("http://localhost:3001/reports/deleteReport", {
                userId,
                MongoReportId,
                dateRequst,
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                reportOpen: reportStatus
            })

            deleteReportSocket(deletedReport?.data?.deletedReport)
            notify("SUCCESS", "פנייה נמחקה בהצלחה")


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
        console.log(userId,
            reportId,
            dateRequst,
            spaceWorkName,
            subSpaceWorkName,
            roomName);

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
            finishReportSocket(closeReport?.data?.reportClose)
            notify("SUCCESS", "פנייה נסגרה בהצלחה")


        } catch (error) {
            console.log(error);

        }

    }
    const handleSearchReport = async ({
        userId,
        spaceWorkName,
        subSpaceWorkName,
        roomName,
        limitResultsIndex,
        indexToSkip, statusReport, arrayOfConditions, setSearchLoading
    }) => {
        try {

            const search = await axios.post("http://localhost:3001/reports/search", {
                userId,
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                limitResultsIndex,
                indexToSkip, statusReport, arrayOfConditions
            })

            console.log(search);
            // notify("SUCCESS", "פנייה נסגרה בהצלחה")
            setFilteredData(search?.data?.data)
            setSearchLoading(false)

        } catch (error) {
            console.log(error);

        }

    }
    const handleUpdateReport = async ({
        userId,
        updateReport,
        dateRequst,
        spaceWorkName,
        subSpaceWorkName,
        roomName, }) => {
        try {

            const updatedReport = await axios.put("http://localhost:3001/reports/updateReport", {
                userId,
                dateRequst,
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                updateReport
            })
            console.log(updatedReport?.data);

            updateReportSocket(updatedReport?.data?.updateReport, updatedReport?.data?.oldReport)
            notify("SUCCESS", "פנייה עודכנה בהצלחה")


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
            const roomResponseOpen = []
            const otherResponseOpen = []
            const roomResponseClose = []
            const otherResponseClose = []
            const openTodayReports = []


            for (let index = 0; index < data?.data?.length; index++) {
                // check if the report belong to current room response
                if (data?.data[index]["יחידה מטפלת"] === searchParams.get("room")) {
                    // check if the report open 
                    if (data?.data[index]?.reportOpen) {
                        roomResponseOpen.push(data?.data[index])

                        // check if report is opened today.
                        if (compareToToday(data.data[index].problemTimeStart)) {
                            openTodayReports.push(data?.data[index])
                        }
                    }
                    // if report close count her in closed room response
                    else if (data?.data[index]?.reportOpen == false) {
                        roomResponseClose.push(data?.data[index])
                    }
                }
                else {
                    // check if the report not belong to current room 
                    if (data?.data[index]?.reportOpen) {
                        otherResponseOpen.push(data?.data[index])
                    }
                    else if (data?.data[index]?.reportOpen == false) {
                        otherResponseClose.push(data?.data[index])
                    }

                }
            }
            setCountRoomReports({
                roomResponseOpen,
                roomResponseClose,
                otherResponseOpen,
                otherResponseClose,
                openTodayReports
            })
            // const roomResponse = []
            // const otherResponse = []
            // const todayCloseResponse = []
            // const todayOpenReports = []

            // for (let index = 0; index < data?.data?.length; index++) {
            //     if (data?.data[index]["יחידה מטפלת"] === searchParams.get("room")) {
            //         roomResponse.push(data?.data[index])
            //     }
            //     else {
            //         otherResponse.push(data?.data[index])
            //     }
            //     const currentDate = new Date()
            //     const reportDate = new Date(data?.data[index].problemTimeStart)
            //     const dateCurrentStr = currentDate.toISOString().split('T')[0];
            //     const dateReportStr = reportDate.toISOString().split('T')[0];

            //     if (dateCurrentStr === dateReportStr) {
            //         if (data?.data[index].problemTimeEnd) {
            //             todayCloseResponse.push(data?.data[index])
            //         }
            //         else {
            //             todayOpenReports.push(data?.data[index])
            //         }
            //     }
            // }
            // setCountRoomReports({
            //     roomResponse,
            //     otherResponse,
            //     todayCloseResponse,
            //     todayOpenReports
            // })


        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }
    const getReportsByConditions = async ({ indexToSkip, statusReport, dates, limitResultsIndex, userId, spaceWorkName, subSpaceWorkName, roomName }) => {
        setLoading(true)
        console.log(statusReport);

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

            console.log(data);
            setHistoryReports(data);
            setColumns(data.columnsList)
            setFilteredData(data?.data)

            console.log(data.columnsList);

            setColumnVisibility(
                data.columnsList?.reduce((acc, column) => ({
                    ...acc, [column.key]: true, _id: false,
                    "סטאטוס פנייה": false,
                    "תאריך מחיקת פנייה": false
                }), {})
            )
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }



    return { addReport, handleUpdateReport, handleSearchReport, getReportsByConditions, handleCloseReport, handleDeleteReport, getAllReports, historyReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, loading, setLoading }

}

export default useReports