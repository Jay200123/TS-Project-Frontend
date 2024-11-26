import { usePositionStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Image } from "../../components";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { position, getOnePosition } = usePositionStore();

  useQuery({
    queryKey: ["position", id],
    queryFn: () => getOnePosition(id!),
    enabled: !!id,
  });

  const back = () => {
    navigate("/positions");    
  };

  return (
    <form className="flex items-center justify-center p-4 m-4">
      <div className="flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6">
        <div className="hidden w-full md:w-1/2 md:block mr-12">
        <Image/>
        </div>
        <div className="flex flex-col w-full space-y-4 md:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
           Position Details
          </h2>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-user"></i> Branch
            </label>
            <input
              type="text"
              name="branch"
              readOnly
              placeholder={position?.department?.branch.branch_name}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-user"></i> Department Name
            </label>
            <input
              type="text"
              name="department_name"
              readOnly
              placeholder={position?.department?.department_name}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-user"></i> Position Name
            </label>
            <input
              type="text"
              name="department_name"
              readOnly
              placeholder={position?.position_name}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-phone"></i> Description
            </label>
            <textarea
              name="description"
              readOnly
              placeholder={position?.description}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={back} className="w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80">
            <i className="fa-solid fa-arrow-left mr-1"></i>Go Back
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
