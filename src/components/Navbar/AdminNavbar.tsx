import { useState } from 'react'
import { useAuthenticationStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function () {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isTableOpen, setIsTableOpen] = useState(false)
  const { logout, user } = useAuthenticationStore()

  const login = () => {
    navigate('/login')
  }

  const signup = () => {
    navigate('/signup')
  }

  const dashboard = () => {
    navigate('/dashboard')
  }

  const users = () => {
    navigate('/users')
  }

  const approve = () => {
    navigate('/approve-users')
  }

  const profile = () => {
    navigate('/admin-profile')
  }

  const departments = () => {
    navigate('/departments')
  }

  const positions = () => {
    navigate('/positions')
  }

  const branches = () => {  
    navigate('/branches')
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

      <div className={`m-2 p-2 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className='flex flex-row items-start justify-start md:flex-row md:items-center'>
          <li
            onClick={dashboard}
            className='p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm'
          >
            <i className='m-1 fas fa-home'></i>Dashboard
          </li>
          <li className='p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm'>
            <i className='m-1 fas fa-info-circle'></i> Tickets
          </li>

          <li
            onClick={() => setIsTableOpen(!isTableOpen)}
            className='relative p-3 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm'
          >
            <span>
              <i className='m-1 fa-solid fa-table'></i>Tables
            </span>
            {user ? (
              <div
                className={`absolute top-full left-0 bg-gray-700 rounded shadow-md z-10 mt-2 p-2 transition-all duration-300 ease-in-out transform ${
                  isTableOpen
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <ul
                  className='flex flex-col gap-1'
                  onClick={() => setIsTableOpen(false)}
                >
                  <li
                    onClick={users}
                    className='flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-600 text-white'
                  >
                    <i className='fa-solid fa-circle-user'></i> Users
                  </li>

                  <li
                    onClick={departments}
                    className='flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-600 text-white'
                  >
                    <i className='fa-solid fa-building'></i> Department
                  </li>

                  <li
                    onClick={positions}
                    className='flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-600 text-white'
                  >
                    <i className='fa-solid fa-location-dot'></i> Position
                  </li>

                  <li
                    onClick={branches}
                    className='flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-600 text-white'
                  >
                    <i className='fa-solid fa-code-branch'></i> Branch
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </li>

          <li
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='relative p-3 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm'
          >
            <span>
              <i className='m-1 fa-solid fa-bars'></i>Settings
            </span>
            {user ? (
              <div
                className={`absolute top-full left-0 bg-gray-700 rounded shadow-md z-10 mt-2 p-2 transition-all duration-300 ease-in-out transform ${
                  isDropdownOpen
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <ul
                  className='flex flex-col gap-1'
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <li
                    onClick={profile}
                    className='flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-600 text-white'
                  >
                    <i className='fa-solid fa-circle-user'></i> User Profile
                  </li>
                  <li
                    onClick={approve}
                    className='flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-600 text-white'
                  >
                    <i className='fa-solid fa-circle-user'></i> Approve Users
                  </li>
                  <li
                    onClick={handleLogout}
                    className='flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-600 text-white'
                  >
                    <i className='fa-solid fa-arrow-right-from-bracket'></i>{' '}
                    Sign Out
                  </li>
                </ul>
              </div>
            ) : (
              <div
                className={`absolute top-full left-0 bg-gray-700 rounded shadow-md z-10 mt-2 p-2 transition-all duration-300 ease-in-out transform ${
                  isDropdownOpen
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <ul onClick={() => setIsDropdownOpen(false)}>
                  <li
                    onClick={login}
                    className='p-2 text-sm cursor-pointer hover:bg-gray-600'
                  >
                    <i className='m-1 fa-solid fa-unlock'></i>Sign In
                  </li>
                  <li
                    onClick={signup}
                    className='p-2 text-sm cursor-pointer hover:bg-gray-600'
                  >
                    <i className='m-1 fa-solid fa-user-plus'></i> Sign Up
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
