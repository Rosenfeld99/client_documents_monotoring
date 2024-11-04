import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useContextStore from '../hooks/useContextStore';

const SelectBox = ({ options, setState, optionDisaled }) => {
    const [searchParams] = useSearchParams()
    const location = useLocation().pathname

    const navigate = useNavigate()
    const { handleGetSingleOption, singleOptoin } = useContextStore()
    const handleSelect = (e) => {
        // console.log(e.target);
        const val = e.target.value

        console.log(options?.find((item) => item?.name == val));

        location !== "/dashboard" && handleGetSingleOption(val)
        // setState && setState(options?.find((item) => item?.name == val))

        location == "/dashboard"
            ? navigate(`?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${val}`)
            : navigate(`?sw=${val}`)
    }

    console.log(searchParams.get("room"), options);


    return (
        <React.Fragment>
            {options?.length > 0 &&
                <div className="w-auto flex items-center relative">
                    {(!searchParams.get('sw') && !singleOptoin) && <div className="animate-ping w-2 h-2 bg-primary rounded-full absolute -top-1 right-0" />}
                    <select value={location == "/dashboard" ? searchParams.get("room") : singleOptoin?.name || optionDisaled} onChange={handleSelect} name="box" id="box"
                        className={`px-5 block w-full border-blue-500 rounded-lg text-lg leading-tight focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 hover:cursor-pointer p-1 ${(!searchParams.get('sw') && !singleOptoin) && "border-[1px] border-primary"}`}>
                        <option disabled>{optionDisaled}</option>
                        {options?.map(option => (
                            <option className={`${location == "/dashboard" ? searchParams.get("room") == option?.name && "text-[#fff] bg-primary" : singleOptoin?.name == option?.name && "text-[#fff] bg-primary"} `} key={option.value} value={option?.value}>{option?.name}</option>
                        ))}
                    </select>
                </div>
            }
        </React.Fragment>
    );
}

export default SelectBox;

