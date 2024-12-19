import { useDepartmentStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Image } from "../../components";

export default function () {
  const { id } = useParams<{ id: string }>();
  const { department, getOneDepartment } = useDepartmentStore();

  useQuery({
    queryKey: ["department", id],
    queryFn: () => getOneDepartment(id!),
    enabled: !!id,
  });

  const back = () => {  
    window.history.back()
  }

  return (
    <form className="flex items-center justify-center p-4 m-4">
      <div className="relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md relativw md:flex-row md:space-y-0 md:space-x-6">
      <h3
          onClick={back}
          className='absolute m-1 text-3xl transition-all duration-500 cursor-pointer top-1 left-1 hover:text-gray-700'
        >
          <i className='fa-solid fa-arrow-left'></i>
        </h3>
        <div className="hidden w-full mr-12 md:w-1/2 md:block">
        <Image/>
        </div>
        <div className="flex flex-col w-full space-y-4 md:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
            Department Details
          </h2>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
            <i className="fa-solid fa-code-branch"></i> Branch
            </label>
            <input
              type="text"
              name="branch"
              readOnly
              placeholder={department?.branch.branch_name}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
            <i className="fa-solid fa-building"></i> Department Name
            </label>
            <input
              type="text"
              name="department_name"
              readOnly
              placeholder={department?.department_name}
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
              placeholder={department?.description}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
