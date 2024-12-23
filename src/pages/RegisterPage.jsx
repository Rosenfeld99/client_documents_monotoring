

import React, { useState } from "react";
import TreeIcon from "../../public/treeRegisterPage.jpeg"
import Logo from "../../public/logo.png"
import { registerInputs, registerObjInputs } from "../utils/constant/registerFields";


const RegisterPage = () => {
    const [inputs, setInputs] = useState({ ...registerObjInputs })


    const handleInput = (value, key) => {
        setInputs((prev) => ({ ...prev, [key]: value }))
    }
    return (
        // bg-[#bdd1e1]
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-white shadow-lg flex flex-col items-center justify-between py-6 fixed right-0 h-full">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">
                </button>
            </aside>
            {/* Navbar */}
            <header className="w-full h-12 bg-white shadow-md flex items-center justify-between px-6 fixed top-0">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className=" flex flex-col w-full  mt-28 px-4 h-[60vh]">
                {/* title && logo */}
                <div className="text-center flex flex-col gap-5 mb-10 relative">
                    <img src={Logo} className="w-60  absolute -top-20 right-10" alt="" />
                    <h1 className="text-4xl w-full  font-semibold text-gray-700 text-center flex-grow">
                        שלום נהוראי
                    </h1>
                    <p className="text-2xl">לקבלת הרשאה לאתר יש לבקש אישור מהמנהל</p>
                </div>

                {/* inputs && image */}
                <div className="flex justify-evenly items-center h-full w-full">
                    <div className="flex flex-col h-5/6 flex-wrap gap-10 w-1/2 mr-32">
                        {registerInputs.map((input) => <RegisterInput label={input} setState={handleInput} state={inputs} />)}
                    </div>
                    <div><img className="w-[420px] mb-20" src={TreeIcon} alt="" /></div>


                </div>
                <button className="flex mx-auto px-32 text-lg font-bold py-5 rounded-full bg-[#F1F2F7] ">שליחת בקשה</button>


            </div>

        </div>
    );
};



const RegisterInput = ({ label, placeHolder, setState, state }) => {

    return (

        <div class=" w-1/2 h-16 relative flex px-5 py-2 bg-white text-gray-500 text-sm text-center rounded shadow-md">
            <label htmlFor="" className="absolute font-bold top-0">
                {label || "ffff"}
            </label>
            <input className="text-lg outline-none" type="text"
                placeholder={placeHolder || `הכניסו  ${label}`}
                onChange={(e) => setState(e.target.value, label)}
                defaultValue={state && state[label] || ""}
            />
        </div>

    )
}

export default RegisterPage;
