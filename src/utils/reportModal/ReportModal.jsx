import React, { useCallback, useEffect, useRef, useState } from 'react'
import useContextStore from '../../hooks/useContextStore'
import CustomInput from '../CustomInput'
import CustomSelect from '../CustomSelect'
import CustomTextarea from '../CustomTextarea'
import updateIcon from "../../../public/update-report.png"
import { Button } from '../../components/systemSetting/InputsComponents'
import useReports from '../../hooks/useReport'
import { useParams, useSearchParams } from 'react-router-dom'
import { translateFieldsToEnglish } from '../../constant/translateObj'

export default function ReportModal({ currReport, mode, setOpenModal }) {
    console.log(currReport);

    const [reportData, setReportData] = useState({ ...currReport })
    const closeModalRef = useRef()
    const { inputs, currentUser } = useContextStore()
    const { handleUpdateReport } = useReports()
    const [searchParams] = useSearchParams()

    const reversString = (array) => {
        const arrayInputs = array?.map((string) => string?.split("-")?.reverse()?.join("-"))
        return arrayInputs
    }

    const handleInputChange = useCallback((value, key) => {
        setReportData((prev) => ({ ...prev, [key]: value }))
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (closeModalRef.current && !closeModalRef.current.contains(event.target)) {
                // Add your logic here (e.g., close a modal or dropdown)
                setOpenModal(false)
            }
        };
        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // convert part of report fields to inputs=[name:"",value:""] 
    const getReportInputsToArray = () => {
        console.log(reportData);

        const reportCopy = { ...reportData }
        const currReportInputs = []

        for (const key in reportCopy) {

            // insert just the inputs to array of inputs
            if (!translateFieldsToEnglish?.hasOwnProperty(key) && key != "_id" && key != 'מס"ד' && key != 'תאריך מחיקת תקלה' && key != 'undefined' && key != "סטאטוס תקלה") {
                currReportInputs.push({ name: key, value: reportCopy[key] })
                delete reportCopy[key]
            }
        }
        reportCopy.inputs = currReportInputs
        reportCopy.MongoReportId = reportData?._id
        reportCopy.reportOpen = reportData['סטאטוס תקלה']
        return reportCopy
    }

    const EditReport = () => {
        const editedReport = getReportInputsToArray()
        const date = editedReport["זמן פתיחת תקלה"].split(',')[0]
        const [day, month, year] = date.split('/').map(Number); // Split and convert to numbers
        const dateObject = new Date(year, month - 1, day);
        console.log(editedReport);

        handleUpdateReport({
            userId: currentUser.userId,
            updateReport: editedReport,
            dateRequst: dateObject,
            spaceWorkName: searchParams.get('sw'),
            subSpaceWorkName: searchParams?.get('subSW'),
            roomName: searchParams?.get('room'),
        })
    }

    return (
        <>

            <div className='h-[100vh] w-[100vw]  z-[9999] absolute flex  bg-[#1f384ca1]' >

                <div ref={closeModalRef} className=' p-3 pr-6 h-[70%] w-2/3  bg-accent shadow-md  rounded-xl opacity-100   mx-auto my-auto'>
                    <div >מספר תקלה</div>
                    <div className='flex w-full  h-[90%]'>
                        <div className=' h-full w-2/3 gap-5  flex-col pt-5 relative flex-wrap flex '>
                            {inputs?.map((input, i) => {
                                console.log(mode === "watch");

                                switch (input?.type) {
                                    case "textarea":
                                        return <div key={i + input?.label} className='w-1/3'><CustomTextarea disabled={mode === "watch" ? true : false} key={input?._id} state={reportData} setState={handleInputChange} label={input?.label} keyToUpdate={input?.label} required={input?.require} placeholder={input?.placeholder} /></div>
                                    case "select":
                                        // if the input is דחיפות  revers the array becuse the hebrew
                                        return <div key={i + input?.label} className='w-1/3'> <CustomSelect disabeld={mode === "watch" ? true : false} key={input?._id} state={reportData} options={input?.label === "דחיפות" ? reversString(input?.options) : input?.options} setState={handleInputChange} labelText={input?.label} keyToUpdate={input?.label} required={input?.require} placeholder={reportData[input?.label]} /></div>
                                    case "short":
                                        return <div key={i + input?.label} className='w-1/3'> <CustomInput disabled={mode === "watch" ? true : false} key={input?._id} state={reportData} setState={handleInputChange} label={input?.label} keyToUpdate={input?.label} required={input?.require} placeholder={input?.placeholder} /></div>
                                    default:
                                        return
                                }
                            })}
                        </div>
                        <div className='w-[30%] pr-10 flex items-center justify-center h-full text-warning'>
                            <img src={updateIcon} className='w-full' alt="" />
                        </div>
                    </div>
                    <div className='w-full flex gap-5 justify-center'>
                        {mode === "edit" ?
                            <>
                                <Button onclickFunc={() => setOpenModal(false)} color={"#E57373"} text={"ביטול"} />
                                <Button onclickFunc={EditReport} color={"#66BB6A"} text={"שמירה"} />
                            </>
                            :
                            <Button onclickFunc={() => setOpenModal(false)} color={"#66BB6A"} text={"סיום"} />
                        }

                    </div>
                </div>

            </div>
        </>
    )
}
