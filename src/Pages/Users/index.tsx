import DataTable, { TableColumn } from 'react-data-table-component'
import { FaEye, FaTrash, FaPenAlt, FaKey } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import { User } from '../../interface'
import { useState } from 'react'

export default function () {
  const navigate = useNavigate()
  const { users, loading, getAllUsers, resetPassword, deleteUserById } = useUserStore()
  const[findUser, setFindUser] = useState(''); 

  useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this User?')) {
      await deleteUserById(id)
      toast.success('User Deleted Successfully')
    }
  }

  const handleReset = async(id: string)=>{
    if(window.confirm('Are you sure you want to reset this User Password?')){ 
      await resetPassword(id)
      toast.success('Password Reset Successfully')
    }
  }

  const filteredUsers = users?.filter(u => u?.fullname?.includes(findUser) || u?.idnumber?.includes(findUser))

  const columns: TableColumn<User>[] = [
    {
      name: 'First Name',
      selector: row => row?.fullname,
      sortable: true
    },
    {
      name: 'ID Number',
      selector: row => row?.idnumber,
      sortable: true
    },
    {
      name: 'Contact Number',
      selector: row => row?.phone,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row?.email,
      sortable: true
    },
    {
      name: 'Branch',
      selector: row => row.branch?.branch_name
    },
    {
      name: 'Department',
      selector: row => row.department?.department_name
    },
    {
      name: 'Position',
      selector: row => (row.position ? row.position.position_name : 'N/A')
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true
    },
    {
      name: 'Actions',
      cell: row => (
        <div className='flex items-center text-center'>
          <FaEye
            className='mr-2 text-xl text-green-500'
            onClick={() => navigate(`/user/${row._id}`)}
          />
          <FaPenAlt
            className='mr-2 text-xl text-blue-500'
            onClick={() => navigate(`/user/edit/${row._id}`)}
          />
          <FaKey
            className='mr-2 text-xl text-yellow-500'
            onClick={() => handleReset(row._id)}
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
        <div className='max-w-full p-4 m-6 overflow-hidden bg-white rounded-lg sm:p-6 lg:p-8 md:w-full'>
          <div className='flex items-center justify-between m-2'>
            <button
              onClick={() => navigate('/admin/signup')}
              className='text-[16px] bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700'
            >
              Add New User<i className='fa fa-plus ml-[2px]'></i>
            </button>
            <input
                type='text'
                className='w-1/4 p-2 mb-4 border border-gray-400 rounded-lg placeholder:text-black'
                onChange={e => setFindUser(e.target.value)}
                placeholder='Find User'
              />
          </div>

          <DataTable
            title='Users Records'
            columns={columns}
            data={filteredUsers}
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
