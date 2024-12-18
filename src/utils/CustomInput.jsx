import React, { useState, useRef } from 'react';

const CustomInput = ({ placeholder, required, disabled, label, state, setState, inputType, minLen, maxLen, pattern, keyToUpdate }) => {
    const inputRef = useRef(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const checkPattern = (value) => {
        if (!pattern.test(value) && value?.length > 0) {
            alert(" m,o,c,s התו הראשון חייב להיות   באנגלית")
            return false
        }
        return true
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (pattern && value?.length > 0) {
            checkPattern(value)
            if (pattern?.test(value)) {
                setState(value, keyToUpdate);
            }
        } else {
            setState(value, keyToUpdate)
        }
    };

    console.log(disabled);

    return (
        <div className={`relative ${label === "שם פותח תקלה" && "opacity-30"} w-full`}>
            <label
                className={`absolute right-2 px-2 transition-all duration-200 -top-2.5 pl-2 text-gray-400 bg-accent text-base text-gray-500`}
                onClick={() => inputRef?.current?.focus()}
                style={{ pointerEvents: 'auto', cursor: 'text' }}
            >
                {label}
            </label>
            <input
                ref={inputRef}
                className="justify-center px-4 py-2 rounded-lg w-full outline-primary border border-solid border-border text-ellipsis bg-accent"
                type={isPasswordVisible ? "text" : inputType}
                value={state[keyToUpdate] ?? ""}
                // defaultValue={state[keyToUpdate]}
                minLength={minLen}
                maxLength={maxLen}
                onChange={handleInputChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled ?? false}
            />
            {required &&
                <div className='absolute -top-5 text-sm left-0 text-[#E57373]'>*שדה חובה </div>

            }
        </div>
    );
};

export default CustomInput;
