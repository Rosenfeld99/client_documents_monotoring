import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { ContextStore } from '../context/contextStore'
import { notify } from '../utils/Tastify/notify'

function useUsers() {


    const { currentUser, setCurrentUser, columns, setColumns, filteredData, historyReports, setFilteredData, } = useContext(ContextStore)
    const [loading, setLoading] = useState(false)

    const getUser = async (userId) => {
        try {
            const user = await axios.get(`http://localhost:3001/users/getUser/${userId}`)
            // console.log(user?.data?.user);
            setCurrentUser(user?.data?.user)

        } catch (error) {
            console.log(error);
        }
    }

    const getAllUsers = async ({ adminId, spaceWorkName, subSpaceWorkName, roomName }, setColumnVisibility) => {
        setLoading(true)
        try {
            const users = await axios.get(`http://localhost:3001/users/getAllUsersInSpaceWork/${adminId}/${spaceWorkName}/${subSpaceWorkName}/${roomName}`)

            console.log(users?.data);
            setColumns(() => users?.data?.columnsList)
            setFilteredData((prev) => {

                const a = users?.data?.formattedUsers
                return a
            })
            setColumnVisibility(users?.data?.columnsList?.reduce((acc, column) => ({ ...acc, [column?.key]: true }), {}))

            console.log(filteredData, columns);

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }
    const createUser = async (userObj) => {
        console.log(userObj);

        try {
            const user = await axios.post(`http://localhost:3001/users/createUser`, {
                userToCreate: userObj.userToCreate, adminId: userObj.adminId
            })
            console.log(user);
            notify("SUCCESS", "המשתמש נוצר  בהצלחה")


        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה ביצירת המשתמש")

        }
    }

    return (
        { getUser, currentUser, createUser, getAllUsers, loading, historyReports, columns, setColumns, filteredData, setFilteredData }
    )
}

export default useUsers