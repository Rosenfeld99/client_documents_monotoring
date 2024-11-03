import React, { useContext, useEffect, useRef, useState } from 'react'
import setting from "../../assets/setting_withoutSpace.png"
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineEdit } from 'react-icons/ai';
import { SelectInput, ShortInput, TextAreaInput } from './InputsComponents';
import { IoMdAdd } from "react-icons/io";
import { ContextStore } from '../../context/ContextStore';

// chooseOption=string that get the input type+id to recognize it like:`{inputType}_input_{_id}`
// updateInput=this is the input obj selected if it is exsist
function ChooseOption({ updateInput, setUpdateInput, chooseOption, setChooseOption }) {

    // inputs= is the array of all inputs
    const { inputs, setInputs } = useContext(ContextStore)

    const [openSelect, setOpenSelect] = useState(false)
    const [optionValue, setOptionValue] = useState("")
    const [textAreaValue, setTextAreaValue] = useState({})
    const [selectValue, setSelectValue] = useState({})
    const [inputValue, setInputValue] = useState({})
    const [require, setRequire] = useState()


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
        const tempOptions = [...selectValue?.options, optionValue]
        setSelectValue((prev) => { return { ...prev, options: tempOptions, } })
        setOptionValue("")
        setOpenSelect(true)
    }
    //end//

    // delete input
    const deleteInputFunc = (e) => {
        const inputsTemp = inputs.filter((input) => input?._id != updateInput?._id)
        setUpdateInput(null)
        setChooseOption("")
        setInputs(inputsTemp)
    }
    //end


    const createInputObj = (label, placeholder, type, options, requireInput, _id) => {
        //create new obj input
        const newInput = {
            label,       // Default value for 'input1.label'
            placeholder, // Default value for 'input1.placeholder'
            type,        // Default value for 'input1.type'
            options,   // Default value for 'options' array
            require: requireInput, // Default value for 'require'
            _id: _id ? _id : crypto.randomUUID()
        }
        return newInput
    }


    // create and update inputs
    const createInput = (e, inputIdUpdate) => {

        //inputIdUpdate if user want to update input this is th id of wanted update
        // chooseOption=`{inputType}_input_{_id}`
        switch (chooseOption.split("_")[0]) {
            case "textarea":
                if (!textAreaValue?.label) {
                    alert("חובה להכניס כותרת ")
                    return
                }
                const newTextArea = createInputObj(textAreaValue?.label, textAreaValue?.placeholder, "textarea", [], require)
                if (inputIdUpdate) {
                    const newArray = inputs.map((input) => input._id == inputIdUpdate ? newTextArea : input)
                    console.log(newArray);

                    setInputs(newArray)
                } else {
                    setInputs((prev) => [...prev, newTextArea])
                }
                setTextAreaValue({})
                console.log(textAreaValue);
                break;

            case "select":
                if (!selectValue?.label) {
                    alert("חובה להכניס כותרת ")
                    return
                }
                const newSelect = createInputObj(selectValue?.label, "בחר/י אפשרות", "select", selectValue?.options ? selectValue?.options : [], require)
                if (inputIdUpdate) {
                    const newArray = inputs.map((input) => input._id == inputIdUpdate ? newSelect : input)
                    setInputs(newArray)
                } else {
                    setInputs((prev) => [...prev, newSelect])
                }
                setSelectValue({})
                break;

            case "short":
                if (!inputValue?.label) {
                    alert("חובה להכניס כותרת ")
                    return
                }
                const newInput = createInputObj(inputValue?.label, inputValue?.placeholder, "short", [], require)
                if (inputIdUpdate) {
                    const newArray = inputs.map((input) => input._id == inputIdUpdate ? newInput : input)
                    setInputs(newArray)
                } else {
                    setInputs((prev) => [...prev, newInput])
                }
                setInputValue({})
                break;

            default:
                break;
        }
        setChooseOption("")
        setRequire(false)
    }

    // use to check if user click on new input or exsist input than get the input
    useEffect(() => {
        if (chooseOption?.includes("textarea_input")) {

            setTextAreaValue(updateInput ? updateInput : { placeholder: "לדוגמא:תיאור תקלה, דרך פתרון..." })
        }
        if (chooseOption?.includes("select_input")) {
            setSelectValue(() => updateInput ? updateInput : { placeholder: "לדוגמא:רשימת רשתות,יחידות...", options: [] })

        }
        if (chooseOption?.includes("short_input")) {
            setInputValue(updateInput ? updateInput : { placeholder: "לדוגמא:שם פרטי, שם משפחה..." })
        }
        setRequire(updateInput ? updateInput?.require : false)
    }, [chooseOption, updateInput])

    const borderChooseColor = "border-[#5A6ACF]"
    const textChooseColor = "text-[#5A6ACF]"

    return (
        <div className='w-full min-h-[70vh] grid pt-2 grid-cols-3'>
            <div className='col-span-1 w-[80%]  flex gap-10 flex-col'>
                <p className='text-lg font-semibold'>בחרו אפשרות</p>

                {/* show the types of inputs in the right in screen */}
                <TextAreaInput setFunc={() => { setChooseOption("textarea_input_0"); setUpdateInput(null); }} defaultValue={"לדוגמא:תיאור תקלה, דרך פתרון..."} title={"טקסט חופשי"} chooseOption={chooseOption === "textarea_input_0"} />

                <SelectInput setFunc={() => { setChooseOption("select_input_1"); setUpdateInput(null); }} chooseOption={chooseOption === "select_input_1"} title={"בחירת אפשרות"} optionValue={"לדוגמא:רשימת רשתות,יחידות..."} />

                <ShortInput setFunc={() => { setChooseOption("short_input_2"); setUpdateInput(null); }} chooseOption={chooseOption === "short_input_2"} title={"טקסט קצר"} defaultValue={"לדוגמא:שם פרטי, שם משפחה..."} />

            </div>
            {/* end */}

            {/* show the selected input */}
            <div className='col-span-2 h-full gap-9  flex flex-col  pr-16'>
                <p className=' text-lg font-semibold'> {chooseOption ? "הזינו תוכן לאפשרות שבחרתם" : "בחרו אפשרות"}</p>
                <div className='w-3/4 h-32 relative '>
                    {chooseOption && (

                        // this is the button of require field
                        <div className='absolute left-0 items-center   flex gap-2 -top-6'>
                            <p className={`text-xs ${require ? "opacity-100" : "opacity-50"}`}>
                                ציין שדה חובה
                            </p>
                            <label class="switch">

                                <input checked={require} onChange={() => setRequire(!require)} type="checkbox" />
                                <span className="slider round"></span>
                            </label>


                        </div>
                    )}

                    {chooseOption?.includes("textarea_input") &&
                        <div className='relative h-full '>
                            <span className={`absolute  right-3 px-1  shadow-md  rounded-[4px] top-[-12px]  bg-[white] z-20  ${textChooseColor}`}>
                                <input type="text" onChange={(e) => setTextAreaValue((prev) => { return { ...prev, label: e.target.value } })} autoFocus={true} placeholder={updateInput ? updateInput?.label : 'בחר/י כותרת'} className='outline-none w-24 lg:w-40  xl:w-fit px-2' />

                            </span>
                            <textarea placeholder={textAreaValue?.placeholder} onChange={(e) => setTextAreaValue((prev) => { return { ...prev, placeholder: e.target.value } })} className={`w-full h-full placeholder:text-[#5a6acf94]  p-5 outline-none  border-2 rounded-[4px] ${textChooseColor + " " + borderChooseColor} `} />
                        </div>
                    }

                    {/* i create select manualy */}
                    {chooseOption?.includes("select_input") &&
                        <div ref={optionsRef} className=' relative  h-1/3'  >
                            {/* label for title  */}
                            <span className={`absolute right-3 px-1 shadow-md     rounded-[4px] top-[-12px]  bg-[white] z-20  ${textChooseColor}`}>
                                <input type="text" autoFocus={true} onChange={(e) => setSelectValue((prev) => { return { ...prev, label: e.target.value } })} placeholder={updateInput ? updateInput?.label : 'בחר/י כותרת'} className='outline-none px-2' />
                            </span>
                            {/* create input +select manualy */}
                            <div className='relative flex  h-full'>
                                <input type='text' value={optionValue} onFocus={() => setOpenSelect(true)} onChange={(e) => setOptionValue(e?.target?.value)} placeholder={selectValue?.placeholder} className={`w-full h-full text-[#5A6ACF] px-5 pt-3  placeholder:text-[#5a6acf94]   border-2 outline-none rounded-[4px]  ${borderChooseColor + " " + textChooseColor}  `} />
                                <span className="top-[20%] flex items-center left-2 absolute text-3xl justify-center mr-8 text-[#8e9ba5]">
                                    <IoMdAdd onClick={addOptionToSelect} size={20} className='cursor-pointer  text-[#5A6ACF] ' />
                                    {openSelect ? (<FiChevronUp className='cursor-pointer' onClick={() => setOpenSelect(false)} />) : (<FiChevronDown className='cursor-pointer' onClick={() => setOpenSelect(true)} />)}
                                </span>
                                {openSelect && (
                                    <span className='w-full shadow-lg rounded-b-xl max-h-60 overflow-auto bg-[white] absolute right-0 top-11'>
                                        {selectValue?.options?.length == 0 ?
                                            <div className='flex flex-col  justify-center  w-full'>
                                                <div className='flex px-4 h-10 justify-center items-center'>
                                                    <span>הכניסו אפשרויות</span>
                                                </div>
                                                <span className='divide-y-2 w-full  border-b border-[#DDE4F0] '></span>

                                            </div>
                                            :
                                            selectValue?.options.map((option) => (
                                                <div className='flex flex-col  justify-center  w-full'>
                                                    <div className='flex px-4 h-10 justify-between items-center'>
                                                        <span>{option}</span>
                                                        <span>
                                                            <ul className='flex gap-3'>
                                                                <li><AiOutlineEdit size={20} /></li>
                                                                <li><TiDeleteOutline size={20} /></li>
                                                            </ul>
                                                        </span>
                                                    </div>
                                                    <span className='divide-y-2 w-full  border-b border-[#DDE4F0] '></span>

                                                </div>

                                            ))}

                                    </span>
                                )}

                            </div>
                        </div>}
                    {/* short input */}
                    {chooseOption?.includes("short_input") &&
                        <div className='relative  h-1/3' >
                            <span className={`absolute right-3 px-1 shadow-md   rounded-[4px] top-[-12px]  bg-[white] z-20  ${textChooseColor}`}>
                                <input onChange={(e) => setInputValue((prev) => { return { ...prev, label: e.target.value } })} type="text" autoFocus="true" placeholder={updateInput ? updateInput.label : 'בחר/י כותרת'} className='outline-none px-2' />
                            </span>
                            <input type="text" placeholder={inputValue?.placeholder} onChange={(e) => setInputValue((prev) => { return { ...prev, placeholder: e.target.value } })} className={`w-full h-full placeholder:text-[#5a6acf94]  outline-none  border-2 px-5 pt-3 rounded-[4px] ${borderChooseColor + " " + textChooseColor} `} />
                        </div>}
                </div>
                {/* end show selected input */}

                {/* just if user select input show the save and delete buttons */}
                {/* and if it is create input show just 1 button in middle */}
                <div className={`flex w-3/4  ${updateInput ? "justify-between" : "justify-center"}  px-5 h-10`}   >
                    {chooseOption && (
                        <>
                            {updateInput ? (<>
                                <Button onclickFunc={deleteInputFunc} color={"#E57373"} text={"מחיקה"} />
                                <Button updateId={updateInput._id} onclickFunc={createInput} color={"#FF8A65"} text={"עדכון"} />
                            </>) :
                                <Button onclickFunc={createInput} color={"#66BB6A"} text={"יצירה"} />
                            }
                        </>)
                    }
                </div>
                <div className='mt-auto'>
                    <img src={setting} alt="" className="h-56 mr-1 object-contain" />
                </div>

            </div>
        </div>
    )
}
const Button = ({ color, text, onclickFunc, updateId }) => {
    return (
        <button style={{ color: color, borderColor: color }} onClick={(e) => onclickFunc(e, updateId)} className={`px-6 p-1 font-bold border-2 rounded-md `}>
            {text}
        </button>
    )
}


export default ChooseOption