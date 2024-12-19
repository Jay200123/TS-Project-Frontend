import { useUserStore, useBranchStore, useDepartmentStore, usePositionStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function () {
  const { id } = useParams<{ id: string }>();
  const { user, getOneUser } = useUserStore();
  const { branch, getOneBranch } = useBranchStore();
  const { department, getOneDepartment } = useDepartmentStore();
  const { position, getOnePosition } = usePositionStore();

  useQuery({
    queryKey: ["user", id],
    queryFn: () => getOneUser(id!),
    enabled: !!id,
  });

  useQuery({
    queryKey: ["branch", user?.branch?.toString()],
    queryFn: () => getOneBranch(user?.branch.toString()!),
    enabled: !!user?.branch?.toString(),
  });

  useQuery({
    queryKey: ["department", user?.department?.toString()],
    queryFn: () => getOneDepartment(user?.department?.toString()!),
    enabled: !!user?.department?.toString(),
  });

  useQuery({
    queryKey: ["position", user?.position?.toString()],
    queryFn: () => getOnePosition(user?.position?.toString()!),
    enabled: !!user?.position?.toString(),
  });

  const back = () => {
    window.history.back(); 
  };

  return (
    <div className="flex items-center justify-center p-4 m-4">
      <div className="relative flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6">
      <h3
          onClick={back}
          className='absolute m-1 text-3xl transition-all duration-500 cursor-pointer top-1 left-1 hover:text-gray-700'
        >
          <i className='fa-solid fa-arrow-left'></i>
        </h3>
        <div className="flex flex-col w-full space-y-4 md:w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
            User Details
          </h2>
                    
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
            <i className="fa-solid fa-code-branch"></i>Branch
            </label>
            <input
              type="text"
              name="branch"
              readOnly
              placeholder={branch?.branch_name}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
            <i className="mr-1 fa-solid fa-building"></i>Department
            </label>
            <input
              type="text"
              name="department"
              readOnly
              placeholder={department?.department_name}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
            <i className="mr-1 fa-solid fa-user"></i>Position
            </label>
            <input
              type="text"
              name="position"
              readOnly
              placeholder={position?.position_name}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-user"></i> Full Name
            </label>
            <input
              type="text"
              name="fullname"
              readOnly
              placeholder={user?.fullname}
              className="p-2 placeholder-black border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
        </div>
      </div>
    </div>
  );
}
