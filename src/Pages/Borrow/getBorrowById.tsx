import { useBorrowStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function () {
  const { id } = useParams<{ id: string }>();
  const { borrow, getOneBorrow } = useBorrowStore();

  useQuery({
    queryKey: ["borrow", id],
    queryFn: () => getOneBorrow(id!),
    enabled: !!id,
  });

  const back = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex items-center justify-center p-4 m-4">
        <div className="flex relative flex-col w-full max-w-2xl  xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 overflow-hidden min-h-[24rem]">
          <h2 className="absolute text-xl font-bold text-center text-gray-800 md:text-3xl md:text-left">
            <i
              onClick={back}
              className="mr-2 transition-all duration-500 cursor-pointer fa-solid fa-arrow-left hover:opacity-80"
            ></i>
          </h2>
          <div className="hidden w-full h-full md:w-1/2 md:block min-h-[20rem]">
            <div className="flex flex-col items-center justify-center">
              <img
                className="object-cover max-w-sm rounded-l-lg max-h-sm"
                src={borrow?.signature}
                alt="Signature"
              />
              <h3 className="text-lg font-bold">User Signature</h3>
              <div className="flex flex-col m-1">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  <i className="fa-solid fa-code-branch"></i> Lend by:
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={
                    `${borrow?.lender?.fullname}, ${borrow?.lender?.position?.position_name}` ||
                    ""
                  }
                  className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-4 md:w-1/2">
            <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
              Borrow Details
            </h2>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-code-branch"></i> Branch
              </label>
              <input
                type="text"
                name="fullname"
                value={`${borrow?.user?.position?.department?.branch?.branch_name}`}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-building"></i> Department
              </label>
              <input
                type="text"
                name="fullname"
                value={`${borrow?.user?.position?.department?.department_name}`}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-user"></i> User
              </label>
              <input
                type="text"
                name="fullname"
                value={`${borrow?.user?.fullname}, ${borrow?.user?.position?.position_name}`}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-barcode"></i> Serial Number
              </label>
              <input
                type="text"
                id="serial_number"
                name="serial_number"
                value={borrow?.serial_number}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-boxes-stacked"></i> Quantity Borrowed
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={borrow?.quantity}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-pencil"></i>
                Reason for Borrowing Equipment
              </label>
              <textarea
                id="reason"
                name="reason"
                value={borrow?.reason}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="mr-1 fa-solid fa-info"></i>
                Status
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={borrow?.status}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
