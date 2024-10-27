import React, { useContext } from 'react'
import { SelectInput, ShortInput, TextAreaInput } from './InputsComponents'
import { inputsDB } from '../../utils/fakeDB'
import { ContextStore } from '../../context/ContextStore'

function ActiveInputs({ chooseOption, setChooseOption, setInputDeatils }) {
    const { inputs,setInputs}=useContext(ContextStore)

    return (
        <div className='pt-3 '>
            <div className='flex mb-5 mr-5 justify-between'>
                <h1 className='font-extrabold text-lg tracking-wider'>שדות פעילים </h1>
                <p className='text-xs text-[#737b8b]'>מוגבל  ל6</p>
            </div>
            <div className='flex  flex-col gap-5 overflow-auto h-[65vh]'>
              
                {inputs?.map((input, index) => (
                    <div key={input?._id} onClick={() => setInputDeatils(input)} className='flex w-5/6 pt-2  gap-2'>

                        <div className='rounded-full bg-[#DDE4F0] w-5 h-5 flex justify-center items-center text-xs'>{index + 1}</div>
                        {input?.type === "textarea" && <TextAreaInput setFunc={() => setChooseOption(`textarea_input_${input?._id}`)} defaultValue={input?.placeholder} title={input?.label} chooseOption={chooseOption === `textarea_input_${input?._id}`} />}
                        {input?.type === "select" && <SelectInput setFunc={() => setChooseOption(`select_input_${input?._id}`)} optionValue={input?.placeholder} title={input?.label} chooseOption={chooseOption === `select_input_${input?._id}`} />}
                        {input?.type === "short" && <ShortInput setFunc={() => setChooseOption(`short_input_${input?._id}`)} defaultValue={input?.placeholder} title={input?.label} chooseOption={chooseOption === `short_input_${input?._id}`} />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActiveInputs