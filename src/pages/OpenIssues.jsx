import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import { useSearchParams } from 'react-router-dom'
import CustomSelect from '../utils/CustomSelect'

export default function OpenIssues() {


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
    titleHeader={"תקלות פתוחות"}
    navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
    navLeft={str}
>
    <section className='mx-10 flex-1 grid grid-cols-3'>
        
    </section>
</TemplatePage>
  )
}
