import React, { useContext, useEffect } from 'react'
import { ContextStore } from '../context/contextStore'
import { useSearchParams } from 'react-router-dom'

const useContextStore = () => {

  const { options, inputs, setInputs, newIdReport, setNewIdReport, setOptions, singleOptoin, allUserRooms, socketIo, setSocketIo, setAllUserRooms, setSingleOption, currentUser, historyReports, setHistoryReports, socketConnection, countRoomReports, setCountRoomReports } = useContext(ContextStore)


  const handleGetSingleOption = (value) => {
    // currentUser.subSpaceWorks:is object with key and value of subSP
    // get the single subSpaceWork object

    const mapObj = currentUser?.subSpaceWorks[value]
    // check if the single optin doesn't exist if not get the keys

    const allKeys = mapObj ? Object.keys(currentUser?.subSpaceWorks[value]) : []
    setSingleOption(allKeys)
  }



  return { options, setOptions, inputs, setInputs, singleOptoin, newIdReport, setNewIdReport, setSingleOption, socketIo, setSocketIo, allUserRooms, setAllUserRooms, handleGetSingleOption, historyReports, setHistoryReports, countRoomReports, socketConnection, currentUser, setCountRoomReports }
}

export default useContextStore