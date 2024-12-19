import {
  useBranchStore,
  useDepartmentStore,
  usePositionStore
} from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Image } from '../../components'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { createPositionValidationSchema } from '../../validations'

export default function () {
  const navigate = useNavigate();
  const { createPosition } = usePositionStore();
  const { branches, getAllBranches } = useBranchStore();
  const { departments, getAllDepartments } = useDepartmentStore();
  const [selectBranch, setSelectedBranch] = useState('');

  useQuery({
    queryKey: ['branches'],
    queryFn: getAllBranches
  })

  useQuery({
    queryKey: ['departments'],
    queryFn: getAllDepartments
  })

  const formik = useFormik({
    initialValues: {
      department: '',
      position_name: '',
      description: ''
    },
    validationSchema: createPositionValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('department', values.department)
      formData.append('position_name', values.position_name)
      formData.append('description', values.description)
      try {
        await createPosition(formData)
        toast.success('Department Info Successfully Updated')
        navigate('/departments')
      } catch (error) {
        toast.error('An unexpected error occurred')

        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unexpected error occurred')
        }
      }
    }
  })

  const filteredDepartments = departments?.filter(
    d => d.branch?._id === selectBranch
  )

  const back = () => {  
    window.history.back();
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex items-center justify-center p-4 m-4'
    >
      <div className='relative flex flex-col w-full max-w-2xl  xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 overflow-hidden min-h-[24rem]'>
      <h3
          onClick={back}
          className='absolute m-1 text-3xl transition-all duration-500 cursor-pointer top-1 left-1 hover:text-gray-700'
        >
          <i className='fa-solid fa-arrow-left'></i>
        </h3>
        <div className='hidden w-full md:w-1/2 md:block min-h-[20rem]'>
          <Image />
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Create Position
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
              className='p-2 text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[2.5rem]'
            >
              <option value='' disabled>
                Select a Department
              </option>
              {filteredDepartments?.map(b => (
                <option key={b._id} value={b._id}>
                  {b.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
            <i className="fa-solid fa-user"></i> Position Name
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
            <i className="fa-solid fa-pencil"></i> Department Description
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
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
