import React, { useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'

const RootSWPage = () => {
    const { options, setOptions } = useContextStore()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const lobbyOption = [
        { name: "דסק תפעול" },
        { name: "מנו”ר" },
    ]

    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]


    const [optionSingle, setOptionSingle] = useState(options[0])

    const str = "פיקוד ההכשרות והאימונים / תומר / לובי כניסה"

    console.log(optionSingle);

    return (
        <TemplatePage
            setState={setOptionSingle}
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"תת סביבה"}
            navLeft={`${optionSingle?.name} / לובי כניסה`}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showExcel={false}
            showBall={true}
            showSelectOption={true}
            options={options}
            optionDisaled={'סביבה'}
        >
            <section className='mx-10 flex-1 grid grid-cols-3 '>
                {optionSingle?.subSpaceWork?.map((item, i) => (
                    <div key={i} className={`" flex items-center justify-center h-80 " ${i !== lobbyOption?.length - 1 && "border-l-[1px]"} border-b-[1px] border-border`}>
                        <button onClick={() => { navigate(`spaceWork?sw=${searchParams.get('sw')}&subSW=${item?.name}`) }} className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center'>{item.name}</button>
                    </div>
                ))}
            </section>
        </TemplatePage>
    )
}

export default RootSWPage