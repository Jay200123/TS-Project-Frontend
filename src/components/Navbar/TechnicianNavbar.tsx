import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthenticationStore } from '../../state/store'
import { toast } from 'react-toastify'

export default function () {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const { logout, user } = useAuthenticationStore()

  const login = () => {
    navigate('/login')
  }

  const tickets = () => {
    navigate('/technician/tickets')
  }


  const alltickets = () => {
    navigate('/technician/all-tickets')
  }

  const allBorrows = () => {
    navigate('technician/borrows')
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
            onClick={alltickets}
            className='p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer focus:outline-none hover:bg-gray-700 hover:text-white md:text-sm'
          >
            <i className='fa-solid fa-ticket'></i>All Tickets
          </li>
          <li
            onClick={tickets}
            className='p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer focus:outline-none hover:bg-gray-700 hover:text-white md:text-sm'
          >
            <i className='fa-solid fa-ticket'></i>My Tickets
          </li>
          <li
            onClick={allBorrows}
            className="p-2 m-2 text-sm text-gray-700 transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm"
          >
           <i className="mr-1 fa-solid fa-handshake"></i>Borrow Items
          </li>
          {user ? (
            <li
              onClick={handleLogout}
              className='p-2 text-sm text-gray-700 transition-all duration-500 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-white'
            >
              <i className='m-1 fa-solid fa-arrow-right-from-bracket'></i> Sign
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
