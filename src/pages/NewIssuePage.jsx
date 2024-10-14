import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'
import CustomInput from '../utils/CustomInput'

const NewIssuePage = () => {
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
            titleHeader={"תקלה חדשה"}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className='mx-10 flex-1 gap-10 flex items-center justify-center border-border bg-accent shadow-md border-2 rounded-xl h-full'>
                <div className="flex justify-start flex-col p-10 h-full gap-10 w-2/3">
                    <div className="">מספר תקלה 0012</div>
                    <div className=" flex gap-20 w-full">
                        <div className=" flex flex-col w-full max-w-72 items-center gap-5">
                            <CustomInput inputType={'text'} label={'נושא'} placeholder={"תוכן נושא"} />
                            <CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />
                            <CustomInput inputType={'text'} label={'נושא'} placeholder={"תוכן נושא"} />
                            <CustomInput inputType={'text'} label={'נושא'} placeholder={"תוכן נושא"} />
                        </div>
                        <div className=" flex flex-col w-full max-w-72 items-center gap-5">
                            <CustomInput inputType={'text'} label={'נושא'} placeholder={"תוכן נושא"} />
                            <CustomInput inputType={'text'} label={'נושא'} placeholder={"תוכן נושא"} />
                            <CustomInput inputType={'text'} label={'נושא'} placeholder={"תוכן נושא"} />
                        </div>
                    </div>
                </div>
                <div className=" max-w-[600px] m-10 w-1/3">
                    <img src="/new-issuse.png" alt="new issuse" />
                </div>
            </section>
        </TemplatePage>
    )
}

export default NewIssuePage