import { useTicketStore, useUserStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import DataTable, { TableColumn } from 'react-data-table-component'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import { Ticket } from '../../interface'
import FadeLoader from 'react-spinners/FadeLoader'
import { useState } from 'react'

export default function () {
  const { tickets, loading, getAllTickets } = useTicketStore()
  const { users, getAllUsers } = useUserStore()

  const [setTicket, setSelectedTicket] = useState('')
  const [setAssignee, setSelectedAssignee] = useState('')
  const [setStartDate, setSelectedStartDate] = useState('')
  const [setEndDate, setSelectedEndDate] = useState('')

  useQuery({
    queryKey: ['tickets'],
    queryFn: getAllTickets
  })

  useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });

  const filteredTechnicians = users?.filter(user => user?.role?.toLowerCase() === 'technician');    

  const filteredTickets = tickets.filter(
    ticket =>
      ticket?.assignee?._id?.includes(setAssignee) &&
      new Date(ticket?.date_submitted) >= new Date(setStartDate) &&
      new Date(ticket?.date_submitted) <= new Date(setEndDate)
  )

  const selectedTickets = filteredTickets.filter(t => t?.ticketNumber?.includes(`IT-T-${setTicket}`) || t?.ticketNumber?.includes(`IT-T-${setTicket}`))          

  const columns: TableColumn<Ticket>[] = [
    {
      name: 'Ticket No.',
      selector: row => row?.ticketNumber,
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
      name: 'Assigned to',
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
          <div className='p-4 overflow-hidden bg-transparent rounded-lg w-full sm:p-6 lg:p-8 md:w-[1200px] h-full'>
            <h3 className='text-lg font-semibold '>Ticket Count: {filteredTickets?.length}</h3>
            <div className='flex flex-col md:flex-row items-center justify-between w-full'>
              <div className='flex flex-col m-2'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                  <i className='fa-solid fa-user'></i> Select Technician
                </label>
                <select
                  onChange={e => setSelectedAssignee(e.target.value)}
                  className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
                >
                  <option value='' disabled>
                    Select a Technician
                  </option>
                  {filteredTechnicians?.map(u => (
                    <option key={u?._id} value={u?._id}>
                      {u?.fullname}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col  m-2'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className="fa-solid fa-calendar"></i> Start Date
                </label>
                <input
                  type='date'
                  onChange={e => setSelectedStartDate(e.target.value)}
                />
              </div>

              <div className='flex flex-col  m-2'>
                <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className="fa-solid fa-calendar"></i> End Date
                </label>
                <input
                  type='date'
                  onChange={e => setSelectedEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className='flex items-center justify-end mt-2'>
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
              data={selectedTickets}
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
