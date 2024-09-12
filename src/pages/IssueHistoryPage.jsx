import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'

const IssueHistoryPage = () => {
    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    return (
        <TemplatePage showHeader={true} showNav={true} showSidebar={true} titleHeader={"דשבורד"} navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />
        }>
            <section className='mx-10 flex-1 grid grid-cols-3'>
                IssueHistoryPage
            </section>
        </TemplatePage>
    )
}

export default IssueHistoryPage