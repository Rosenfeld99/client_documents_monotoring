import React, { useEffect, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'
import { IoClose } from 'react-icons/io5'
import { BiEdit } from 'react-icons/bi'
import { GoTrash } from 'react-icons/go'
import useUsers from '../hooks/useUsers'
import useSpaceWork from '../hooks/useSpaceWork'

const HomePage = () => {
    const { singleOptoin, options, setSingleOption, allUserRooms, setAllUserRooms } = useContextStore()
    const [searchParams] = useSearchParams()
    const { currentUser } = useUsers()
    const { createRoom, editRoom, deleteRoom, getRoomInputs } = useSpaceWork()

    // toggleEdit: toggle between open and closed creation
    //toggleInput:toggle between open and closed input creation
    //inputValue:the value of the Input
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleInput, setToggleInput] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const navigate = useNavigate()

    const getRooms = () => {
        const validRooms = []
        if (currentUser?.rooms) {
            //currentUser.rooms:is object of map, with all rooms
            for (const key in currentUser?.rooms) {
                const parts = key.split('_');
                if (parts[0] === searchParams.get('sw') && parts[1] === searchParams.get('subSW')) {
                    validRooms.push(parts[2])
                }
            }
        }
        return validRooms
    }
    useEffect(() => {
        setAllUserRooms(getRooms())
    }, [currentUser])




    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]
    const handleActions = (e, actionType, oldRoomName) => {
        if (!inputValue && actionType === "create") {
            alert("השדה ריק!")
            return
        }
        //In this object, I insert all possible fields, but the hook destructures only what it needs
        const roomObj = {
            adminId: currentUser.userId,
            spaceWorkName: searchParams.get("sw"),
            subSpaceWorkName: searchParams.get("subSW"),
            roomName: inputValue,
            newRoomName: inputValue,
            oldRoomName
        }
        const duplicateName = (newName) => {
            return allUserRooms.find((roomName) => roomName === newName)
        }
        switch (actionType) {
            case "create":
                if (duplicateName(roomObj.newRoomName)) {
                    alert("יש כבר סביבה עם אותו שם")
                    return;
                }
                createRoom(
                    roomObj
                )
                break;
            case "edit":
                //check if has new name for room, and the new name is not equal to oldest name,after than do func
                if (roomObj?.newRoomName && roomObj?.newRoomName !== roomObj?.oldRoomName) {
                    if (duplicateName(roomObj.newRoomName)) {
                        alert("יש כבר סביבה עם אותו שם")
                        return;
                    }
                    editRoom(roomObj)
                }
                break;
            case "delete":
                deleteRoom(
                    { ...roomObj, roomName: oldRoomName }
                )
                break;
            default:
                break;
        }

        setInputValue("")
    }
    const handleNavigate = (item) => {
        const roomObj = {
            spaceWork: searchParams.get('sw'),
            subSpaceWork: searchParams.get('subSW'),
            room: item,
            userId: currentUser.userId
        }
        getRoomInputs(roomObj)
        navigate(`/dashboard?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${item}`)
        localStorage.setItem("room", item)

    }
    // check if user is owner or he have permission of superAdmin or admin to manage the rooms
    const roomPermission = searchParams?.get('sw') && searchParams?.get('subSW') && currentUser?.subSpaceWorks[searchParams.get('sw')][searchParams?.get('subSW')] === "admin"
    const subSPpermission = searchParams?.get('sw') && currentUser?.spaceWorks[searchParams.get('sw')] === "superAdmin"
    const havePermission = currentUser?.isOwner || subSPpermission || roomPermission
    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={<div className='flex'>
                חדר
                {havePermission && <div onClick={() => setToggleEdit((prev) => !prev)} className={`text-sm cursor-pointer mr-3`}>{toggleEdit ? (<div className='flex rounded-full  text-[#5a6acf]  items-center py-2 px-4 shadow-md gap-2'> סיום עריכה<IoClose onClick={() => setToggleInput(false)} /></div>) : (<div className='flex rounded-full  text-[#FF8A65]  items-center py-2 px-4 shadow-md gap-2'>{searchParams.get('sw') || singleOptoin?.name ? "עריכת תת-סביבה" : "עריכת סביבה"}<BiEdit onClick={() => setToggleInput(false)} />  </div>)}</div>}

            </div>}
            navLeft={`${searchParams.get('sw')} / ${searchParams.get('subSW')} / בחירת חדר`}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showExcel={false}
            showBall={true}
            showSelectOption={false}
            options={["gfds"]}
        >
            <section className='mx-10 relative flex-1 grid grid-cols-3 '>
                {/* {havePermission && <div onClick={() => setToggleEdit((prev) => !prev)} className='absolute cursor-pointer -top-12 right-32'>{toggleEdit ? (<div className='flex rounded-full  text-[#5a6acf]  items-center py-2 px-4 shadow-md gap-2'> סיום עריכה<IoClose onClick={() => setToggleInput(false)} /></div>) : (<div className='flex rounded-full  text-[#FF8A65]  items-center py-2 px-4 shadow-md gap-2'>עריכת חדר<BiEdit onClick={() => setToggleInput(false)} />  </div>)}</div>} */}

                {allUserRooms?.map((item, i) => (
                    <div key={item} className={`flex relative items-center justify-center h-80   border-l-[1px] border-b-[1px] border-border`}>
                        {/* if mode is edit, show delete icon */}
                        {toggleEdit && <span onClick={(e) => handleActions(e, "delete", item)} className='cursor-pointer absolute left-2 top-0' ><GoTrash color='red' /></span>}
                        {/* if mode is edit, the option will be input to edit name else it will be btn */}
                        <div className='relative w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150'>
                            {toggleEdit ?
                                (<>
                                    <BiEdit size={15} className='absolute right-1 top-1 ' />
                                    <input onFocus={() => setToggleInput(false)} name={item} onChange={(e) => setInputValue(e.target.value)} onBlur={(e) => handleActions(e, "edit", item)} defaultValue={item} className='text-center p-4 px-5 xl:px-10 w-full rounded-lg outline-none' type="text" />
                                </>) :
                                <button onClick={() => { handleNavigate(item) }} className='p-4 px-5 xl:px-10 w-full' >{item}</button>
                            }
                        </div>
                    </div>
                ))}

                {toggleEdit && (
                    <div className={`flex items-center justify-center h-80 border-2  border-dotted border-primary`}>
                        {toggleInput ?
                            <div className='flex flex-col'>
                                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='outline-none p-3  w-40 xl:w-56 bg-accent border-2 text-primary  text-2xl font-semibold border-primary shadow-md rounded-lg flex justify-center items-center ' autoFocus={true} placeholder="הכנס/י חדר" />
                                <div className='flex justify-evenly mt-2'>
                                    <button onClick={(e) => handleActions(e, "create")} className='px-6 p-1 font-bold border-2 rounded-md text-[#66BB6A]'>יצירה</button>
                                    <button onClick={() => setToggleInput(false)} className='px-6 p-1 font-bold border-2 rounded-md text-[#E57373]'>ביטול</button>
                                </div>
                            </div>
                            :
                            <button onClick={() => { setToggleInput(true) }} className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-primary  text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150' > הוספת חדר +</button>
                        }
                    </div>
                )}
            </section>
        </TemplatePage>
    )
}

export default HomePage