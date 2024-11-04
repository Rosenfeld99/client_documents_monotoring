import React, { useContext, useEffect } from 'react'
import { ContextStore } from '../context/contextStore'
import { useSearchParams } from 'react-router-dom'

const useContextStore = () => {
  const [searchParams] = useSearchParams()
  const { currentUser } = useContext(ContextStore)

  const { options, setOptions, singleOptoin, setSingleOption } = useContext(ContextStore)


  // const handleGetSingleOption = (value) => {
  //   setSingleOption(currentUser?.subSpaceWorks[value || null])
  // }

  const handleGetSingleOption = (value) => {
    setSingleOption(options?.find((item) => item?.name == value))
  }


  return { options, setOptions, singleOptoin, setSingleOption, handleGetSingleOption }
}

export default useContextStore