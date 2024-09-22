import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import "./App.css"
import { ContextStoreProvider } from './context/contextStore'

const App = () => {
  return (
    <ContextStoreProvider>
      <AppRoutes />
    </ContextStoreProvider>
  )
}

export default App