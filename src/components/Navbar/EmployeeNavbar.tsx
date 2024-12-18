import { useState } from 'react'
import { useAuthenticationStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function () {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const { logout, user } = useAuthenticationStore()

  const [isTicket] = useState(false)

  const login = () => {
    navigate('/login')
  }


  const devices = () => {
    navigate('/employee/device')
  }

  const submittedTickets = () => {
    navigate('/employee/tickets')
  }

  const deparment = ()=>{
    navigate('/employee/department/tickets')  
  }

  const borrow = ()=>{
    navigate('/borrow/employee')
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
        <h3 className='text-lg'>IT Support</h3>
      </div>

      <div className='p-2 m-2 md:hidden' onClick={() => setIsOpen(!isOpen)}>
        <div className='space-y-1 cursor-pointer'>
          <span className='block w-6 h-0.5 bg-white'></span>
          <span className='block w-6 h-0.5 bg-white'></span>
          <span className='block w-6 h-0.5 bg-white'></span>
        </div>
      </div>

      <div className={`m-2 p-2 ${isTicket ? 'block' : 'hidden'} md:block`}>
        <ul className='flex flex-row items-start justify-start md:flex-row md:items-center'>
        <li
            onClick={deparment}
            className='p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:text-white hover:bg-gray-700 md:text-sm'
          >
            <i className="fa-solid fa-building"></i> Department Ticket
          </li>

          <li
            onClick={submittedTickets}
            className='p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:text-white hover:bg-gray-700 md:text-sm'
          >
            <i className='m-1 fa-solid fa-ticket'></i> My Tickets
          </li>
          <li
            onClick={borrow}
            className='p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:text-white hover:bg-gray-700 md:text-sm'
          >
            <i className="mr-1 fa-solid fa-handshake"></i>Borrow Items
          </li>

          <li
            onClick={devices}
            className='p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:text-white hover:bg-gray-700 md:text-sm'
          >
            <i className='m-1 fa-solid fa-computer'></i>My Devices
          </li>

          {user ? (
            <li
              onClick={handleLogout}
              className='p-2 text-sm text-black transition-all duration-500 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-white'
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
