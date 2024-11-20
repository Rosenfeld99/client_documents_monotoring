import React from 'react'


const borderChooseColor = "border-[#5A6ACF]"
const borderDefultColor = "border-[#DDE4F0]"
const textChooseColor = "text-[#5A6ACF]"
const textDefultColor = "text-[#737b8b]"
const placeholderChooseColor = "text-[#5a6acf94]"
const placeholderDefultValueColor = "text-[#737b8b63]"

// defaultValue={defaultValue}

export const TextAreaInput = ({ title, setFunc, defaultValue, chooseOption }) => {

    return (
        <div className='relative w-full ' onClick={setFunc}>
            <span className={`absolute right-3 top-[-12px] px-2 bg-[white] z-20  ${chooseOption ? textChooseColor : textDefultColor}`}>{title}</span>
            <textarea value={defaultValue} className={`w-full  min-h-24 p-2   pointer-events-none border-2 rounded-[5px] ${chooseOption ? placeholderChooseColor + " " + borderChooseColor : placeholderDefultValueColor + " " + borderDefultColor} `} />
        </div>
    )
}

export const SelectInput = ({ title, setFunc, chooseOption, optionValue }) => {
    return (
        <div className='relative w-full' onClick={setFunc}>
            <span className={`absolute right-3 top-[-12px] px-2 bg-[white] z-20  ${chooseOption ? textChooseColor : textDefultColor}`}>{title}</span>
            <select className={`w-full min-h-10 pointer-events-none border-2 rounded-[5px] ${chooseOption ? borderChooseColor + " " + placeholderChooseColor : placeholderDefultValueColor + " " + borderDefultColor} `} >
                <option className='p-2'>{optionValue}</option>
            </select>
            {console.log(title==="דחיפות",title==="יחידה מטפלת",title)
            }
           {(title==="דחיפות"||title==="יחידה מטפלת")&& <div className='absolute text-[10px] -top-4 left-0'>{title==="יחידה מטפלת"?"*שדה זה ניתן רק לעדכון":"*לא ניתן לבחור שדה זה"}</div>}
        </div>
    )
}

export const ShortInput = ({ title, setFunc, defaultValue, chooseOption }) => {
    return (
        <div className='relative w-full' onClick={setFunc}>
            <span className={`absolute right-3 top-[-12px] px-2 bg-[white] z-20  ${chooseOption ? textChooseColor : textDefultColor}`}>{title}</span>
            <input value={defaultValue} className={`w-full  min-h-10 p-2   pointer-events-none border-2 rounded-[5px] ${chooseOption ? placeholderChooseColor + " " + borderChooseColor : placeholderDefultValueColor + " " + borderDefultColor} `} />
        </div>
    )
}


export function Button({ color, text, onclickFunc, updateId: id }) {
    return (
        <button style={{ color: color, borderColor: color }} onClick={(e) => onclickFunc(e, id)} className={`px-6 p-1 hover:scale-105 duration-200 font-bold border-2 rounded-md `}>
            {text}
        </button>
    )
}

