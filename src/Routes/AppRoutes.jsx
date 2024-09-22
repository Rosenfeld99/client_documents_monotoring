import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import NewIssuePage from '../pages/NewIssuePage'
import UserManagementPage from '../pages/UserManagementPage'
import IssueHistoryPage from '../pages/IssueHistoryPage'
import SystemSettingsPage from '../pages/SystemSettingsPage'
import HelpPage from '../pages/HelpPage'
import RootSWPage from '../pages/RootSWPage'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RootSWPage />} />
                <Route path='/spaceWork' element={<HomePage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/new-issue' element={<NewIssuePage />} />
                <Route path='/user-management' element={<UserManagementPage />} />
                <Route path='/issue-history' element={<IssueHistoryPage />} />
                <Route path='/system-settings' element={<SystemSettingsPage />} />
                <Route path='/help' element={<HelpPage />} />
                <Route path='/*' element={<div className=' flex items-center justify-center w-full h-screen text-2xl font-semibold gap-5'>Not found 404 <Link to={'/'} className=' px-3 py-1 bg-success text-white '>Back Home</Link></div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes