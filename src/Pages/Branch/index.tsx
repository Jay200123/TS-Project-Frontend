import DataTable, { TableColumn } from 'react-data-table-component'
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useBranchStore } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tableCustomStyles } from '../../utils/tableCustomStyles'
import { Branch } from '../../interface'

export default function () {
  const navigate = useNavigate()
  const { branches, loading, getAllBranches, deleteBranchById } =
    useBranchStore()

  useQuery({
    queryKey: ['branches'],
    queryFn: getAllBranches
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this Branch?')) {
      await deleteBranchById(id);
      toast.success('User Deleted Successfully');
    }
  }

  const columns: TableColumn<Branch>[] = [
    {
      name: 'Branch',
      selector: row => row?.branch_name,
      sortable: true
    },
    {
      name: 'Branch Address',
      selector: row => row.address,
      sortable: true
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true
      },
    {
      name: 'Contact Number',
      selector: row => row.phone,
      sortable: true
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
            onClick={() => navigate(`/branch/${row._id}`)}
          />
          <FaPencilAlt
            className='mr-2 text-xl text-blue-500'
            onClick={() => navigate(`/branch/edit/${row._id}`)}
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
            <button onClick={()=>navigate('/branch/create')}
             className='text-[16px] bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray'>
                Create New Branch <i className='fa fa-plus'></i>
                </button>
          </div>
            <DataTable
              title='Department Records'
              columns={columns}
              data={branches}
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
