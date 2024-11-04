import React, { useMemo, useState } from 'react';
import TemplatePage from '../utils/TemplatePage';
import CustomSelect from '../utils/CustomSelect';
import { useSearchParams } from 'react-router-dom';
import { columnsList, data } from '../constant/DB.demo';
import TableFilters from '../components/table/TableFilters';
import Table from '../components/table/Table';

const IssueHistoryPage = () => {
    const [searchParams] = useSearchParams();
    const [filteredData, setFilteredData] = useState(data);
    const [columns, setColumns] = useState(columnsList);
    const [openManageColumns, setOpenManageColumns] = useState(false)


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



    return (
        <TemplatePage
            showHeader={true}
            showNav={true}
            showSidebar={true}
            titleHeader={"היסטורית תקלות"}
            navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
            navLeft={str}
        >
            <section className="p-10 flex-1 space-y-6 lg:w-[80%] xl:w-[83%] 2xl:w-full 2xl:max-w-[93%]">
                <TableFilters openManageColumns={openManageColumns} setOpenManageColumns={setOpenManageColumns} columnVisibility={columnVisibility} columns={columns} handleFilterChange={handleFilterChange} toggleColumn={toggleColumn} filters={filters} />

                <div className="overflow-x-auto">
                    <Table setOpenManageColumns={setOpenManageColumns} filters={filters} toggleColumn={toggleColumn} columnVisibility={columnVisibility} columns={columns} setColumns={setColumns} filteredData={filteredData} handleFilterChange={handleFilterChange} setFilteredData={setFilteredData} />
                </div>
            </section>
        </TemplatePage>
    );
};

export default IssueHistoryPage;
