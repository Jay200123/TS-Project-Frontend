import { useHistoryStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { FaEye, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DataTable, { TableColumn } from 'react-data-table-component'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import type { History } from '../../interface'
import { FadeLoader } from 'react-spinners'
import { useState } from 'react'

export default function History () {
  const navigate = useNavigate()
  const { histories, loading, getAllHistories, deleteHistoryById } =
    useHistoryStore()
  const [setFilter, setSelectedFilter] = useState('')

  useQuery({
    queryKey: ['histories'],
    queryFn: getAllHistories
  })

 
  const filteredHistory = histories.filter((h) =>
    h?.ticket._id.includes(setFilter) || h?.ticket?.device?._id.includes(setFilter) || h?.ticket?.device?.type.includes(setFilter)
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this History?')) {
      await deleteHistoryById(id)
      toast.success('History Deleted Successfully')
    }
  }

  const columns: TableColumn<History>[] = [
    {
      name: 'User',
      selector: row =>
        `${row.ticket?.device?.owner.fname} ${row.ticket?.device?.owner.lname}`,
      sortable: true
    },
    {
      name: 'Department',
      selector: row => row.ticket?.device?.owner.department?.department_name,
      sortable: true
    },
    {
      name: 'Device',
      selector: row => row.ticket?.device?.type,
      sortable: true
    },
    {
      name: 'Device Status',
      selector: row => row.ticket?.device?.status,
      sortable: true
    },
    {
      name: 'Serial Number',
      selector: row => row.ticket?.device?.serial_number,
      sortable: true
    },
    {
      name: 'Issue',
      selector: row => row.ticket?.description,
      sortable: true
    },
    {
      name: 'Submission Date',
      selector: row =>
        row.ticket?.date_submitted
          ? new Date(row.ticket?.date_submitted.toLocaleString())
              .toISOString()
              .split('T')[0]
          : 'N/A',
      sortable: true
    },
    {
      name: 'Date Resolved',
      selector: row =>
        row.ticket?.date_resolved
          ? new Date(row.ticket?.date_resolved.toLocaleString())
              .toISOString()
              .split('T')[0]
          : 'N/A',
      sortable: true
    },
    {
      name: 'Findings',
      selector: row =>
        row?.ticket?.findings ? row.ticket.findings : 'No Findings',
      sortable: true
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <button
            onClick={() => navigate(`/history/${row._id}`)}
            className='btn btn-primary mr-2 text-green-500'
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className='btn btn-danger text-red-500'
          >
            <FaTrash />
          </button>
        </div>
      )
    }
  ]

  return (
    <>
      {loading ? (
        <div className='mt-8 loader'>
          <FadeLoader color='#FFB6C1' loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className='max-w-full p-4 m-6 overflow-hidden bg-white rounded-lg sm:p-6 lg:p-8 sm:max-w-6xl'>
          <div className='flex items-center justify-end'>
            <input
              type='text'
              className='w-1/4 p-1 mb-4 border border-gray-300 rounded-lg placeholder:text-black'
              onChange={e => setSelectedFilter(e.target.value)}
              placeholder='Enter device or Ticket ID'
            />
          </div>
          <DataTable
            title='Device History Records'
            columns={columns}
            data={filteredHistory}
            pagination
            highlightOnHover
            pointerOnHover
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            customStyles={tableCustomStyles}
          />
        </div>
      )}
    </>
  )
}
