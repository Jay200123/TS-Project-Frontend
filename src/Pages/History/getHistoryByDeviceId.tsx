import { useHistoryStore } from '../../state/history'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function () {
  const { id } = useParams<{ id: string }>()
  const { histories, getAllHistories } = useHistoryStore()

  useQuery({
    queryKey: ['histories'],
    queryFn: getAllHistories
  })

  const filteredHistories = histories.filter(h => h?.ticket?.device?._id === id)
  const historyCount = filteredHistories.length

  if (filteredHistories.length === 0) {
    return (
      <div className='flex items-center justify-center h-full'>
        <h1 className='text-3xl text-gray-500'>No history found</h1>
      </div>
    )
  }

  return (
    <div className='p-7'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm md:text-2xl font-bold'>Device History</h3>
        <h3 className='text-sm md:text-xl font-bold'>
          Total History: {historyCount}
        </h3>
      </div>
      {filteredHistories.map(h => (
        <div
          key={h?._id}
          className='relative flex flex-col justify-evenly w-full'
        >
          <div className='flex-col flex md:flex-row items-center justify-start p-2 m-4 sm:h-[300px] md:h-[450px] overflow-hidden rounded-md shadow-lg border border-gray'>
            <div className='flex flex-col items-center justify-center w-1/4 p-2 m-2'>
              <h3 className='text-xs md:text-lg font-bold text-center'>
                Device Image
              </h3>
              {h?.ticket?.device?.image?.length > 1 ? (
                <img
                  className='w-[130px] h-[130px] md:w-[180px] md:h-[180px] shadow-md'
                  src={
                    h?.ticket?.device?.image[
                      Math.floor(
                        Math.random() * h?.ticket?.device?.image?.length
                      )
                    ]?.url
                  }
                  alt='test image'
                />
              ) : (
                <img
                  className='rounded-sm md:w-52 md:h-52'
                  src={h?.ticket?.device?.image?.[0]?.url || ''}
                  alt='image'
                />
              )}
            </div>
            <div className='w-9/12 p-1'>
              <div className='flex items-center justify-between'>
                <h1 className='font-bold text-[14px] md:text-[18px] m-1'>
                  Device:{' '}
                  <span className='text-[14px] md:text-[18px] font-medium'>
                    {h?.ticket?.device?.type}
                  </span>
                </h1>
                <h1
                  className={`font-bold text-[14px] md:text-[18px] m-1 ${
                    h?.ticket?.device?.status === 'Used' || 'Available'
                      ? 'text-green-500'
                      : 'text-black'
                  }`}
                >
                  {h?.ticket?.device?.status}
                </h1>
              </div>
              <h3 className='font-bold text-[14px] md:text-[17px] m-1'>
                Description:
              </h3>
              <p className='text-[12px] md:text-[16px] m-1 p-1'>
                {h?.ticket?.device?.description}
              </p>
              <h3 className='font-bold text-[12px] md:text-[16px] mb-1'>
                Serial Number:{' '}
                <span className='font-medium underline'>
                  {h?.ticket?.device?.serial_number}
                </span>
              </h3>
              <h3 className='font-bold text-[12px] md:text-[16px] mb-1'>
                {h?.ticket?.category[0]?.toUpperCase() +
                  h?.ticket?.category.slice(1)}{' '}
                Issue
              </h3>
              <h3
                className={`underline font-bold text-[12px] md:text-[18px] mb-1 ${
                  h?.ticket?.level === 'priority' ||
                  h?.ticket?.level === 'urgent'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {h?.ticket?.level[0]?.toUpperCase() +
                  h?.ticket?.level?.slice(1)}
              </h3>
              <h3 className='font-bold text-[12px] md:text-[17px] m-1'>
                Concern:
              </h3>
              <textarea
                readOnly
                className='placeholder:text-black w-full h-20 p-1 text-[12px] md:text-[16px] border border-gray rounded-md'
                placeholder={h?.ticket?.description}
              />
              <div className='flex flex-col md:flex-row items-center justify-between'>
                <p className='font-bold text-[12px] md:text-[17px]'>
                  Date Submitted:
                  <span className='underline font-medium text-[10px] md:text-[16px] m-1'>
                    {
                      new Date(h?.ticket?.date_submitted.toLocaleString())
                        .toISOString()
                        .split('T')[0]
                    }
                  </span>
                </p>
                <p className='font-bold text-[12px] md:text-[17px]'>
                  Date Resolved:
                  <span
                    className={`underline font-medium text-[10px] md:text-[16px] m-1 ${
                      h?.ticket?.date_resolved ? `text-black` : `text-red-700`
                    }`}
                  >
                    {h?.ticket?.date_resolved
                      ? new Date(h?.ticket?.date_resolved.toLocaleString())
                          .toISOString()
                          .split('T')[0]
                      : 'Not Resolved'}
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
