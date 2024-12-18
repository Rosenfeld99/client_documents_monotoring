import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import CustomModal from '../../utils/CustomModal'
import { TfiLayoutColumn3Alt } from 'react-icons/tfi'
import { dateFields } from '../../constant/translateObj'
import { FaArrowRotateLeft } from "react-icons/fa6";


const TableFilters = ({ resetFilters, openManageColumns, setOpenManageColumns, columns, columnVisibility, handleFilterChange, toggleColumn, filters }) => {
    const [openFilters, setOpenFilters] = useState(false)

    return (
        <div>

            <div className=" flex items-center gap-4">
                {/* Checkbox Section */}
                {/* Btn for open section */}
                <button className={` flex items-center gap-3 transform transition duration-300 ease-in-out ${openManageColumns ? "text-primary -translate-y-2 border-b-2" : "translate-y-0"}`} onClick={() => setOpenManageColumns(!openManageColumns)}>
                    <TfiLayoutColumn3Alt />
                    <span> ניהול עמודות</span>
                </button>
                {openManageColumns && <CustomModal doOnCilckOutside={() => setOpenManageColumns(false)}>
                    <div className={`fixed z-30 flex flex-col gap-4 left-5 top-20 bg-accent shadow-md shadow-[#00000034] border-[1px] border-border w-fit h-fit max-h-[700px] p-5`}>
                        {columns?.map((column) => (
                            <label onClick={() => toggleColumn(column.key)} key={column.key} className="flex select-none items-center gap-3 min-w-44 justify-between space-x-2 w-full">
                                {/* Toggle Switch */}
                                <span className="text-gray-700 font-medium">{column.label}</span>
                                <div
                                    className={`w-12 h-6 flex bg-border items-center bg-gray-300 rounded-full p-1 cursor-pointer transition duration-300 ease-in-out ${columnVisibility[column.key] ? "bg-blue-500" : ""
                                        }`}
                                >
                                    <div
                                        className={` w-5 h-5 rounded-full shadow-md transform transition duration-300 ease-in-out ${columnVisibility[column.key] ? "translate-x-0 bg-primary" : "-translate-x-5 bg-[#a4a5ac]"
                                            }`}
                                    ></div>
                                </div>
                            </label>
                        ))}
                    </div>
                </CustomModal>}

                <button className={` flex items-center gap-3 transform transition duration-300 ease-in-out ${openFilters ? "text-primary -translate-y-2 border-b-2" : "translate-y-0"}`} onClick={() => setOpenFilters(!openFilters)}>
                    <FaFilter />
                    <span>
                        סינונים
                    </span>
                </button>
                <button className={` flex items-center gap-3 transform transition duration-300 ease-in-out `} onClick={() => resetFilters()}>
                    <FaArrowRotateLeft />
                    <span>
                        איפוס סינונים
                    </span>
                </button>
                {openFilters && <CustomModal doOnCilckOutside={() => setOpenFilters(false)}>
                    {<div className="fixed z-30 flex flex-col gap-4 left-5 top-20 bg-accent shadow-md shadow-[#00000034] border-[1px] border-border w-fit h-fit max-h-[800px] overflow-auto p-5">
                        {columns?.map(
                            (column) =>
                                columnVisibility[column?.key] && (
                                    <div className='flex flex-col'>

                                        {dateFields[column?.label] && <label className='text-[#a5abb6]' htmlFor="">{column?.label}</label>}
                                        <input
                                            type={dateFields[column?.label] ? "date" : "text"}
                                            key={column?.key}
                                            placeholder={`חיפוש לפי ${column?.label}`}
                                            value={filters && filters[column?.key] && filters[column?.key] || ''}
                                            onChange={(e) => handleFilterChange(column?.key, e.target.value)}
                                            className="px-4 py-2 border border-border rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                )
                        )}
                    </div>}
                </CustomModal>}
            </div>
            {/* )} */}
        </div>
    )
}

export default TableFilters