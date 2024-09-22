import React from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'
import DonutChart from '../components/donutChart/DonutChart'
import ColumnChart from '../components/columnChart/ColumnChart'

const DashboardPage = () => {
    const { singleOptoin } = useContextStore()
    const [searchParams] = useSearchParams()
    console.log(searchParams.get('room'));

    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`

    console.log(singleOptoin);

    const options = singleOptoin?.subSpaceWork?.find((subSW) => subSW.name == searchParams.get("subSW"))?.lobbyOption
    console.log(options);



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

            optionDisaled={"בחירת חדר"}
            options={options}
            showSelectOption={true}
        >
            <section className='mx-10 grid grid-cols-3 gap-[1px] bg-border'>
                <div className="bg-background pl-10">
                    <DonutChart />
                </div>
                <div className="col-span-2 bg-background pr-10">
                    <ColumnChart />
                </div>
                <div className="col-span-2 bg-background pl-10 pt-10">
                    <ColumnChart />
                </div>
                <div className="bg-background pr-10 pt-10">
                    <div className="flex items-center justify-between h-full">
                        <div className=' h-full'>
                            <button className="px-3 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">תקלות בטיפול דסק תפעול</button>
                            <div className=" text-6xl font-bold text-text text-center h-full flex items-center justify-center">44</div>
                        </div>
                        <div className=' h-full'>
                            <button className="px-3 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center hover:scale-110 duration-150">תקלה בטיפול רמ”מ</button>
                            <div className=" text-6xl font-bold text-text text-center h-full flex items-center justify-center">22</div>
                        </div>

                    </div>
                </div>
            </section>
        </TemplatePage>
    )
}

export default DashboardPage