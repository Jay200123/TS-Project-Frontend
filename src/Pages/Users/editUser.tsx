import {
  useUserStore,
  useBranchStore,
  useDepartmentStore,
  usePositionStore
} from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { editUserValidationSchema } from '../../validations'

export default function () {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user, getOneUser, updateUserById } = useUserStore()
  const { branches, getAllBranches } = useBranchStore()
  const { departments, getAllDepartments } = useDepartmentStore()
  const { positions, getAllPositions } = usePositionStore()

  useQuery({
    queryKey: ['user', id],
    queryFn: () => getOneUser(id!),
    enabled: !!id
  })

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
    enableReinitialize: true,
    initialValues: {
      branch: user?.branch || '',
      department: user?.department || '',
      position: user?.position || '',
      fullname: user?.fullname || '',
      phone: user?.phone || '',
      email: user?.email || '',
    },
    validationSchema: editUserValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('branch', values?.branch.toString())
      formData.append('department', values?.department?.toString())
      formData.append('position', values?.position?.toString())
      formData.append('fullname', values?.fullname)
      formData.append('phone', values?.phone)
      formData.append('email', values?.email)
      try {
        await updateUserById(user?._id!, formData)
        toast.success('User Information Successfully Updated')
        navigate(`/users`);
      } catch (error) {
        toast.error('User Update information failed to update')

        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unexpected error occurred')
        }
      }
    }
  }) 


      const back = () => {  
        window.history.back()
      }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex items-center justify-center p-4 m-4'
    >
      <div className='relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <h3 onClick={back} className='absolute m-1 text-3xl transition-all duration-500 cursor-pointer top-1 left-1 hover:text-gray-700'><i className="fa-solid fa-arrow-left"></i></h3>
        <div className='flex flex-col w-full space-y-4 md:w-full'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Edit & Update Information
          </h2>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-code-branch'></i> Branch
            </label>
            <select
              name='branch'
              id='branch'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.branch.toString()}
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
              id='department'
              value={formik.values.department.toString()}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='' disabled>
                Select a Department
              </option>
              {departments?.map(d => (
                <option key={d._id} value={d._id}>
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
              id='position'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.position.toString()}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='' disabled>
                Select Your Position
              </option>
              {positions?.map(p => (
                <option key={p._id} value={p._id}>
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
              <i className='mr-1 fa-solid fa-user'></i> Full Name
            </label>
            <input
              type='text'
              id='fullname'
              name='fullname'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Contact Number
            </label>
            <input
              type='text'
              id='phone'
              name='phone'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
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
