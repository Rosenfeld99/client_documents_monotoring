import React from 'react';
import { IoMdNotifications } from "react-icons/io";

const SelectBox = () => {
    const options = ["סביבה", "תומר", "ג'וליס", "828"];
    
    const hasNotifications = true; 
    
    return (
        <div className="w-auto flex items-center">

            <div className='relative'>
                <IoMdNotifications className='sm:text-xl lg:text-3xl text-[#94a3b8]' />
                {hasNotifications && (
                    <div className='sm:w-1 sm:h-1 lg:w-2 lg:h-2 bg-error rounded-full absolute top-1 right-1'></div>
                )}
            </div>
            
            <select name="box" id="box" className="px-5 block w-full border-blue-500 rounded-lg text-lg leading-tight focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700">
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectBox;

