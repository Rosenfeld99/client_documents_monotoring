import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import useContextStore from './useContextStore'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { notify } from '../utils/Tastify/notify'
import useSocket from './useSocket'

function useInput() {
    const [searchParams] = useSearchParams()
    const { createInputSocket, deleteInputSocket, updateInputSocket } = useSocket()

    const { inputs } = useContext(ContextStore)

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
            createInputSocket([...inputs, input])
            notify("SUCCESS", "שדה נוצר  בהצלחה")

        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה ביצירת השדה")


        }

    }
    const deleteInput = async ({ spaceWorkName,
        adminId,
        subSpaceWorkName,
        roomName, inputId, updateInputsArray }) => {
        try {


            const deletedInput = await axios.post("http://localhost:3001/spaceWork/deleteInput", {
                spaceWorkName,
                adminId,
                subSpaceWorkName,
                roomName,
                inputId
            })

            deleteInputSocket(updateInputsArray)
            notify("SUCCESS", "שדה נמחק בהצלחה")

        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה במחיקת השדה")


        }

    }
    const updateInputFields = async ({ spaceWorkName,
        adminId,
        subSpaceWorkName,
        roomName, inputId, editInput, newArray }) => {
        try {
            const result = await axios.put("http://localhost:3001/spaceWork/updateInput", {
                spaceWorkName,
                adminId,
                subSpaceWorkName,
                roomName,
                inputId,
                editInput
            })
            updateInputSocket(newArray)
            notify("SUCCESS", "השדה עודכן בהצלחה")


        } catch (error) {
            console.log(error);
            notify("ERROR", "בעיה בעדכון השדה")


        }

    }

    return { createInput, deleteInput, updateInputFields };
}

export default useInput