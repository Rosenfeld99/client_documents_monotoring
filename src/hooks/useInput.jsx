import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import useContextStore from './useContextStore'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'

function useInput() {
    const [searchParams] = useSearchParams()
    const { handleGetSingleOption, setSingleOption } = useContextStore()

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

        } catch (error) {
            console.log(error);

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

        } catch (error) {
            console.log(error);

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
            console.log(result);

        } catch (error) {
            console.log(error);

        }

    }

    return { createInput, deleteInput, updateInputFields };
}

export default useInput