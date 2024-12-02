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
        prevData: [
        ],
        currentStep:
            { name: "בחר סביבה", id: 3, value: "" },
        nextData: [
            { name: "תת סביבה", id: 2, value: "מנור" },
            { name: "בחר חדר", id: 5, value: "בחר חדר" },
        ],
    });

    const [userAccessList, setUserAccessList] = useState({
        listOption: [
            {
                list: [
                    { name: "מקשאפ", id: 4, value: "מקשאפ" },
                    { name: "בהד 1", id: 12, value: "בהד 1" },
                ]
                , index: 0
            }
            ,
            {
                list: [
                    { name: "תומר", id: 4786, value: "תומר" },
                    { name: "מעבדה", id: 17682, value: "מעבדה" },
                ],
                index: 1
            }
            ,
            {
                list: [
                    { name: "אלפא", id: 67674, value: "אלפא" },
                    { name: "דסק", id: 188882, value: "דסק" },
                ],
                index: 2
            }
            ,

        ],
        currentStep: {
            list: [
                { name: "מקשאפ", id: 4, value: "מקשאפ" },
                { name: "בהד 1", id: 12, value: "בהד 1" },
            ],
            index: 0
        }
    })




    const handleStepsChange = (option, index) => {
        setSteps((prev) => {
            const isPrev = prev.prevData.some((item) => item.id === option.id);

            // Determine the new currentStep
            const newCurrentStep = isPrev
                ? prev.nextData[0] // Move forward in steps
                : prev.prevData.length > 0
                    ? prev.prevData[prev.prevData.length - 1] // Move backward
                    : null;

            // Update steps
            return {
                ...prev,
                prevData: isPrev
                    ? prev.prevData.filter((item) => item.id !== option.id)
                    : [...prev.prevData, option],
                nextData: isPrev
                    ? [...prev.nextData, option]
                    : prev.nextData.filter((item) => item.id !== option.id),
                currentStep: newCurrentStep || prev.currentStep,
            };
        });

        // Update userAccessList
        setUserAccessList((prev) => ({
            ...prev,
            currentStep: userAccessList.listOption[index + 1] || prev.currentStep,
        }));
    };


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
                            <StepContainer handleNext={handleStepsChange} steps={steps} />
                        </div>
                        <div className="">
                            <div className=" text-lg font-semibold underline">
                                בחר חדר
                            </div>
                            <div className="pt-3 flex items-center gap-5">
                                {userAccessList.currentStep?.list?.map((item, index) => (<button onClick={() => handleStepsChange(item, userAccessList.currentStep?.index)} key={index} className="px-3  cursor-default py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">{item?.name}</button>))}
                            </div>
                        </div>
                        <div className="">
                            <div className=" text-lg font-semibold underline">
                                רמת הרשאה
                            </div>
                            <div className="pt-3 flex items-center gap-5">
                                {["צופה", "עורך", "מנהל"]?.map((item, index) => (<button key={index} className="px-3 cursor-default py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">{item}</button>))}
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