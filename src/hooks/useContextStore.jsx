import React, { useContext, useEffect } from 'react'
import { ContextStore } from '../context/contextStore'
import { useSearchParams } from 'react-router-dom'

const useContextStore = () => {
  const [searchParams] = useSearchParams()
  const { currentUser } = useContext(ContextStore)

  const { options, setOptions, singleOptoin, setSingleOption } = useContext(ContextStore)


  const handleGetSingleOption = (value) => {
    // currentUser.subSpaceWorks:is object with key and value of subSP
    // get the single subSpaceWork object

    const mapObj = currentUser?.subSpaceWorks[value]
    // check if the single optin doesn't exist if not get the keys
    console.log(currentUser?.subSpaceWorks, value);

    const allKeys = mapObj ? Object.keys(currentUser?.subSpaceWorks[value]) : []
    setSingleOption(allKeys)
  }



  return { options, setOptions, singleOptoin, setSingleOption, handleGetSingleOption }
}

export default useContextStore