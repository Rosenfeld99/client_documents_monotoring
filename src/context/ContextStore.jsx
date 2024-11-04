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
    const [inputs, setInputs] = useState([{
        label: "דחיפות",       // Default value for 'input1.label'
        placeholder: "רמת דחיפות התקלה", // Default value for 'input1.placeholder'
        type: "select",        // Default value for 'input1.type'
        options: ["1-גבוהה", "2-בינונית", "3-נמוכה"],   // Default value for 'options' array
        require: false, // Default value for 'require'
        disable: false
    }

    ])


    // const [showToast, setShowToast] = useState(false)
    // const [toast, setToast] = useState({ title: "", message: "", type: "", time: 0 });

    const contextValue = {
        options, setOptions,
        singleOptoin, setSingleOption,
        inputs, setInputs, currentUser, setCurrentUser
    }




    return (
        <ContextStore.Provider value={contextValue}>
            {children}
        </ContextStore.Provider>
    )
}