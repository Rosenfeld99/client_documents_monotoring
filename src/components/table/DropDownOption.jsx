import { BsFillEyeSlashFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaEyeSlash, FaFilter } from 'react-icons/fa'
import { LuArrowDownUp } from 'react-icons/lu'
import { TfiLayoutColumn3Alt } from 'react-icons/tfi'
import CustomModal from '../../utils/CustomModal'

const DropDownOption = ({ setOpenManageColumns, index, column, setCurrentColumn, currentColumn, showIconDots, toggleColumn, handleFilterChange, filteredData, showOptionSelect, setShowOptionSelect, setFilteredData, filters }) => {

    return (
        <div>
            {(showIconDots === index || currentColumn?.key === column.key) &&
                <button onClick={() => { currentColumn?.key ? setCurrentColumn({}) : setCurrentColumn(column) }} className="absolute active:bg-secondary bg-secondary border-[1px] border-border p-1.5 left-1 top-1 z-20 text-xl cursor-pointer active:duration-100 rounded-full">
                    <BsThreeDotsVertical />
                </button>
            }

            {currentColumn?.key === column.key && (
                <CustomModal
                    doOnCilckOutside={() => {
                        setCurrentColumn({});
                        setShowOptionSelect(false);
                    }}>
                    <div className="fixed mt-2 p-1 bg-accent shadow-md shadow-[#00000034] border-[1px] border-border">
                        <ul>
                            <li>
                                <button onClick={() => toggleColumn(currentColumn?.key)} className='flex items-center gap-2 hover:bg-border p-2 px-4 w-full'>
                                    <BsFillEyeSlashFill className='text-xl' /> <span>הסתר עמודה</span>
                                </button>
                            </li>
                            <li className='cursor-pointer relative'>
                                <button className={`flex items-center gap-3 hover:bg-border p-2 px-4 w-full transform transition duration-300 ease-in-out ${showOptionSelect ? "-translate-x-2 opacity-25" : "translate-x-0"}`} onClick={() => setShowOptionSelect(!showOptionSelect)}>
                                    <FaFilter /> <span>סינון</span>
                                </button>
                                {showOptionSelect && (<div >
                                    <div className=" bg-primary w-4 h-4 aspect-square absolute rotate-45 right-0 top-3" />
                                    <div className="fixed flex bg-accent shadow-md p-1 shadow-[#00000034] border-[1px] border-border -mr-[385px] -mt-10">
                                        <select className='mx-2 py-1 focus:outline-none w-44 focus:border-b-2 focus:border-b-primary' name="" id="" onChange={(e) => { handleFilterChange(column.key, e.target.value), setCurrentColumn({}) }}>
                                            <option value={''} selected disabled>סינון לפי {currentColumn.label}</option>
                                            {currentColumn.selectOption?.map((item) => (
                                                <option key={item.name} value={item?.name}>{item?.name}</option>
                                            ))}
                                        </select>
                                        <div className="border-r-border border-r-2" />
                                        <input
                                            key={column.key}
                                            placeholder={`חיפוש ${column.label}`}
                                            value={filters[column.key] || ''}
                                            onChange={(e) => handleFilterChange(column.key, e.target.value)}
                                            className="mx-2 p-1 focus:outline-none w-44 focus:border-b-2 placeholder:text-text focus:border-b-primary"
                                        />
                                    </div>
                                </div>
                                )}
                            </li>
                            <li>
                                <button onClick={() => {
                                    setFilteredData(filteredData.reverse()), setCurrentColumn({});
                                    setShowOptionSelect(false);
                                }} className='flex items-center gap-2 hover:bg-border p-2 px-4 w-full'>
                                    <LuArrowDownUp className='text-xl' /> <span>שינוי כיוון</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => { setOpenManageColumns(true), setCurrentColumn({}) }} className='flex items-center gap-3 hover:bg-border p-2 px-4 w-full'>
                                    <TfiLayoutColumn3Alt /> <span>ניהול עמודות</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </CustomModal>
            )}
        </div>
    )
}

export default DropDownOption