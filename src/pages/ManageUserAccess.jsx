import React, { useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'
import StepContainer from '../utils/steps/StepContainer'
import { BiEdit } from 'react-icons/bi'
import { GoTrash } from 'react-icons/go'

const ManageUserAccess = () => {
    const [searchParams] = useSearchParams()

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`
    const [steps, setSteps] = useState({
        data: ["דסק", "מנור", "תומר", "מקשאפ"],
        prevData: ["מקשאפ", "תומר"],
        nextData: [, "בחר חדר"],
    })
    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={
                <div className=' flex items-center gap-10'>
                    <span>
                        עריכת משתמש
                    </span>
                    <span>{"-->"}</span>
                    <span className=' text-lg font-semibold'>
                        מנדי יעקובוב/ מ.א 8888888 /מתכנת צוות אלפא
                    </span>
                </div>
            }
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={[]} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className='mx-10 flex-1 gap-10 flex items-center justify-center mt-[4vw] border-border bg-accent shadow-md border-2 rounded-xl '>
                <div className="flex justify-start min-h-[35vw] flex-col gap-6 w-2/3">

                    <div className=" flex items-start gap-16 flex-col p-10">
                        <div className=" w-full">
                            <div className=" text-xl">
                                ניהול הרשאות לפי סביבה
                            </div>
                            <StepContainer steps={steps} />
                        </div>
                        <div className="">
                            <div className=" text-lg font-semibold underline">
                                בחר חדר
                            </div>
                            <div className="pt-3 flex items-center gap-5">
                                {["דסק", "מנור"]?.map((item, index) => (<button key={index} className="px-3  cursor-default py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">{item}</button>))}
                            </div>
                        </div>
                        <div className="">
                            <div className=" text-lg font-semibold underline">
                                רמת הרשאה
                            </div>
                            <div className="pt-3 flex items-center gap-5">
                                {["צופה","עורך", "מנהל"]?.map((item, index) => (<button key={index} className="px-3 cursor-default py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">{item}</button>))}
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2">
                            <div className=" text-lg font-semibold underline">
                                הרשאות פעילות
                            </div>
                            {[["בהד 7 ", "נשקיה ", "חדר 1"], ["בהד 20 ", "נשקיה ", "חדר 2"]]?.map((item, index) => (<div className="px-3 cursor-default py-1 min-w-96 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-between items-center hover:scale-110 duration-150">
                                <div className=" text-text">
                                    {item?.map((path, j) => (
                                        <span>{path}{j !== 2 && " / "}</span>
                                    ))}
                                </div>
                                <div className=" flex items-center gap-5">
                                    <button className=' text-info'>
                                        <BiEdit />
                                    </button>
                                    <button className=' text-error'>
                                        <GoTrash />
                                    </button>
                                </div>
                            </div>))}

                        </div>
                    </div>
                </div>
                <div className=" flex flex-col max-w-[600px] m-10 w-1/4">
                    <img src="/Update-amico.png" alt="new issuse" />
                    {true && <button onClick={""} className={`px-6 text-[#66BB6A] border-[#66BB6A] hover:scale-105 duration-150 p-1 mt-10 font-bold border-2 rounded-md `}>
                        עריכת משתמש
                    </button>}
                </div>
            </section>
        </TemplatePage>
    )
}

export default ManageUserAccess