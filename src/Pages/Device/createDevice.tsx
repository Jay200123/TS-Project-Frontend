import {
  useDeviceStore,
  useBranchStore,
  useDepartmentStore,
  useUserStore
} from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Image } from '../../components'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { type, status } from '../../utils/arrays'; 

export default function () {
  const navigate = useNavigate()
  const { branches, getAllBranches } = useBranchStore()
  const { departments, getAllDepartments } = useDepartmentStore()
  const { users, getAllUsers } = useUserStore()
  const { createDevice } = useDeviceStore()

  const [selectBranch, setSelectedBranch] = useState('')
  const [selectDepartment, setSelectedDepartment] = useState('')

  useQuery({
    queryKey: ['branches'],
    queryFn: getAllBranches
  })

  useQuery({
    queryKey: ['departments'],
    queryFn: getAllDepartments
  })

  useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  const formik = useFormik({
    initialValues: {
      owner: '',
      type: '',
      description: '',
      date_requested: '',
      date_purchased: '',
      serial_number: '',
      status: '',
      image: []
    },
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('owner', values.owner)
      formData.append('type', values.type)
      formData.append('description', values.description)
      formData.append('date_requested', values.date_requested)
      formData.append('date_purchased', values.date_purchased)
      formData.append('serial_number', values.serial_number)
      formData.append('status', values.status)
      values.image.forEach(file => {
        formData.append('image', file)
      })
      try {
        await createDevice(formData)
        toast.success('Device Info Successfully Created')
        navigate('/devices')
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
    d => selectBranch.includes(d?.branch?._id)
  );
  const filteredUsers = users?.filter(
    u => selectDepartment.includes(u?.department?._id)  
  );

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='flex items-center justify-center p-4 m-4'
      >
        <div className='flex flex-col w-full max-w-2xl  xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 overflow-hidden min-h-[24rem]'>
          <div className='hidden w-full md:w-1/2 md:block min-h-[20rem]'>
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
                <i className='fa-solid fa-code-branch'></i> Department
              </label>
              <select
                name='department'
                onChange={e => setSelectedDepartment(e.target.value)}
                value={selectDepartment}
                className='p-2 text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[2.5rem]'
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
                <i className='fa-solid fa-code-branch'></i> Device User
              </label>
              <select
                name='owner'
                id='owner'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.owner}
                className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
              >
                <option value='' disabled>
                  Select a User
                </option>
                {filteredUsers?.map(u => (
                  <option key={u?._id} value={u?._id}>
                    {u?.fname} {u?.lname}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='fa-solid fa-code-branch'></i> Device User
              </label>
              <select
                name='type'
                id='type'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.type}
                className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
              >
                <option value='' disabled>
                  Device Type
                </option>
                {type?.map((t, index) => (
                  <option key={index} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Serial Number
              </label>
              <input
                type='text'
                id='serial_number'
                name='serial_number'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.serial_number}
                className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-phone'></i>
                Description
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

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-phone'></i>
                Date Requested
              </label>
              <input
                type='date'
                id='date_requested'
                name='date_requested'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date_requested}
                className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-phone'></i>
                Date Purchased
              </label>
              <input
                type='date'
                id='date_purchased'
                name='date_purchased'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date_purchased}
                className='p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='fa-solid fa-code-branch'></i> Device Status
              </label>
              <select
                name='status'
                id='status'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.status}
                className='w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]'
              >
                <option value='' disabled>
                  Device Status
                </option>
                {status?.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-image'></i> Device Image
              </label>
              <input
                type='file'
                name='image'
                multiple
                onChange={e => {
                  const files = Array.from(e.currentTarget.files || [])
                  formik.setFieldValue('image', files)
                }}
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
    </>
  )
}
