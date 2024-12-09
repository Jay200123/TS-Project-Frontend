import { useBranchStore, useDepartmentStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Image } from '../../components'
import { toast } from 'react-toastify'
import { createDepartmentValidationSchema } from '../../validations'

export default function () {
  const navigate = useNavigate()
  const { createDepartment } = useDepartmentStore()
  const { branches, getAllBranches } = useBranchStore()

  useQuery({
    queryKey: ['branches'],
    queryFn: getAllBranches
  })

  const formik = useFormik({
    initialValues: {
      branch: '',
      department_name: '',
      description: ''
    },
    validationSchema: createDepartmentValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('branch', values.branch )
      formData.append('department_name', values.department_name)
      formData.append('description', values.description)
      try {
        await createDepartment(formData)
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
            Create Department
          </h2>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-code-branch'></i> Branch
            </label>
            <select
              name='branch'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.branch}
              className='p-2 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[2.5rem]'
            >
              <option value='' disabled>
                Select a branch
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
            <i className="fa-solid fa-building"></i> Department Name
            </label>
            <input
              type='text'
              id='department_name'
              name='department_name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department_name}
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
