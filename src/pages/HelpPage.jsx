import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'

const HelpPage = () => {
    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    const str = "פיקוד ההכשרות והאימונים / תומר / דסק תפעול"


    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"דף עזרה"}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />
            }
            navLeft={str}
        >
            <section className='mx-10 flex-1 grid grid-cols-3'>
                HelpPage
            </section>
        </TemplatePage>
    )
}

export default HelpPage