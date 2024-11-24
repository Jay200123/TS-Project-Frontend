import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../components'
export default function () {
  return (
    <>
      <main className='flex flex-col items-center justify-between min-h-screen min-w-screen'>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}
