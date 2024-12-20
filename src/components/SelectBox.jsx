import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useContextStore from '../hooks/useContextStore';
import useSocket from '../hooks/useSocket';

const SelectBox = ({ options, setState, optionDisaled }) => {
    const [searchParams] = useSearchParams()
    const location = useLocation().pathname
    const { changeRoom } = useSocket()

    const navigate = useNavigate()
    const { handleGetSingleOption, singleOptoin } = useContextStore()
    const handleSelect = (e) => {
        // console.log(e.target);
        const val = e.target.value
        localStorage.setItem("sw", val)

        // console.log(options?.find((item) => item?.name == val));

        location !== "/dashboard" && handleGetSingleOption(val)
        // setState && setState(options?.find((item) => item?.name == val))

        location == "/dashboard"
            ? (changeRoom(searchParams.get('sw'), searchParams.get('subSW'), val), navigate(`?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${val}`))
            : (changeRoom(val), navigate(`?sw=${val}`))
    }

    // console.log(searchParams.get("room"), options);


    return (
        <React.Fragment>
            {options?.length > 0 &&
                <div className="w-auto flex items-center relative">
                    {(!searchParams.get('sw')) && <div className="animate-ping w-2 h-2 bg-primary rounded-full absolute -top-1 right-0" />}
                    <select value={location == "/dashboard" ? searchParams.get("room") : searchParams.get('sw') || optionDisaled} onChange={handleSelect} name="box" id="box"
                        className={`px-5 block w-full border-blue-500 rounded-lg text-lg leading-tight focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 hover:cursor-pointer p-1 ${(!searchParams.get('sw') && !singleOptoin) && "border-[1px] border-primary"}`}>
                        <option disabled>{optionDisaled}</option>
                        {options?.map(option => (
                            <option className={`${location == "/dashboard" ? searchParams.get("room") == option && "text-[#fff] bg-primary" : searchParams.get('sw') == option && "text-[#fff] bg-primary"} `} key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            }
        </React.Fragment>
    );
}

export default SelectBox;

