import React from 'react'
import { CgLoadbarDoc } from 'react-icons/cg'
import { FaChartBar, FaUsers } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdHistory } from 'react-icons/md'
import { PiBuildingsBold } from 'react-icons/pi'
import { TbHelpSquareFilled } from 'react-icons/tb'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const navigateion = useNavigate()
    const location = useLocation() // useLocation to get the current path

    const styleItem = "flex items-center gap-3 text-[#a4a5ac] hover:opacity-50 px-3 py-2 rounded-lg transition-all duration-700 cursor-pointer"
    const styleItemActive = "bg-primary text-background flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-700 " // active item style
    const styleIcon = "text-2xl"

    return (
        <div className="flex flex-col h-full justify-between fixed max-h-screen w-[250px] min-w-[210px] bg-secondary min-h-screen p-5">
            <div className="flex flex-col">
                {/* TOP */}
                <div onClick={() => navigateion(`/`)} className="flex items-center gap-3">
                    <h2 className='font-semibold text-xl'>לוגו זמני</h2>
                    <div className="bg-primary text-background rounded-full w-10 aspect-square justify-center flex items-center">L</div>
                </div>

                {/* Middle */}
                <div className="flex-col flex gap-5 pt-10">
                    <div onClick={() => navigateion(`/`)} className={`${location.pathname === "/" ? styleItemActive : styleItem}`}>
                        <PiBuildingsBold className={styleIcon} />
                        <span>לובי</span>
                    </div>
                    <div onClick={() => navigateion(`/dashboard/id`)} className={`${location.pathname.includes("/dashboard") ? styleItemActive : styleItem}`}>
                        <FaChartBar className={styleIcon} />
                        <span>דשבורד</span>
                    </div>
                    <div onClick={() => navigateion(`/new-issue`)} className={`${location.pathname === "/new-issue" ? styleItemActive : styleItem}`}>
                        <CgLoadbarDoc className={styleIcon} />
                        <span>תקלה חדשה</span>
                    </div>
                    <div onClick={() => navigateion(`/user-management`)} className={`${location.pathname === "/user-management" ? styleItemActive : styleItem}`}>
                        <FaUsers className={styleIcon} />
                        <span>ניהול משתמשים</span>
                    </div>
                    <div onClick={() => navigateion(`/issue-history`)} className={`${location.pathname === "/issue-history" ? styleItemActive : styleItem}`}>
                        <MdHistory className={styleIcon} />
                        <span>היסטורית תקלות</span>
                    </div>
                    <div onClick={() => navigateion(`/system-settings`)} className={`${location.pathname === "/system-settings" ? styleItemActive : styleItem}`}>
                        <IoMdSettings className={styleIcon} />
                        <span>הגדרות מערכת</span>
                    </div>
                </div>
            </div>

            {/* bottom */}
            <div className="flex flex-col gap-3">
                <div onClick={() => navigateion(`/help`)} className={`${location.pathname === "/help" ? styleItemActive : styleItem}`}>
                    <TbHelpSquareFilled className='text-2xl mt-auto' />
                    <span>עזרה</span>
                </div>
                <div className={styleItem}>
                    <img src='/logo_dev.png' className='w-10 aspect-square rounded-xl border-2 border-primary mt-auto' />
                    <span>פותוח ע”י צוות אלפא</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
