import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <>
        <NavBar />
      </>
      <main className='scrollbar-hidden bg-white'>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout