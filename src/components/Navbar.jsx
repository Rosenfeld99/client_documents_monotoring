import React from 'react'
import User from './User'
import SelectBox from './SelectBox'

const Navbar = () => {
    const str = "פיקוד ההכשרות והאימונים / תומר / לובי כניסה"
    const parts = str.split(' / ');

    return (
        <nav className="py-3 border-b-2 border-b-border px-10 flex items-center justify-between ">

            <div className='sm:text-sm  md:text-base lg:text-xl'>
                {parts.slice(0, parts.length - 1).map((part, index) => (
                    <span key={index}>{part} / </span>
                ))}
                <span className='text-primary'>{parts[parts.length - 1]}</span>
            </div>

            <div className='flex items-center gap-8'>
                <SelectBox />
                <User />
            </div>

        </nav>
    )
}

export default Navbar
