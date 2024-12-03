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
import { toast } from 'react-toastify'

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
      fname: user?.fname || '',
      lname: user?.lname || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      email: user?.email || '',
      image: user?.image || []
    },
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('branch', values?.branch.toString())
      formData.append('department', values?.department?.toString())
      formData.append('position', values?.position?.toString())
      formData.append('fname', values?.fname)
      formData.append('lname', values?.lname)
      formData.append('phone', values?.phone)
      formData.append('address', values?.address)
      formData.append('city', values?.city)
      formData.append('email', values?.email)
     Array.from(values?.image).forEach((files: any) => {
        formData.append('image', files)
      })

      try {
        const res = await updateUserById(user?._id!, formData)
        toast.success('User Profile Successfully Updated')

        if (res.role === 'Admin') {
          navigate('/admin/profile')
        } else if (res.role === 'Technician') {
          navigate('/technician/profile')
        } else {
          navigate('/employee/profile')
        }
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
    d => d.branch._id === formik.values.branch
  )

  const filteredPositions = positions?.filter(
    p => p.department._id === formik.values.department
  )

  const randomImage =
    Array.isArray(user?.image) && user.image.length > 0
      ? user.image[Math.floor(Math.random() * user.image.length)]
      : null

      const back = () => {  
        window.history.back()
      }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex items-center justify-center p-4 m-4'
    >
      <div className='relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <h3 onClick={back} className='top-1 left-1 absolute text-3xl m-1 cursor-pointer transition-all duration-500 hover:text-gray-700'><i className="fa-solid fa-arrow-left"></i></h3>
        <div className='hidden w-full md:w-1/2 md:block mr-12'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='text-center text-3xl mb-2 font-bold'>User Profile</h3>
            <img
              className='object-cover border border-black w-[280px] h-[280px] m-1 rounded-l-lg'
              src={randomImage?.url}
              alt={randomImage?.originalname}
            />
            <h3 className='text-2xl font-bold mt-1'>
              {user?.fname} <span> {user?.lname}</span>
            </h3>
          </div>
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
              value={formik.values.department.toString()}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
              value={formik.values.position.toString()}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='' disabled>
                Select Your Position
              </option>
              {filteredPositions?.map(p => (
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
              <i className='mr-1 fa-solid fa-user'></i> First Name
            </label>
            <input
              type='text'
              id='fname'
              name='fname'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fname}
              className='p-2  border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Last Name
            </label>
            <input
              type='text'
              id='lname'
              name='lname'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lname}
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
              <i className='mr-1 fa-solid fa-location-dot'></i> Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-city'></i> City
            </label>
            <input
              type='text'
              name='city'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
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

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-image'></i> Profile Image
            </label>
            <input
              type='file'
              id='image'
              name='image'
              multiple
              onBlur={formik.handleBlur}
              onChange={(event) => {
                const newFiles = Array.from(event.currentTarget.files || []);
                const currentImages = formik.values.image;
                formik.setFieldValue('image', [...currentImages, ...newFiles]);
              }}
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
