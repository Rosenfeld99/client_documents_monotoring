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

    const spaceWorkName = searchParams.get('sw')
    const subSpaceWorkName = searchParams.get('subSW')
    const roomName = searchParams.get('room')

    const userObj = location.state;

    // console.log(`${userObj["שם פרטי"]} ${userObj["שם משפחה"]}/${userObj["מ.א"]}/${userObj["תפקיד"]}`)

    const [isRegisterUser, setIsRegisterUser] = useState(id ? true : false)
    const [newUserID, setNewUserId] = useState({ id: userObj ? userObj["מ.א"] : "" })
    const { createUser } = useUsers()

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`
    const prevData = []
    const nextData = [
        { name: "בחר סביבה", id: 3, value: "" },
        { name: "תת סביבה / רמת הרשאה", id: 2, value: "" },
        { name: "רמת הרשאה / בחר חדר", id: 5, value: "" },
    ]

    const defultListOptions = [{
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
    }]
    const indexesLevels = ["sw", "subSw", "room"]

    const [steps, setSteps] = useState({
        prevData: [...prevData],
        nextData: nextData.map(item => ({ ...item }))
    });

    const [userAccessList, setUserAccessList] = useState({
        listOption: defultListOptions.map(item => ({ ...item })),
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

    useEffect(() => {
        if (!currentUser.isOwner) {
            handleStepsChange("", { name: spaceWorkName, id: spaceWorkName + 2, value: spaceWorkName }, 0, "sw")
            if (currentUser?.spaceWorks[spaceWorkName] !== "superAdmin") {
                // handleStepsChange("", { name: subSpaceWorkName, id: subSpaceWorkName + 7, value: subSpaceWorkName }, 1, "subSw")
            }
        } else {
            const swList = getListToShow(currentUser, "sw")
            setUserAccessList((prev) => ({ ...prev, currentStep: swList }))

        }


    }, [currentUser])

    const handleStepsChange = (e, option, index, key2) => {

        // to know if user want to return back the key2 will be empty, else the key2 will be the key of the field
        const isPrev = key2 ? false : true
        let indexOfReturnBack = steps.prevData.findIndex((item) => item.id === option.id)
        if (indexOfReturnBack == 0 && !currentUser.isOwner) {
            return
        }
        if (indexOfReturnBack == 1 && (!currentUser.isOwner && currentUser?.spaceWorks[spaceWorkName] !== "superAdmin")) {
            return

        }
        // if the user want to return back so the will change to sw or subSw else is what the user chosen
        let key;
        if (isPrev) {
            if (accessList.currAcc["room"]) {
                key = "room"
            } else if (accessList.currAcc["subSw"]) {
                key = "subSw"
            }
        }
        else key = key2
        // if user want to return back so delete the last chosen field else add the field
        if (isPrev) {
            delete accessList.currAcc[key]
        }
        else setAccesList({ ...accessList, currAcc: { ...accessList.currAcc, [key]: option?.value } })

        // here i will get the next steps to show and the prev steps after the user return back according to the user choice
        const nextDataSteps = []
        const prevDataSteps = steps.prevData.filter((item, index) => index < indexOfReturnBack)

        for (let i = indexOfReturnBack; i < nextData.length; i++) {
            nextDataSteps.push({ ...nextData[i] })
        }

        setSteps((prev) => {
            // const isPrev = prev.prevData.some((item) => item.id === option.id);
            return {
                // ...prev,
                prevData: isPrev
                    ? [...prevDataSteps]
                    : [...prev.prevData, option],
                nextData: isPrev
                    ? [...nextDataSteps]
                    : prev.nextData.slice(1),
            };
        });


        let listToShow;
        // get the chosen list according to the user choice if the user want to return back so the list will be the prev list else the list will be the next list
        if (isPrev) {
            listToShow = getListToShow(currentUser, indexesLevels[indexOfReturnBack], accessList.currAcc.sw, option?.value)
        }
        else listToShow = key === "sw" ? getListToShow(currentUser, "subSw", option?.value) : getListToShow(currentUser, "room", accessList.currAcc.sw || spaceWorkName, option?.value)
        // Update userAccessList

        setUserAccessList((prev) => ({
            ...prev,
            currentStep: listToShow || prev.currentStep,
            // currentStep: userAccessList.listOption[isPrev ? index - 1 : index + 1] || prev.currentStep,
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
    // const handleGoBack = (e, option, index) => {
    //     implementGoBack(index, setAccesList, setUserAccessList, setSteps, accessList, currentUser, searchParams.get("sw"), searchParams.get("subSW"))
    // }

    // this for save the input of the new user id
    const addNewUserId = (value) => {
        if (value.length > 8) {
            return
        }
        const regex = /^[smoc]/;
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
        handleStepsChange("", { name: spaceWorkName, id: spaceWorkName + 2, value: spaceWorkName }, 0, "sw")

        setAccesList({ currAcc: { id: "" }, listAccExist: [...accessList.listAccExist, accessList.currAcc] }), setSteps({
            ...steps, prevData: [{ name: spaceWorkName, id: 3, value: spaceWorkName },], nextData: [
                { name: "תת סביבה / רמת הרשאה", id: 2, value: "" },
                { name: "רמת הרשאה / בחר חדר", id: 5, value: "" },
            ],
        });
        const list = subSwList(currentUser, spaceWorkName)
        const resetUserAcList = defulteUserAcList()
        resetUserAcList.listOption[1] = list;
        resetUserAcList.currentStep = list;

        setAccesList({ currAcc: { id: "", sw: spaceWorkName }, listAccExist: [...accessList.listAccExist] })
        setUserAccessList(resetUserAcList)
    }
    const accessOptions = userAccess(currentUser, accessList.currAcc.sw, accessList.currAcc.subSw, accessList.currAcc.room)

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
                            <StepContainer handleClick={handleStepsChange} steps={steps} />
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
                                {userAccessList.currentStep?.list?.map((item, index) => (<button onClick={(e) => handleStepsChange(e, item, userAccessList.currentStep?.index, userAccessList.currentStep?.title == "רמת הרשאה / בחר חדר" ? "room" : userAccessList.currentStep?.title == "תת סביבה / רמת הרשאה" ? "subSw" : "sw")} key={index} className={`px-3 cursor-pointer py-1 border-2 text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150 ${steps?.prevData?.includes(item) ? "text-accent bg-primary" : "bg-accent text-primary"}`}>{item?.name}</button>))}
                            </div>
                        </div>
                        {steps?.prevData?.length > 0 && <div className="">
                            <div className=" text-lg font-semibold underline flex items-center gap-7">
                                {/* check if this user have access to give access to others; accessOptions=the list of access option else it is empty array  */}
                                {accessOptions[0] && `${accessList.currAcc.room || accessList.currAcc.subSw || accessList.currAcc.sw} רמת הרשאה `}
                                {accessOptions[0] && steps?.prevData?.length > 0 && !userAccessList?.currentStep?.role && <span className="relative flex h-3 w-3">
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
                            {id ? "עדכון הרשאה" : " הוספת הרשאה"}
                        </button>}
                        <div className=" flex flex-col gap-2">
                            {/* <div className=" text-lg font-semibold underline">
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
                            {accessList?.listAccExist?.length == 0 && <div>אין הרשאות פעילות :(</div>} */}
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
// import React, { useEffect, useState } from 'react'
// import TemplatePage from '../utils/TemplatePage'
// import CustomSelect from '../utils/CustomSelect'
// import { useLocation, useParams, useSearchParams } from 'react-router-dom'
// import StepContainer from '../utils/steps/StepContainer'
// import { BiEdit } from 'react-icons/bi'
// import { GoTrash } from 'react-icons/go'
// import CustomInput from '../utils/CustomInput'
// import useUsers from '../hooks/useUsers'
// import { createAndUpdateUserObj, defulteUserAcList, userAccess } from '../utils/manageUsers/userAccess'
// import { getListToShow, implementGoBack, roomList, subSwList, swList } from '../utils/manageUsers/managementUsersFunc'

// const ManageUserAccess = () => {
//     const [searchParams] = useSearchParams()
//     const { id } = useParams()
//     const { currentUser } = useUsers()
//     const location = useLocation();  // Get the full URL, including state

//     const spaceWorkName = searchParams.get('sw')
//     const subSpaceWorkName = searchParams.get('subSW')
//     const roomName = searchParams.get('room')

//     const userObj = location.state;
//     console.log(userObj);

//     // console.log(`${userObj["שם פרטי"]} ${userObj["שם משפחה"]}/${userObj["מ.א"]}/${userObj["תפקיד"]}`)

//     const [isRegisterUser, setIsRegisterUser] = useState(id ? true : false)
//     const [newUserID, setNewUserId] = useState({ id: userObj ? userObj["מ.א"] : "" })
//     const { createUser } = useUsers()

//     const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`
//     const prevData = []
//     const nextData = [
//         { name: "בחר סביבה", id: 3, value: "" },
//         { name: "תת סביבה / רמת הרשאה", id: 2, value: "" },
//         { name: "רמת הרשאה / בחר חדר", id: 5, value: "בחר חדר" },
//     ]
//     const [steps, setSteps] = useState({
//         prevData: [...prevData],
//         nextData: [...nextData]
//     });

//     const [userAccessList, setUserAccessList] = useState({
//         listOption: [
//             {
//                 list: [
//                 ]
//                 , index: 0,
//                 title: "בחר סביבה"
//             }
//             ,
//             {
//                 list: [
//                 ],
//                 index: 1,
//                 title: "תת סביבה / רמת הרשאה"
//             }
//             ,
//             {
//                 list: [
//                 ],
//                 index: 2,
//                 title: "רמת הרשאה / בחר חדר"
//             }
//             ,

//         ],
//         currentStep: {
//             list: [

//             ],
//             index: 0,
//             title: "בחר סביבה"
//         }
//     })

//     const [accessList, setAccesList] = useState({
//         currAcc: { id: "" },
//         listAccExist: [
//             // { id: "fidjiodsfj", sw: "בהד 7 ", subSw: "נשקיה ", room: "חדר 1", role: "מנהל" },
//             // { id: "fruifhdsjfi", sw: "בהד 20 ", subSw: "חדר אוכל ", room: "חדר 2", role: "עורך" },
//         ]
//     })
//     console.log(accessList);

//     useEffect(() => {

//         handleStepsChange({ name: spaceWorkName, id: spaceWorkName + 2, value: spaceWorkName }, 0, "sw")
//         // if (currentUser?.spaceWorks[spaceWorkName] !== "superAdmin") {
//         // }
//         // if (currentUser?.spaceWorks[spaceWorkName] === "superAdmin") {
//         //     getListToShow(userAccessList, setUserAccessList, currentUser, "sw")
//         // }
//     }, [currentUser])

//     const handleStepsChange = (option, index, key) => {
//         console.log(option, index, key);

//         setAccesList({ ...accessList, currAcc: { ...accessList.currAcc, [key]: option?.value } })

//         setSteps((prev) => {

//             const isPrev = prev.prevData.some((item) => item.id === option.id);
//             return {
//                 // ...prev,
//                 prevData: isPrev
//                     ? prev.prevData.filter((item) => item.id !== option.id)
//                     : [...prev.prevData, option],
//                 nextData: isPrev
//                     ? [...prev.nextData]
//                     : prev.nextData.slice(1),
//             };
//         });
//         key === "sw" ? getListToShow(userAccessList, setUserAccessList, currentUser, "subSw", option?.value) : getListToShow(userAccessList, setUserAccessList, currentUser, "room", accessList.currAcc.sw, option?.value)
//         // Update userAccessList
//         setUserAccessList((prev) => ({
//             ...prev,
//             currentStep: userAccessList.listOption[index + 1] || prev.currentStep,
//         }));
//     };
//     const handleChooseAccess = (access) => {
//         setUserAccessList({ ...userAccessList, currentStep: { ...userAccessList.currentStep, role: access } })
//         setAccesList({ ...accessList, currAcc: { ...accessList.currAcc, role: access } })
//     }

//     const haldleDeleteAccExist = (acc) => {
//         const filterdList = accessList.listAccExist?.filter((item) => item?.id !== acc?.id)
//         setAccesList({ ...accessList, listAccExist: filterdList })
//     }

//     const handleEditAcc = (acc) => {
//         const listSteps = []
//         if (acc?.sw) {
//             listSteps?.push({ id: Date.now(), name: acc?.sw, value: acc?.sw })
//         }
//         if (acc?.subSw) {
//             listSteps?.push({ id: Date.now(), name: acc?.subSw, value: acc?.subSw })
//         }
//         if (acc?.room) {
//             listSteps?.push({ id: Date.now(), name: acc.room, value: acc.room })
//         }
//         if (acc?.role) {
//             setUserAccessList({ ...userAccessList, currentStep: { ...userAccessList.currentStep, role: acc.role } })
//         }
//         setSteps({ ...steps, prevData: listSteps, nextData: [] })
//     }
//     const handleGoBack = (e, option, index) => {
//         implementGoBack(index, setAccesList, setUserAccessList, setSteps, accessList, currentUser, searchParams.get("sw"), searchParams.get("subSW"))
//     }
//     // this for save the input of the new user id
//     const addNewUserId = (value) => {
//         if (value.length > 8) {
//             return
//         }
//         const regex = /^[smoc]/;
//         if (!regex.test(value) && value?.length > 0) {
//             alert(" m,o,c,s התו הראשון חייב להיות   באנגלית")
//             return
//         }
//         setNewUserId({ id: value })
//     }

//     // this is for send req to server to add user
//     const addAndUpdateUser = () => {
//         const newUserObj = createAndUpdateUserObj(accessList?.currAcc, currentUser?.userId, newUserID?.id)

//         //    this func is send to server req
//         createUser(newUserObj)

//         setAccesList({ currAcc: { id: "" }, listAccExist: [...accessList.listAccExist, accessList.currAcc] }), setSteps({
//             ...steps, prevData: [], nextData: [
//                 { name: "בחר סביבה", id: 3, value: "" },
//                 { name: "תת סביבה / רמת הרשאה", id: 2, value: "" },
//                 { name: "רמת הרשאה / בחר חדר", id: 5, value: "" },
//             ],
//         });
//         const list = swList(currentUser)
//         const resetUserAcList = defulteUserAcList()
//         resetUserAcList.listOption[0].list = list;
//         resetUserAcList.currentStep.list = list;
//         setUserAccessList(resetUserAcList)
//     }
//     const accessOptions = userAccess(accessList.currAcc.sw, accessList.currAcc.subSw, accessList.currAcc.room)
//     return (
//         <TemplatePage
//             showHeader={true}
//             showNav={true}
//             showSidebar={true}
//             titleHeader={
//                 <div className=' flex items-center gap-10'>
//                     <span>
//                         {!isRegisterUser ? "יצירת משתמש" : "עריכת משתמש"}
//                     </span>
//                     <span>{"-->"}</span>
//                     <span className=' text-lg font-semibold'>
//                         {isRegisterUser ? (`${userObj["תפקיד"]}/${userObj["מ.א"]}/${userObj["שם פרטי"]} ${userObj["שם משפחה"]}`) : ""}
//                         {!isRegisterUser && <CustomInput maxLen={8} key={7435} state={newUserID} setState={addNewUserId} label={"מ.א"} keyToUpdate={"id"} required={true} placeholder={"הכנסו מ.א"} />}
//                     </span>
//                 </div>
//             }
//             navRight={<CustomSelect labelText={"בחר קבוצה"} options={[]} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
//             navLeft={str}
//         >
//             <section className='mx-10 flex-1 gap-10 flex items-center justify-center mt-[2.5vw] border-border bg-accent shadow-md border-2 rounded-xl '>
//                 <div className="flex justify-start min-h-[35vw] flex-col gap-6 w-2/3">

//                     <div className=" flex items-start gap-16 flex-col p-10">
//                         <div className=" w-full">
//                             <div className=" text-xl">
//                                 ניהול הרשאות לפי סביבה
//                             </div>
//                             <StepContainer handleClick={handleGoBack} steps={steps} />
//                         </div>
//                         <div className="">
//                             <div className=" text-lg font-semibold underline flex items-center gap-7">
//                                 {!accessList.currAcc.room && userAccessList?.currentStep?.title}
//                                 {steps?.nextData?.length > 0 && <span className="relative flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
//                                 </span>}
//                             </div>
//                             <div className="pt-3 flex items-center gap-5">

//                                 {userAccessList.currentStep?.list?.map((item, index) => (<button onClick={() => handleStepsChange(item, userAccessList.currentStep?.index, userAccessList.currentStep?.title == "רמת הרשאה / בחר חדר" ? "room" : userAccessList.currentStep?.title == "תת סביבה / רמת הרשאה" ? "subSw" : "sw")} key={index} className={`px-3 cursor-pointer py-1 border-2 text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150 ${steps?.prevData?.includes(item) ? "text-accent bg-primary" : "bg-accent text-primary"}`}>{item?.name}</button>))}
//                             </div>
//                         </div>
//                         {steps?.prevData?.length > 0 && <div className="">
//                             <div className=" text-lg font-semibold underline flex items-center gap-7">
//                                 {`${accessList.currAcc.room || accessList.currAcc.subSw || accessList.currAcc.sw} רמת הרשאה `}
//                                 {steps?.prevData?.length > 0 && !userAccessList?.currentStep?.role && <span className="relative flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
//                                 </span>}
//                             </div>
//                             <div className="pt-3 flex items-center gap-5">
//                                 {
//                                     accessOptions?.map((item, index) => (<button onClick={() => handleChooseAccess(item?.value)} key={index} className={`px-3 cursor-pointer py-1 border-2 text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150 ${userAccessList?.currentStep?.role == item?.value ? "text-accent bg-primary" : "bg-accent text-primary"}`}>{item?.name}</button>))}
//                             </div>
//                         </div>}
//                         {(steps?.prevData?.length > 0 && userAccessList?.currentStep?.role) && <button onClick={addAndUpdateUser} className={`px-6 -mt-3 text-[#66BB6A] border-[#66BB6A] hover:scale-105 duration-150 p-1 font-bold border-2 rounded-md `}>
//                             {id ? "עדכון הרשאה" : " הוספת הרשאה"}
//                         </button>}
//                         <div className=" flex flex-col gap-2">
//                             {/* <div className=" text-lg font-semibold underline">
//                                 הרשאות פעילות
//                             </div>
//                             {accessList?.listAccExist?.map((item, index) => (<div key={index} className="px-3 cursor-default py-1 min-w-96 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-between items-center hover:scale-110 duration-150">
//                                 <div className=" text-text">
//                                     {item?.role && item?.role + " • "}{item?.sw && item?.sw}{item?.subSw && " / " + item?.subSw}{item?.room && " / " + item?.room}
//                                 </div>
//                                 <div className=" flex items-center gap-5">
//                                     <button onClick={() => handleEditAcc(item)} className=' text-info'>
//                                         <BiEdit />
//                                     </button>
//                                     <button onClick={() => haldleDeleteAccExist(item)} className=' text-error'>
//                                         <GoTrash />
//                                     </button>
//                                 </div>
//                             </div>))}
//                             {accessList?.listAccExist?.length == 0 && <div>אין הרשאות פעילות :(</div>} */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className=" flex flex-col max-w-[700px] m-10 w-2/5">
//                     <img src="/Update-amico.png" alt="new issuse" />
//                 </div>
//             </section>
//         </TemplatePage>
//     )
// }

// export default ManageUserAccess