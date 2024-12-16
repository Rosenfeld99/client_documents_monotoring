import React, { useEffect, useMemo, useState } from 'react';
import TemplatePage from '../utils/TemplatePage';
import CustomSelect from '../utils/CustomSelect';
import { useSearchParams } from 'react-router-dom';
import TableFilters from '../components/table/TableFilters';
import Table from '../components/table/Table';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useReports from '../hooks/useReport';
import useUsers from '../hooks/useUsers';
import { BiEdit } from 'react-icons/bi';
import { IoCloseCircleOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { decodeFormatDate } from '../utils/funcs/decodeDate';
import ReportModal from '../utils/reportModal/ReportModal';

const IssueHistoryPage = () => {
    const { getReportsByConditions, handleCloseReport, handleDeleteReport, historyReports, columns, setColumns, filteredData, setFilteredData, columnVisibility, setColumnVisibility, loading, setLoading } = useReports()
    const [searchParams] = useSearchParams();
    const [openManageColumns, setOpenManageColumns] = useState(false)
    const [pagenations, setPagenations] = useState({ prev: 0, curr: 1, next: 2 })
    const { currentUser } = useUsers()
    const [openModal, setOpenModal] = useState(false);
    const [reportModalData, setReportModalData] = useState({});
    console.log(columnVisibility);


    useEffect(() => {
        if (currentUser?.userId) {
            const getReportObj = {
                limitResultsIndex: 14,// -1 is get all reports 
                indexToSkip: pagenations.prev * 14,
                // "dates": {
                //     "fromDate": "2024-11-07T14:56:23.456+00:00",
                //     "toDate": "2024-11-27T14:56:23.456+00:00"
                // },
                statusReport: "close",
                userId: currentUser?.userId,
                spaceWorkName: searchParams.get('sw'),
                subSpaceWorkName: searchParams.get('subSW'),
                roomName: searchParams.get('room'),
            }
            getReportsByConditions(getReportObj)
        }


    }, [currentUser, pagenations])



    const accessOption = [{ name: "מדגם", value: "מדגם" }, { name: "מחלקה", value: "מחלקה" },];

    const str = `${searchParams.get('sw')} / ${searchParams.get('subSW')} / ${searchParams.get('room')}`;


    const [filters, setFilters] = useState();

    useMemo(() => {
        if (historyReports?.data?.length > 0 && filters) {
            const temp = () => {
                return historyReports?.data?.filter((row) =>
                    Object?.entries(filters)?.every(([key, value]) =>
                        row[key]?.toString()?.toLowerCase()?.includes(value?.toLowerCase())
                    )
                );
            }
            setFilteredData(temp())
        }
    }, [filters]);

    const toggleColumn = (key) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    console.log(filters);

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
    console.log(currentUser);

    const handleDeleteReportClick = (currReport) => {
        console.log(currReport);
        const result = confirm("היי! זהירות, פעולה זו תמחק את התקלה. להמשיך?")
        if (!result) {
            return
        }
        const reqBody = {
            userId: currentUser?.userId,
            MongoReportId: currReport?._id,
            dateRequst: decodeFormatDate(currReport?.["זמן פתיחת תקלה"]),
            spaceWorkName: searchParams.get('sw'),
            subSpaceWorkName: searchParams.get('subSW'),
            roomName: searchParams.get('room'),
            reportStatus: currReport["סטאטוס תקלה"]
        }


        handleDeleteReport(reqBody)
    }

    const handleViewReportClick = (currReport) => {
        console.log(currReport);
        setReportModalData({ currReport, mode: "watch" })
        setOpenModal(true)
    }


    const handleEditReportClick = (currReport) => {
        setReportModalData({ currReport, mode: "edit" })
        setOpenModal(true)
    }

    const HoverComps = (currReport) => {

        return (<div className=" hidden items-center gap-3 w-full h-full bg-border  text-text group-hover:flex duration-150 transition ease-in-out text-xl px-10 absolute top-0 right-0">
            <button onClick={() => handleEditReportClick(currReport)} className=' flex items-center text-lg h-7 gap-2 justify-end border-2 rounded-lg px-2 hover:scale-105 duration-150 hover:text-primary hover:border-pritext-primary'>
                <BiEdit />
                <span >עריכת תקלה</span>
            </button>|
            <button onClick={() => handleViewReportClick(currReport)} className=' flex items-center  text-lg h-7 gap-2 justify-end border-2 rounded-lg px-2 hover:scale-105 duration-150 hover:text-info hover:border-info '>
                <IoDocumentTextOutline />
                <span >צפייה בתקלה</span>
            </button>|
            <button onClick={() => handleDeleteReportClick(currReport)} className=' flex items-center  text-lg h-7 gap-2 justify-end border-2 rounded-lg px-2 hover:scale-105 duration-150 hover:text-error hover:border-errtext-error '>
                <IoCloseCircleOutline className='text-2xl' />
                <span >מחיקת תקלה</span>
            </button>

        </div>)
    }

    return (
        <>

            {openModal && <ReportModal currReport={reportModalData?.currReport} mode={reportModalData?.mode} setOpenModal={setOpenModal} />}

            <TemplatePage
                showHeader={true}
                showNav={true}
                showSidebar={true}
                titleHeader={"היסטוריית תקלות"}
                navRight={<CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." keyToUpdate={"accessOption"} />}
                navLeft={str}
            >
                <section className="w-[85vw] p-10 flex flex-col gap-3 flex-1">
                    <TableFilters openManageColumns={openManageColumns} setOpenManageColumns={setOpenManageColumns} columnVisibility={columnVisibility} columns={columns} handleFilterChange={handleFilterChange} toggleColumn={toggleColumn} filters={filters} />
                    <div className="w-full overflow-x-auto ml-[240px]">

                        {loading ? <div>Loading...</div> :
                            <Table HoverComps={HoverComps} setOpenManageColumns={setOpenManageColumns} filters={filters} toggleColumn={toggleColumn} columnVisibility={columnVisibility} columns={columns} setColumns={setColumns} filteredData={filteredData} handleFilterChange={handleFilterChange} setFilteredData={setFilteredData} />
                        }
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
        </>
    );
};

export default IssueHistoryPage;
