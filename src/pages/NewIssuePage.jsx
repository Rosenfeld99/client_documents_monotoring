import React, { useCallback, useContext, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { Link, useSearchParams } from 'react-router-dom'
import CustomInput from '../utils/CustomInput'
import CustomTextarea from '../utils/CustomTextarea'
import { ContextStore } from '../context/contextStore'
import { Button } from '../components/systemSetting/InputsComponents'
import { IoMdSettings } from 'react-icons/io'
import useReport from '../hooks/useReport'

const NewIssuePage = () => {
    const [searchParams] = useSearchParams()
    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`
    const { inputs, setInputs, currentUser } = useContext(ContextStore)
    const { addReport } = useReport()
    const [newReportData, setNewReportData] = useState({
        דחיפות: "נמוכה-3", "יחידה מטפלת": searchParams?.get('room'), "מ.א": currentUser?.userId
    })

    const handleInputChange = useCallback((value, key) => {
        setNewReportData((prev) => ({ ...prev, [key]: value }))
    }, [])

    const createReport = (e) => {
        const arrayInputs = []
        for (let index = 0; index < inputs.length; index++) {
            // check if there is require fields that are empty 

            if (inputs[index]?.require && !newReportData[inputs[index].label]) {
                alert("יש שדות חובה שלא מילאו")
                return;
            }
            // convert the inputs data into array of obj {name,value}
            arrayInputs.push({ name: inputs[index]?.label, value: newReportData[inputs[index]?.label] })
        }
        const newReportObj = {
            spaceWorkName: searchParams.get('sw'),
            subSpaceWorkName: searchParams.get('subSW'),
            roomName: searchParams.get('room'),
            userId: currentUser?.userId,
            report: {
                inputs: arrayInputs,
                problemTimeStart: new Date(),
                reportStatus: true
            }
        }
        console.log(newReportData["יחידה מטפלת"]);

        addReport(newReportObj)
        //reset the inputs
        setNewReportData({ דחיפות: "נמוכה-3", "יחידה מטפלת": searchParams?.get('room'), "מ.א": currentUser?.userId })
    }


    const reversString = (array) => {
        const arrayInputs = array?.map((string) => string?.split("-")?.reverse()?.join("-"))
        return arrayInputs
    }


    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"תקלה חדשה"}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={[]} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className='mx-10 flex-1 gap-10 flex items-center justify-center border-border bg-accent shadow-md border-2 rounded-xl '>
                <div className="flex justify-start flex-col px-10  h-full gap-6 w-2/3">
                    {/* just if inputs length more than 1 (urgancey) show new report */}

                    {inputs.length > 2 && <div className="mt-3">מספר תקלה 0012</div>}
                    <div className=" flex h-[29rem] gap-20 w-full">
                        {inputs.length > 2 ?
                            <div className=" flex flex-col flex-wrap h-full j w-full max-w-60 items-center gap-6">
                                <CustomInput state={newReportData} keyToUpdate={"מ.א"} label={"מ.א"} disabeld={true} required={false} placeholder={currentUser?.userId} />
                                {inputs.map((input, i) => {


                                    switch (input?.type) {
                                        case "textarea":
                                            return <CustomTextarea key={input?._id} state={newReportData} setState={handleInputChange} label={input?.label} keyToUpdate={input?.label} required={input?.require} placeholder={input?.placeholder} />
                                            break;
                                        case "select":
                                            // if the input is דחיפות  revers the array becuse the hebrew
                                            return <CustomSelect key={input?._id} options={input.label === "דחיפות" ? reversString(input?.options) : input?.options} setState={handleInputChange} labelText={input?.label} keyToUpdate={input?.label} required={input?.require} placeholder={input?.placeholder} />
                                            break;
                                        case "short":
                                            return <CustomInput key={input?._id} state={newReportData} setState={handleInputChange} label={input?.label} keyToUpdate={input?.label} required={input?.require} placeholder={input?.placeholder} />
                                            break;
                                        default:
                                            break;
                                    }
                                })}
                            </div>
                            :
                            <div className=' flex font-semibold  h-full  w-full  items-center justify-center'>
                                <Link to={`/system-settings?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room')}`} >
                                    <button className='text-2xl flex hover:opacity-50'>
                                        <IoMdSettings className="text-2xl ml-2 mt-1 " />
                                        לא הוגדת תבנית תקלה, <br />
                                        להגדרות מערכת
                                        ←
                                    </button>
                                </Link>
                            </div>}
                    </div>
                </div>
                <div className=" flex flex-col max-w-[600px] m-10 w-1/4">
                    <img src="/new-issuse.png" alt="new issuse" />
                    {inputs.length > 1 && <button onClick={createReport} className={`px-6 text-[#66BB6A] border-[#66BB6A] p-1 mt-10 font-bold border-2 rounded-md `}>
                        יצירת תקלה חדשה
                    </button>}
                </div>
            </section>
        </TemplatePage>
    )
}

export default NewIssuePage