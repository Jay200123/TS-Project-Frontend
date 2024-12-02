import { useBranchStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Image } from '../../components'
import { toast } from 'react-toastify'

export default function () {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { branch, getOneBranch, updateBranchById } = useBranchStore()
  useQuery({
    queryKey: ['branch', id],
    queryFn: () => getOneBranch(id!),
    enabled: !!id
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: branch?._id || '',
      branch_name: branch?.branch_name || '',
      address: branch?.address || '',
      phone: branch?.phone || '',
      email: branch?.email || '',
      image: []
    },
    onSubmit: async (values) => {
      const formData = new FormData()
      formData.append('branch_name', values.branch_name)
      formData.append('address', values.address)
      formData.append('phone', values.phone)
      formData.append('email', values.email)
      Array.from(values.image).forEach((files: any) => {
        formData.append('image', files)
      })

      try {
        await updateBranchById(branch?._id!, formData)
        toast.success('Branch Info Successfully Updated')
        navigate('/branches')
      } catch (error) {
        toast.error('Update Information failed')
        formik.resetForm()

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
            <i className="fa-solid fa-code-branch"></i> Branch Name
            </label>
            <input
              type='text'
              id='branch_name'
              name='branch_name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.branch_name}
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
            <i className="fa-solid fa-address-book"></i> Branch Address
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
            <i className="fa-solid fa-envelope"></i> Branch Email
            </label>
            <input
            type='text'
              id='email'
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
              onChange={event => {
                const files = event.currentTarget.files
                  ? Array.from(event.currentTarget.files)
                  : []
                formik.setFieldValue('image', files)
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
