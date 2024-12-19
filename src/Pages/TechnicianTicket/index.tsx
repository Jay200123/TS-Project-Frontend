import { useQuery } from '@tanstack/react-query'
import { useAuthenticationStore, useTicketStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function () {
  const navigate = useNavigate()
  const { user: auth } = useAuthenticationStore()
  const { tickets, getAllTickets } = useTicketStore()

  useQuery({
    queryKey: ['tickets'],
    queryFn: getAllTickets
  })

  const filteredTickets = tickets.filter(t => t.assignee?._id === auth?._id)

  if (tickets.length === 0) {
    ;<h3 className='text-center text-sm md:text-[18px]'>No Devices Found</h3>
  }

  return (
    <div className='p-7'>
      <h3 className='text-sm font-bold md:text-2xl'>My Tickets</h3>
      {filteredTickets.map(t => (
        <div key={t?._id} className='relative flex flex-col justify-evenly'>
          <div className='flex-col flex md:flex-row items-center justify-start p-2 m-4 h-[300px] md:h-[550px] w-[75rem] overflow-hidden rounded-md shadow-lg border border-gray'>
            <div className='flex flex-col items-center justify-center w-1/4 p-2 m-2'>
              <h3 className='text-xs font-bold text-center md:text-lg'>
                Ticket Image
              </h3>
              {t?.image?.length > 1 ? (
                <img
                  className='w-[130px] h-[130px] md:w-[180px] md:h-[180px] shadow-md'
                  src={
                    t?.image[Math.floor(Math.random() * t?.image.length)]?.url
                  }
                  alt='test image'
                />
              ) : (
                <img
                  className='rounded-sm md:w-52 md:h-52'
                  src={t?.image[0]?.url || ''}
                  alt='image'
                />
              )}
              <button
                onClick={() => navigate(`/technician/ticket/${t?._id}`)}
                className='p-1 m-2 text-sm text-white transition-all duration-500 bg-green-500 rounded-md md:p-3 md:text-lg hover:bg-green-800'
              >
                More Details
              </button>
            </div>
            <div className='w-9/12 p-1'>
              <div className='flex items-center justify-between'>
                <h1 className='font-bold text-[14px] md:text-[18px] m-1'>
                  Device:{' '}
                  <span className='text-[14px] md:text-[18px] font-medium'>
                    {t?.device?.type}
                  </span>
                </h1>
                <h1
                  className={`font-bold text-[14px] md:text-[18px] m-1 ${
                    t?.status === 'pending' ? 'text-green-500' : 'text-black'
                  }`}
                >
                  {t?.status}
                </h1>
              </div>
              <h3 className='font-bold text-[14px] md:text-[17px] m-1'>
                Description:
              </h3>
              <p className='text-[12px] md:text-[16px] m-1 p-1'>
                {t?.device?.description}
              </p>
              <h3 className='font-bold text-[12px] md:text-[16px] mb-1'>
                Serial Number:{' '}
                <span className='font-medium underline'>
                  {t?.device?.serial_number}
                </span>
              </h3>
              <h3 className='font-bold text-[12px] md:text-[16px] mb-1'>
                {t?.category[0]?.toUpperCase() + t?.category.slice(1)} Issue
              </h3>
              <h3
                className={`underline font-bold text-[12px] md:text-[18px] mb-1 ${
                  t?.level === 'priority' || t?.level === 'urgent'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {t?.level[0]?.toUpperCase() + t?.level.slice(1)}
              </h3>
              <h3 className='font-bold text-[12px] md:text-[17px] m-1'>
                Concern:
              </h3>
              <textarea
                readOnly
                className='placeholder:text-black w-full h-20 p-1 text-[12px] md:text-[16px] border border-gray rounded-md'
                placeholder={t?.description}
              />
               <h3 className='font-bold text-[12px] md:text-[17px] m-1'>
                Findings:
              </h3>
              <textarea
                readOnly
                className='placeholder:text-black w-full h-20 p-1 text-[12px] md:text-[16px] border border-gray rounded-md'
                placeholder={t?.findings}
              />
              <div className='flex flex-col items-center justify-between md:flex-row'>
                <p className='font-bold text-[12px] md:text-[17px]'>
                  Date Submitted:
                  <span className='underline font-medium text-[10px] md:text-[16px] m-1'>
                    {
                      new Date(t?.date_submitted.toLocaleString())
                        .toISOString()
                        .split('T')[0]
                    }
                  </span>
                </p>
                <p className='font-bold text-[12px] md:text-[17px]'>
                  Date Resolved:
                  <span
                    className={`underline font-medium text-[10px] md:text-[16px] m-1 ${
                      t?.date_resolved ? `text-black` : `text-red-700`
                    }`}
                  >
                    {t?.date_resolved
                      ? new Date(t?.date_resolved.toLocaleString())
                          .toISOString()
                          .split('T')[0]
                      : 'Not Resolved'}
                  </span>
                </p>
              </div>
              <div className='flex items-center justify-between mt-2'>
                <p className='font-bold text-[12px] md:text-[17px]'>
                  Submitted By:
                  <span className='font-medium text-[10px] md:text-[16px] mr-1'>
                    {t?.device?.owner?.position?.position_name},
                  </span>
                  <span className='font-medium text-[10px] md:text-[16px]'>
                    {t?.device?.owner?.fullname}
                  </span>{' '}
                  from{' '}
                  <span className='font-medium text-[10px] md:text-[16px] m-1'>
                    {t?.device?.owner?.department?.department_name}
                  </span>
                </p>
                {t?.status === 'resolved' || t?.status === 'closed' ? (
                  <button
                    onClick={() =>
                     toast.error('Ticket Closed')
                    }
                    className={` p-1 md:p-2 bg-gray-700 text-white text-sm md:text-lg rounded-md border border-gray-700 transition-all duration-500 hover:bg-white hover:text-black`}
                  >
                    Update Ticket
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate(`/technician/ticket/edit/${t?._id}`)
                    }
                    className={`p-1 md:p-2 bg-gray-700 text-white text-sm md:text-lg rounded-md border border-gray-700 transition-all duration-500 hover:bg-white hover:text-black`}
                  >
                    Update Ticket
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
