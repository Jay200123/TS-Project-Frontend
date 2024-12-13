import {
  useAuthenticationStore,
  useDeviceStore,
  useTicketStore
} from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { category } from '../../utils/arrays'
import { toast } from 'react-toastify'
import { createTicketValidationSchema } from '../../validations'

export default function () {
  const navigate = useNavigate()
  const { user: auth } = useAuthenticationStore()
  const { devices, getOneDevice, getAllDevices } = useDeviceStore()
  const { createTicket } = useTicketStore()

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
    validationSchema: createTicketValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('device', values.device)
      formData.append('category', values.category.toLowerCase())
      formData.append('description', values.description)
      values.image.forEach(file => {
        formData.append('image', file)
      })
      try {
        await createTicket(formData)
        navigate('/employee/department/tickets')
        toast.success('Ticket submitted successfully')
      } catch (error) {
        toast.error('An error occurred while creating the ticket')
      }
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

  const back = () => {
    window.history.back()
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex items-center justify-center p-4 m-4'
    >
      <div className='relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <h2 className='absolute text-xl font-bold text-center text-gray-800 md:text-3xl md:text-left'>
          <i onClick={back} className='fa-solid fa-arrow-left mr-2 cursor-pointer transition-all duration-500 hover:opacity-80'></i>
          <span>Submit a Ticket</span>{' '}
        </h2>
        <div className='hidden w-full mr-12 md:w-1/2 md:block'>
          <div className='flex flex-col items-center justify-center h-full'>
            <h3 className='mt-1 text-xl font-bold underline'>Device Image</h3>
            <img
              className='object-cover p-2 mt-4 border border-gray-600 rounded-md shadow-lg h-60 w-60'
              src={device?.image?.[0]?.url || 'default-placeholder.jpg'}
              alt={device?.image?.[0]?.originalname || 'Select a device first'}
            />
            <h3 className='mt-2 text-lg font-bold'>Device Description</h3>
            <p className='p-2 mt-1 text-sm'>
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
            {formik.touched.device && formik.errors.device ? (
              <div className='text-sm text-red-500'>{formik.errors.device}</div>
            ) : null}
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
            {formik.touched.category && formik.errors.category ? (
              <div className='text-sm text-red-500'>
                {formik.errors.category}
              </div>
            ) : null}
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
            {formik.touched.description && formik.errors.description ? (
              <div className='text-sm text-red-500'>
                {formik.errors.description}
              </div>
            ) : null}
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
              className={`w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-gray-700 border border-gray-500 rounded-md ${
                !formik.isValid
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-80'
              }`}
              disabled={!formik.isValid}
            >
              Submit Ticket
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
