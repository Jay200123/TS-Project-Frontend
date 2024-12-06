import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthenticationStore } from '../../state/store'
import { toast } from 'react-toastify'

export default function () {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { logout, user } = useAuthenticationStore()

  const login = () => {
    navigate('/login')
  }

  const signup = () => {
    navigate('/signup')
  }

  const tickets = () => {
    navigate('/technician/tickets')
  }

  const devices = ()=>{
    navigate('/technician/devices')
  }

  const handleProfile = () => {
    if (user?.role === 'Admin') {
      navigate('/admin-profile')
    } else if (user?.role === 'Technician') {
      navigate('/technician/profile')
    } else {
      navigate('/employee/profile')
    }
  }

  const alltickets  = ()=>{
    navigate('/technician/all-tickets')
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
            <i className="fa-solid fa-ticket"></i>All Tickets
          </li>
          <li
            onClick={tickets}
            className='p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer focus:outline-none hover:bg-gray-700 hover:text-white md:text-sm'
          >
            <i className="fa-solid fa-ticket"></i>My Tickets
          </li>
          <li onClick={devices} className='p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer focus:outline-none hover:bg-gray-700 hover:text-white md:text-sm'>
          <i className="fa-solid fa-computer"></i> Owned Device
          </li>
          <li
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='relative p-3 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer hover:text-white hover:bg-gray-700 md:text-sm'
          >
            <span>
              <i className='m-1 fa-solid fa-bars'></i>Settings
            </span>
            <div
              className={`absolute bg-gray-700 shadow-slate-300 top-full left-0 rounded shadow-md z-10 mt-2 p-2 transition-all duration-500 ease-in-out transform ${
                isDropdownOpen
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {user ? (
                <ul onClick={() => setIsDropdownOpen(false)}>
                  <li
                    onClick={handleProfile}
                    className='p-2 text-sm cursor-pointer text-white border-b-[1px] transition-all duration-500 hover:bg-white hover:text-black hover:rounded-md'
                  >
                    <i className='m-1 fa-solid fa-unlock'></i>
                    {`${user.role} Profile`}
                  </li>
                  <li
                    onClick={handleLogout}
                    className='p-2 text-sm cursor-pointer text-white border-b-[1px] transition-all duration-500 hover:bg-white hover:text-black hover:rounded-md'
                  >
                    <i className='m-1 fa-solid fa-user-plus'></i> Logout
                  </li>
                </ul>
              ) : (
                <ul onClick={() => setIsDropdownOpen(false)}>
                  <li
                    onClick={login}
                    className='p-2 text-sm cursor-pointer text-white border-b-[1px] transition-all duration-500 hover:bg-white hover:text-black hover:rounded-md'
                  >
                    <i className='m-1 fa-solid fa-unlock'></i>Sign In
                  </li>
                  <li
                    onClick={signup}
                    className='p-2 text-sm cursor-pointer text-white border-b-[1px] transition-all duration-500 hover:bg-white hover:text-black hover:rounded-md'
                  >
                    <i className='m-1 fa-solid fa-user-plus'></i> Sign Up
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
