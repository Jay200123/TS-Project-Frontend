import { useTicketStore, useAuthenticationStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaUserAlt,
} from 'react-icons/fa'
import DataTable, { TableColumn } from 'react-data-table-component'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import { Ticket } from '../../interface'
import FadeLoader from 'react-spinners/FadeLoader'
import { useState } from 'react'

export default function () {
  const navigate = useNavigate()
  const { tickets, loading, getAllTickets, deleteTicketById, closeTicketById, claimTicketById } =
    useTicketStore()
  const { user: auth } = useAuthenticationStore()
  const [setTicket, setSelectedTicket] = useState('')

  useQuery({
    queryKey: ['tickets'],
    queryFn: getAllTickets
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this Ticket?')) {
      await deleteTicketById(id)
      window.location.reload();
      toast.success('Ticket Deleted Successfully')
    }
  }

  const handleCheck = async (id: string) => {
    if (window.confirm('Are you sure you want to close this Ticket?')) {
      await closeTicketById(id)
      window.location.reload();
      toast.success('Ticket Closed Successfully')
    }
  }

  const handleAssign = async (id: string, assignee: string) => {
    if (window.confirm('Are you sure you want to assign this Ticket?')) {
       await claimTicketById(id, assignee);
       window.location.reload();
      toast.success('Ticket Successfully Assigned')
    }
  }

  const filteredTickets = tickets.filter(ticket =>
    ticket._id.includes(setTicket)
  )

  const columns: TableColumn<Ticket>[] = [
    {
      name: 'Ticket ID',
      selector: row => row?._id,
      sortable: true
    },
    {
      name: 'User',
      selector: row =>
        `${row?.device?.owner?.fullname}`,
      sortable: true
    },
    {
      name: 'Branch',
      selector: row => row?.device?.owner?.branch?.branch_name,
      sortable: true
    },
    {
      name: 'Department',
      selector: row => row?.device?.owner?.department?.department_name,
      sortable: true
    },
    {
      name: 'Position',
      selector: row => row?.device?.owner?.position?.position_name,
      sortable: true
    },
    {
      name: 'Device',
      selector: row => row?.device?.type,
      sortable: true
    },
    {
      name: 'Category',
      selector: row => row?.category,
      sortable: true
    },
    {
      name: 'Level',
      selector: row => row?.level,
      sortable: true
    },
    {
      name: 'Issue',
      selector: row => row?.description,
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row?.status,
      sortable: true
    },
    {
      name: 'Date Submitted',
      selector: row =>
        new Date(row.date_submitted.toLocaleString())
          .toISOString()
          .split('T')[0],
      sortable: true
    },
    {
      name: 'Date Resolved',
      selector: row =>
        row?.date_resolved
          ? new Date(row.date_resolved.toLocaleString())
              .toISOString()
              .split('T')[0]
          : 'Not Resolved',
      sortable: true
    },
    {
      name: 'Technician',
      selector: row =>
        row?.assignee
          ? `${row?.assignee?.fullname}`
          : 'Not Assigned',
      sortable: true
    },
    {
      name: 'Actions',
      cell: row =>
        auth?.role === 'Admin' ? (
          <div className='flex items-center text-center'>
            <FaEye
              className='mr-2 text-xl text-green-500'
              title='View Ticket'
              onClick={() => navigate(`/ticket/${row._id}`)}
            />

            {row?.assignee ? (
              <FaUserAlt
                className='mr-2 text-xl text-gray-500'
                title='Assign Technician'
                onClick={() => toast.error('Ticket already assigned')}
              />
            ) : (
              <FaUserAlt
                className='mr-2 text-xl text-blue-500'
                title='Assign Technician'
                onClick={() => navigate(`/ticket/assign/${row._id}`)}
              />
            )}

            {row?.status === 'closed' ? (
              <FaCheckCircle
                className='mr-2 text-xl text-gray-500'
                title='Close Ticket'
                onClick={() => toast.error('Ticket already closed')}
              />
            ) : (
              <FaCheckCircle
                className='mr-2 text-xl text-teal-500'
                title='Close Ticket'
                onClick={() => handleCheck(row?._id)}
              />
            )}

            <FaTrash
              className='text-xl text-red-500'
              title='Delete Ticket'
              onClick={() => handleDelete(row._id)}
            />
          </div>
        ) : (
          <div className='flex items-center text-center'>
            <FaEye
              className='mr-2 text-xl text-green-500'
              title='View Ticket'
              onClick={() => navigate(`/technician/ticket/${row._id}`)}
            />
            {row?.assignee ? (
              <FaUserAlt
                className='mr-2 text-xl text-gray-500'
                title='Assign Technician'
                onClick={() => toast.error('Ticket already assigned')}
              />
            ) : (
              <FaUserAlt
                className='mr-2 text-xl text-blue-500'
                title='Assign Technician'
                onClick={() => handleAssign(row._id, auth?._id.toString()!)}

              />
            )}
          </div>
        )
    }
  ]

  return (
    <div  className='flex items-center justify-center'>
      {loading ? (
        <div className='mt-8 loader'>
          <FadeLoader color='#FFB6C1' loading={true} height={15} width={5} />
        </div>
      ) : (
        <div>
          <div className='p-4 overflow-hidden bg-transparent rounded-lg sm:p-6 lg:p-8 w-[1250px]'>
            <div className='flex items-center justify-end'>
              <input
                type='text'
                className='w-1/4 p-1 mb-4 border border-gray-300 rounded-lg placeholder:text-black'
                onChange={e => setSelectedTicket(e.target.value)}
                placeholder='Find Ticket by ID (Enter Ticket ID)'
              />
            </div>
            <DataTable
              title='Ticket Records'
              columns={columns}
              data={filteredTickets}
              pagination
              highlightOnHover
              pointerOnHover
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30]}
              customStyles={tableCustomStyles}
            />
          </div>
        </div>
      )}
    </div>
  )
}
