import React, { useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { IoMdAdd } from 'react-icons/io'
import { TiDeleteOutline } from 'react-icons/ti'
import { useSearchParams } from 'react-router-dom'

// selectValue=state that contain the data of the select input {options,label,placeholder,...}
// updateInput=state that contain the update select if user update if not it is null



export default function SelectImplement({ selectValue, setSelectValue, updateInput }) {

    // openSelect:state that toggle between open options or close for select
    // optionValue:state that contain the new option that add
    const [openSelect, setOpenSelect] = useState(false)
    const [optionValue, setOptionValue] = useState("")
    const [searchParams] = useSearchParams()


    const borderChooseColor = "border-[#5A6ACF]"
    const textChooseColor = "text-[#5A6ACF]"

    // handle click outside of the options in select input
    const optionsRef = useRef()
    const handleClickOutside = (event) => {
        // Check if the click is outside the div
        if (optionsRef?.current && !optionsRef?.current?.contains(event.target)) {
            setOpenSelect(false); // Close the div or perform your action
        }
    };
    useEffect(() => {
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    //end //

    // add new option to select func
    const addOptionToSelect = () => {
        // check duplicate option 
        const duplicate = selectValue?.options?.find((option) => option === optionValue)

        if (!optionValue) {
            alert("אין אפשרות לאופצייה ריקה")
            return;
        }
        if (duplicate) {
            alert("יש כבר אופצייה עם אותו שם")
            return;
        }
        const tempOptions = [...selectValue?.options, optionValue]
        setSelectValue((prev) => { return { ...prev, options: tempOptions, } })
        setOptionValue("")
        setOpenSelect(true)
    }
    const removeOptionFromSelect = (optionName) => {

        const tempOptions = selectValue?.options?.filter((option) => option !== optionName)
        setSelectValue((prev) => { return { ...prev, options: tempOptions, } })
        setOptionValue("")
        setOpenSelect(true)
    }
    //end//
    return (
        <div ref={optionsRef} className=' relative  h-1/3'  >
            {/* label for title  */}
            <span className={`absolute right-3  shadow-md  rounded-[4px] top-[-12px]  bg-[white] z-20  ${textChooseColor}`}>
                {/* if the input is unit care the user cannt change the label */}
                <input type="text" disabled={updateInput?.label === "יחידה מטפלת" ? true : false} autoFocus={true} onChange={(e) => setSelectValue((prev) => { return { ...prev, label: e.target.value } })} placeholder={updateInput ? updateInput?.label : 'בחר/י כותרת'} className='outline-none w-full px-2' />
            </span>
            {/* create input + select manualy */}
            <div className='relative flex  h-full'>
                <input type='text' onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        // Call your function here, for example:
                        addOptionToSelect();
                    }
                }}
value={optionValue} onFocus={() => setOpenSelect(true)} onChange={(e) => setOptionValue(e?.target?.value)} placeholder={selectValue?.placeholder} className={`w-full h-full text-[#5A6ACF] px-5 pt-3  placeholder:text-[#5a6acf94]   border-2 outline-none rounded-[4px]  ${borderChooseColor + " " + textChooseColor}  `} />
              
                <div className="top-[20%] flex items-center left-2 absolute text-3xl justify-center mr-8 text-[#8e9ba5]">
                
                 <div className='cursor-pointer rounded-full  hover:scale-150 duration-150 shadow-lg text-[#5A6ACF] '>
                    <IoMdAdd onClick={addOptionToSelect} className='' size={20} />
                   </div>
                    {openSelect ? (<FiChevronUp className='cursor-pointer' onClick={() => setOpenSelect(false)} />) : (<FiChevronDown className='cursor-pointer' onClick={() => setOpenSelect(true)} />)}
                </div>

                {openSelect && (
                    <span className='w-full shadow-lg rounded-b-xl max-h-[7.5rem] overflow-auto bg-[white] absolute right-0 top-11'>
                        {/* if there is no option show this */}
                        {selectValue?.options?.length == 0 ?
                            <div className='flex flex-col  justify-center  w-full'>
                                <div className='flex px-4 h-10 justify-center items-center'>
                                    <span>הכניסו אפשרויות</span>
                                </div>
                                <span className='divide-y-2 w-full  border-b border-[#DDE4F0] '></span>
                            </div>
                            :
                            selectValue?.options?.map((option, i) => (
                                <div key={option + i} className='flex flex-col  justify-center  w-full'>
                                    <div className='flex px-4 h-10 justify-between items-center'>
                                        <span>{option}</span>
                                        <span>
                                            <ul className='flex gap-3'>
                                                {/* check if the option is urgancy and the option is the name of the current room so dont delete it*/}
                                                {!(updateInput?.label === "יחידה מטפלת" && option === searchParams?.get('room')) && <li onClick={() => removeOptionFromSelect(option)}><TiDeleteOutline size={20} /></li>}
                                            </ul>
                                        </span>
                                    </div>
                                    <span className='divide-y-2 w-full  border-b border-[#DDE4F0] '></span>
                                </div>
                            ))}
                    </span>
                )}
            </div>
        </div>
    )
}
