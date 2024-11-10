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



    return { addReport }
}

export default useReports