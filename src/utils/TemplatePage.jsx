import React from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import Header from '../components/Header'

const TemplatePage = ({ children, showSidebar, showNav, showHeader, titleHeader, navRight }) => {
    return (
        <div className=' flex '>
            {showSidebar && <Sidebar />}
            <main className={` bg-background w-[100%] max-h-screen ${showSidebar && "mr-[250px]"}`}>
                {showNav && <Nav navRight={navRight} />}
                {showHeader && <Header showNav={showNav} title={titleHeader} />}
                {children}
            </main>
        </div>
    )
}

export default TemplatePage