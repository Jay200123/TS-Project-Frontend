import { useState } from 'react'
import { useTicketStore, useAuthenticationStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { ticketStatus } from '../../utils/arrays'

export default function () {
  const { user: auth } = useAuthenticationStore()
  const { tickets, getAllTickets } = useTicketStore()
  const [selectStatus, setSelectStatus] = useState('')

  useQuery({
    queryKey: ['tickets'],
    queryFn: getAllTickets
  })

  const userTickets = tickets.filter(t => t?.device?.owner?._id === auth?._id)

  const filteredTickets = userTickets.filter(t =>
    t?.status.includes(selectStatus)
  )

  return (
    <div className='w-full '>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-sm md:text-2xl font-bold'>{ filteredTickets.length === 0 ? "No Tickets Yet" : "My Tickets"}</h3>
          <div className='flex flex-col m-3'>
            <select
              name='branch'
              onChange={e => setSelectStatus(e.target.value)}
              value={selectStatus}
              className='p-1 text-sm border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[2.5rem]'
            >
              <option value=''>All Tickets</option>
              {ticketStatus?.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      {filteredTickets.map(t => (
        <div key={t?._id} className='p-6 flex flex-col justify-evenly w-[1200px]'>
          <div className='flex-col flex md:flex-row items-center justify-start p-2 m-4 sm:h-[300px] md:h-[450px] overflow-hidden rounded-md shadow-lg border border-gray'>
            <div className='flex flex-col items-center justify-center w-1/4 p-2 m-2'>
              <h3 className='text-xs md:text-lg font-bold text-center'>
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
               <h3 className='text-xs md:text-lg font-bold text-center'>
                Ticket No. : {t?.ticketNumber} 
              </h3>
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
              <div className='flex flex-col md:flex-row items-center justify-between'>
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
                  Technician:
                  <span className='font-medium text-[10px] md:text-[16px] m-1'>
                    {t?.assignee ? `${t?.assignee?.fullname}` : 'Not Assigned'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
