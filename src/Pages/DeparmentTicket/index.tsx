import { useTicketStore, useAuthenticationStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Ticket } from '../../interface'
import FadeLoader from 'react-spinners/FadeLoader'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()
  const { user } = useAuthenticationStore()
  const { tickets, getAllTickets, loading } = useTicketStore()
  const [setTicket, setSelectedTicket] = useState('')

  useQuery({
    queryKey: ['tickets'],
    queryFn: getAllTickets
  })

  //filters the ticket based on the department of the current user with ticket status
  const departmentTickets = tickets?.filter(
    t =>
      (t?.device?.owner?.department?.department_name ===
        user?.department?.department_name &&
        t?.status === 'pending') ||
      t?.status === 'in-progress'
  )

  //will filter the ticket based on the ticket id on input textbox
  const filteredTickets = departmentTickets.filter(ticket =>
    ticket._id.includes(setTicket)
  )

  const ticket = () => {
    navigate('/ticket/create')
  }

  if (filteredTickets.length === 0) {
    return (
      <div className='flex flex-col p-2 items-center justify-center h-full'>
        <h1 className='text-3xl text-gray-500'>No Tickets found</h1>
        <button
          onClick={() => ticket()}
          className='text-[16px] m-2 bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700'
        >
          Create Ticket<i className='fa fa-plus ml-[2px]'></i>
        </button>
      </div>
    )
  }

  const columns: TableColumn<Ticket>[] = [
    {
      name: 'Ticket ID',
      selector: row => row?._id,
      sortable: true
    },
    {
      name: 'User',
      selector: row => `${row?.device?.owner?.fullname}`,
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
        row?.assignee ? `${row?.assignee?.fullname}` : 'Not Assigned',
      sortable: true
    }
  ]

  return (
    <div className='flex items-center justify-center'>
      {loading ? (
        <div className='mt-8 loader'>
          <FadeLoader color='#FFB6C1' loading={true} height={15} width={5} />
        </div>
      ) : (
        <div>
          <div className='p-4 overflow-hidden bg-transparent rounded-lg w-full sm:p-6 lg:p-8 md:max-w-5xl h-full'>
            <div className='flex items-center justify-between'>
              <input
                type='text'
                className='w-1/4 p-1 mb-4 border border-gray-300 rounded-lg placeholder:text-black'
                onChange={e => setSelectedTicket(e.target.value)}
                placeholder='Find Ticket by ID (Enter Ticket ID)'
              />
              <button
                onClick={() => ticket()}
                className='text-[16px] bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700'
              >
                Create Ticket<i className='fa fa-plus ml-[2px]'></i>
              </button>
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
