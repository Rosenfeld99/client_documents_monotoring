import React from 'react'
import useContextStore from './useContextStore'
import { io } from 'socket.io-client'
import { useSearchParams } from 'react-router-dom'

function useSocket() {
    const [searchParams] = useSearchParams()

    const { setSocketIo, socketIo } = useContextStore()
    const spaceWork = searchParams.get("sw");
    const subSpaceWork = searchParams.get("subSW");
    const room = searchParams.get("room");


    const changeRoom = (newSpaceWork, newSubSpaceWork, newRoom, page) => {

        socketIo && socketIo?.emit("changeRoom", {
            newSpaceWork, newSubSpaceWork, newRoom, page
        });
    }

    const createInputSocket = (newInputsArray) => {
        socketIo && socketIo?.emit("create_input", {
            spaceWork, subSpaceWork, room, newInputsArray
        });
    }
    const deleteInputSocket = (inputsArray) => {
        socketIo && socketIo?.emit("delete_input", {
            spaceWork, subSpaceWork, room, inputsArray
        });
    }
    const updateInputSocket = (updateInputsArray) => {
        socketIo && socketIo?.emit("update_input", {
            spaceWork, subSpaceWork, room, updateInputsArray
        });
    }
    const createReportSocket = (newReport) => {
        socketIo && socketIo?.emit("create_report", {
            spaceWork, subSpaceWork, room, newReport
        });
    }
    const finishReportSocket = (closedReport) => {
        socketIo && socketIo?.emit("finish_report", {
            spaceWork, subSpaceWork, room, closedReport
        });
    }
    const deleteReportSocket = (deletedReport) => {
        socketIo && socketIo?.emit("delete_report", {
            spaceWork, subSpaceWork, room, deletedReport
        });
    }
    const updateReportSocket = (updateReport) => {
        socketIo && socketIo?.emit("update_report", {
            spaceWork, subSpaceWork, room, updateReport
        });
    }



    return { changeRoom, createInputSocket, updateReportSocket, deleteInputSocket, deleteReportSocket, finishReportSocket, updateInputSocket, createReportSocket }
}

export default useSocket