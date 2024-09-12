import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <div className=' flex '>
        <Sidebar />
        <main className=' bg-background w-[100%] max-h-screen'>
        <Navbar />
            <header className=' flex items-center justify-between py-10 px-10'>
                <div className="">title</div>
                <div className="">another section</div>
            </header>
        </main>
    </div>
    )
}

export default Home