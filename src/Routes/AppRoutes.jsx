import React, { useContext, useEffect } from 'react'
import { Link, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import NewIssuePage from '../pages/NewIssuePage'
import UserManagementPage from '../pages/UserManagementPage'
import IssueHistoryPage from '../pages/IssueHistoryPage'
import SystemSettingsPage from '../pages/SystemSettingsPage'
import HelpPage from '../pages/HelpPage'
import RootSWPage from '../pages/RootSWPage'
import OpenIssues from '../pages/OpenIssues'
import useUsers from '../hooks/useUsers'
import { ContextStore } from '../context/contextStore'
import useSpaceWork from '../hooks/useSpaceWork'
import ManageUserAccess from '../pages/ManageUserAccess'
import useContextStore from '../hooks/useContextStore'
import socketHook from '../hooks/useSocket'
import RegisterPage from '../pages/RegisterPage'


const AppRoutes = () => {
    const { getUser, currentUser } = useUsers()
    const { inputs, socketIo, setInputs, setCountRoomReports, historyReports } = useContext(ContextStore)
    const [searchParams] = useSearchParams()
    const { getRoomInputs, getRoomHistory } = useSpaceWork()
    const navigate = useNavigate()
    const { changeRoom } = socketHook()

    useEffect(() => {
        // getUser("dwdddoe01")
        // getUser("m7543456")
        getUser("doe01")
    }, [])

    useEffect(() => {
        console.log(inputs);

        // check every time if user refreshe the page so call get room inputs just if have params
        if (!inputs[0] && searchParams?.get('sw') && searchParams?.get('subSW') && searchParams?.get('room') && currentUser) {

            const roomObj = {
                spaceWork: searchParams?.get('sw'),
                subSpaceWork: searchParams?.get('subSW'),
                room: searchParams?.get('room'),
                userId: currentUser?.userId
            }

            getRoomInputs(roomObj)
            getRoomHistory(roomObj)
            setCountRoomReports(historyReports?.data?.filter((rep) => rep["יחידה מטפלת"] === searchParams.get("room")))
        }
    }, [currentUser, searchParams.get('room')])

    // useEffect(() => {

    //     if (currentUser) {
    //         console.log(currentUser);

    //         const localSW = localStorage.getItem("sw");
    //         const localSubSP = localStorage.getItem("subSW");
    //         const localRoom = localStorage.getItem("room");

    //         const permissionRoom = currentUser.rooms[`${localSW}_${localSubSP}_${localRoom}`]
    //         const permissionSubSw = currentUser.subSpaceWorks[localSW] && currentUser.subSpaceWorks[localSW][localSubSP]
    //         const permissionSW = currentUser.spaceWorks[localSW]
    //         // before i sent the user to his last point in his website check if he has permision to do that
    //         if (localSW && localSubSP && localRoom && permissionRoom) {
    //             changeRoom(localSW, localSubSP, localRoom, "dashboard_open")
    //             navigate(`dashboard?sw=${localSW}&subSW=${localSubSP}&room=${localRoom}`)
    //         }
    //         else if (localSW && localSubSP && permissionSubSw) {
    //             changeRoom(localSW, localSubSP)

    //             navigate(`/?sw=${localSW}&subSW=${localSubSP}`)
    //         }
    //         else if (localSW && permissionSW) {
    //             changeRoom(localSW)

    //             navigate(`/?sw=${localSW}`)
    //         }
    //     }

    // }, [currentUser])

    return (
        <>
            {currentUser ?
                <Routes>

                    <Route path='/' element={<RootSWPage />} />
                    <Route path='/spaceWork' element={<HomePage />} />
                    <Route path='/dashboard' element={<DashboardPage />} />
                    <Route path='/new-issue' element={<NewIssuePage />} />
                    <Route path='/user-management' element={<UserManagementPage />} />
                    <Route path='/user-management/:id' element={<ManageUserAccess />} />
                    <Route path='/register-user' element={<ManageUserAccess />} />
                    <Route path='/issue-history' element={<IssueHistoryPage />} />
                    <Route path='/open-issue' element={<OpenIssues />} />
                    <Route path='/system-settings' element={<SystemSettingsPage />} />
                    <Route path='/help' element={<HelpPage />} />
                    <Route path='/*' element={<div className=' flex items-center justify-center w-full h-screen text-2xl font-semibold gap-5'>Not found 404 <Link to={'/'} className=' px-3 py-1 bg-success text-white '>Back Home</Link></div>} />
                </Routes>
                : <RegisterPage />}
        </>
    )



}

export default AppRoutes