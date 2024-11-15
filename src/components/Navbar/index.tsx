import { useState } from 'react';
import { useAuthenticationStore } from '../../state/store'; 

export default function () {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuthenticationStore() 
  return (
    <>
      <nav className='w-full h-14 items-center flex justify-between bg-gray-800 text-white'>
        <div className='m-2 p-2'>
          <h3 className='text-lg'>Navbar Project</h3>
        </div>

        <div className='md:hidden m-2 p-2' onClick={() => setIsOpen(!isOpen)}>
          <div className='space-y-1 cursor-pointer'>
            <span className='block w-6 h-0.5 bg-white'></span>
            <span className='block w-6 h-0.5 bg-white'></span>
            <span className='block w-6 h-0.5 bg-white'></span>
          </div>
        </div>

        <div className={`m-2 p-2 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className='flex flex-row md:flex-row items-start md:items-center justify-start'>
            <li className='p-2 text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'>
              Home
            </li>
            <li className='p-2 text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded  md:text-sm'>
              About
            </li>
            <li onClick={logout} className='p-2 text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'>
              Contact Us
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
