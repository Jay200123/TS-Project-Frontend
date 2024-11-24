import DataTable, { TableColumn } from 'react-data-table-component'
import { FaEye, FaTrash } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import { User } from '../../interface'

export default function () {
  const navigate = useNavigate()
  const { users, loading, getAllUsers, deleteUserById } = useUserStore()

  useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  console.log(users)

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this User?')) {
      await deleteUserById(id)
      toast.success('User Deleted Successfully')
    }
  }

  const columns: TableColumn<User>[] = [
    {
      name: 'First Name',
      selector: row => row.fname,
      sortable: true
    },
    {
      name: 'Last Name',
      selector: row => row.lname,
      sortable: true
    },
    {
      name: 'Contact Number',
      selector: row => row.phone,
      sortable: true
    },
    {
      name: 'Adress',
      selector: row => row.address,
      sortable: true
    },
    {
      name: 'City',
      selector: row => row.city,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Branch',
      selector: row => row.branch.branch_name
    },
    {
      name: 'Department',
      selector: row => row.department.department_name
    },
    {
      name: 'Position',
      selector: row => (row.position ? row.position.position_name : 'N/A')
    },
    {
      name: 'Images',
      cell: row => {
        const randomImage =
          row.image?.length > 0
            ? row.image[Math.floor(Math.random() * row.image?.length)]
            : null

        return (
          <div className='grid items-center justify-center'>
            {randomImage && (
              <img
                className='object-center w-10 h-10 rounded-full'
                src={randomImage.url}
                alt={randomImage.originalname}
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
            onClick={() => navigate(`/admin/user/${row._id}`)}
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
    <>
      {loading ? (
        <div className='mt-8 loader'>
          <FadeLoader color='#FFB6C1' loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-6xl overflow-hidden'>
          <DataTable
            title='Users Records'
            columns={columns}
            data={users}
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
