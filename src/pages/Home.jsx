import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Nav from '../components/Nav'

const Home = () => {
    const lobbyOption = [
        { name: "דסק תפעול" },
        { name: "דסק" },
        { name: "תפעול" },
        { name: "תפעול" },
        { name: "תפעול" },
        { name: "תפעול" },
        { name: "תפעול" },
        { name: "תפעול" },
        { name: "תפעול" },
        { name: "תפעול" },
        { name: "תפעול" },
        { name: "תפעול" },
    ]
    return (
        <div className=' flex '>
            <Sidebar />
            <main className=' bg-background w-[100%] max-h-screen mr-[250px]'>
                <Nav />
                <Header />
                <section className='mx-10 flex-1 grid grid-cols-3'>
                    {lobbyOption.map((item, i) => (
                        <div key={i} className={`" flex items-center justify-center h-80 " ${i !== lobbyOption?.length - 1 && "border-l-[1px]"} border-b-[1px] border-border`}>
                            <button className='p-4 px-5 xl:px-10 w-40 xl:w-56 bg-accent border-2 text-2xl font-semibold border-border shadow-md rounded-lg flex justify-center items-center'>{item.name}</button>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Home