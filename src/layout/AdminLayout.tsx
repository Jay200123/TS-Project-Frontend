import { Outlet } from 'react-router-dom'
import { Footer, AdminNavbar } from '../components'
export default function () {
  return (
    <>
      <main className='flex flex-col items-center justify-between min-w-full min-h-screen'>
        <AdminNavbar />
        <div className='p-4 bg-transparent rounded-lg w-full sm:p-6 lg:p-8 max-w-full max-h-full md:w-[95%] lg:w-[1250px] xl:w-[80%]'>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}
