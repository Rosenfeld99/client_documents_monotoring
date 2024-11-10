import React, { useEffect, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'
import { BiEdit } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import useUsers from '../hooks/useUsers'
import useSpaceWork from '../hooks/useSpaceWork'

const RootSWPage = () => {
    const { options, setOptions, singleOptoin, setSingleOption } = useContextStore()
    const navigate = useNavigate()
    const { currentUser, getUser } = useUsers()
    const [searchParams] = useSearchParams()
    const { handleGetSingleOption } = useContextStore()
    const { createSubSpaceWork, createSpaceWork, editSubSpaceWork, deleteSubSpaceWork } = useSpaceWork()

    // toggleEdit: toggle between open and closed creation
    //toggleInput:toggle between open and closed input creation
    //inputValue:the value of the Input create/edit
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleInput, setToggleInput] = useState(false)
    const [inputValue, setInputValue] = useState("")
    useEffect(() => {
        if (!searchParams.get('sw')) {
            setSingleOption([])
        }
        else if (currentUser) {
            console.log(currentUser);

            (searchParams.get('sw')) && handleGetSingleOption(searchParams.get('sw'))
        }
    }, [searchParams?.get('sw'), currentUser])
    console.log(singleOptoin);

    const lobbyOption = [
        { name: "דסק תפעול" },
        { name: "מנו”ר" },
    ]

    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]
    const handleActions = (e, actionType, oldSubSpaceWorkName) => {
        if (!inputValue && actionType == "create") {
            alert("השדה ריק!")
            return
        }
        // if it is for subSpaceWork, do this 
        if (searchParams?.get("sw")) {
            console.log(oldSubSpaceWorkName);
            //In this object, I insert all possible fields, but the hook destructures only what it needs
            const subSpaceWorkObj = {
                adminId: currentUser.userId,
                spaceWorkName: searchParams.get("sw"),
                subSpaceWorkName: inputValue,
                newSubSpaceWorkName: inputValue,
                oldSubSpaceWorkName

            }

            switch (actionType) {
                case "create":
                    createSubSpaceWork(
                        subSpaceWorkObj
                    )
                    break;
                case "edit":
                    //check if has new name for subSpaceWork, and the new name is not equal to oldest name than do func
                    if (subSpaceWorkObj?.newSubSpaceWorkName && subSpaceWorkObj?.newSubSpaceWorkName !== subSpaceWorkObj?.oldSubSpaceWorkName) {
                        editSubSpaceWork(
                            subSpaceWorkObj
                        )
                    }

                    break;
                case "delete":
                    deleteSubSpaceWork(
                        { ...subSpaceWorkObj, subSpaceWorkName: oldSubSpaceWorkName }
                    )
                    break;
                default:
                    break;
            }
        }
        // if it is space work, do this
        else {
            const spaceWorkObj = {
                adminId: currentUser.userId,
                spaceWorkName: inputValue,
            }
            switch (actionType) {
                case "create":
                    createSpaceWork(
                        spaceWorkObj
                    )
                    break;
                case "edit":

                    break;
                case "delete":

                    break;
                default:
                    break;
            }
        }
        // close the input and reset the inputValue
        setInputValue("")
    }
    // check if user is owner or he have permission of superAdmin to manage the space
    const subSPpermission = searchParams?.get('sw') && currentUser?.spaceWorks[searchParams?.get('sw')] === "superAdmin"
    const havePermission = currentUser?.isOwner || subSPpermission
    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={searchParams.get('sw') || singleOptoin?.name ? "תת סביבה" : "נדרש לבחור סביבה"}
            navLeft={searchParams.get('sw') || singleOptoin?.name ? `${searchParams.get('sw') || singleOptoin?.name} / לובי כניסה` : null}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showExcel={false}
            showBall={true}
            showSelectOption={true}
            options={currentUser?.spaceWorks ? Object?.keys(currentUser?.spaceWorks) : []}
            optionDisaled={'סביבה'}
        >
            <section className=' relative mx-10 flex-1 grid grid-cols-3 '>
                {/* this is the edit icon. close? close all. open? open the edit */}
                {havePermission && <div onClick={() => setToggleEdit((prev) => !prev)} className={`absolute cursor-pointer -top-11 ${searchParams.get('sw') || singleOptoin?.name ? "right-32" : "right-48"}`}>{toggleEdit ? <IoClose onClick={() => setToggleInput(false)} /> : <BiEdit />}</div>}
                {singleOptoin?.map((item, i) => (
                    <div key={item} className={`flex relative items-center justify-center h-80  ${i !== lobbyOption?.length && "border-l-[1px]"} border-b-[1px] border-border`}>
                        {/* if mode is edit, show delete icon */}
                        {console.log(item)
                        }
                        {toggleEdit && <span onClick={(e) => handleActions(e, "delete", item)} className='absolute left-2 top-0 cursor-pointer' ><GoTrash color='red' /></span>}
                        {/* if mode is edit, the option will be input to edit name else it will be btn */}
                        <div className=' w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150'>
                            {toggleEdit ?
                                // if user is editing the name than close the create input and after her click out from input update the name
                                <input onFocus={() => setToggleInput(false)} onChange={(e) => setInputValue(e.target.value)} onBlur={(e) => handleActions(e, "edit", item)} defaultValue={item} className='text-center p-4 px-5 xl:px-10 w-full rounded-lg outline-none' type="text" /> :
                                <button onClick={() => { navigate(`spaceWork?sw=${searchParams.get('sw')}&subSW=${item}`) }} className='p-4 px-5 xl:px-10 w-full' >{item}</button>
                            }
                        </div>
                    </div>
                ))}
                {/* show the edit just if click on the icon edit */}
                {toggleEdit && (
                    <div className={`flex items-center justify-center h-80 border-2  border-dotted border-primary`}>
                        {toggleInput ?
                            // if user click on the btn show the input for create name //
                            <div className='flex flex-col'>
                                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='outline-none p-3  w-40 xl:w-56 bg-accent border-2 text-primary  text-2xl font-semibold border-primary shadow-md rounded-lg flex justify-center items-center ' autoFocus={true} placeholder={searchParams.get('sw') || singleOptoin?.name ? "הכנס/י  תת-סביבה" : "הכנס/י  סביבה"} />
                                <div className='flex justify-evenly mt-2'>
                                    <button onClick={(e) => handleActions(e, "create")} className='px-6 p-1 font-bold border-2 rounded-md text-[#66BB6A]'>יצירה</button>
                                    <button onClick={() => setToggleInput(false)} className='px-6 p-1 font-bold border-2 rounded-md text-[#E57373]'>ביטול</button>
                                </div>
                            </div>
                            :
                            //  btn show the input for create after click him show the input himself //
                            <button onClick={() => { setToggleInput(true) }} className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-primary  text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150' > {searchParams.get('sw') || singleOptoin?.name ? " הוספת תת-סביבה +" : "הוספת סביבה "}</button>
                        }
                    </div>
                )}
            </section>
        </TemplatePage>
    )
}
export default RootSWPage