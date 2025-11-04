import React from 'react'
import Navbar from './components/Home/Navbar'
import MainContainer from './commen/MainContainer'
import AllRouter from './pages/router/AllRouter'
import NavbarSecond from './components/Navbar/NavSecond'
export default function HomePage() {
  return (
    <div className='flex h-[100vh] w-full'>
        <div className='basis-[20%] h-full w-full'>
            <Navbar/>
        </div>
        <div className='basis-[80%] h-full w-full overflow-y-scroll'>
          <NavbarSecond/>
          <MainContainer/>
        </div>
    </div>
  )
}
