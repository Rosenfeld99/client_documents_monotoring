import React, { useEffect, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'
import { IoClose } from 'react-icons/io5'
import { BiEdit } from 'react-icons/bi'
import { GoTrash } from 'react-icons/go'

const HomePage = () => {
    const { singleOptoin, options, setSingleOption } = useContextStore()
    const [searchParams] = useSearchParams()

    // toggleEdit: toggle between open and closed creation
    //toggleInput:toggle between open and closed input creation
    //editValue:the value of the Input
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleInput, setToggleInput] = useState(false)
    const [editValue, setEditValue] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        (!singleOptoin && searchParams.get('sw')) && (setSingleOption(options?.find((item) => item?.name == searchParams.get('sw'))), console.log("use run")
        )
    }, [])

    const lobbyOption = [
        { name: "דסק תפעול" },
        { name: "מנו”ר" },
        { name: "תשתיות" },
        { name: "דסק תפעול" },
        { name: "מנו”ר" },
        { name: "תשתיות" },
        { name: "דסק תפעול" },
        { name: "מנו”ר" },
        { name: "תשתיות" },
        { name: "דסק תפעול" },
        { name: "מנו”ר" },
        { name: "תשתיות" },
    ]

    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    console.log(singleOptoin);


    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"חדר"}
            navLeft={`${searchParams.get('sw')} / ${searchParams.get('subSW')} / בחירת חדר`}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showExcel={false}
            showBall={true}
            showSelectOption={false}
            options={singleOptoin?.subSpaceWork?.find((subSW) => subSW.name == searchParams.get("subSW"))?.lobbyOption}
        >
            <section className='mx-10 relative flex-1 grid grid-cols-3 '>
                <div onClick={() => setToggleEdit((prev) => !prev)} className='absolute cursor-pointer -top-11 right-32'>{toggleEdit ? <IoClose onClick={() => setToggleInput(false)} /> : <BiEdit />}</div>
                {console.log(singleOptoin)}
                {singleOptoin?.subSpaceWork?.find((subSW) => subSW.name == searchParams.get("subSW"))?.lobbyOption.map((item, i) => (
                    <div key={i} className={`flex relative items-center justify-center h-80  ${i !== lobbyOption?.length && "border-l-[1px]"} border-b-[1px] border-border`}>
                        {/* if mode is edit, show delete icon */}
                        {toggleEdit && <span className='cursor-pointer absolute left-2 top-0' ><GoTrash color='red' /></span>}
                        {/* if mode is edit, the option will be input to edit name else it will be btn */}
                        <div className=' w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150'>
                            {toggleEdit ?
                                <input defaultValue={item?.name} className='text-center p-4 px-5 xl:px-10 w-full rounded-lg outline-none' type="text" /> :
                                <button onClick={() => { navigate(`/dashboard?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${item?.name}`) }} className='p-4 px-5 xl:px-10 w-full' >{item?.name}</button>
                            }
                        </div>
                        {/* <button onClick={() => { navigate(`spaceWork?sw=${searchParams.get('sw')}&subSW=${item?.name}`) }} className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150'>{item.name}</button> */}
                    </div>
                ))}

                {toggleEdit && (
                    <div className={`flex items-center justify-center h-80 border-2  border-dotted border-primary`}>
                        {toggleInput ?
                            <div className='flex flex-col'>
                                <input onChange={(e) => setEditValue(e.target.value)} className='outline-none p-4  w-40 xl:w-56 bg-accent border-2 text-primary  text-2xl font-semibold border-primary shadow-md rounded-lg flex justify-center items-center ' autoFocus={true} placeholder="הכנס/י חדר" />
                                <div className='flex justify-evenly mt-2'>
                                    <button className='px-6 p-1 font-bold border-2 rounded-md text-[#66BB6A]'>יצירה</button>
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