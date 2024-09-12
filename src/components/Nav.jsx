import React from 'react'

const Nav = ({ navRight }) => {

    return (
        <nav className="py-5 border-b-[1px] border-b-border px-10 flex fixed h-20 top-0 left-0 w-[calc(100%-250px)] bg-[#ffffff56] backdrop-blur-sm items-center justify-between">
            <div className="">right</div>
            {<div className="">
                {navRight}
            </div>}
        </nav>
    )
}

export default Nav