import { useAuthenticationStore, useUserStore } from '../../state/store';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function () {
  const navigate = useNavigate();
  const { user: auth } = useAuthenticationStore();
  const { user, userProfile } = useUserStore();

  useQuery({
    queryKey: ['user', auth?._id],
    queryFn: () => userProfile(auth?._id || ''),
    enabled: !!auth?._id,
  });
  
  const randomImage =
    Array.isArray(user?.image) && user.image.length > 0
      ? user.image[Math.floor(Math.random() * user.image.length)]
      : null;

      const updateProfile = () => {
        navigate(`/user/edit/${user?._id}`);
      };

  return (
    <div className='flex items-center justify-center p-4 m-4'>
      <div className='flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6'>
        <div className='hidden w-full md:w-1/2 md:block mr-12'>
          <div className='flex flex-col h-full items-center justify-center'>
            <img
              className='h-80 w-80 object-cover border border-black rounded-full'
              src={randomImage?.url}
              alt={randomImage?.originalname}
            />
            <h3 className='text-2xl font-bold mt-1'>{user?.fname} <span> {user?.lname}</span></h3>
          </div>
        </div>
        <div className='flex flex-col w-full space-y-4 md:w-1/2'>
          <h2 className='text-2xl font-bold text-center text-gray-800 md:text-left'>
            User Profile
          </h2>
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
            <i className="fa-solid fa-code-branch mr-[1px]"></i>Branch
            </label>
            <input
              type='text'
              readOnly
              placeholder={user?.branch?.branch_name}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex items-centerjustify-between w-full'>
            <div className='flex flex-col w-1/2'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className="fa-solid fa-sitemap mr-[2px]"></i> Department
              </label>
              <input
                type='text'
                readOnly
                placeholder={user?.department?.department_name}
                className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex flex-col w-1/2 ml-1'>
              <label className='mb-1 text-sm font-medium text-gray-700'>
                <i className='mr-1 fa-solid fa-user'></i> Position
              </label>
              <input
                type='text'
                readOnly
                placeholder={user?.position?.position_name}
                className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-phone'></i> Contact Number
            </label>
            <input
              type='text'
              name='phone'
              readOnly
              placeholder={user?.phone}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-location-dot'></i> Address
            </label>
            <input
              type='text'
              readOnly
              placeholder={user?.address}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-city'></i> City
            </label>
            <input
              type='text'
              readOnly
              placeholder={user?.city}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              <i className='mr-1 fa-solid fa-envelope'></i> Email
            </label>
            <input
              type='email'
              readOnly
              placeholder={user?.email}
              className='p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex justify-center mt-4'>
            <button onClick={updateProfile} className='w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80'>
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
