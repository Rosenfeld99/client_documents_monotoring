import React from 'react'
import { CgLoadbarDoc } from 'react-icons/cg'
import { FaChartBar, FaUsers } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdHistory } from 'react-icons/md'
import { PiBuildingsBold } from 'react-icons/pi'
import { TbHelpSquareFilled } from 'react-icons/tb'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import useContextStore from '../hooks/useContextStore'

const Sidebar = () => {
    const navigateion = useNavigate()
    const location = useLocation() // useLocation to get the current path
    const [searchParams] = useSearchParams()
    console.log(searchParams.get('room'));
    const { options } = useContextStore()

    const styleItem = "flex items-center gap-3 text-[#a4a5ac] hover:opacity-50 px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer"
    const styleItemActive = "bg-primary text-background flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-150 " // active item style
    const styleIcon = "text-2xl"

    return (
        <div className="flex flex-col h-full justify-between fixed max-h-screen w-[250px] min-w-[210px] bg-secondary min-h-screen p-5">
            <div className="flex flex-col">
                {/* TOP */}
                <div onClick={() => navigateion(searchParams.get('sw') ? `/?sw=${searchParams.get('sw')}` : "/")} className="flex items-center gap-3">
                    <h2 className='font-semibold text-xl'>לוגו זמני</h2>
                    <div className="bg-primary text-background rounded-full w-10 aspect-square justify-center flex items-center">L</div>
                </div>

                {/* Middle */}
                <div className="flex-col flex gap-5 pt-10">
                    <div onClick={() => navigateion(`/?sw=${searchParams.get('sw') || options[0]?.name}&?room=${searchParams.get('room') || "דשבורד"}`)} className={`${location.pathname === "/" || location.pathname === "/spaceWork" ? styleItemActive : styleItem}`}>
                        <PiBuildingsBold className={styleIcon} />
                        <span>לובי</span>
                    </div>
                    {(searchParams.get('sw') && searchParams.get('subSW') && searchParams.get('room')) && <div onClick={() => navigateion(`/dashboard?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room') || "דשבורד"}`)} className={`${location.pathname.includes("/dashboard") ? styleItemActive : styleItem}`}>
                        <FaChartBar className={styleIcon} />
                        <span>דשבורד</span>
                    </div>}
                    {(searchParams.get('sw') && searchParams.get('subSW') && searchParams.get('room')) && <div onClick={() => navigateion(`/new-issue?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room') || "תקלה חדשה"}`)} className={`${location.pathname === "/new-issue" ? styleItemActive : styleItem}`}>
                        <CgLoadbarDoc className={styleIcon} />
                        <span>תקלה חדשה</span>
                    </div>}
                    {(searchParams.get('sw') && searchParams.get('subSW') && searchParams.get('room')) && <div onClick={() => navigateion(`/user-management?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room') || "ניהול משתמשים"}`)} className={`${location.pathname === "/user-management" ? styleItemActive : styleItem}`}>
                        <FaUsers className={styleIcon} />
                        <span>ניהול משתמשים</span>
                    </div>}
                    {(searchParams.get('sw') && searchParams.get('subSW') && searchParams.get('room')) && <div onClick={() => navigateion(`/issue-history?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room') || "היסטורית תקלות"}`)} className={`${location.pathname === "/issue-history" ? styleItemActive : styleItem}`}>
                        <MdHistory className={styleIcon} />
                        <span>היסטורית תקלות</span>
                    </div>}
                    {(searchParams.get('sw') && searchParams.get('subSW') && searchParams.get('room')) && <div onClick={() => navigateion(`/open-issue?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room') || "תקלות פתוחות"}`)} className={`${location.pathname === "/open-issue" ? styleItemActive : styleItem}`}>
                        <MdHistory className={styleIcon} />
                        <span>תקלות פתוחות</span>
                    </div>}
                    {(searchParams.get('sw') && searchParams.get('subSW') && searchParams.get('room')) && <div onClick={() => navigateion(`/system-settings?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room') || "הגדרות מערכת"}`)} className={`${location.pathname === "/system-settings" ? styleItemActive : styleItem}`}>
                        <IoMdSettings className={styleIcon} />
                        <span>הגדרות מערכת</span>
                    </div>}
                </div>
            </div>

            {/* bottom */}
            <div className="flex flex-col gap-3">
                <div onClick={() => navigateion(`/help?room=${searchParams.get('room') || "עזרה"}`)} className={`${location.pathname === "/help" ? styleItemActive : styleItem}`}>
                    <TbHelpSquareFilled className='text-2xl mt-auto' />
                    <span>עזרה</span>
                </div>
                <div className={styleItem}>
                    <img src='/logo_dev.png' className='w-10 aspect-square rounded-xl border-2 border-primary mt-auto' />
                    <div className="">
                        <div>פותוח ע”י צוות אלפא</div>
                        <div className=' text-xs'>צוות אלפא CTR+K</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
