import React, { useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useParams, useSearchParams } from 'react-router-dom'
import StepContainer from '../utils/steps/StepContainer'
import { BiEdit } from 'react-icons/bi'
import { GoTrash } from 'react-icons/go'
import CustomInput from '../utils/CustomInput'

const ManageUserAccess = () => {
    const [searchParams] = useSearchParams()
    const { id } = useParams()

    const [isRegisterUser, setIsRegisterUser] = useState(id ? true : false)

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`
    const [steps, setSteps] = useState({
        prevData: [
        ],
        nextData: [
            { name: "בחר סביבה", id: 3, value: "" },
            { name: "תת סביבה / רמת הרשאה", id: 2, value: "מנור" },
            { name: "רמת הרשאה / בחר חדר", id: 5, value: "בחר חדר" },
        ],
    });

    const [userAccessList, setUserAccessList] = useState({
        listOption: [
            {
                list: [
                    { name: "מקשאפ", id: 4, value: "מקשאפ" },
                    { name: "בהד 1", id: 12, value: "בהד 1" },
                ]
                , index: 0,
                title: "בחר סביבה"
            }
            ,
            {
                list: [
                    { name: "תומר", id: 4786, value: "תומר" },
                    { name: "מעבדה", id: 17682, value: "מעבדה" },
                ],
                index: 1,
                title: "תת סביבה / רמת הרשאה"
            }
            ,
            {
                list: [
                    { name: "אלפא", id: 67674, value: "אלפא" },
                    { name: "דסק", id: 188882, value: "דסק" },
                ],
                index: 2,
                title: "רמת הרשאה / בחר חדר"
            }
            ,

        ],
        currentStep: {
            list: [
                { name: "מקשאפ", id: 4, value: "מקשאפ" },
                { name: "בהד 1", id: 12, value: "בהד 1" },
            ],
            index: 0,
            title: "בחר סביבה"
        }
    })


    const [accessList, setAccesList] = useState({
        currAcc: { id: "jiufdjfiodsjf" },
        listAccExist: [
            // { id: "fidjiodsfj", sw: "בהד 7 ", subSw: "נשקיה ", room: "חדר 1", role: "מנהל" },
            // { id: "fruifhdsjfi", sw: "בהד 20 ", subSw: "חדר אוכל ", room: "חדר 2", role: "עורך" },
        ]
    })

    const handleStepsChange = (option, index, key) => {

        setSteps((prev) => {
            const isPrev = prev.prevData.some((item) => item.id === option.id);
            return {
                ...prev,
                prevData: isPrev
                    ? prev.prevData.filter((item) => item.id !== option.id)
                    : [...prev.prevData, option],
                nextData: isPrev
                    ? [...prev.nextData]
                    : prev.nextData.slice(1),
            };
        });

        // Update userAccessList
        setUserAccessList((prev) => ({
            ...prev,
            currentStep: userAccessList.listOption[index + 1] || prev.currentStep,
        }));

        setAccesList({ ...accessList, currAcc: { ...accessList.currAcc, [key]: option?.value } })
    };

    const handleChooseAccess = (access) => {
        setUserAccessList({ ...userAccessList, currentStep: { ...userAccessList.currentStep, role: access } })
        setAccesList({ ...accessList, currAcc: { ...accessList.currAcc, role: access } })
    }


    const haldleDeleteAccExist = (acc) => {
        const filterdList = accessList.listAccExist?.filter((item) => item?.id !== acc?.id)
        setAccesList({ ...accessList, listAccExist: filterdList })
    }

    const handleEditAcc = (acc) => {
        const listSteps = []
        if (acc?.sw) {
            listSteps?.push({ id: Date.now(), name: acc?.sw, value: acc?.sw })
        }
        if (acc?.subSw) {
            listSteps?.push({ id: Date.now(), name: acc?.subSw, value: acc?.subSw })
        }
        if (acc?.room) {
            listSteps?.push({ id: Date.now(), name: acc.room, value: acc.room })
        }
        if (acc?.role) {
            setUserAccessList({ ...userAccessList, currentStep: { ...userAccessList.currentStep, role: acc.role } })
        }


        setSteps({ ...steps, prevData: listSteps, nextData: [] })
    }


    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={
                <div className=' flex items-center gap-10'>
                    <span>
                        {!isRegisterUser ? "יצירת משתמש" : "עריכת משתמש"}
                    </span>
                    <span>{"-->"}</span>
                    <span className=' text-lg font-semibold'>
                        {isRegisterUser ? "מנדי יעקובוב/ מ.א 8888888 /מתכנת צוות אלפא" : ""}
                        {!isRegisterUser && <CustomInput key={7435} state={""} setState={""} label={"מ.א"} keyToUpdate={""} required={true} placeholder={"הכנסו מ.א"} />}
                    </span>
                </div>
            }
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={[]} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className='mx-10 flex-1 gap-10 flex items-center justify-center mt-[2.5vw] border-border bg-accent shadow-md border-2 rounded-xl '>
                <div className="flex justify-start min-h-[35vw] flex-col gap-6 w-2/3">

                    <div className=" flex items-start gap-16 flex-col p-10">
                        <div className=" w-full">
                            <div className=" text-xl">
                                ניהול הרשאות לפי סביבה
                            </div>
                            <StepContainer steps={steps} />
                        </div>
                        <div className="">
                            <div className=" text-lg font-semibold underline flex items-center gap-7">
                                {userAccessList?.currentStep?.title}
                                {steps?.nextData?.length > 0 && <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                </span>}
                            </div>
                            <div className="pt-3 flex items-center gap-5">
                                {userAccessList.currentStep?.list?.map((item, index) => (<button onClick={() => handleStepsChange(item, userAccessList.currentStep?.index, userAccessList.currentStep?.title == "רמת הרשאה / בחר חדר" ? "room" : userAccessList.currentStep?.title == "תת סביבה / רמת הרשאה" ? "subSw" : "sw")} key={index} className={`px-3 cursor-pointer py-1 border-2 text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150 ${steps?.prevData?.includes(item) ? "text-accent bg-primary" : "bg-accent text-primary"}`}>{item?.name}</button>))}
                            </div>
                        </div>
                        {steps?.prevData?.length > 0 && <div className="">
                            <div className=" text-lg font-semibold underline flex items-center gap-7">
                                רמת הרשאה
                                {steps?.prevData?.length > 0 && !userAccessList?.currentStep?.role && <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                </span>}
                            </div>
                            <div className="pt-3 flex items-center gap-5">
                                {["צופה", "עורך", "מנהל"]?.map((item, index) => (<button onClick={() => handleChooseAccess(item)} key={index} className={`px-3 cursor-pointer py-1 border-2 text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150 ${userAccessList?.currentStep?.role == item ? "text-accent bg-primary" : "bg-accent text-primary"}`}>{item}</button>))}
                            </div>
                        </div>}
                        {steps?.prevData?.length > 0 && userAccessList?.currentStep?.role && <button onClick={() => {
                            setAccesList({ ...accessList, listAccExist: [...accessList.listAccExist, accessList.currAcc] }), setSteps({
                                ...steps, prevData: [], nextData: [
                                    { name: "בחר סביבה", id: 3, value: "" },
                                    { name: "תת סביבה / רמת הרשאה", id: 2, value: "מנור" },
                                    { name: "רמת הרשאה / בחר חדר", id: 5, value: "בחר חדר" },
                                ],
                            }), setUserAccessList({ ...userAccessList, currentStep: userAccessList.listOption[0] })
                        }} className={`px-6 -mt-3 text-[#66BB6A] border-[#66BB6A] hover:scale-105 duration-150 p-1 font-bold border-2 rounded-md `}>
                            הוספת הרשאה
                        </button>}
                        <div className=" flex flex-col gap-2">
                            <div className=" text-lg font-semibold underline">
                                הרשאות פעילות
                            </div>
                            {accessList?.listAccExist?.map((item, index) => (<div key={index} className="px-3 cursor-default py-1 min-w-96 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-between items-center hover:scale-110 duration-150">
                                <div className=" text-text">
                                    {item?.role && item?.role + " • "}{item?.sw && item?.sw}{item?.subSw && " / " + item?.subSw}{item?.room && " / " + item?.room}
                                </div>
                                <div className=" flex items-center gap-5">
                                    <button onClick={() => handleEditAcc(item)} className=' text-info'>
                                        <BiEdit />
                                    </button>
                                    <button onClick={() => haldleDeleteAccExist(item)} className=' text-error'>
                                        <GoTrash />
                                    </button>
                                </div>
                            </div>))}
                            {accessList?.listAccExist?.length == 0 && <div>אין הרשאות פעילות :(</div>}
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col max-w-[700px] m-10 w-2/5">
                    <img src="/Update-amico.png" alt="new issuse" />
                </div>
            </section>
        </TemplatePage>
    )
}

export default ManageUserAccess