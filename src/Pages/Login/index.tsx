import { useFormik } from 'formik'
import { authenticationValidationSchema } from '../../validations'
import { AuthenticationValues } from '../../interface'
import { toast } from 'react-toastify'
import { useAuthenticationStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import LoginIcon from '../../assets/bg-icon.jfif'
import { Image } from '../../components'

export default function () {
  const navigate = useNavigate()
  const { login } = useAuthenticationStore()

  const formik = useFormik<AuthenticationValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: authenticationValidationSchema,
    onSubmit: async values => {
      await login(values.email, values.password)
      toast.success('Login successful')
      navigate('/test')
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='min-h-screen flex items-center justify-center'>
          <div className=' bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center max-w-4xl p-6 md:p-8 border border-black'>
            <div className='hidden md:block w-full md:w-1/2'>
              <Image />
            </div>
            <div className='w-full md:w-1/2 p-4 md:p-6'>
              <div className='flex flex-col items-center'>
                <img
                  className='h-24 w-24 rounded-full mb-4'
                  src={LoginIcon}
                  alt='User Icon'
                />
                <h3 className='font-bold text-2xl md:text-3xl text-gray-800 mb-4'>
                  Sign In
                </h3>
              </div>

              <label className='block text-gray-700 text-sm font-medium mb-2'>
                <i className='fa-solid fa-envelope'></i> Email
              </label>
              <input
                type='text'
                name='email'
                className='w-full p-2 mb-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <label className='block text-gray-700 text-sm font-medium mb-2'>
                <i className='fa-solid fa-key'></i> Password
              </label>
              <input
                type='password'
                name='password'
                className='w-full p-2 mb-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              <button
                type='submit'
                className='w-full py-2 px-4 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition duration-300'
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
