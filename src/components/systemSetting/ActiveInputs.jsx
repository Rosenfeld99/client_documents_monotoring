import React, { useContext } from 'react'
import { SelectInput, ShortInput, TextAreaInput } from './InputsComponents'
import { inputsDB, MAX_LENGTH } from '../../utils/fakeDB'
import { ContextStore } from '../../context/ContextStore'
import { hoverTitle } from '../../utils/hoverInputTitle'

function ActiveInputs({ chooseOption, setChooseOption, setInputDeatils }) {
    const { inputs, setInputs } = useContext(ContextStore)

    return (
        <div className='pt-3 '>
            <div className='flex mb-5 mr-5 justify-between'>
                <h1 className='font-semibold text-lg '>שדות פעילים </h1>
                <p className='text-xs text-[#737b8b]'>{`מוגבל ל: ${inputs?.length}/${MAX_LENGTH}`}</p>
            </div>
            <div className='flex  flex-col gap-5 overflow-auto h-[65vh]'>

                {inputs?.length > 0 ? inputs.map((input, index) => (
                    <div title={hoverTitle[input?.label]} key={input?._id} onClick={() => setInputDeatils(input)} className='flex w-5/6 pt-4  gap-2'>
                        <div className='rounded-full bg-[#DDE4F0] w-5 h-5 flex justify-center items-center text-xs'>{index + 1}</div>
                        {input?.type === "textarea" && <TextAreaInput setFunc={() => setChooseOption(`textarea_input_${input?._id}`)} defaultValue={input?.placeholder || "הקלידו"} title={input?.label} chooseOption={chooseOption === `textarea_input_${input?._id}`} />}
                        {input?.type === "select" && <SelectInput setFunc={() => input?.label !== "דחיפות" ? setChooseOption(`select_input_${input?._id}`) : setChooseOption("")} optionValue={input?.placeholder || "בחרו אופצייה"} title={input?.label} chooseOption={chooseOption === `select_input_${input?._id}`} />}
                        {input?.type === "short" && <ShortInput setFunc={() => input?.label !== "מ.א של לקוח" ? setChooseOption(`short_input_${input?._id}`) : setChooseOption("")} defaultValue={input?.placeholder || "הקלידו"} title={input?.label} chooseOption={chooseOption === `short_input_${input?._id}`} />}
                    </div>
                )) : <h1 className='text-center font-semibold'>אין שדות פעילים !</h1>}
            </div>
        </div>
    )
}

export default ActiveInputs