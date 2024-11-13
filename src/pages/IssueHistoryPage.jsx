import React, { useEffect, useMemo, useState } from 'react';
import TemplatePage from '../utils/TemplatePage';
import CustomSelect from '../utils/CustomSelect';
import { useSearchParams } from 'react-router-dom';
import { columnsList, data } from '../constant/DB.demo';
import TableFilters from '../components/table/TableFilters';
import Table from '../components/table/Table';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useReports from '../hooks/useReport';

const IssueHistoryPage = () => {
    const { historyReports,getReports } = useReports()
    const [searchParams] = useSearchParams();
    const [filteredData, setFilteredData] = useState(data);
    const [columns, setColumns] = useState(columnsList);
    const [openManageColumns, setOpenManageColumns] = useState(false)
    const [pagenations, setPagenations] = useState({ prev: 0, curr: 1, next: 2 })

    useEffect(() => {
        getReports(
            {
                "spaceWorkName": "מקשאפ",
                "subSpaceWorkName": "תומר",
                "roomName": "///",
                "indexToSkip": 0,
                "dates": {
                    "fromOpenDate": "2024-11-07T14:56:23.456+00:00",
                    "toOpenDate": "2024-11-09T14:56:23.456+00:00"
                }

            }
        )
    }, [])

    const accessOption = [{ name: "מדגם", value: "מדגם" }, { name: "מחלקה", value: "מחלקה" },];

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`;

    const [columnVisibility, setColumnVisibility] = useState(
        columns.reduce((acc, column) => ({ ...acc, [column.key]: true }), {})
    );
    const [filters, setFilters] = useState({});

    useMemo(() => {
        const temp = () => {
            return data.filter((row) =>
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
            titleHeader={"היסטורית תקלות"}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className="p-10 flex flex-col gap-3 flex-1 lg:w-[80%] xl:w-[83%] 2xl:w-full 2xl:max-w-[93%]">
                <TableFilters openManageColumns={openManageColumns} setOpenManageColumns={setOpenManageColumns} columnVisibility={columnVisibility} columns={columns} handleFilterChange={handleFilterChange} toggleColumn={toggleColumn} filters={filters} />
                <div className="overflow-x-auto">
                    <Table setOpenManageColumns={setOpenManageColumns} filters={filters} toggleColumn={toggleColumn} columnVisibility={columnVisibility} columns={columns} setColumns={setColumns} filteredData={filteredData} handleFilterChange={handleFilterChange} setFilteredData={setFilteredData} />
                </div>
                {/* paggintions */}
                <div className=" flex flex-row-reverse w-full justify-center items-center gap-3">
                    {pagenations.prev > 0 && <button onClick={() => handleClickOnPage("LEFT")} className="px-3 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center items-center gap-1 hover:scale-110 duration-150">
                        {pagenations.prev}
                        <MdKeyboardArrowLeft className=' text-2xl' />
                    </button>}
                    <span className=' select-none px-2 underline text-text'>
                        {pagenations.curr}
                    </span>
                    {pagenations.next <= (Math.ceil(100 / 15)) && <button onClick={() => handleClickOnPage("RIGHT")} className="px-3 py-1 bg-accent border-2 text-primary text-md font-semibold border-border shadow-md rounded-lg flex justify-center gap-1 items-center hover:scale-110 duration-150">
                        <MdKeyboardArrowRight className=' text-2xl' />
                        {pagenations.next}
                    </button>}
                </div>
            </section>
        </TemplatePage>
    );
};

export default IssueHistoryPage;
