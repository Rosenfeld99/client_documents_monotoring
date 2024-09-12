import React, { useState, useRef } from 'react';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';

const CustomInput = ({ placeholder, label, state, setState, inputType, minLen, maxLen, pattern, keyToUpdate }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (pattern) {
            if (pattern?.test(value)) {
                setState(value, keyToUpdate);
            }
        } else {
            setState(value, keyToUpdate)
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="relative w-full">
            <label
                className={`absolute right-2 bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content px-2 transition-all duration-200 ${isFocused || state ? '-top-2.5 text-xs text-gray-400' : 'top-2.5 text-base text-gray-500'}`}
                onClick={() => inputRef.current.focus()}
                style={{ pointerEvents: 'auto', cursor: 'text' }}
            >
                {label}
            </label>
            <input
                ref={inputRef}
                className="justify-center px-4 py-2 bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content rounded-lg w-full outline-blue-400 border border-solid border-gray-300 text-ellipsis "
                type={isPasswordVisible ? "text" : inputType}
                value={state}
                minLength={minLen}
                maxLength={maxLen}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={isFocused ? '' : placeholder}
            />
            {state?.length > 0 &&
                <button onClick={togglePasswordVisibility} className=' absolute left-0 top-0 text-xl p-3'>{!isPasswordVisible ? <LiaEyeSolid /> : <LiaEyeSlash />}</button>
            }
        </div>
    );
};

export default CustomInput;
