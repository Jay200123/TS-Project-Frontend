import { Outlet } from 'react-router-dom'
import { Footer, EmployeeNavbar } from '../components'
export default function () {
  return (
    <>
      <main className='min-h-screen min-w-screen flex flex-col items-center justify-between'>
        <EmployeeNavbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}