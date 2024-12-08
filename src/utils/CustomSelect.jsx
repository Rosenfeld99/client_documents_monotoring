import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

const CustomSelect = ({ options, placeholder,required, labelText, setState, layer, keyToUpdate, defaultValue }) => {
    const [searchParams] = useSearchParams()
    const [selectedOption, setSelectedOption] = useState("");
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
    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        let defultePlaceHolder;
      if(labelText==="יחידה מטפלת"){
        // set the placeholder and the value to name of room
        defultePlaceHolder=searchParams.get('room');
        setState(defultePlaceHolder, "יחידה מטפלת")
      }
     else if (labelText==="דחיפות") {
        // set the placeholder and the value to LEVEL OF QUEST
        defultePlaceHolder="נמוכה-3";
       
        
        setState(defultePlaceHolder,"דחיפות")

      }
      else{
        defultePlaceHolder=defaultValue;
      }
      setSelectedOption(defultePlaceHolder)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative w-full ${layer}`} ref={selectRef}>
            <label
                className={`absolute bg-accent right-2 px-2 transition-all duration-300 -top-2.5  text-base text-gray-500`}
                style={{ pointerEvents: 'none' }}
            >
                {labelText}
            </label>
            <div
                tabIndex={0}
                className={`border border-border ${isOpen && "border border-[#1298ff]"} rounded-md p-2 cursor-pointer text-black font-medium ${isOpen && "border-2 border-primary"}`}
                onClick={toggleDropdown}
            >
               
                {selectedOption || placeholder||"בחרו אופצייה"}
                <span className="float-left flex items-center text-3xl justify-center mr-8 text-border">
                    {isOpen ? (
                        <FiChevronUp className=' text-primary'/>
                    ) : (
                        <FiChevronDown />
                    )}
                </span>
            </div>
            {isOpen && (
                <ul className={`absolute mt-1 w-full border max-h-52 overflow-auto border-border bg-background rounded-md z-10 shadow-2xl ${isOpen && "border-primary"}`}>
                    {options?.map((option, index) => (
                        <li
                            key={option}
                            className={`p-2 px-5 flex items-center justify-between cursor-pointer hover:opacity-70 ${index !== options.length - 1 && isOpen ? "border-b-[1px] border-primary" : "border-b-[1px] border-border"} `}
                            onClick={() => handleOptionClick(option)}
                        >
                            <span>
                                {option}
                            </span>
                            {option == selectedOption && <div className=" w-4 h-4 rounded-full bg-primary" />}
                        </li>
                    ))}
                </ul>
            )}
             {required &&
                <div className='absolute  text-[10px]  -top-3 left-0 text-[#E57373]'>*שדה חובה </div>
            }
        </div>
    );
};

export default CustomSelect;



// Eli component
// import React, { useState, useRef, useEffect } from 'react';
// import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// const CustomSelect = ({ options, placeholder, labelText, setState, layer, keyToUpdate, defaultValue }) => {
//     const [selectedOption, setSelectedOption] = useState(defaultValue || "");
//     const [isOpen, setIsOpen] = useState(false);
//     const selectRef = useRef(null);

//     const toggleDropdown = () => {
//         setIsOpen((prev) => !prev);
//     };

//     const handleOptionClick = (option) => {
//         setSelectedOption(option);
//         setState(option, keyToUpdate)
//         setIsOpen(false);
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (selectRef.current && !selectRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     console.log(options,selectedOption);
    

//     return (
//         <div className={`relative w-full ${layer}`} ref={selectRef}>
//             <label
//                 className={`absolute bg-background right-2 px-2 transition-all duration-300 ${isOpen || selectedOption ? '-top-2.5 text-primary ' : 'top-2.5 text-base text-gray-500'} ${isOpen && "text-primary"}`}
//                 style={{ pointerEvents: 'none' }}
//             >
//                 {labelText}
//             </label>
//             <div
//                 tabIndex={0}
//                 className={`border border-border ${isOpen && "border border-[#1298ff]"} rounded-md p-2 cursor-pointer text-black font-semibold ${isOpen && "border-2 border-primary"}`}
//                 onClick={toggleDropdown}
//             >
//                 {selectedOption || placeholder}
//                 <span className="float-left flex items-center text-3xl justify-center mr-8 text-border">
//                     {isOpen ? (
//                         <FiChevronUp className=' text-primary'/>
//                     ) : (
//                         <FiChevronDown />
//                     )}
//                 </span>
//             </div>
//             {isOpen && (
//                 <ul className={`absolute mt-1 w-full border border-border bg-background rounded-md z-10 shadow-2xl ${isOpen && "border-primary"}`}>
//                     {options.map((option, index) => (
//                         <li
//                             key={option.value}
//                             className={`p-2 px-5 flex items-center justify-between cursor-pointer hover:opacity-70 ${index !== options.length - 1 && isOpen ? "border-b-[1px] border-primary" : "border-b-[1px] border-border"} `}
//                             onClick={() => handleOptionClick(option?.name)}
//                         >
//                             <span>
//                                 {option.name}
//                             </span>
//                             {option.name == selectedOption && <div className=" w-4 h-4 rounded-full bg-primary" />}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default CustomSelect;
