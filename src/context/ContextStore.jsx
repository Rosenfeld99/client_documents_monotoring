import React, { createContext, useEffect, useState } from 'react'
import useUsers from '../hooks/useUsers';
export const ContextStore = createContext()

export const ContextStoreProvider = ({ children }) => {
    const [options, setOptions] = useState([
        {
            name: "מקשאפ", id: "123456789",
            subSpaceWork: [
                {
                    name: "תומר",
                    lobbyOption: [
                        { name: "דסק תפעול" },
                        { name: "מנו”ר" },
                        { name: "תשתיות" },
                    ]
                },
                {
                    name: "יפים מאוד",
                    lobbyOption: [
                        { name: "יפים" },
                        { name: "מאוד" },
                    ]
                }
            ]
        },
        {
            name: "בהד 1", id: "987654567567",
            subSpaceWork: [
                {
                    name: "בהד X", lobbyOption: [
                        { name: "חמל" },
                        { name: "כוורת" },
                    ]
                },
                {
                    name: "בהד Z", lobbyOption: [
                        { name: "חמל" },
                        { name: "כוורת" },
                    ]
                },
                {
                    name: "בהד Y", lobbyOption: [
                        { name: "תשתיות" },
                    ]
                },
            ]
        },
        {
            name: "פקמ''ז", id: "987654567567",
            subSpaceWork: [
                {
                    name: "פקמ''ז X", lobbyOption: [
                        { name: "פקמ''ז חמל" },
                        { name: "פקמ''ז TT" },
                    ]
                },
                {
                    name: "פקמ''ז Y", lobbyOption: [
                        { name: "פקמ''ז תשתיות" },
                    ]
                },
            ]
        },
    ]);
    const [singleOptoin, setSingleOption] = useState(null)
    const [currentUser, setCurrentUser] = useState()
    const [inputs, setInputs] = useState([])
    const [historyReports, setHistoryReports] = useState([])

    // table issus
    const [filteredData, setFilteredData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState(
        columns?.reduce((acc, column) => ({ ...acc, [column.key]: true,_id:false }), {})
    );
    const [reportResponseRoom, setReportResponseRoom] = useState([])


    const contextValue = {
        options, setOptions,
        singleOptoin, setSingleOption,
        inputs, setInputs, currentUser, setCurrentUser,
        historyReports, setHistoryReports,
        filteredData, setFilteredData,
        columns, setColumns,
        columnVisibility, setColumnVisibility,
        reportResponseRoom, setReportResponseRoom
    }





    return (
        <ContextStore.Provider value={contextValue}>
            {children}
        </ContextStore.Provider>
    )
}