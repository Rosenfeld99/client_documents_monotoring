import React, { useContext, useEffect } from 'react'
import { ContextStore } from '../context/contextStore'
import { useSearchParams } from 'react-router-dom'

const useContextStore = () => {

  const { options, setOptions, singleOptoin, allUserRooms, setAllUserRooms, setSingleOption, currentUser, historyReports, setHistoryReports, socketConnection, countRoomReports, setCountRoomReports } = useContext(ContextStore)


  const handleGetSingleOption = (value) => {
    // currentUser.subSpaceWorks:is object with key and value of subSP
    // get the single subSpaceWork object

    const mapObj = currentUser?.subSpaceWorks[value]
    // check if the single optin doesn't exist if not get the keys

    const allKeys = mapObj ? Object.keys(currentUser?.subSpaceWorks[value]) : []
    setSingleOption(allKeys)
  }



  return { options, setOptions, singleOptoin, setSingleOption, allUserRooms, setAllUserRooms, handleGetSingleOption, historyReports, setHistoryReports, countRoomReports, socketConnection, setCountRoomReports }
}

export default useContextStore