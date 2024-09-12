import React, { useState } from 'react'
import { CgLoadbarDoc } from 'react-icons/cg'
import { FaChartBar, FaUsers } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdHistory } from 'react-icons/md'
import { PiBuildingsBold } from 'react-icons/pi'
import { TbHelpSquareFilled } from 'react-icons/tb'

const Sidebar = () => {
    const [currentRoute, setCurrentRoute] = useState("")

    const styleItem = "flex items-center gap-3 text-[#a4a5ac] hover:opacity-50 px-3 py-2 rounded-lg transition-all cursor-pointer"
    const styleItemActive = "bg-primary text-background flex items-center gap-3 px-3 py-2 rounded-lg transition-all" // active item style
    const styleIcon = "text-2xl"

    return (
        <div className='w-[20%] max-w-[250px] min-w-[210px] bg-secondary min-h-screen p-5'>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col">
                    {/* TOP */}
                    <div className="flex items-center gap-3">
                        <h2 className='font-semibold text-xl'>לוגו זמני</h2>
                        <div className="bg-primary text-background rounded-full w-10 aspect-square justify-center flex items-center">L</div>
                    </div>

                    {/* Middle */}
                    <div className="flex-col flex gap-5 pt-10">
                        <div onClick={() => setCurrentRoute("לובי")} className={`${currentRoute === "לובי" ? styleItemActive : styleItem}`}>
                            <PiBuildingsBold className={styleIcon} />
                            <span>לובי</span>
                        </div>
                        <div onClick={() => setCurrentRoute("דשבורד")} className={`${currentRoute === "דשבורד" ? styleItemActive : styleItem}`}>
                            <FaChartBar className={styleIcon} />
                            <span>דשבורד</span>
                        </div>
                        <div onClick={() => setCurrentRoute("תקלה חדשה")} className={`${currentRoute === "תקלה חדשה" ? styleItemActive : styleItem}`}>
                            <CgLoadbarDoc className={styleIcon} />
                            <span>תקלה חדשה</span>
                        </div>
                        <div onClick={() => setCurrentRoute("ניהול משתמשים")} className={`${currentRoute === "ניהול משתמשים" ? styleItemActive : styleItem}`}>
                            <FaUsers className={styleIcon} />
                            <span>ניהול משתמשים</span>
                        </div>
                        <div onClick={() => setCurrentRoute("היסטורית תקלות")} className={`${currentRoute === "היסטורית תקלות" ? styleItemActive : styleItem}`}>
                            <MdHistory className={styleIcon} />
                            <span>היסטורית תקלות</span>
                        </div>
                        <div onClick={() => setCurrentRoute("הגדרות מערכת")} className={`${currentRoute === "הגדרות מערכת" ? styleItemActive : styleItem}`}>
                            <IoMdSettings className={styleIcon} />
                            <span>הגדרות מערכת</span>
                        </div>
                    </div>
                </div>

                {/* bottom */}
                <div className="flex flex-col gap-3">
                    <div onClick={() => setCurrentRoute("עזרה")} className={`${currentRoute === "עזרה" ? styleItemActive : styleItem}`}>
                        <TbHelpSquareFilled className='text-2xl mt-auto' />
                        <span>עזרה</span>
                    </div>
                    <div className={styleItem}>
                        <img src='/logo_dev.png' className='w-10 aspect-square rounded-xl border-2 border-primary mt-auto' />
                        <span>פותוח ע”י צוות אלפא</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar