import React, { useContext } from 'react'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'

function useReports() {
    const { historyReports, setHistoryReports } = useContext(ContextStore)


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


        } catch (error) {
            console.log(error);

        }

    }

    //   "dates": {
    //     "fromOpenDate": "2024-11-07T14:56:23.456+00:00",
    //     "toOpenDate": "2024-11-08T14:56:23.456+00:00"
    // }
    const getReports = async ({ indexToSkip, statusReport, dates, limitResultsIndex, userId, spaceWorkName, subSpaceWorkName, roomName }) => {
        try {
            const results = await axios.post("http://localhost:3001/reports/getReports", {
                spaceWorkName,
                subSpaceWorkName,
                roomName,
                statusReport,
                indexToSkip,
                limitResultsIndex,
                userId,
                dates
            })
            console.log(results?.data[0]);

            setHistoryReports(results?.data[0]);


        } catch (error) {
            console.log(error);

        }

    }



    return { addReport, getReports, historyReports }
}

export default useReports