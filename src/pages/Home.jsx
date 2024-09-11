import React from 'react'
import Sidebar from '../components/Sidebar'

const Home = () => {
    return (
        <div className=' flex '>
            <Sidebar />
            <main className=' bg-background w-[80%] max-h-screen'>
                content
            </main>
        </div>
    )
}

export default Home