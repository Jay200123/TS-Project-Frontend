import { Image } from '../../components'
import { useFormik } from 'formik'
import { userValidationSchema } from '../../validations'
import { useUserStore } from '../../state/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()
  const { createUser } = useUserStore()

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      phone: '',
      address: '',
      city: '',
      email: '',
      password: '',
      image: []
    },
    validationSchema: userValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('fname', values.fname)
      formData.append('lname', values.lname)
      formData.append('phone', values.phone)
      formData.append('address', values.address)
      formData.append('city', values.city)
      formData.append('email', values.email)
      formData.append('password', values.password)
      values.image.forEach(file => {
        formData.append('image', file)
      })

      try {
        await createUser(formData)
        toast.success('Registration successful')
        navigate('/login')
      } catch (error) {
        toast.error('User Registration failed')

        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unexpected error occurred')
        }
      }
    }
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex items-center justify-center m-4 p-4'
    >
      <div className='flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <div className='hidden w-full md:w-1/2 md:block'>
          <Image />
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-gray-800 text-center md:text-left'>
            Register Your Account
          </h2>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-user mr-1'></i> First Name
            </label>
            <input
              type='text'
              name='fname'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fname}
              placeholder='Enter your first name'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-user mr-1'></i> Last Name
            </label>
            <input
              type='text'
              name='lname'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lname}
              placeholder='Enter your last name'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-phone mr-1'></i> Contact Number
            </label>
            <input
              type='text'
              name='phone'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder='Enter your contact number'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-location-dot mr-1'></i> Address
            </label>
            <input
              type='text'
              name='address'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder='Enter your address'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-city mr-1'></i> City
            </label>
            <input
              type='text'
              name='city'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Enter your city'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-envelope mr-1'></i> Email
            </label>
            <input
              type='email'
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder='Enter your email'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-lock mr-1'></i> Password
            </label>
            <input
              type='password'
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder='Enter your password'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-image mr-1'></i> Profile Image
            </label>
            <input
              type='file'
              name='image'
              multiple
              onChange={e => {
                const files = Array.from(e.currentTarget.files || [])
                formik.setFieldValue('image', files)
              }}
            />
          </div>

          <div className='flex justify-center mt-4'>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-black text-white text-lg font-medium rounded-md transition duration-700 hover:opacity-80 border border-gray-500'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
