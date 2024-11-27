import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
export default function () {
  return (
    <>
      <main className='flex flex-col items-center justify-between min-h-screen min-w-screen'>
        <Navbar />
        <div className='max-w-full max-h-full'>
        <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}
