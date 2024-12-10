import { useTicketStore } from '../../state/ticket'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { editTicketByTechnicianValidationSchema } from '../../validations'

export default function () {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { ticket, getOneTicket, updateTicketById } = useTicketStore()

  useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getOneTicket(id!),
    enabled: !!id
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date_resolved: ticket?.date_resolved || '',
      status: ticket?.status || '',
      findings: ticket?.findings || '',
      device_status: ticket?.device?.status || ''
    },
    validationSchema: editTicketByTechnicianValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('findings', values.findings)
      formData.append('status', values.status)
      formData.append('device_status', values?.device_status)
      formData.append('date_resolved', values.date_resolved.toString())
      try {
        await updateTicketById(ticket!._id, formData)
        toast.success('Ticket updated successfully')
        navigate('/technician/tickets')
      } catch (err) {
        toast.error('Failed to update ticket')
      }
    }
  })

  const randomImage =
    ticket?.image && ticket.image.length > 0
      ? ticket.image[Math.floor(Math.random() * ticket.image.length)]
      : null

  const status = ['pending', 'resolved', 'in-progress', 'closed']

  const device_status = [
    'Available',
    'Used',
    'Repair',
    'Replacement',
    'Disposal',
    'Return'
  ]

  const back = () => {
    window.history.back()
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=' flex items-center justify-center'
    >
      <div className='relative flex flex-col m-5 w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
      <h3
            onClick={back}
            className='top-1 left-1 absolute text-3xl m-1 cursor-pointer transition-all duration-500 hover:text-gray-700'
          >
            <i className='fa-solid fa-arrow-left'></i>
          </h3>
        <div className='hidden w-full mr-12 md:w-1/2 md:block'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='text-2xl mb-1 font-bold'>Ticket Image</h3>
            <img
              className='object-cover md:w-[350px] md:h-[350px] rounded-l-lg'
              src={randomImage?.url}
              alt={randomImage?.originalname}
            />
            <div className='flex flex-col mt-2'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Concern
              </label>
              <textarea
                name='description'
                readOnly
                placeholder={ticket?.description}
                className='p-2 w-[350px] h-[120px] placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col mt-2'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Technician Findings
              </label>
              <textarea
                name='findings'
                id='findings'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.findings}
                placeholder='findings...'
                className='p-2 w-[350px] h-[120px] placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {formik.touched.findings && formik.errors.findings ? (
              <div className='text-sm text-red-500'>
                {formik.errors.findings}
              </div>
            ) : null}
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Update Ticket Status
          </h2>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> User
            </label>
            <input
              type='text'
              name='owner'
              readOnly
              placeholder={
                ticket?.device?.owner?.fullname}
              className='p-2  placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Position
            </label>
            <input
              type='text'
              name='position'
              readOnly
              placeholder={ticket?.device?.owner?.position?.position_name}
              className='p-2  placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Department
            </label>
            <input
              type='text'
              name='department'
              readOnly
              placeholder={ticket?.device?.owner?.department?.department_name}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Device
            </label>
            <input
              type='text'
              name='date_requested'
              readOnly
              placeholder={ticket?.device?.type}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col md:hidden'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Concern
            </label>
            <textarea
              name='description'
              readOnly
              placeholder={ticket?.description}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Device Description
            </label>
            <textarea
              name='description'
              readOnly
              placeholder={ticket?.device?.description}
              className='p-2 h-20 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-code-branch'></i> Device Status
            </label>
            <select
              name='device_status'
              id='device_status'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik?.values.device_status}
              className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
            >
              <option value='' disabled>
                {formik?.values.device_status}
              </option>
              {device_status?.map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {formik.touched.device_status && formik.errors.device_status ? (
              <div className='text-sm text-red-500'>
                {formik.errors.device_status}
              </div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Ticket Level
            </label>
            <input
              type='text'
              name='level'
              readOnly
              placeholder={ticket?.level}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Date Submitted
            </label>
            <input
              type='text'
              name='date_submitted'
              readOnly
              placeholder={
                ticket?.date_submitted
                  ? new Date(ticket?.date_submitted.toLocaleString())
                      .toISOString()
                      .split('T')[0]
                  : ''
              }
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Date Resolved
            </label>
            <input
              type='date'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name='date_resolved'
              id='date_resolved'
              placeholder={
                ticket?.date_resolved
                  ? new Date(ticket?.date_resolved.toLocaleString())
                      .toISOString()
                      .split('T')[0]
                  : 'Not Resolved Yet'
              }
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {formik.touched.date_resolved && formik.errors.date_resolved ? (
              <div className='text-sm text-red-500'>
                {formik.errors.date_resolved}
              </div>
            ) : null}
          </div>
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-code-branch'></i> Status
            </label>
            <select
              name='status'
              id='status'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik?.values.status}
              className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
            >
              <option value='' disabled>
                Status
              </option>
              {status?.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className='text-sm text-red-500'>
                {formik.errors.status}
              </div>
            ) : null}
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
              Update Ticket
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
