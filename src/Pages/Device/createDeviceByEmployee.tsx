import {
    useDeviceStore,
    useAuthenticationStore
  } from '../../state/store'
  import { useNavigate } from 'react-router-dom'
  import { useFormik } from 'formik'
  import { Image } from '../../components'
  import { toast } from 'react-toastify'
  import { type, status } from '../../utils/arrays'; 
  
  export default function () {
    const navigate = useNavigate()
    const { user } = useAuthenticationStore()   
    const { createDevice } = useDeviceStore()
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        owner: user?._id || '',
        type: '',
        description: '',
        date_requested: '',
        date_purchased: '',
        serial_number: '',
        status: status[1] ||'',
        image: []
      },
      onSubmit: async values => {
        const formData = new FormData()
        formData.append('owner', values.owner)
        formData.append('type', values.type)
        formData.append('description', values.description)
        formData.append('date_requested', values.date_requested)
        formData.append('date_purchased', values.date_purchased)
        formData.append('serial_number', values.serial_number)
        formData.append('status', values.status)
        values.image.forEach((file) => {
          formData.append('image', file)
        })
        try {
          await createDevice(formData)
          toast.success('Device Info Successfully Created')
          navigate('/employee/device')
        } catch (error) {
          toast.error('An unexpected error occurred')
          if (error instanceof Error) {
            toast.error(error.message)
          } else {
            toast.error('An unexpected error occurred')
          }
        }
      }
    })
  
    return (
      <>
        <form
          onSubmit={formik.handleSubmit}
          className='flex items-center justify-center p-4 m-4'
        >
          <div className='flex flex-col w-full max-w-2xl  xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 overflow-hidden min-h-[24rem]'>
            <div className='hidden w-full md:w-1/2 md:block min-h-[20rem]'>
              <Image />
            </div>
            <div className='flex flex-col w-full space-y-4 md:w-1/2'>
              <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
                Register Your Device
              </h2>

              <div className='hidden'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='mr-1 fa-solid fa-user'></i> Owner
                </label>
                <input
                  type='text'
                  id='owner'
                  name='owner'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.owner}
                  className='hidden p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
  
              <div className='flex flex-col'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='fa-solid fa-code-branch'></i> Device User
                </label>
                <select
                  name='type'
                  id='type'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik?.values.type}
                  className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
                >
                  <option value='' disabled>
                    Device Type
                  </option>
                  {type?.map((t, index) => (
                    <option key={index} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className='flex flex-col'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='mr-1 fa-solid fa-user'></i> Serial Number
                </label>
                <input
                  type='text'
                  id='serial_number'
                  name='serial_number'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.serial_number}
                  className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
  
              <div className='flex flex-col'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='mr-1 fa-solid fa-phone'></i>
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
  
              <div className='flex flex-col'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='mr-1 fa-solid fa-phone'></i>
                  Date Requested
                </label>
                <input
                  type='date'
                  id='date_requested'
                  name='date_requested'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date_requested}
                  className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
  
              <div className='flex flex-col'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='mr-1 fa-solid fa-phone'></i>
                  Date Purchased
                </label>
                <input
                  type='date'
                  id='date_purchased'
                  name='date_purchased'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date_purchased}
                  className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
  

  
              <div className='flex flex-col'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='mr-1 fa-solid fa-image'></i> Device Image
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
                  className='w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80'
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    )
  }
  