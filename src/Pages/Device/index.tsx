import DataTable, { TableColumn } from 'react-data-table-component'
import { FaEye, FaPencilAlt, FaTrash, FaHourglass } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDeviceStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import { Device } from '../../interface'
import { type } from '../../utils/arrays'
import { useState } from 'react'
import { DeviceStatus } from '../../interface'

export default function () {
  const navigate = useNavigate()
  const { devices, loading, getAllDevices, deleteDeviceById } = useDeviceStore()
  const [deviceType, setDeviceType] = useState('')

  useQuery({
    queryKey: ['devices'],
    queryFn: getAllDevices
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this Device?')) {
      await deleteDeviceById(id)
      toast.success('Device Deleted Successfully')
    }
  }

  type StatusCount = Record<DeviceStatus, number>

  const statusCounts = devices?.reduce<StatusCount>(
    (acc, device) => {
      acc[device.status] = (acc[device.status] || 0) + 1
      return acc
    },
    {
      Available: 0,
      Used: 0,
      Repair: 0,
      Replacement: 0,
      Disposal: 0,
      Return: 0
    }
  )

  const filteredDevice = devices?.filter(d => d?.type?.includes(deviceType))

  const columns: TableColumn<Device>[] = [
    {
      name: 'Owner',
      selector: row => `${row?.owner?.fullname}`,
      sortable: true
    },
    {
      name: 'Device Type',
      selector: row => row?.type,
      sortable: true
    },
    {
      name: 'Description',
      selector: row => row?.description,
      sortable: true
    },
    {
      name: 'Price',
      selector: row => row?.price,
      sortable: true
    },
    {
      name: 'Serial Number',
      selector: row => row?.serial_number,
      sortable: true
    },
    {
      name: 'Date Requested',
      selector: row =>
        new Date(row?.date_requested.toLocaleString())
          .toISOString()
          .split('T')[0],
      sortable: true
    },
    {
      name: 'Date Purchased',
      selector: row =>
        new Date(row?.date_purchased.toLocaleString())
          .toISOString()
          .split('T')[0],
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row?.status,
      sortable: true
    },
    {
      name: 'Images',
      cell: row => {
        const randomImage =
          row?.image?.length > 0
            ? row.image[Math.floor(Math.random() * row.image?.length)]
            : null

        return (
          <div className='grid items-center justify-center'>
            {randomImage && (
              <img
                className='object-center w-10 h-10 rounded-full'
                src={randomImage?.url}
                alt={randomImage?.originalname}
              />
            )}
          </div>
        )
      }
    },
    {
      name: 'Actions',
      cell: row => (
        <div className='flex items-center text-center'>
          <FaEye
            className='mr-2 text-xl text-green-300'
            onClick={() => navigate(`/device/${row._id}`)}
          />
          <FaPencilAlt
            className='mr-2 text-xl text-blue-300'
            onClick={() => navigate(`/device/edit/${row._id}`)}
          />
          <FaHourglass
            onClick={() => navigate(`/history/device/${row?._id}`)}
            className='text-gray-500 mr-2 text-xl'
          />
          <FaTrash
            className='text-xl text-red-500'
            onClick={() => handleDelete(row._id)}
          />
        </div>
      )
    }
  ]

  return (
    <div className='flex items-center justify-center'>
      {loading ? (
        <div className='mt-8 loader'>
          <FadeLoader color='#FFB6C1' loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className='max-w-full p-4 m-6 overflow-hidden bg-none rounded-lg sm:p-6 lg:p-8 md:w-full'>
          <div className='p-2 m-1 rounded-md shadow-lg w-[250px]'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold m-[2px] text-red-500'>
                Available: {statusCounts?.Available}
              </h3>
              <h3 className='text-lg font-semibold m-[2px] text-orange-500'>
                Used: {statusCounts?.Used}
              </h3>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold m-[2px] text-green-500'>
                Repair: {statusCounts?.Repair}
              </h3>
              <h3 className='text-lg font-semibold m-[2px] text-blue-500'>
                Disposal: {statusCounts?.Disposal}
              </h3>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold m-[2px] text-gray-500'>
                Replacement: {statusCounts?.Replacement}
              </h3>
              <h3 className='text-lg font-semibold m-[2px] text-red-500'>
                Return: {statusCounts?.Return}
              </h3>
            </div>
          </div>
          <div className='flex items-center justify-between m-2'>
            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='fa-solid fa-computer'></i> Filter Device
              </label>
              <select
                name='type'
                id='type'
                onChange={e => setDeviceType(e.target.value)}
                value={deviceType}
                className='w-[150px] text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
              >
                <option value='' disabled>
                  Device Type
                </option>
                {type?.map((t, index) => (
                  <option key={index} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigate('/device/create')}
              className='text-[16px] bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700'
            >
              Create Device<i className='fa fa-plus ml-[2px]'></i>
            </button>
          </div>
          <DataTable
            title='Device Records'
            columns={columns}
            data={filteredDevice}
            pagination
            highlightOnHover
            pointerOnHover
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            customStyles={tableCustomStyles}
          />
        </div>
      )}
    </div>
  )
}
