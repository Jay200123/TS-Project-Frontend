import { useUserStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Image } from '../../components'
import { toast } from 'react-toastify'

export default function () {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user, getOneUser, updateUserById } = useUserStore()

  useQuery({
    queryKey: ['user', id],
    queryFn: () => getOneUser(id!),
    enabled: !!id
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fname: user?.fname || '',
      lname: user?.lname || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      email: user?.email || '',
      image: user?.image || []
    },
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('fname', values?.fname)
      formData.append('lname', values?.lname)
      formData.append('phone', values?.phone)
      formData.append('address', values?.address)
      formData.append('city', values?.city)
      formData.append('email', values?.email)
      Array.from(values?.image).forEach((files: any) => {
        formData.append('image', files)
      })

      try {
        const res = await updateUserById(user?._id!, formData)
        toast.success('User Profile Successfully Updated')

        if (res.role === 'Admin') {
          navigate('/admin-profile')
        }
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
      className='flex items-center justify-center p-4 m-4'
    >
      <div className='flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <div className='hidden w-full md:w-1/2 md:block mr-12'>
          <Image />
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Edit & Update Information
          </h2>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> First Name
            </label>
            <input
              type='text'
              id='fname'
              name='fname'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fname}
              className='p-2  border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Last Name
            </label>
            <input
              type='text'
              id='lname'
              name='lname'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lname}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Contact Number
            </label>
            <input
              type='text'
              id='phone'
              name='phone'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-location-dot'></i> Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-city'></i> City
            </label>
            <input
              type='text'
              name='city'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-envelope'></i> Email
            </label>
            <input
              type='email'
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-image'></i> Profile Image
            </label>
            <input
              type='file'
              id='image'
              name='image'
              multiple
              onBlur={formik.handleBlur}
              onChange={(event) => {
                const files = event.currentTarget.files
                  ? Array.from(event.currentTarget.files)
                  : []
                formik.setFieldValue('image', files)
              }}
            />
          </div>

          <div className='flex justify-center mt-4'>
            <button
              type='submit'
              className='w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80'
            >
              Update Information
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
