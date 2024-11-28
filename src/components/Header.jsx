import React from 'react'

const Header = ({ title, anotherSection, showNav }) => {
    return (
        <header className={` flex items-center justify-between py-2 px-10 ${showNav && "mt-20"}`}>
            {title && <div className=" text-2xl w-full">{title}</div>}
            {anotherSection && <div className="">{anotherSection}</div>}
        </header>
    )
}

export default Header