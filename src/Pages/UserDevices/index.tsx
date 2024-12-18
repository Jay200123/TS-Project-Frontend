import { useQuery } from '@tanstack/react-query'
import { useAuthenticationStore, useDeviceStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()
  const { user: auth } = useAuthenticationStore()
  const { devices, getAllDevices } = useDeviceStore()

  useQuery({
    queryKey: ['devices'],
    queryFn: getAllDevices
  })

  const filteredDevices = devices.filter(
    device => device.owner?._id === auth?._id
  )

  return (
    <>
      <h3 className='m-2 text-sm font-bold md:text-lg'>My Devices</h3>
      {filteredDevices && filteredDevices.length > 0 ? (
        filteredDevices.map(d => (
          <div
            key={d?._id}
            className='flex flex-col justify-between m-6 items-center w-full h-full md:max-w-[1300px]'
          >
            <div className='flex-col flex md:flex-row items-center justify-start 300px md:h-[250px] md:w-full overflow-hidden rounded-md shadow-lg border border-gray'>
              <div className='flex flex-col items-center justify-center w-1/4 p-2 m-2'>
                <h3
                  className={`flex items-center justify-start text-sm font-bold md:text-lg ${
                    d?.status === 'Available' || d?.status === 'Used'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  <li className='text-[28px]'></li> Status:
                  <span className='ml-1'>{d?.status}</span>
                </h3>

                {d?.image?.length > 1 ? (
                  <img
                    className='w-[130px] h-[130px] md:w-[180px] md:h-[180px] shadow-md'
                    src={
                      d?.image[Math.floor(Math.random() * d.image.length)]
                        ?.url || ''
                    }
                    alt='Device'
                  />
                ) : (
                  <img
                    className='rounded-sm md:w-52 md:h-52 '
                    src={d?.image?.[0]?.url || ''}
                    alt='Device'
                  />
                )}
              </div>

              <div className='w-9/12 p-1'>
                <h1 className='font-bold text-[14px] md:text-[18px] m-1'>
                  Type:
                  <span className='text-[14px] md:text-[17px] font-medium'>
                    {d?.type}
                  </span>
                </h1>
                <h3 className='font-bold text-[14px] md:text-[17px] m-1'>
                  Description:
                </h3>
                <p className='text-[12px] md:text-[16px] m-1 p-1'>
                  {d?.description}
                </p>
                <h3 className='font-bold text-[12px] md:text-[16px]  mb-1'>
                  Serial Number:
                  <span className='font-medium underline'>
                    {d?.serial_number}
                  </span>
                </h3>

                <div className='flex items-center justify-between w-full'>
                  <p className='font-bold text-[12px] md:text-[17px] '>
                    Date Requested:
                    <span className='underline font-medium text-[10px] md:text-[16px]  m-1'>
                      {d?.date_requested
                        ? new Date(d.date_requested).toISOString().split('T')[0]
                        : 'N/A'}
                    </span>
                  </p>
                  <p className='font-bold text-[12px] md:text-[17px] '>
                    Date Purchased:
                    <span className='underline font-medium text-[10px] md:text-[16px] m-1'>
                      {d?.date_purchased
                        ? new Date(d.date_purchased).toISOString().split('T')[0]
                        : 'N/A'}
                    </span>
                  </p>
                </div>
                <div className='flex items-center justify-end'>
                  <button
                    className='md:p-2 m-[2px] p-1 text-xs md:text-[16px] font-semibold text-white bg-blue-500 rounded-md border border-blue-500 transition-all duration-500 hover:opacity-80'
                    onClick={() =>
                      navigate(`/employee/history/device/${d?._id}`)
                    }
                  >
                   Device History
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='mt-4 text-center'>
          <h3 className='text-xl font-bold'>No Devices Found</h3>
        </div>
      )}
    </>
  )
}
