import {
  useBranchStore,
  useDepartmentStore,
  usePositionStore
} from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Image } from '../../components'
import { toast } from 'react-toastify'
import { useState } from 'react'

export default function EditPosition () {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { departments, getAllDepartments } = useDepartmentStore()
  const { branches, getAllBranches } = useBranchStore()
  const { position, getOnePosition, updatePositionById } = usePositionStore()

  const [selectBranch, setSelectedBranch] = useState('')

  useQuery({
    queryKey: ['branches'],
    queryFn: getAllBranches
  })

  useQuery({
    queryKey: ['departments'],
    queryFn: getAllDepartments,
    enabled: !!id
  })

  useQuery({
    queryKey: ['position', id],
    queryFn: () => getOnePosition(id!)
  })

  const filteredDepartments = departments?.filter(
    d => d.branch?._id === selectBranch || d._id === position?.department?._id
  )

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: position?._id || '',
      department: position?.department?._id || '',
      position_name: position?.position_name || '',
      description: position?.description || ''
    },
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('department', values.department)
      formData.append('position_name', values.position_name)
      formData.append('description', values.description)

      try {
        await updatePositionById(position?._id!, formData)
        toast.success('Position Info Successfully Updated')
        navigate('/positions')
      } catch (error) {
        toast.error('Update failed')
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unexpected error occurred')
        }
      }
    }
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex items-center justify-center p-4 m-4'
    >
      <div className='flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <div className='hidden w-full md:w-1/2 md:block mr-12'>
          <Image />
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Edit & Update Information
          </h2>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-code-branch'></i> Branch
            </label>
            <select
              name='branch'
              onChange={e => setSelectedBranch(e.target.value)}
              value={selectBranch}
              className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
            >
              <option value='' disabled>
                Select a Branch
              </option>
              {branches?.map(b => (
                <option key={b._id} value={b._id}>
                  {b.branch_name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
            <i className="fa-solid fa-building"></i> Department
            </label>
            <select
              name='department'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
              className='p-2 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[2.5rem]'
            >
              <option value='' disabled>
                Select a Department
              </option>
              {filteredDepartments?.map(d => (
                <option key={d._id} value={d._id}>
                  {d.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Position Name
            </label>
            <input
              type='text'
              id='position_name'
              name='position_name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.position_name}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
            <i className="fa-solid fa-pencil"></i> Description
            </label>
            <textarea
              id='description'
              name='description'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex justify-center mt-4'>
            <button
              type='submit'
              className='w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80'
            >
              Update Information
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
