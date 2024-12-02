import { Outlet } from 'react-router-dom';
import { Footer, TechnicianNavbar } from '../components';

export default function () {
  return (
    <>
      <main className='flex flex-col items-center justify-between min-h-screen min-w-screen'>
        <TechnicianNavbar />
        <div className='w-full h-full'>
        <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}
