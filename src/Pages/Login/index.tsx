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
  const { login, error } = useAuthenticationStore();

  const formik = useFormik<AuthenticationValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: authenticationValidationSchema,
    onSubmit: async values => {
      const res = await login(values.email, values.password)

      if (error) {
        sessionStorage.removeItem("user-auth");
        return toast.error(error)
      } 

      toast.success('Login successful')
      res.role === 'admin' ? navigate('/dashboard') : navigate('/test')
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex items-center justify-center'>
          <div className=' bg-white rounded-lg flex flex-col md:flex-row items-center max-w-4xl p-6 md:p-8 shadow-sm shadow-gray-500 border border-gray-500'>
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
                className='w-full p-2 mb-4 text-sm border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none'
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <label className='block text-gray-700 text-sm font-medium mb-2'>
                <i className='fa-solid fa-key'></i> Password
              </label>
              <input
                type='password'
                name='password'
                className='w-full p-2 mb-4 text-sm border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none'
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              <button
                type='submit'
                className='w-full text-lg py-2 px-4 bg-black text-white font-medium rounded-md transition duration-700 hover:bg-opacity-80 border border-gray-500'
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
