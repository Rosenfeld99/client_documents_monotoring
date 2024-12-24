import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ContextStoreProvider } from './context/contextStore'
import { ThemeProvider } from './context/ThemeProvider.jsx'



createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <BrowserRouter>
      {/* tostify handler */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ContextStoreProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ContextStoreProvider>
    </BrowserRouter>
  </React.Fragment>,
)
