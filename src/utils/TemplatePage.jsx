import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

const TemplatePage = ({ setState, children, showSidebar, showNav, showHeader, titleHeader, navRight, navLeft, showBall, showExcel, showSelectOption, options, optionDisaled }) => {
    console.log(setState);

    return (
        <div className=' flex '>
            {showSidebar && <Sidebar />}
            <main className={` bg-background w-[100%] max-h-screen ${showSidebar && "mr-[250px]"}`}>
                {showNav && <Navbar optionDisaled={optionDisaled} setState={setState} navRight={navRight} navLeft={navLeft} showExcel={showExcel} showBall={showBall} options={options} showSelectOption={showSelectOption} />}
                {showHeader && <Header showNav={showNav} title={titleHeader} />}
                {children}
            </main>
        </div>
    )
}

export default TemplatePage