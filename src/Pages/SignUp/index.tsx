import { Image } from '../../components';


export default function RegistrationForm() {
  return (
    <form className="flex items-center justify-center bg-gray-100 m-4 p-4">
      <div className="flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6">
        <div className="hidden w-full md:w-1/2 md:block">
          <Image />
        </div>
        <div className="flex flex-col w-full space-y-4 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">Register Your Account</h2>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-user mr-1"></i> First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-user mr-1"></i> Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-phone mr-1"></i> Contact Number
            </label>
            <input
              type="text"
              placeholder="Enter your contact number"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-location-dot mr-1"></i> Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-city mr-1"></i> City
            </label>
            <input
              type="text"
              placeholder="Enter your city"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-envelope mr-1"></i> Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-lock mr-1"></i> Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-image mr-1"></i> Profile Image
            </label>
            <input
              type="file"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
