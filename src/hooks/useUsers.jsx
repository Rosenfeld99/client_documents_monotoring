import React, { useContext, useEffect } from 'react'
import axios from "axios"
import { ContextStore } from '../context/contextStore'

function useUsers() {

    const { currentUser, setCurrentUser } = useContext(ContextStore)
    const getUser = async (userId) => {
        try {
            const user = await axios.get(`http://localhost:3001/users/getUser/${userId}`)
            // console.log(user?.data?.user);
            setCurrentUser(user?.data?.user)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        { getUser, currentUser }
    )
}

export default useUsers