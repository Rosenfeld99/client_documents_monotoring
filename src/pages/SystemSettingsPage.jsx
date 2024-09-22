import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'

const SystemSettingsPage = () => {
    const [searchParams] = useSearchParams()

    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`


    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"הגדרות מערכת"}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className='mx-10 flex-1 grid grid-cols-3'>
                SystemSettingsPage
            </section>
        </TemplatePage>
    )
}

export default SystemSettingsPage