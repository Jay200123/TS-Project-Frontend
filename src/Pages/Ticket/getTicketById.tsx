import { useTicketStore, useAuthenticationStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function () {
  const { id } = useParams<{ id: string }>()
  const { ticket, getOneTicket } = useTicketStore()
  const { user } = useAuthenticationStore()

  useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getOneTicket(id!),
    enabled: !ticket
  })

  const back = () => {
    window.history.back()
  }

  const randomImage =
    ticket?.image && ticket.image.length > 0
      ? ticket.image[Math.floor(Math.random() * ticket.image.length)]
      : null

  return (
    <div className='flex items-center justify-center p-4 m-4'>
      <div className='flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
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
          </div>
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Ticket Details
          </h2>

          {user?.role === 'Admin' || user?.role === 'Technician' ? (
            <>
              <div className='flex flex-col'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='mr-1 fa-solid fa-user'></i> User
                </label>
                <input
                  type='text'
                  name='owner'
                  readOnly
                  placeholder={
                    ticket?.device?.owner?.fname +
                    ' ' +
                    ticket?.device?.owner?.lname
                  }
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
                  placeholder={
                    ticket?.device?.owner?.department?.department_name
                  }
                  className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </>
          ) : (
            <>
              <h3 className='text-lg font-bold'>
                TICKET ID:{' '}
                <span className='text-sm underline'>{ticket?._id}</span>
              </h3>
            </>
          )}

          {user?.role === 'Admin' || user?.role === 'Employee' ? (
            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-phone'></i> Assignee
              </label>
              <input
                type='text'
                name='assignee'
                readOnly
                placeholder={ticket?.assignee?.fname + ' ' + ticket?.assignee?.lname}    
                className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          ) : (
            <></>
          )}

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
              type='text'
              name='date_resolved'
              readOnly
              placeholder={
                ticket?.date_resolved
                  ? new Date(ticket?.date_resolved.toLocaleString())
                      .toISOString()
                      .split('T')[0]
                  : 'Not Resolved Yet'
              }
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
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
              <i className='mr-1 fa-solid fa-phone'></i> Ticket Status
            </label>
            <input
              type='text'
              name='status'
              readOnly
              placeholder={ticket?.status}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex justify-center mt-4'>
            <button
              onClick={back}
              className='w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80'
            >
              <i className='mr-1 fa-solid fa-arrow-left'></i>Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
