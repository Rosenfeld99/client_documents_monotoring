import React, { useEffect, useMemo, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { useSearchParams } from 'react-router-dom'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import TableFilters from '../components/table/TableFilters'
import Table from '../components/table/Table'
import { columnsList, soldiersData } from '../constant/USERS.demo'
import useUsers from '../hooks/useUsers'
import useReports from '../hooks/useReport'
import { GoIssueClosed } from 'react-icons/go'
import { BiEdit } from 'react-icons/bi'

const UserManagementPage = () => {
    const { getReportsByConditions, historyReports } = useReports()
    const [searchParams] = useSearchParams()
    const [filteredData, setFilteredData] = useState(soldiersData);
    const [columns, setColumns] = useState(columnsList);
    const [openManageColumns, setOpenManageColumns] = useState(false)
    const [pagenations, setPagenations] = useState({ prev: 0, curr: 1, next: 2 })
    const { currentUser } = useUsers()

    useEffect(() => {
        getReportsByConditions(
            {
                "spaceWorkName": searchParams.get('sw'),
                "subSpaceWorkName": searchParams.get('subSW'),
                "roomName": searchParams.get('room'),
                "indexToSkip": 0,
                limitResultsIndex: 15,// -1 is get all reports 
                "dates": {
                    "fromDate": "2024-11-07T14:56:23.456+00:00",
                    "toDate": "2024-11-16T14:56:23.456+00:00"
                },
                statusReport: "open",
                userId: currentUser?.userId,
            }
        )
        console.log(historyReports);

    }, [currentUser])
    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`
    const [columnVisibility, setColumnVisibility] = useState(
        columns.reduce((acc, column) => ({ ...acc, [column.key]: true }), {})
    );
    const [filters, setFilters] = useState({});

    useMemo(() => {
        const temp = () => {
            return soldiersData.filter((row) =>
                Object.entries(filters).every(([key, value]) =>
                    row[key]?.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
        setFilteredData(temp())
    }, [filters]);

    const toggleColumn = (key) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };


    const handleClickOnPage = (arrowType) => {

        switch (arrowType) {
            case "RIGHT":
                setPagenations({ ...pagenations, prev: pagenations.curr, curr: pagenations.next, next: pagenations.next + 1 })
                break;
            case "LEFT":
                setPagenations({ ...pagenations, prev: pagenations.prev - 1, curr: pagenations.prev, next: pagenations.curr })
                break;
            default:
                console.log("Not flag sending");
                break;
        }
    }

    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"ניהול משתמשים"}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className="p-10 flex flex-col gap-3 flex-1 ">
                <TableFilters openManageColumns={openManageColumns} setOpenManageColumns={setOpenManageColumns} columnVisibility={columnVisibility} columns={columns} handleFilterChange={handleFilterChange} toggleColumn={toggleColumn} filters={filters} />
                <div className="overflow-x-auto w-full ml-[240px]">
                    <Table HoverComps={<div className=" hidden items-center gap-3 w-full h-full bg-border  text-text group-hover:flex duration-150 transition ease-in-out text-xl px-10 absolute top-0 right-0">
                        <button className=' flex items-center text-lg h-7 gap-2 justify-end border-2 rounded-lg px-2 hover:scale-105 duration-150 hover:text-primary hover:border-pritext-primary'>
                            <BiEdit />
                            <span >ניהול הרשאות</span>
                        </button>
                    </div>
                    } setOpenManageColumns={setOpenManageColumns} filters={filters} toggleColumn={toggleColumn} columnVisibility={columnVisibility} columns={columns} setColumns={setColumns} filteredData={filteredData} handleFilterChange={handleFilterChange} setFilteredData={setFilteredData} />
                </div>
                {/* paggintions */}
                <div className=" flex flex-row-reverse w-full justify-center items-center gap-3 fixed bottom-0 p-3 pl-[330px] backdrop-blur-sm">
                    {pagenations.prev > 0 &&
                        <button onClick={() => handleClickOnPage("LEFT")} className="px-3 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center gap-1 hover:scale-110 duration-150">
                            {pagenations.prev}
                            <MdKeyboardArrowLeft className=' text-2xl' />
                        </button>}
                    <span className=' select-none px-2 underline text-text'>
                        {pagenations.curr}
                    </span>
                    {pagenations.next <= (Math.ceil(historyReports?.totalCount / 15)) && <button onClick={() => handleClickOnPage("RIGHT")} className="px-3 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center gap-1 items-center hover:scale-110 duration-150">
                        <MdKeyboardArrowRight className=' text-2xl' />
                        {pagenations.next}
                    </button>}
                </div>
            </section>
        </TemplatePage>
    )
}

export default UserManagementPage