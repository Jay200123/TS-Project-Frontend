import { useFormik } from 'formik'
import { authenticationValidationSchema } from '../../validations'
import { AuthenticationValues } from '../../interface'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { useAuthenticationStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import LoginIcon from '../../assets/bg-icon.jfif'
import { LoginImage } from '../../components'
import { useState } from 'react'

export default function () {
  const navigate = useNavigate()
  const { login } = useAuthenticationStore()
 
  const[showPassword, setShowPassword] = useState(false); 

  const formik = useFormik<AuthenticationValues>({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: authenticationValidationSchema,
    onSubmit: async values => {
      try {
        const res = await login(values.email, values.password)
        if (res.isPasswordChanged) {
          toast.success('Login Successful')
          if (res.role === 'Admin') {
            navigate('/dashboard')
          } else if (res.role === 'Technician') {
            navigate('/technician/all-tickets')
          } else if (res?.role === 'Employee') {
            navigate('/employee/department/tickets')
          }
        } else {
          toast.error('Please change your password')
          navigate('/change/password')
        }
      } catch (err) {
        toast.error('Invalid email or password', {
          position: 'top-center', 
          autoClose: 5000, 
          closeOnClick: true,
        });
      }
    }
  });

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex items-center justify-center'>
          <div className='flex flex-col items-center max-w-4xl p-6 m-8 bg-white border border-gray-500 rounded-lg shadow-sm md:flex-row md:p-8 shadow-gray-500'>
            <div className='hidden w-full md:block md:w-1/2'>
              <LoginImage />
            </div>

            <div className='w-full p-4 md:w-1/2 md:p-6'>
              <div className='flex flex-col items-center'>
                <img
                  className='w-24 h-24 mb-4 rounded-full'
                  src={LoginIcon}
                  alt='User Icon'
                />
                <h3 className='mb-4 text-2xl font-bold text-gray-800 md:text-3xl'>
                  Sign In
                </h3>
              </div>

              <label className='block mb-2 text-sm font-medium text-gray-700'>
                <i className='fa-solid fa-envelope'></i> Email
              </label>
              <input
                type='text'
                name='email'
                className='w-full p-2 mb-4 text-sm border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none'
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <label className='block mb-2 text-sm font-medium text-gray-700'>
                <i className='fa-solid fa-key'></i> Password
              </label>
              <div className='flex items-center justify-start'>
              <input
                type={`${showPassword ? 'text' : 'password'}`}  
                name='password'
                className='w-full p-2 mb-4 text-sm border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
                {showPassword ? (
                <FaEye
                  onClick={() => togglePassword()}
                  className={`text-lg -ml-6 mb-[14px] cursor-pointer`}
                />
              ) : (
                <FaEyeSlash
                  onClick={() => togglePassword()}
                  className={`text-lg -ml-6 mb-[14px] cursor-pointer`}
                />
              )}
              </div>
              <button
                type='submit'
                className='w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-gray-700 border border-gray-500 rounded-md hover:bg-opacity-80'
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
