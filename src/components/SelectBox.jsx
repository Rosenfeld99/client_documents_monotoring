import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectBox = ({ options, setState,optionDisaled }) => {

    const navigate = useNavigate()
    const handleSelect = (e) => {
        console.log(e.target);
        const val = e.target.value

        console.log(options?.find((item) => item?.name == val));

        setState(options?.find((item) => item?.name == val))
        navigate(`?sw=${val}`)

    }

    return (
        <div className="w-auto flex items-center">
            <select onChange={handleSelect} name="box" id="box" className="px-5 block w-full border-blue-500 rounded-lg text-lg leading-tight focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700">
                <option disabled>{optionDisaled}</option>
                {options?.map(option => (
                    <option key={option} value={option?.value}>{option?.name}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectBox;

