import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import "./App.css"
import { ContextStoreProvider } from './context/contextStore'
import socketConnection from './context/socket'

const App = () => {
  return (
    <ContextStoreProvider>
      <AppRoutes />
    </ContextStoreProvider>
  )
}

export default App