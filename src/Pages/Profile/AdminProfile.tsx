import { useAuthenticationStore } from "../../state/store";

export default function(){
    const { user } = useAuthenticationStore();  
    const randomImage =
    Array.isArray(user?.image) && user.image.length > 0
      ? user.image[Math.floor(Math.random() * user.image.length)]
      : null;

  return (
    <div className="flex items-center justify-center p-4 m-4">
      <div className="flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6">
        <div className="hidden w-full md:w-1/2 md:block mr-12">
          <img className="rounded-full border border-black max-w-sm max-h-sm rounded-l-lg" src={randomImage?.url} alt={randomImage?.originalname} />
        </div>
        <div className="flex flex-col w-full space-y-4 md:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
            User Profile
          </h2>
          <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-user"></i> First Name
            </label>
            <input
              type="text"
              name="fname"
              readOnly
              placeholder={user?.fname}
              className="p-2 m-6 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-user"></i> Last Name
            </label>
            <input
              type="text"
              name="lname"
              readOnly
              placeholder={user?.lname}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-phone"></i> Contact Number
            </label>
            <input
              type="text"
              name="phone"
              readOnly
              placeholder={user?.phone}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-location-dot"></i> Address
            </label>
            <input
              type="text"
              name="address"
              readOnly
              placeholder={user?.address}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-city"></i> City
            </label>
            <input
              type="text"
              name="city"
              readOnly
              placeholder={user?.city}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-envelope"></i> Email
            </label>
            <input
              type="email"
              name="email"
              readOnly
              placeholder={user?.email}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button className="w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80">
            Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}