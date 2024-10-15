import React, { createContext, useState } from 'react'
export const ContextStore = createContext()

export const ContextStoreProvider = ({ children }) => {
    const [options, setOptions] = useState([
        {
            name: "מקשא''פ", id: "123456789",
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
    const [inputs, setInputs] = useState([
        // {
        // label: { type: String, default: "" },       // Default value for 'input1.label'
        // placeHolder: { type: String, default: "" }, // Default value for 'input1.placeHolder'
        // type: { type: String, default: "" },        // Default value for 'input1.type'
        // options: { type: [String], default: [] },   // Default value for 'options' array
        // require: { type: Boolean, default: false }, // Default value for 'require'
        // disable: { type: Boolean, default: false }  // Default value for 'disable'
        // }

    ])


    // const [showToast, setShowToast] = useState(false)
    // const [toast, setToast] = useState({ title: "", message: "", type: "", time: 0 });

    const contextValue = {
        options, setOptions,
        singleOptoin, setSingleOption,
        inputs,setInputs
    }

    return (
        <ContextStore.Provider value={contextValue}>
            {children}
        </ContextStore.Provider>
    )
}