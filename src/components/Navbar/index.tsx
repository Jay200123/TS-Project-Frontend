import { useState } from 'react'
import { useAuthenticationStore } from '../../state/store'  
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'  

export default function () {
  const navigate = useNavigate()
  const { logout, user } = useAuthenticationStore() 

  const [isOpen, setIsOpen] = useState(false)

  const login = () => {
    navigate('/login')
  }

  const home = () => {
    navigate('/')
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
      toast.success('Successfully Log Out')
    } catch (error) {
      toast.error('Error Logging Out')
    }
  }

  return (
    <nav className='flex items-center justify-between w-full text-black shadow-sm h-14 shadow-slate-400'>
      <div className='p-2 m-2'>
        <h3 className='text-lg focus:outline-none'>IT Support</h3>
      </div>

      <div className='p-2 m-2 md:hidden' onClick={() => setIsOpen(!isOpen)}>
        <div className='space-y-1 cursor-pointer'>
          <span className='block w-6 h-0.5 bg-white'></span>
          <span className='block w-6 h-0.5 bg-white'></span>
          <span className='block w-6 h-0.5 bg-white'></span>
        </div>
      </div>

      <div className={`m-2 p-2 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className='flex flex-row items-start justify-start md:flex-row md:items-center'>
          <li
            onClick={home}
            className='p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer focus:outline-none hover:bg-gray-700 hover:text-white md:text-sm'
          >
            <i className='m-1 fas fa-home'></i>Home
          </li>
          <li className='p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer focus:outline-none hover:bg-gray-700 hover:text-white md:text-sm'>
            <i className='m-1 fas fa-info-circle'></i> About
          </li>
          <li className='p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm'>
            <i className='m-1 fas fa-phone-alt'></i> Contact Us
          </li>
          {user ? (
            <li
              onClick={handleLogout}
              className='text-black p-2 text-sm cursor-pointer transition-all duration-500 rounded-sm hover:bg-gray-600 hover:text-white'
            >
              <i className='fa-solid fa-arrow-right-from-bracket m-1'></i> Sign
              Out
            </li>
          ) : (
            <li
              onClick={login}
              className='p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm'
            >
              <i className='fa-solid fa-right-to-bracket'></i> Sign In
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
