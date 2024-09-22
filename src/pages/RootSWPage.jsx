import React, { useEffect, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'

const RootSWPage = () => {
    const { options, setOptions, singleOptoin, setSingleOption } = useContextStore()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

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
            <section className='mx-10 flex-1 grid grid-cols-3 '>
                {singleOptoin?.subSpaceWork?.map((item, i) => (
                    <div key={i} className={`" flex items-center justify-center h-80 " ${i !== lobbyOption?.length - 1 && "border-l-[1px]"} border-b-[1px] border-border`}>
                        <button onClick={() => { navigate(`spaceWork?sw=${searchParams.get('sw')}&subSW=${item?.name}`) }} className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150'>{item.name}</button>
                    </div>
                ))}
            </section>
        </TemplatePage>
    )
}

export default RootSWPage