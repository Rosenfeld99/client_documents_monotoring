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
    const getReportsByConditions = async ({ indexToSkip, statusReport, dates, limitResultsIndex, userId, spaceWorkName, subSpaceWorkName, roomName }) => {
        try {
            const { data } = await axios.post("http://localhost:3001/reports/getReports", {
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

            const buildTable = data?.map((item) => {
                const obj = {
                    ...item,
                    "columns": item?.report?.inputs,
                }
                // delete inputs
                delete obj.inputs

            })
            // ----- data -------
            // {
            //     "id": "0033",
            //     "date": "01/12/2024",
            //     "time": "18:00",
            //     "תיאור": "nnkjnk",
            //     "subject": "שרת ניהול",
            //     "status": "בטיפול",
            //     "note": "נדרשת בדיקה נוספת"
            //   }

            // --------- columns --------
            // {
            //     "key": "תיאור",
            //     "label": "יחידה",
            //     "selectOption": [
            //       { "id": "1", "name": 'מקשא"פ' },
            //       { "id": "2", "name": "בהד 3" },
            //       { "id": "3", "name": "בהד 4" },
            //       { "id": "4", "name": "בהד 5" }
            //     ]
            //   },
            setHistoryReports(data);



        } catch (error) {
            console.log(error);

        }

    }



    return { addReport, getReportsByConditions, historyReports }

}

export default useReports