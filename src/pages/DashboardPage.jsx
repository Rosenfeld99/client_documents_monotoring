import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'

const DashboardPage = () => {
    const [searchParams] = useSearchParams()
    console.log(searchParams.get('room'));

    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    const str = `${searchParams.get('sw')} / תומר / ${searchParams.get('room')}`

    const options = [
        { name: "דסק תפעול", id: "123456789" },
        { name: "מנו”ר", id: "987654567567" },
        { name: "תשתיות", id: "0987654321" },
    ];

    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"דשבורד"}
            navLeft={str}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            showBall={true}
            showExcel={true}
            options={options}
            showSelectOption={true}
        >
            <section className='mx-10 flex-1 grid grid-cols-3'>
                DashboardPage
            </section>
        </TemplatePage>
    )
}

export default DashboardPage