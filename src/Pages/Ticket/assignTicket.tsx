import { useTicketStore, useUserStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { Image } from '../../components'
import { editAssigneeValidationSchema } from '../../validations'
import { level, ticketStatus } from '../../utils/arrays'

export default function () {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { ticket, getOneTicket, assignTicketById } = useTicketStore()
  const { users, getAllUsers } = useUserStore()

  useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getOneTicket(id!),
    enabled: !!id
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      assignee: ticket?.assignee?._id || '',
      level: ticket?.level || '',
      status: ticket?.status || ''
    },
    validationSchema: editAssigneeValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('assignee', values.assignee)
      formData.append('level', values.level)
      formData.append('status', values.status)

      try {
        await assignTicketById(id!, formData)
        toast.success('Ticket Assigned Successfully')
        navigate('/tickets')
      } catch (err) {
        toast.error("Error can't assign ticket")
      }
    }
  })

  const back = () => {
    window.history.back()
  }

  const filteredUsers = users?.filter(
    u => u?.role === 'Technician' && u?.isPasswordChanged === true  
  )

  const selectedUser = users?.find(u => u?._id === formik.values.assignee)

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='flex items-center justify-center p-4 m-4'
      >
        <div className='relative flex flex-col md:max-w-6xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
          <h3
            onClick={back}
            className='top-1 left-1 absolute text-3xl m-1 cursor-pointer transition-all duration-500 hover:text-gray-700'
          >
            <i className='fa-solid fa-arrow-left'></i>
          </h3>
          <div className='relative hidden p-2 w-full mr-12 md:w-1/2 md:block'>
            <div className='absolute font-bold text-lg bottom-1 left-1'>
              <h3>
                Submitted by:
                <span>
                  {ticket?.device?.owner?.fullname}
                </span>
              </h3>
              <p>{ticket?.device?.owner?.department?.department_name}</p>
            </div>
            <Image />
            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='fa-solid fa-code-branch'></i> Technician
              </label>
              <select
                name='assignee'
                id='assignee'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.assignee.toString()}
                className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
              >
                <option value='' disabled>
                  Select a Technician
                </option>
                {filteredUsers?.map(u => (
                  <option key={u?._id} value={u?._id}>
                    {u?.fullname}
                  </option>
                ))}
              </select>
            </div>
            <div className='mt-1 flex flex-col text-left'>
              <h3 className='font-bold'>Technician Info</h3>

              <p className='text-md mt-1 font-bold'>
                Technician Name:{' '}
                <span className='font-normal'>
                  {selectedUser?.fullname}
                </span>
              </p>
              <p className='text-md mt-1 font-bold'>
                Department:{' '}
                <span className='font-normal'>
                  {selectedUser?.department?.department_name}
                </span>
              </p>
              <p className='text-md mt-1 font-bold'>
                Position:{' '}
                <span className='font-normal'>
                  {selectedUser?.position?.position_name}
                </span>
              </p>
            </div>
          </div>
          <div className='flex flex-col w-full space-y-4 md:w-1/2'>
            <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
              Assign Technician
            </h2>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Device
              </label>
              <input
                type='text'
                name='type'
                readOnly
                placeholder={ticket?.device?.type}
                className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Description
              </label>
              <textarea
                name='description'
                readOnly
                placeholder={ticket?.device?.description}
                className='p-2 h-[150px]  placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Device
              </label>
              <input
                type='text'
                name='category'
                readOnly
                placeholder={ticket?.category.toUpperCase()}
                className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Concern
              </label>
              <textarea
                name='category'
                readOnly
                placeholder={ticket?.description.toUpperCase()}
                className='p-2 h-[150px] placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                    : 'Not Purchased'
                }
                className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-phone'></i> Ticket Level
              </label>
              <select
                name='level'
                id='level'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.level}
                className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
              >
                <option value='' disabled>
                  {ticket?.level}
                </option>
                {level?.map((l, index) => (
                  <option key={index} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-phone'></i> Ticket Level
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
                  {ticket?.status}
                </option>
                {ticketStatus?.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col mt-2 md:hidden'>
              <label className='mb-1 text-lg font-medium text-gray-700'>
                <i className='fa-solid fa-code-branch'></i> Select a Technician
              </label>
              <select
                name='assignee'
                id='assignee'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.assignee}
                className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
              >
                <option value='' disabled>
                  Select a Technician
                </option>
                {filteredUsers?.map(u => (
                  <option key={u?._id} value={u?._id}>
                    {u?.fullname}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex justify-center mt-4'>
              <button className='w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80'>
                UPDATE TICKET
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
