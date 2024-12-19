import { useAuthenticationStore, useHistoryStore,  } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function () {
  const { user } = useAuthenticationStore();
  const { id } = useParams<{ id:string}>();

 const { history, getOneHistory } = useHistoryStore();

 useQuery({
    queryKey: ["history", id],
    queryFn: () => getOneHistory(id!),
    enabled: true
 });

 
  const back = () => {
    window.history.back()
  }

  const randomImage =
  history?.ticket?.image &&  history?.ticket.image.length > 0
      ? history?.ticket.image[Math.floor(Math.random() *  history?.ticket?.image.length)]
      : null

  return (
    <div className='flex items-center justify-center p-4 m-4'>
      <div className='relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
      <h3
          onClick={back}
          className='absolute m-1 text-3xl transition-all duration-500 cursor-pointer top-1 left-1 hover:text-gray-700'
        >
          <i className='fa-solid fa-arrow-left'></i>
        </h3>
        <div className='hidden w-full mr-12 md:w-1/2 md:block'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='mb-1 text-2xl font-bold'>Ticket Image</h3>
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
                placeholder={ history?.ticket?.description}
                className='p-2 w-[350px] h-[120px] placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
           History Details
          </h2>

          {user?.role === 'Admin' || user?.role === 'Employee' ? (
            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-phone'></i> Assignee
              </label>
              <input
                type='text'
                name='assignee'
                readOnly
                placeholder={ history?.ticket?.assignee?.fullname}    
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
              placeholder={ history?.ticket?.device?.type}
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
              placeholder={ history?.ticket?.description}
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
              placeholder={ history?.ticket?.device?.description}
              className='h-20 p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                history?.ticket?.date_submitted
                  ? new Date( history?.ticket?.date_submitted.toLocaleString())
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
                history?.ticket?.date_resolved
                  ? new Date( history?.ticket?.date_resolved.toLocaleString())
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
              placeholder={ history?.ticket?.level}
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
              placeholder={ history?.ticket?.status}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
