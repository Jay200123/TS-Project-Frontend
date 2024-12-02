import { useBranchStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { branch, getOneBranch } = useBranchStore()

  useQuery({
    queryKey: ['branch', id],
    queryFn: () => getOneBranch(id!),
    enabled: !!id
  })

  const randomImage =
    Array.isArray(branch?.image) && branch.image.length > 0
      ? branch.image[Math.floor(Math.random() * branch.image.length)]
      : null

  const back = () => {
    navigate('/branches')
  }

  return (
    <form className='flex items-center justify-center p-4 m-4'>
      <div className='flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <div className='hidden w-full md:w-1/2 md:block mr-12'>
          <img
            className='object-cover max-w-sm max-h-sm rounded-l-lg'
            src={randomImage?.url}
            alt={randomImage?.originalname}
          />
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            Branch Details
          </h2>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-user'></i> Branch Name
            </label>
            <input
              type='text'
              name='branch_name'
              readOnly
              placeholder={branch?.branch_name}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
            <i className="fa-solid fa-address-book"></i> Branch Address
            </label>
            <input
              type='text'
              name='address'
              readOnly
              placeholder={branch?.address}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Contact Number
            </label>
            <input
            type='text'
              name='phone'
              readOnly
              placeholder={branch?.phone}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
            <i className="fa-solid fa-envelope"></i> Branch Email
            </label>
            <input
            type='text'
              name='email'
              readOnly
              placeholder={branch?.email}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex justify-center mt-4'>
            <button
              onClick={back}
              className='w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80'
            >
              <i className='fa-solid fa-arrow-left mr-1'></i>Go Back
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
