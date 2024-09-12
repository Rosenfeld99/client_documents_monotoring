import React from 'react';
import { IoMdNotifications } from "react-icons/io";

const SelectBox = () => {

    const options = ["סביבה", "תומר", "ג'וליס", "828"];

    return (
        <div className="w-auto flex  items-center">
            <IoMdNotifications className='text-3xl text-[#94a3b8]' />
                <select name="box" id="box" className="px-5 block w-full border-blue-500 rounded-lg text-lg leading-tight focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700">
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
        </div>
    );
}

export default SelectBox;
