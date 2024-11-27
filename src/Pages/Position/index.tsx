import DataTable, { TableColumn } from 'react-data-table-component'
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { usePositionStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import { Position } from '../../interface'

export default function () {
  const navigate = useNavigate()
  const { positions, loading, getAllPositions, deletePositionById } =
    usePositionStore()

  useQuery({
    queryKey: ['positions'],
    queryFn: getAllPositions
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this Position?')) {
      await deletePositionById(id)
      toast.success('User Deleted Successfully')
    }
  }

  const columns: TableColumn<Position>[] = [
    {
      name:'Branch',
      selector: row => row.department?.branch?.branch_name,
      sortable: true
    },
    {
      name: 'Department',
      selector: row => row.department?.department_name,
      sortable: true
    },
    {
      name: 'Position Name',
      selector: row => row.position_name,
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
            onClick={() => navigate(`/position/${row._id}`)}
          />
          <FaPencilAlt
            className='mr-2 text-xl text-blue-500'
            onClick={() => navigate(`/position/edit/${row._id}`)}
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
        <div>
          <div className='max-w-full p-4 overflow-hidden bg-none rounded-lg sm:p-6 lg:p-8 sm:max-w-6xl'>
          <div className='flex items-center justify-end m-2'>
            <button onClick={()=>navigate('/position/create')} 
             className='text-[16px] bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700'>
              Create Position<i className='fa fa-plus'></i>
              </button>
          </div>
            <DataTable
              title='Position Records'
              columns={columns}
              data={positions}
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
