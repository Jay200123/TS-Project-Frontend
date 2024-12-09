import { useAuthenticationStore, useUserStore } from '../../state/store'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { editPasswordValidationSchema } from '../../validations'

export default function () {
  const navigate = useNavigate()
  const { error, user: auth } = useAuthenticationStore()
  const { changePassword } = useUserStore()

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: editPasswordValidationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('password', values.password)
      formData.append('newPassword', values.newPassword)
      formData.append('confirmPassword', values.confirmPassword)

      if (values?.newPassword !== values?.confirmPassword) {
        toast.error('Password does not match')
      }

      const res = await changePassword(auth?._id!, formData)

      toast.success('Password Changed successfully')
      if (res?.role === 'Admin') {
        navigate('/dashboard')
      } else if (res?.role === 'Employee') {
        navigate('/employee/tickets')
      } else if (res?.role === 'Technician') {
        navigate('/technician/all-tickets')
      } else {
        toast.error(error)
      }
    }
  })

  return (
    <form
      onSubmit={formik?.handleSubmit}
      className='flex items-center justify-center p-4 m-4'
    >
      <div className='flex flex-col w-[450px] md:max-w-2xl lg:max-w-4xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <div className='flex flex-col w-full space-y-4 '>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Change Password
          </h2>
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-asterisk m-[2px]'></i>
              <i className='fa-solid fa-asterisk m-[2px]'></i>
              <i className='fa-solid fa-asterisk m-[2px]'></i>Default Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
              {formik.touched.password && formik.errors.password ? (
              <div className='text-sm text-red-500'>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-lock'></i>New Password
            </label>
            <input
              type='password'
              name='newPassword'
              id='newPassword'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
              {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className='text-sm text-red-500'>
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='fa-solid fa-lock'></i>Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className='text-sm text-red-500'>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className='flex justify-center mt-4'>
            <button
              type='submit'
              className={`w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-gray-700 border border-gray-500 rounded-md ${
                !formik.isValid
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-80'
              }`}
              disabled={!formik.isValid}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
