import { Image } from '../../components'
import { useFormik } from 'formik'
import { userValidationSchema } from '../../validations'
import {
  useUserStore,
  useBranchStore,
  useDepartmentStore,
  usePositionStore
} from '../../state/store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function () {
  const navigate = useNavigate()
  const { createUser } = useUserStore()
  const { branches, getAllBranches } = useBranchStore()
  const { departments, getAllDepartments } = useDepartmentStore()
  const { positions, getAllPositions } = usePositionStore()

  useQuery({
    queryKey: ['branches'],
    queryFn: getAllBranches
  })

  useQuery({
    queryKey: ['departments'],
    queryFn: getAllDepartments
  })

  useQuery({
    queryKey: ['positions'],
    queryFn: getAllPositions
  })

  const formik = useFormik({
    initialValues: {
      idnumber: '',
      fullname: '',
      phone: '',
      email: '',
      role: 'Employee',
      branch: '',
      department: '',
      position: ''
    },
    validationSchema: userValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('idnumber', values.idnumber)
      formData.append('fullname', values.fullname)
      formData.append('phone', values.phone)
      formData.append('email', values.email)
      formData.append('branch', values.branch)
      formData.append('position', values.position)
      formData.append('department', values.department)

      try {
        await createUser(formData)
        toast.success('User Created Successfully')
        navigate('/users')
      } catch (error) {
        toast.error('User Registration failed')

        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unexpected error occurred')
        }
      }
    }
  })

  const filteredDepartments = departments?.filter(
    d => d.branch?._id === formik.values.branch
  )

  const filteredPositions = positions?.filter(
    p => p.department?._id === formik.values.department
  )

  const back = () => {
    window.history.back()
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex items-center justify-center p-4 m-4'
    >
      <div className='relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
      <h3
            onClick={back}
            className='top-1 left-1 absolute text-3xl m-1 cursor-pointer transition-all duration-500 hover:text-gray-700'
          >
            <i className='fa-solid fa-arrow-left'></i>
          </h3>
        <div className='hidden w-full md:w-1/2 md:block'>
          <Image />
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Employee Registration
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
                <option key={b?._id} value={b?._id}>
                  {b.branch_name}
                </option>
              ))}
            </select>
            <div className='min-h-[1.25rem]'>
              {formik.touched.branch && formik.errors.branch && (
                <div className='text-sm text-red-500'>
                  {formik.errors.branch}
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-building'></i> Department
            </label>
            <select
              name='department'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='' disabled>
                Select a Department
              </option>
              {filteredDepartments?.map(d => (
                <option key={d?._id} value={d?._id}>
                  {d.department_name}
                </option>
              ))}
            </select>
            {formik.touched.department && formik.errors.department ? (
              <div className='text-sm text-red-500'>
                {formik.errors.department}
              </div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-building'></i> Employee Position
            </label>
            <select
              name='position'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.position}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='' disabled>
                Select Your Position
              </option>
              {filteredPositions?.map(p => (
                <option key={p?._id} value={p?._id}>
                  {p.position_name}
                </option>
              ))}
            </select>
            {formik.touched.position && formik.errors.position ? (
              <div className='text-sm text-red-500'>
                {formik.errors.position}
              </div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
            <i className="fa-solid fa-id-badge"></i> Employee ID Number
            </label>
            <input
              type='text'
              name='idnumber'
              id='idnumber'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.idnumber}
              placeholder='Enter User ID Number'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
              {formik.touched.idnumber && formik.errors.idnumber ? (
              <div className='text-sm text-red-500'>
                {formik.errors.idnumber}
              </div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Full Name
            </label>
            <input
              type='text'
              name='fullname'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
              placeholder='Enter User Full Name'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
              {formik.touched.fullname && formik.errors.fullname ? (
              <div className='text-sm text-red-500'>
                {formik.errors.fullname}
              </div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Contact Number
            </label>
            <input
              type='text'
              name='phone'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder='Enter your contact number'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
              {formik.touched.phone && formik.errors.phone ? (
              <div className='text-sm text-red-500'>
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-envelope'></i> Email
            </label>
            <input
              type='email'
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder='Enter your email'
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
              {formik.touched.email && formik.errors.email ? (
              <div className='text-sm text-red-500'>
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className='flex justify-center mt-4'>
          <button
              type="submit"
              disabled={!formik.isValid}
              className={`w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-gray-700 border border-gray-500 rounded-md hover:opacity-80 ${
                !formik.isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
