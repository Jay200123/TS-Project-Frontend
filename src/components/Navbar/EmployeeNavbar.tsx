import { useState } from 'react'
import { useAuthenticationStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function () {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { logout, user } = useAuthenticationStore()

  const login = ()=>{
    navigate('/login'); 
  }

  const signup = ()=>{
    navigate('/signup');
  }

  const home = ()=>{
    navigate('/');
  }


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Successfully Log Out");
    } catch (error) {
      toast.error("Error Logging Out");
    }
  };

  return (
    <nav className='w-full h-14 items-center flex justify-between bg-black shadow-sm shadow-black text-white'>
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

      <div className={`m-2 p-2 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className='flex flex-row md:flex-row items-start md:items-center justify-start'>
          <li onClick={home} className='p-2 m-2 text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'>
            <i className='fas fa-home m-1'></i>Home
          </li>
          <li className='p-2 m-2  text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'>
            <i className='fas fa-info-circle m-1'></i> About
          </li>
          <li className='p-2 m-2  text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'>
            <i className='fas fa-phone-alt m-1'></i> Contact Us
          </li>

          <li onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='relative m-2 p-3 text-sm cursor-pointer transition duration-300 hover:bg-gray-700 rounded md:text-sm'>
            <span>
              <i className='fa-solid fa-bars m-1'></i>Settings
            </span>
            {user ? (
              <div
                className={`absolute top-full left-0 bg-gray-700 rounded shadow-md z-10 mt-2 p-2 transition-all duration-300 ease-in-out transform ${
                  isDropdownOpen
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <ul onClick={() => setIsDropdownOpen(false)}>
                  <li className='p-2 text-sm cursor-pointer hover:bg-gray-600'>
                  <i className="fa-solid fa-circle-user m-1"></i>User Profile
                  </li>
                  <li onClick={handleLogout} className='p-2 text-sm cursor-pointer hover:bg-gray-600'>
                  <i className="fa-solid fa-arrow-right-from-bracket m-1"></i> Sign Out
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
                  <li onClick={login} className='p-2 text-sm cursor-pointer hover:bg-gray-600'>
                  <i className="fa-solid fa-unlock m-1"></i>Sign In
                  </li>
                  <li onClick={signup} className='p-2 text-sm cursor-pointer hover:bg-gray-600'>
                  <i className="fa-solid fa-user-plus m-1"></i> Sign Up
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
