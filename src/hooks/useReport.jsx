import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import useContextStore from './useContextStore'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'

function useReports() {

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

    const fatchReportsByConditions = async ({ dates, limitResultsIndex = 15, userId, indexToSkip, statusReport, spaceWorkName, subSpaceWorkName, roomName }) => {
        try {
            console.log(report);

            const reportsConditions = await axios.post("http://localhost:3001/reports/getReports", {
                dates, limitResultsIndex, userId, indexToSkip, statusReport, spaceWorkName, subSpaceWorkName, roomName
            })

            console.log(reportsConditions);


        } catch (error) {
            console.log(error);
        }

    }



    return { addReport, fatchReportsByConditions }
}

export default useReports