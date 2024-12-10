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
    <nav className='w-full h-14 items-center flex justify-between shadow-sm shadow-slate-400 text-black'>
      <div className='m-2 p-2'>
        <h3 className='text-lg'>IT Support</h3>
      </div>

      <div className='md:hidden m-2 p-2' onClick={() => setIsOpen(!isOpen)}>
        <div className='space-y-1 cursor-pointer'>
          <span className='block w-6 h-0.5 bg-white'></span>
          <span className='block w-6 h-0.5 bg-white'></span>
          <span className='block w-6 h-0.5 bg-white'></span>
        </div>
      </div>

      <div className={`m-2 p-2 ${isTicket ? 'block' : 'hidden'} md:block`}>
        <ul className='flex flex-row md:flex-row items-start md:items-center justify-start'>
        <li
            onClick={deparment}
            className='hover:text-white p-2 m-2 text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'
          >
            <i className="fa-solid fa-building"></i> Department Ticket
          </li>

          <li
            onClick={submittedTickets}
            className='hover:text-white p-2 m-2 text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'
          >
            <i className='m-1 fa-solid fa-ticket'></i> My Tickets
          </li>

          <li
            onClick={devices}
            className='hover:text-white p-2 m-2 text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'
          >
            <i className='fa-solid fa-computer m-1'></i>My Devices
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
