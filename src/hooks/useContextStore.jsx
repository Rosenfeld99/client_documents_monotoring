import React, { useContext } from 'react'
import { ContextStore } from '../context/contextStore'

const useContextStore = () => {

    const {options,setOptions} = useContext(ContextStore)

  return {options,setOptions}
}

export default useContextStore