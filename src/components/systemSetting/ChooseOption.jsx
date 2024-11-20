import React, { useContext, useEffect, useRef, useState } from 'react'
import setting from "../../assets/setting_withoutSpace.png"
import { Button, SelectInput, ShortInput, TextAreaInput } from './InputsComponents';
import { ContextStore } from '../../context/contextStore';
import SelectImplement from './SelectImplement';
import { MAX_LENGTH } from '../../utils/fakeDB';
import { useSearchParams } from 'react-router-dom';
import useInput from '../../hooks/useInput';

// chooseOption=string that get the input type+id to recognize it like:`{inputType}_input_{_id}`
// updateInput=this is the input obj selected if it is exsist
function ChooseOption({ updateInput, setUpdateInput, chooseOption, setChooseOption }) {

    // inputs= is the array of all inputs
    const { inputs, setInputs, currentUser } = useContext(ContextStore)
    const [textAreaValue, setTextAreaValue] = useState({})
    const [selectValue, setSelectValue] = useState({})
    const [inputValue, setInputValue] = useState({})
    const [require, setRequire] = useState()
    const [searchParams] = useSearchParams()
    const { createInput, deleteInput, updateInputFields } = useInput()



    // delete input
    const deleteInputFunc = (e, id) => {

        const spaceDeatiles = {
            spaceWorkName: searchParams?.get('sw'),
            adminId: currentUser?.userId,
            subSpaceWorkName: searchParams?.get('subSW'),
            roomName: searchParams?.get('room'),
            inputId: id

        }
        deleteInput(spaceDeatiles)
        const inputsTemp = inputs.filter((input) => input?._id != updateInput?._id)
        setUpdateInput(null)
        setChooseOption("")
        setInputs(inputsTemp)
    }
    //end

    const createInputObj = (label, placeholder, type, options, requireInput, _id) => {
        //create new obj input
        const newInput = {
            disable: false,
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
    const handeleCreateInput = async (e, inputIdUpdate) => {
        if (inputs.length == MAX_LENGTH) {
            alert("הגעתם למקסימום שדות מחקו שדה כדי להכניס שדה חדש")
        }
        // spaceWork deatiles to server functionality
        const spaceDeatiles = {
            spaceWorkName: searchParams?.get('sw'),
            adminId: currentUser?.userId,
            subSpaceWorkName: searchParams?.get('subSW'),
            roomName: searchParams?.get('room'),
        }
        //inputIdUpdate if user want to update input this is the id of wanted update
        switch (chooseOption.split("_")[0]) {
            case "textarea":
                if (!textAreaValue?.label) {
                    alert("חובה להכניס כותרת ")
                    return
                }
                // create new textarea object input
                const newTextArea = createInputObj(textAreaValue?.label, textAreaValue?.placeholder, "textarea", [], require, inputIdUpdate)
                // check if update or create
                if (inputIdUpdate) {
                    const newArray = inputs.map((input) => input._id == inputIdUpdate ? newTextArea : input)

                    updateInputFields({ ...spaceDeatiles, editInput: newTextArea, inputId: newTextArea._id })
                    setInputs(() => newArray)


                } else {
                    const duplicateLabel = inputs.findIndex((input) => input?.label === textAreaValue?.label)
                    if (duplicateLabel !== -1) {
                        alert("יש כבר שדה עם כותרת זו")
                        return
                    }
                    createInput({ ...spaceDeatiles, input: { ...newTextArea } })
                    setInputs((prev) => [newTextArea, ...prev])
                }
                setTextAreaValue({})
                break;

            case "select":
                if (!selectValue?.label) {
                    alert("חובה להכניס כותרת ")
                    return
                }
                const newSelect = createInputObj(selectValue?.label, "בחר/י אפשרות", "select", selectValue?.options ? selectValue?.options : [], require, inputIdUpdate)
                if (inputIdUpdate) {
                    const newArray = inputs.map((input) => input._id == inputIdUpdate ? newSelect : input)
                    updateInputFields({ ...spaceDeatiles, editInput: newSelect, inputId: newSelect._id })

                    setInputs(newArray)
                } else {
                    const duplicateLabel = inputs.findIndex((input) => input?.label === selectValue?.label)
                    if (duplicateLabel !== -1) {
                        alert("יש כבר שדה עם כותרת זו")
                        return
                    }
                    createInput({ ...spaceDeatiles, input: { ...newSelect } })

                    setInputs((prev) => [newSelect, ...prev])
                }
                setSelectValue({})
                break;

            case "short":
                if (!inputValue?.label) {
                    alert("חובה להכניס כותרת ")
                    return
                }
                const newInput = createInputObj(inputValue?.label, inputValue?.placeholder, "short", [], require, inputIdUpdate)
                if (inputIdUpdate) {
                    const newArray = inputs.map((input) => input._id == inputIdUpdate ? newInput : input)
                    updateInputFields({ ...spaceDeatiles, editInput: newInput, inputId: newInput._id })
                    setInputs(newArray)
                } else {
                    const duplicateLabel = inputs.findIndex((input) => input?.label === inputValue?.label)
                    if (duplicateLabel !== -1) {
                        alert("יש כבר שדה עם כותרת זו")
                        return
                    }
                    createInput({ ...spaceDeatiles, input: { ...newInput } })
                    setInputs((prev) => [newInput, ...prev])
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
                <p className='font-semibold text-lg '>בחרו אפשרות</p>
                {/* show the types of inputs in the right in screen */}
                <TextAreaInput setFunc={() => { setChooseOption("textarea_input_0"); setUpdateInput(null); }} defaultValue={"לדוגמא:תיאור תקלה, דרך פתרון..."} title={"טקסט חופשי"} chooseOption={chooseOption === "textarea_input_0"} />

                <SelectInput setFunc={() => { setChooseOption("select_input_1"); setUpdateInput(null); }} chooseOption={chooseOption === "select_input_1"} title={"בחירת אפשרות"} optionValue={"לדוגמא:רשימת רשתות,יחידות..."} />

                <ShortInput setFunc={() => { setChooseOption("short_input_2"); setUpdateInput(null); }} chooseOption={chooseOption === "short_input_2"} title={"טקסט קצר"} defaultValue={"לדוגמא:שם פרטי, שם משפחה..."} />

            </div>
            {/* end */}

            {/* show the selected input */}
            <div className='col-span-2 h-full gap-9  flex flex-col  pr-16'>
                <p className='font-semibold text-lg '> {chooseOption ? "הזינו תוכן לאפשרות שבחרתם" : "בחרו תבנית"}</p>
                <div className='w-3/4 h-32 relative '>
                    {!chooseOption &&
                        <div>
                            <span className={`absolute right-3 text-[#DDE4F0] top-[-12px] px-2 bg-[white] z-20 `}>כותרת</span>
                            <div className={`w-full  min-h-10 p-2 h-32 border-[#DDE4F0] text-[#DDE4F0]  pointer-events-none border-2 rounded-[5px] `}>בחרו תבנית...</div>
                        </div>}
                    {chooseOption && (
                        // this is the button of require field
                        <div className='absolute left-0 items-center   flex gap-2 -top-6'>
                            <p className={`text-xs ${require ? "opacity-100" : "opacity-50"}`}>
                                ציין שדה חובה
                            </p>
                            <label className="switch">
                                <input checked={require} onChange={() => setRequire(!require)} type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    )}
                    {chooseOption?.includes("textarea_input") &&
                        <div className='relative h-full '>
                            <span className={`absolute  right-3 px-1  shadow-md  rounded-[4px] top-[-12px]  bg-[white] z-20  ${textChooseColor}`}>
                                <input type="text" onChange={(e) => setTextAreaValue((prev) => { return { ...prev, label: e.target.value } })} autoFocus={true} placeholder={updateInput ? updateInput?.label : 'בחר/י כותרת'} className='outline-none w-full lg:w-40  xl:w-fit px-2' />
                            </span>
                            <textarea placeholder={textAreaValue?.placeholder} onChange={(e) => setTextAreaValue((prev) => { return { ...prev, placeholder: e.target.value } })} className={`w-full h-full placeholder:text-[#5a6acf94]  p-5 outline-none  border-2 rounded-[4px] ${textChooseColor + " " + borderChooseColor} `} />
                        </div>
                    }
                    {/* i create select manualy */}
                    {chooseOption?.includes("select_input") &&
                        <SelectImplement selectValue={selectValue} updateInput={updateInput} setSelectValue={setSelectValue} />
                    }
                    {/* short input */}
                    {chooseOption?.includes("short_input") &&
                        <div className='relative  h-1/3' >
                            <span className={`absolute right-3 px-1 shadow-md   rounded-[4px] top-[-12px]  bg-[white] z-20  ${textChooseColor}`}>
                                <input onChange={(e) => setInputValue((prev) => { return { ...prev, label: e.target.value } })} type="text" autoFocus={true} placeholder={updateInput ? updateInput.label : 'בחר/י כותרת'} className='outline-none w-full px-2' />
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
                              {updateInput?.label!=="יחידה מטפלת"?  <Button updateId={updateInput._id} onclickFunc={deleteInputFunc} color={"#E57373"} text={"מחיקה"} />:<Button  onclickFunc={()=>setChooseOption("")} color={"#5a6acf94"} text={"ביטול"} />}
                                <Button updateId={updateInput._id} onclickFunc={handeleCreateInput} color={"#FF8A65"} text={"עדכון"} />
                            </>) :
                                <Button onclickFunc={handeleCreateInput} color={"#66BB6A"} text={"יצירה"} />
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
export default ChooseOption