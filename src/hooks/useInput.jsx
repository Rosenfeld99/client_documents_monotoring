import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import useContextStore from './useContextStore'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { notify } from '../utils/Tastify/notify'

function useInput() {
    const [searchParams] = useSearchParams()

    const { inputs, setInputs, currentUser, setCurrentUser } = useContext(ContextStore)

    const createInput = async ({ spaceWorkName,
        adminId,
        subSpaceWorkName,
        roomName, input }) => {

        try {
            const newInput = await axios.post("http://localhost:3001/spaceWork/addInput", {
                spaceWorkName,
                adminId,
                subSpaceWorkName,
                roomName,
                input
            })
            // console.log(newInput);
            notify("SUCCESS", "שדה נוצר  בהצלחה")

        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה ביצירת השדה")


        }

    }
    const deleteInput = async ({ spaceWorkName,
        adminId,
        subSpaceWorkName,
        roomName, inputId }) => {
        try {
            const deletedInput = await axios.post("http://localhost:3001/spaceWork/deleteInput", {
                spaceWorkName,
                adminId,
                subSpaceWorkName,
                roomName,
                inputId
            })
            // console.log(deletedInput);
            notify("SUCCESS", "שדה נמחק בהצלחה")

        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה במחיקת השדה")


        }

    }
    const updateInputFields = async ({ spaceWorkName,
        adminId,
        subSpaceWorkName,
        roomName, inputId, editInput }) => {
        try {
            const result = await axios.put("http://localhost:3001/spaceWork/updateInput", {
                spaceWorkName,
                adminId,
                subSpaceWorkName,
                roomName,
                inputId,
                editInput
            })
            notify("SUCCESS", "השדה עודכן בהצלחה")


        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה בעדכון השדה")


        }

    }

    return { createInput, deleteInput, updateInputFields };
}

export default useInput