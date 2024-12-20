import React, { useEffect, useMemo, useState } from 'react'
import TemplatePage from '../utils/TemplatePage'
import CustomSelect from '../utils/CustomSelect'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import TableFilters from '../components/table/TableFilters'
import Table from '../components/table/Table'
import { soldiersData } from '../constant/USERS.demo'
import useUsers from '../hooks/useUsers'
import { BiEdit } from 'react-icons/bi'

const UserManagementPage = () => {
    const { getAllUsers, loading, searchUsers, handleSearchUsers, columns, setColumns, historyReports, filteredData, setFilteredData } = useUsers()
    const [searchParams] = useSearchParams()
    // const [filteredData, setFilteredData] = useState(soldiersData);
    // const [columns, setColumns] = useState(columnsList);
    const [openManageColumns, setOpenManageColumns] = useState(false)
    const [pagenations, setPagenations] = useState({ prev: 0, curr: 1, next: 2 })
    const { currentUser } = useUsers()
    const navigation = useNavigate()
    const [filters, setFilters] = useState({});

    const [columnVisibility, setColumnVisibility] = useState({});
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(filters).length === 0) { // Correct check for empty object
            setSearchLoading(false)

            if (currentUser?.userId) {

                getAllUsers(
                    {
                        spaceWorkName: searchParams.get('sw'),
                        subSpaceWorkName: searchParams.get('subSW'),
                        roomName: searchParams.get('room'),
                        adminId: currentUser?.userId,
                    }, setColumnVisibility

                )
            }

        } else {
            // if filters is not empty so return the search 
            setSearchLoading(true)
            const handler = setTimeout(() => {
                const convertFilters = Object.entries(filters).map(([key, value]) => ({
                    name: key,
                    value,
                }));

                handleSearchUsers({
                    limitResultsIndex: 14, // -1 is get all reports
                    indexToSkip: pagenations.prev * 14,
                    arrayOfConditions: convertFilters,
                    adminId: currentUser?.userId,
                    spaceWorkName: searchParams.get('sw'),
                    subSpaceWorkName: searchParams.get('subSW'),
                    roomName: searchParams.get('room'), setSearchLoading
                });

            }, 800);

            return () => {
                clearTimeout(handler);
            };
        }
    }, [currentUser, pagenations, filters]);


    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`


    // useMemo(() => {
    //     const temp = () => {
    //         return filteredData?.filter((row) =>
    //             Object.entries(filters).every(([key, value]) =>
    //                 row[key]?.toLowerCase().includes(value.toLowerCase())
    //             )
    //         );
    //     }
    //     setFilteredData(temp())
    // }, [filters,]);

    const toggleColumn = (key) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => {
            const updatedFilters = { ...prev };

            if (value) {
                // Update the key if the value is not empty
                updatedFilters[key] = value;
            } else {
                // Delete the key if the value is empty
                delete updatedFilters[key];
            }

            return updatedFilters;
        });
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

    const HoverComps = (currUser) => {
        return (
            <div className=" hidden items-center gap-3 w-full h-full bg-border  text-text group-hover:flex duration-150 transition ease-in-out text-xl px-10 absolute top-0 right-0">
                <Link state={currUser} to={`/user-management/:id?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room')}`}>
                    <button className=' flex items-center text-lg h-7 gap-2 justify-end border-2 rounded-lg px-2 hover:scale-105 duration-150 hover:text-primary hover:border-pritext-primary'>
                        <BiEdit />
                        <span >ניהול הרשאות</span>
                    </button>
                </Link>
            </div>
        )
    }
    const resetFilters = () => {
        setFilters({})
    }


    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={<div className=' flex items-center justify-between'>
                <span>ניהול משתמשים</span>
                <button onClick={() => { navigation(`/register-user?sw=${searchParams.get('sw')}&subSW=${searchParams.get('subSW')}&room=${searchParams.get('room')}`) }} className={`px-3 cursor-pointer py-1 border-2 text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center text-sm hover:scale-110 duration-150 text-accent bg-primary`}>הוספת משתמש</button>
            </div>}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className="p-10 w-[85vw] flex flex-col gap-3 flex-1">

                <TableFilters resetFilters={resetFilters} openManageColumns={openManageColumns} setOpenManageColumns={setOpenManageColumns} columnVisibility={columnVisibility} columns={columns} handleFilterChange={handleFilterChange} toggleColumn={toggleColumn} filters={filters} />
                <div className=" w-full overflow-x-auto ml-[240px]">
                    {loading ? <div>Loading...</div> :
                        columns[0] && <Table HoverComps={HoverComps} setOpenManageColumns={setOpenManageColumns} filters={filters} toggleColumn={toggleColumn} columnVisibility={columnVisibility} columns={columns} setColumns={setColumns} filteredData={filteredData} handleFilterChange={handleFilterChange} setFilteredData={setFilteredData} />
                    }

                    {/* <StepContainer steps={steps} handleNext={handleNext} /> */}
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