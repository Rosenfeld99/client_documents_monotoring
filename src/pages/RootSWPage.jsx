import React, { useEffect, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'
import { BiEdit } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { GoTrash } from "react-icons/go";

const RootSWPage = () => {
    const { options, setOptions, singleOptoin, setSingleOption } = useContextStore()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // toggleEdit: toggle between open and closed creation
    //toggleInput:toggle between open and closed input creation
    //editValue:the value of the Input
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleInput, setToggleInput] = useState(false)
    const [editValue, setEditValue] = useState(false)


    useEffect(() => {
        (!singleOptoin && searchParams.get('sw')) && (setSingleOption(options?.find((item) => item?.name == searchParams.get('sw'))), console.log("use run")
        )
    }, [])

    console.log(singleOptoin);


    const lobbyOption = [
        { name: "דסק תפעול" },
        { name: "מנו”ר" },
    ]

    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    const str = "פיקוד ההכשרות והאימונים / תומר / לובי כניסה"

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
            options={options}
            optionDisaled={'סביבה'}
        >
            <section className=' relative mx-10 flex-1 grid grid-cols-3 '>
                {/* this is the edit icon. close? close all. open? open the edit */}
                <div onClick={() => setToggleEdit((prev) => !prev)} className={`absolute cursor-pointer -top-11 ${searchParams.get('sw') || singleOptoin?.name ? "right-32" : "right-48"}`}>{toggleEdit ? <IoClose onClick={() => setToggleInput(false)} /> : <BiEdit />}</div>

                {singleOptoin?.subSpaceWork?.map((item, i) => (
                    <div key={i} className={`flex relative items-center justify-center h-80  ${i !== lobbyOption?.length && "border-l-[1px]"} border-b-[1px] border-border`}>
                        {/* if mode is edit, show delete icon */}
                        {toggleEdit && <span className='absolute left-2 top-0' ><GoTrash color='red' /></span>}
                        {/* if mode is edit, the option will be input to edit name else it will be btn */}
                        <div className=' w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150'>
                            {toggleEdit ?
                                <input defaultValue={item?.name} className='text-center p-4 px-5 xl:px-10 w-full rounded-lg outline-none' type="text" /> :
                                <button onClick={() => { navigate(`spaceWork?sw=${searchParams.get('sw')}&subSW=${item?.name}`) }} className='p-4 px-5 xl:px-10 w-full' >{item?.name}</button>
                            }
                        </div>
                        {/* <button onClick={() => { navigate(`spaceWork?sw=${searchParams.get('sw')}&subSW=${item?.name}`) }} className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150'>{item.name}</button> */}
                    </div>
                ))}
                {/* show the edit just if click on the icon edit */}
                {toggleEdit && (
                    <div className={`flex items-center justify-center h-80 border-2  border-dotted border-primary`}>
                        {toggleInput ?
                            // if user click on the btn show the input for create name //
                            <div className='flex flex-col'>
                                <input onChange={(e) => setEditValue(e.target.value)} className='outline-none p-4  w-40 xl:w-56 bg-accent border-2 text-primary  text-2xl font-semibold border-primary shadow-md rounded-lg flex justify-center items-center ' autoFocus={true} placeholder={searchParams.get('sw') || singleOptoin?.name ? "הכנס/י  תת-סביבה" : "הכנס/י  סביבה"} />
                                <div className='flex justify-evenly mt-2'>
                                    <button className='px-6 p-1 font-bold border-2 rounded-md text-[#66BB6A]'>יצירה</button>
                                    <button onClick={() => setToggleInput(false)} className='px-6 p-1 font-bold border-2 rounded-md text-[#E57373]'>ביטול</button>
                                </div>
                            </div>
                            :
                            //  btn show the input for create name //
                            <button onClick={() => { setToggleInput(true) }} className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-primary  text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150' > {searchParams.get('sw') || singleOptoin?.name ? " הוספת תת-סביבה +" : "הוספת סביבה "}</button>
                        }
                    </div>
                )}
            </section>
        </TemplatePage>
    )
}

export default RootSWPage