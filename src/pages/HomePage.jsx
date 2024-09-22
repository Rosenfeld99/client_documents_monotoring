import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'

const HomePage = () => {
    const { singleOptoin } = useContextStore()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
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

    const str = "פיקוד ההכשרות והאימונים / תומר / לובי כניסה"


console.log(singleOptoin);


    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"תת סביבה"}
            navLeft={`${searchParams.get('sw')} / ${searchParams.get('subSW')} / בחירת חדר`}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showExcel={false}
            showBall={true}
            showSelectOption={false}
            options={singleOptoin?.subSpaceWork?.find((subSW) => subSW.name == searchParams.get("subSW"))?.lobbyOption}
        >
            <section className='mx-10 flex-1 grid grid-cols-3 '>
                {singleOptoin?.subSpaceWork?.find((subSW) => subSW.name == searchParams.get("subSW"))?.lobbyOption.map((item, i) => (
                    <div key={i} className={`" flex items-center justify-center h-80 " ${i !== lobbyOption?.length - 1 && "border-l-[1px]"} border-b-[1px] border-border`}>
                        <button onClick={() => {
                            navigate(`/dashboard?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${item?.name}`)
                        }}
                            className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150'>
                            {item.name}
                        </button>
                    </div>
                ))}
            </section>
        </TemplatePage>
    )
}

export default HomePage