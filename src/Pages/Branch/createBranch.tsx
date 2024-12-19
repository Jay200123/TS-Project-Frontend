import { useBranchStore } from '../../state/store';
import { useFormik } from 'formik';
import { Image } from '../../components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createBranchValidationSchema } from '../../validations';

export default function () {
  const navigate = useNavigate();
  const { createBranch } = useBranchStore();

  const formik = useFormik({
    initialValues: {
      branch_name: '',
      address: '',
      phone: '',
      email: '',
      image: []
    },
    validationSchema: createBranchValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('branch_name', values.branch_name)
      formData.append('address', values.address)
      formData.append('phone', values.phone)
      formData.append('email', values.email)
      values.image.forEach(file => {
        formData.append('image', file)
      })

      try {
        await createBranch(formData)
        toast.success('Branch created successfully')
        navigate('/branches')
      } catch (err) {
        toast.error('Error cant create branch')
        formik.resetForm()

        if (err instanceof Error) {
          toast.error(err.message)
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
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='flex items-center justify-center p-4 m-4'
      >
        <div className='relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <h3
          onClick={back}
          className='absolute m-1 text-3xl transition-all duration-500 cursor-pointer top-1 left-1 hover:text-gray-700'
        >
          <i className='fa-solid fa-arrow-left'></i>
        </h3>
          <div className='hidden w-full mr-12 md:w-1/2 md:block'>
            <Image />
          </div>
          <div className='flex flex-col w-full space-y-4 md:w-1/2'>
            <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
              Create Branch
            </h2>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Branch Name
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
                <i className='mr-1 fa-solid fa-image'></i> Branch Image
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
