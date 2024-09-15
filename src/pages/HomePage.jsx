import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'

const HomePage = () => {
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

    const options = [
        { name: "תומר", id: "123456789" },
        { name: "ג'וליס", id: "987654567567" },
        { name: "828", id: "0987654321" },
    ];



    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"תת סביבה"}
            navLeft={str}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showExcel={false}
            showBall={true}
            showSelectOption={true}
            options={options}
        >
            <section className='mx-10 flex-1 grid grid-cols-3 '>
                {lobbyOption.map((item, i) => (
                    <div key={i} className={`" flex items-center justify-center h-80 " ${i !== lobbyOption?.length - 1 && "border-l-[1px]"} border-b-[1px] border-border`}>
                        <button onClick={() => { navigate(`/dashboard?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get(item?.name)}`) }} className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center'>{item.name}</button>
                    </div>
                ))}
            </section>
        </TemplatePage>
    )
}

export default HomePage