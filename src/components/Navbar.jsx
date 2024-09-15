import React from 'react'
import User from './User'
import SelectBox from './SelectBox'
import { FaHome } from 'react-icons/fa'
import { IoMdNotifications } from 'react-icons/io'
import { RiFileExcel2Fill } from 'react-icons/ri'

const Navbar = ({ navLeft, showBall, showExcel, showSelectOption, options, setState, optionDisaled }) => {
    console.log(navLeft);
    const hasNotifications = true;


    const parts = navLeft?.split(' / ') || [];

    return (
        <nav className=" border-b-[1px] border-b-border px-10 flex fixed h-16 top-0 left-0 w-[calc(100%-250px)] bg-[#ffffff56] backdrop-blur-sm items-center justify-between">

            <div className='sm:text-sm  md:text-base lg:text-xl gap-3 flex items-center '>
                <FaHome className=' text-primary cursor-pointer' />
                {parts?.slice(0, parts?.length - 1).map((part, index) => (
                    <span key={index}>{part} / </span>
                ))}
                <span className='text-primary'>{parts[parts?.length - 1]}</span>
            </div>

            <div className='flex items-center gap-8'>
                {showBall && <div className='relative'>
                    <IoMdNotifications className='sm:text-xl lg:text-3xl text-[#94a3b8]' />
                    {hasNotifications && (
                        <div className='sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-error border-2 border-background rounded-full absolute top-1 right-[2px]'></div>
                    )}
                </div>}

                {showExcel && <div className="">
                    <RiFileExcel2Fill className=' text-[#259c61] text-3xl rounded-full border-2' />
                </div>}
                {showSelectOption && <SelectBox optionDisaled={optionDisaled} options={options} setState={setState} />}
                <User />
            </div>

        </nav>
    )
}

export default Navbar
