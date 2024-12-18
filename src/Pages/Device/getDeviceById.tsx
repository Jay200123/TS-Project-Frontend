import { useDeviceStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function () { 
  const { id } = useParams<{ id: string }>();
  const { device, getOneDevice } = useDeviceStore();

  useQuery({
    queryKey: ["device", id],
    queryFn: () => getOneDevice(id!),
  });

  const randomImage =
    Array.isArray(device?.image) && device.image.length > 0
      ? device.image[Math.floor(Math.random() * device.image.length)]
      : null;

      const back = () => {
        window.history.back();
      }

  return (
    <>
      <form className="flex items-center justify-center p-4 m-4">
        <div className="relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6">
        <h3
          onClick={back}
          className='absolute m-1 text-3xl transition-all duration-500 cursor-pointer top-1 left-1 hover:text-gray-700'
        >
          <i className='fa-solid fa-arrow-left'></i>
        </h3>
          <div className="hidden w-full mr-12 md:w-1/2 md:block">
            <img
              className="object-cover max-w-sm rounded-l-lg max-h-sm"
              src={randomImage?.url}
              alt={randomImage?.originalname}
            />
          </div>
          <div className="flex flex-col w-full space-y-4 md:w-1/2">
            <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
              Device Details
            </h2>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-computer"></i> Device  
              </label>
              <input
                type="text"
                name="type"
                readOnly
                placeholder={device?.type}
                className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-pencil"></i> Description
              </label>
              <textarea
                name="description"
                readOnly
                placeholder={device?.description}
                className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-calendar"></i> Date Requested
              </label>
              <input
                type="text"
                name="date_requested"
                readOnly
                placeholder={device?.date_requested ? new Date(device?.date_requested.toLocaleString()).toISOString().split('T')[0] : 'Not Purchased'}                
                className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-calendar"></i> Date Purchased
              </label>
              <input
                type="text"
                name="date_purchased" 
                readOnly
                placeholder={device?.date_purchased ? new Date(device?.date_purchased.toLocaleString()).toISOString().split('T')[0] : 'Not Purchased'}                
                className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-circle-info"></i> Device Status
              </label>
              <input
                type="text"
                name="date_purchased" 
                readOnly
                placeholder={device?.status}                
                className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
