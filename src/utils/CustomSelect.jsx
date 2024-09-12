import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CustomSelect = ({ options, placeholder, labelText, setState, layer, keyToUpdate, defaultValue }) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue || "");
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setState(option, keyToUpdate)
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    console.log(options,selectedOption);
    

    return (
        <div className={`relative w-fit ${layer}`} ref={selectRef}>
            <label
                className={`absolute bg-background text-[#8e9ba5] right-2 px-2 transition-all duration-300 ${isOpen || selectedOption ? '-top-2.5 text-xs ' : 'top-2.5 text-base text-gray-500'} ${isOpen && "text-[#1298ff]"}`}
                style={{ pointerEvents: 'none' }}
            >
                {labelText}
            </label>
            <div
                tabIndex={0}
                className={`border border-[#8e9ba5] ${isOpen && "border border-[#1298ff]"} rounded-md p-2 cursor-pointer text-black font-semibold ${isOpen && "border-2 border-blue-400"}`}
                onClick={toggleDropdown}
            >
                {selectedOption || placeholder}
                <span className="float-left flex items-center text-3xl justify-center mr-8 text-[#8e9ba5]">
                    {isOpen ? (
                        <FiChevronUp />
                    ) : (
                        <FiChevronDown />
                    )}
                </span>
            </div>
            {isOpen && (
                <ul className="absolute mt-1 w-full border border-[#8e9ba5] bg-background rounded-md z-10">
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            className={`p-2 px-5 flex items-center justify-between cursor-pointer hover:opacity-70 ${index !== options.length - 1 && "border-b-[1px] border-[#8e9ba5]"} `}
                            onClick={() => handleOptionClick(option?.name)}
                        >
                            <span>
                                {option.name}
                            </span>
                            {option.name == selectedOption && <div className=" w-4 h-4 rounded-full bg-primary" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
