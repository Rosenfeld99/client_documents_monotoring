import React, { useState, useRef } from 'react';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';

export default function CustomTextarea({ required, placeholder, disabled, label, state, setState, minLen, maxLen, pattern, keyToUpdate }) {
    const inputRef = useRef(null);

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
    return (
        <div className="relative w-full">
            <label
                className={`absolute right-2 px-2 transition-all duration-200 -top-2.5 pl-2 text-gray-400 bg-accent text-base text-gray-500`}
                onClick={() => inputRef.current.focus()}
                style={{ pointerEvents: 'auto', cursor: 'text' }}
            >
                {label}
            </label>
            <textarea
                ref={inputRef}
                className="justify-center px-4 py-2 rounded-lg w-full outline-primary border border-solid border-border text-ellipsis bg-accent"
                value={state[keyToUpdate] ?? ""}
                minLength={minLen}
                maxLength={maxLen}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={disabled ?? false}
            />
            {required &&
                <div className='absolute  text-[10px]  -top-3 left-0 text-[#E57373]'>*שדה חובה </div>
            }
        </div>
    );
}
