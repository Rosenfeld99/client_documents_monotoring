import React, { useEffect, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import StepContainer from '../utils/steps/StepContainer'
import { BiEdit } from 'react-icons/bi'
import { GoTrash } from 'react-icons/go'
import CustomInput from '../utils/CustomInput'
import useUsers from '../hooks/useUsers'
import { createAndUpdateUserObj, defulteUserAcList, userAccess } from '../utils/manageUsers/userAccess'
import { getListToShow, implementGoBack, roomList, subSwList, swList } from '../utils/manageUsers/managementUsersFunc'

const ManageUserAccess = () => {
    const [searchParams] = useSearchParams()
    const { id } = useParams()
    const { currentUser } = useUsers()
    const location = useLocation();  // Get the full URL, including state

    const userObj = location.state;
    console.log(userObj);

    // console.log(`${userObj["שם פרטי"]} ${userObj["שם משפחה"]}/${userObj["מ.א"]}/${userObj["תפקיד"]}`)

    const [isRegisterUser, setIsRegisterUser] = useState(id ? true : false)
    const [newUserID, setNewUserId] = useState({ id: userObj ? userObj["מ.א"] : "" })
    const { createUser } = useUsers()

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`
    const prevData = []
    const nextData = [
        { name: "בחר סביבה", id: 3, value: "" },
        { name: "תת סביבה / רמת הרשאה", id: 2, value: "" },
        { name: "רמת הרשאה / בחר חדר", id: 5, value: "בחר חדר" },
    ]
    const [steps, setSteps] = useState({
        prevData: [...prevData],
        nextData: [...nextData]
    });

    const [userAccessList, setUserAccessList] = useState({
        listOption: [
            {
                list: [
                ]
                , index: 0,
                title: "בחר סביבה"
            }
            ,
            {
                list: [
                ],
                index: 1,
                title: "תת סביבה / רמת הרשאה"
            }
            ,
            {
                list: [
                ],
                index: 2,
                title: "רמת הרשאה / בחר חדר"
            }
            ,

        ],
        currentStep: {
            list: [

            ],
            index: 0,
            title: "בחר סביבה"
        }
    })

    const [accessList, setAccesList] = useState({
        currAcc: { id: "" },
        listAccExist: [
            // { id: "fidjiodsfj", sw: "בהד 7 ", subSw: "נשקיה ", room: "חדר 1", role: "מנהל" },
            // { id: "fruifhdsjfi", sw: "בהד 20 ", subSw: "חדר אוכל ", room: "חדר 2", role: "עורך" },
        ]
    })
    console.log(accessList);

    useEffect(() => {
        getListToShow(userAccessList, setUserAccessList, currentUser, "sw")
    }, [currentUser])

    const handleStepsChange = (option, index, key) => {

        setAccesList({ ...accessList, currAcc: { ...accessList.currAcc, [key]: option?.value } })

        setSteps((prev) => {

            const isPrev = prev.prevData.some((item) => item.id === option.id);
            return {
                // ...prev,
                prevData: isPrev
                    ? prev.prevData.filter((item) => item.id !== option.id)
                    : [...prev.prevData, option],
                nextData: isPrev
                    ? [...prev.nextData]
                    : prev.nextData.slice(1),
            };
        });

        key === "sw" ? getListToShow(userAccessList, setUserAccessList, currentUser, "subSw", option?.value) : getListToShow(userAccessList, setUserAccessList, currentUser, "room", accessList.currAcc.sw, option?.value)
        // Update userAccessList
        setUserAccessList((prev) => ({
            ...prev,
            currentStep: userAccessList.listOption[index + 1] || prev.currentStep,
        }));
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
    const handleGoBack = (e, option, index) => {

        implementGoBack(index, setAccesList, setUserAccessList, setSteps, accessList, currentUser)
    }
    // const handleGoBack = (e, option, index) => {

    //     switch (index) {
    //         case 0:
    //             // reset the access list to defulte
    //             setAccesList((prev) => ({ ...prev, currAcc: { id: "" } }));

    //             // get the list of the spaceWork
    //             const spaceList = swList(currentUser)

    //             // get the defult struct of the userAccess list
    //             const swObj = defulteUserAcList()
    //             swObj.currentStep.list = spaceList;
    //             swObj.listOption[0].list = spaceList;
    //             setUserAccessList(swObj); // Directly call the default function
    //             setSteps({ prevData: [...prevData], nextData: [...nextData] });
    //             break;

    //         case 1:
    //             // reset the access list to empty id but chosen the spaceWork and delete other(subSw,room)
    //             setAccesList((prev) => ({ ...prev, currAcc: { id: "", sw: prev?.currAcc?.sw } }));
    //             // get subSw list to choose
    //             const subList = subSwList(currentUser, accessList?.currAcc?.sw)

    //             // get the defult struct of the userAccess list
    //             const subSObj = defulteUserAcList()

    //             // set the struct in place 1(תת-סביבה) to get the list of subSw
    //             subSObj.currentStep.list = subList;
    //             subSObj.listOption[1].list = subList;
    //             subSObj.currentStep = subSObj.listOption[1];

    //             setUserAccessList(subSObj); // Directly call the default function
    //             const [_, ...remainingNextData] = nextData;
    //             // get the sw chosen and insert him to firstElement
    //             const swName = accessList.currAcc.sw
    //             const firstElement = { name: swName, id: swName, value: swName };
    //             let prev = []
    //             prev.push(firstElement);
    //             // Update nextData to exclude the first element
    //             setSteps({ prevData: prev, nextData: remainingNextData });
    //             break;

    //         case 2:
    //             // reset the access list to empty id but chosen the spaceWork and delete other(subSw,room)
    //             setAccesList((prev) => ({ ...prev, currAcc: { id: "", sw: prev?.currAcc?.sw, subSw: prev?.currAcc?.subSw } }));
    //             // get subSw list to choose
    //             const roomListToshow = roomList(currentUser, accessList?.currAcc?.sw, accessList?.currAcc?.subSw)
    //             console.log(roomListToshow);

    //             // get the defult struct of the userAccess list
    //             const roomObj = defulteUserAcList()

    //             // set the struct in place 2(חדר) to get the list of subSw
    //             roomObj.currentStep.list = roomListToshow;
    //             roomObj.listOption[2].list = roomListToshow;
    //             roomObj.currentStep = roomObj.listOption[2];

    //             setUserAccessList(roomObj); // Directly call the default function
    //             const remainingNext = [nextData[2]];
    //             // get the sw chosen and insert him to firstElement
    //             const swName1 = accessList.currAcc.sw
    //             const subSw = accessList.currAcc.subSw
    //             const firstEl = { name: swName1, id: swName1, value: swName1 };
    //             const secondEl = { name: subSw, id: subSw, value: subSw };
    //             let pre = []
    //             pre.push(firstEl);
    //             pre.push(secondEl);
    //             // Update nextData to exclude the first element
    //             setSteps({ prevData: pre, nextData: remainingNext });
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const addNewUserId = (value) => {
        if (value.length > 8) {
            return
        }
        const regex = /^[smo]/;
        if (!regex.test(value) && value?.length > 0) {
            alert(" m,o,c,s התו הראשון חייב להיות   באנגלית")
            return
        }
        setNewUserId({ id: value })
    }
    // this is for send req to server to add user
    const addAndUpdateUser = () => {
        const newUserObj = createAndUpdateUserObj(accessList?.currAcc, currentUser?.userId, newUserID?.id)

        //    this func is send to server req
        createUser(newUserObj)

        setAccesList({ currAcc: { id: "" }, listAccExist: [...accessList.listAccExist, accessList.currAcc] }), setSteps({
            ...steps, prevData: [], nextData: [
                { name: "בחר סביבה", id: 3, value: "" },
                { name: "תת סביבה / רמת הרשאה", id: 2, value: "" },
                { name: "רמת הרשאה / בחר חדר", id: 5, value: "" },
            ],
        });
        const list = swList(currentUser)
        const resetUserAcList = defulteUserAcList()
        resetUserAcList.listOption[0].list = list;
        resetUserAcList.currentStep.list = list;
        setUserAccessList(resetUserAcList)
    }
    const accessOptions = userAccess(accessList.currAcc.sw, accessList.currAcc.subSw, accessList.currAcc.room)

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
                        {isRegisterUser ? (`${userObj["תפקיד"]}/${userObj["מ.א"]}/${userObj["שם פרטי"]} ${userObj["שם משפחה"]}`) : ""}
                        {!isRegisterUser && <CustomInput maxLen={8} key={7435} state={newUserID} setState={addNewUserId} label={"מ.א"} keyToUpdate={"id"} required={true} placeholder={"הכנסו מ.א"} />}
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
                            <StepContainer handleClick={handleGoBack} steps={steps} />
                        </div>
                        <div className="">
                            <div className=" text-lg font-semibold underline flex items-center gap-7">
                                {!accessList.currAcc.room && userAccessList?.currentStep?.title}
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
                                {`${accessList.currAcc.room || accessList.currAcc.subSw || accessList.currAcc.sw} רמת הרשאה `}
                                {steps?.prevData?.length > 0 && !userAccessList?.currentStep?.role && <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                </span>}
                            </div>
                            <div className="pt-3 flex items-center gap-5">
                                {
                                    accessOptions?.map((item, index) => (<button onClick={() => handleChooseAccess(item?.value)} key={index} className={`px-3 cursor-pointer py-1 border-2 text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150 ${userAccessList?.currentStep?.role == item?.value ? "text-accent bg-primary" : "bg-accent text-primary"}`}>{item?.name}</button>))}
                            </div>
                        </div>}
                        {(steps?.prevData?.length > 0 && userAccessList?.currentStep?.role) && <button onClick={addAndUpdateUser} className={`px-6 -mt-3 text-[#66BB6A] border-[#66BB6A] hover:scale-105 duration-150 p-1 font-bold border-2 rounded-md `}>
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