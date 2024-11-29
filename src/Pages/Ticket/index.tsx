import { useAuthenticationStore, useDeviceStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { category } from '../../utils/arrays'

export default function () {
  const navigate = useNavigate()
  const { user: auth } = useAuthenticationStore()
  const { devices, getOneDevice, getAllDevices } = useDeviceStore()

  useQuery({
    queryKey: ['devices'],
    queryFn: getAllDevices
  })

  const formik = useFormik({
    initialValues: {
      device: '',
      category: '',
      description: '',
      image: []
    },
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('device', values.device)
      formData.append('category', values.category)
      formData.append('description', values.description)
      values.image.forEach(file => {
        formData.append('image', file)
      })

      // await createTicket(formData);
      // navigate('/tickets');
    }
  })

  const { data: device } = useQuery({
    queryKey: ['device', formik.values.device],
    queryFn: () => getOneDevice(formik.values.device),
    enabled: !!formik.values.device
  })

  const filteredDevice = devices?.filter(
    device => device.owner._id === auth?._id
  )

  return (
    <form className='flex items-center justify-center p-4 m-4'>
      <div className='relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <h2 className='absolute text-3xl font-bold text-center text-gray-800 md:text-left'>
          Submit a Ticket
        </h2>
        <div className='hidden w-full md:w-1/2 md:block mr-12'>
          <div className='flex flex-col h-full items-center justify-center'>
            <h3 className='text-xl font-bold mt-1 underline'>Device Image</h3>
            <img
              className='h-60 w-60 object-cover border mt-4 border-gray-600 rounded-md shadow-lg p-2'
              src={device?.image?.[0]?.url || 'default-placeholder.jpg'}
              alt={device?.image?.[0]?.originalname || 'Select a device first'}
            />
            <h3 className='font-bold text-lg mt-2'>Device Description</h3>
            <p className='text-sm mt-1 p-2'>
              {device?.description
                ? device?.description
                : 'Select a device first'}
            </p>
          </div>
        </div>

        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-computer'></i> Select a Device
            </label>
            <select
              name='device'
              id='device'
              onChange={formik.handleChange}
              value={formik.values.device}
              className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
            >
              <option value='' disabled>
                Select a Device
              </option>
              {filteredDevice?.map(d => (
                <option key={d?._id} value={d?._id}>
                  {d?.type}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-list'></i> Category
            </label>
            <select
              name='category'
              id='category'
              onChange={formik.handleChange}
              value={formik.values.category}
              className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
            >
              <option value='' disabled>
                Category
              </option>
              {category?.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-pencil'></i> Concern
            </label>
            <textarea
              id='description'
              name='description'
              onChange={formik.handleChange}
              value={formik.values.description}
              className='h-[125px] w-full p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-image'></i> Submit a Picture of the
              Issue
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
              Create Ticket
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
