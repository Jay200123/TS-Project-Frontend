import { useFormik } from 'formik'
import { authenticationValidationSchema } from '../../validations'
import { AuthenticationValues } from '../../interface'
import { toast } from 'react-toastify'
import { useAuthenticationStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'

export default function(){
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

  console.log(formik.values);

  return (
    <>
      <form
        className='flex items-center justify-center p-12 m-12 rounded-md bg-neutral-400'
        onSubmit={formik.handleSubmit}
      >
        <div className='flex flex-col items-center justify-between max-h-lvh'>
          <div className='flex items-center justify-between w-full p-4 m-3 text-left'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              className='p-1 m-1 text-sm rounded-md'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className='flex items-center justify-between w-full p-4 m-2 text-left'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              className='p-1 m-1 text-sm rounded-md'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className='p-2 m-2'>
            <button
              className='p-4 transition duration-300 ease-in-out border rounded-md cursor-pointer border-black-300 hover:bg-blue-500 hover:text-white'
              type='submit'
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

