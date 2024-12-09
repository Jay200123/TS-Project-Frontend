import DataTable, { TableColumn } from 'react-data-table-component'
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDepartmentStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import { Department } from '../../interface'

export default function () {
  const navigate = useNavigate()
  const { departments, loading, getAllDepartments, deleteDepartmentById } =
    useDepartmentStore()

  useQuery({
    queryKey: ['departments'],
    queryFn: getAllDepartments
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this Department?')) {
      await deleteDepartmentById(id)
      toast.success('User Deleted Successfully')
    }
  }

  const columns: TableColumn<Department>[] = [
    {
      name: 'Branch',
      selector: row => row.branch.branch_name,
      sortable: true
    },
    {
      name: 'Department Name',
      selector: row => row.department_name,
      sortable: true
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true
    },

    {
      name: 'Actions',
      cell: row => (
        <div className='flex items-center text-center'>
          <FaEye
            className='mr-2 text-xl text-green-300'
            onClick={() => navigate(`/department/${row._id}`)}
          />
          <FaPencilAlt
            className='mr-2 text-xl text-blue-500'
            onClick={() => navigate(`/department/edit/${row._id}`)}
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
        <div className='flex items-center justify-center'>
          <div className='max-w-full p-4 overflow-hidden rounded-lg bg-none sm:p-6 lg:p-8 md:w-full'>
          <div className='flex items-center justify-end m-2'>
            <button onClick={()=>navigate('/department/create')}
             className='text-[16px] bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700'>
              Create Department <i className='fa fa-plus'></i>
              </button>
          </div>
            <DataTable
              title='Department Records'
              columns={columns}
              data={departments}
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
    </>
  )
}
