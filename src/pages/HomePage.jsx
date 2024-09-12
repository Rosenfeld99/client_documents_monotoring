import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'

const HomePage = () => {
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

    return (
        <TemplatePage showHeader={true} showNav={true} showSidebar={true} titleHeader={"תת סביבה"} navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />
        }>
            <section className='mx-10 flex-1 grid grid-cols-3'>
                {lobbyOption.map((item, i) => (
                    <div key={i} className={`" flex items-center justify-center h-80 " ${i !== lobbyOption?.length - 1 && "border-l-[1px]"} border-b-[1px] border-border`}>
                        <button className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center'>{item.name}</button>
                    </div>
                ))}
            </section>
        </TemplatePage>
    )
}

export default HomePage