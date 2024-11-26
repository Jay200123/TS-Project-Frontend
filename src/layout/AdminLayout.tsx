import { Outlet } from 'react-router-dom'
import { Footer, AdminNavbar } from '../components'
export default function () {
  return (
    <>
      <main className='flex flex-col items-center justify-between min-w-full min-h-screen'>
        <AdminNavbar />
        <div className='max-w-full max-h-full'>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}
