import React, { useContext, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'
import ChooseOption from '../components/systemSetting/ChooseOption'
import ActiveInputs from '../components/systemSetting/ActiveInputs'
import { ContextStore } from '../context/contextStore'



const SystemSettingsPage = () => {
    const [searchParams] = useSearchParams()
    const { inputs, setInputs } = useContext(ContextStore)

    // this state is used for get wich input is clicked 
    const [chooseOption, setChooseOption] = useState("")

    // this state is used for get wich input active if it  is clicked 
    const [inputDeatils, setInputDeatils] = useState()

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
            {/* <ProgressTracker /> */}

            {/* <div className='divide-x mx-16 bg-[#060a10] h-[2px] rounded-md w-full'>

            </div> */}
            {/* <ProgressTracker /> */}

            {/* <div className='border flex-1 grid  grid-cols-4 mx-10'>
                <div className="border col-span-3">
                    <div className='grid grid-cols-3'>
                        <div className='col-span-1'>fefsd</div>
                        <div className='col-span-2'>bvcxdsa</div>
                    </div>
                </div>
                <div className="border col-span-1">fgdg</div>
            </div> */}

            <section className='mx-10 flex-1 grid  grid-cols-4'>
                <div className='col-span-3 w-full   flex'>
                    <ChooseOption chooseOption={chooseOption} setUpdateInput={setInputDeatils} updateInput={inputDeatils} setChooseOption={setChooseOption} /><div className='divide-x ml-4 bg-[#DDE4F0] h-full rounded-md w-[2px]'></div></div>
                <div className='col-span-1 w-full  '><ActiveInputs chooseOption={chooseOption} setInputDeatils={setInputDeatils} setChooseOption={setChooseOption} /></div>
            </section>
        </TemplatePage>
    )
}


export default SystemSettingsPage