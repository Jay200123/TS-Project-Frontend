import { useBorrowStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { createBorrowValidationSchema } from "../../validations";
import { borrowStatus } from "../../utils/arrays";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { borrow, getOneBorrow, updateBorrowById } = useBorrowStore();

  useQuery({
    queryKey: ["borrow", id],
    queryFn: () => getOneBorrow(id!),
    enabled: !!id,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: borrow?.user?._id?.toString() || "",
      lender: borrow?.lender?._id?.toString() || "",
      equipment: borrow?.equipment?._id.toString() || "",
      serial_number: borrow?.serial_number || "",
      reason: borrow?.reason || "",
      quantity: borrow?.quantity || "",
      status: borrow?.status || "",
      signature: borrow?.signature || "",
    },
    validationSchema: createBorrowValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("user", values.user);
      formData.append("lender", values.lender);
      formData.append("equipment", values.equipment);
      formData.append("serial_number", values.serial_number);
      formData.append("reason", values.reason);
      formData.append("quantity", values.quantity?.toString());
      formData.append("status", values.status);
      formData.append("signature", values?.signature);
      try {
        await updateBorrowById(id!, formData);
        toast.success("Borrow Record Successfully Updated");
        navigate("/borrows");
      } catch (error) {
        toast.error("An unexpected error occurred");
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex items-center justify-center p-4 m-4"
      >
        <div className="flex flex-col w-full max-w-2xl  xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 overflow-hidden min-h-[24rem]">
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
                value={`${borrow?.lender?.fullname}, ${borrow?.lender?.position?.position_name}` || ""} 
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-4 md:w-1/2">
            <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
              Edit & Update Information
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.serial_number}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.serial_number && formik.errors.serial_number ? (
                <div className="text-sm text-red-500">
                  {formik.errors.serial_number}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-boxes-stacked"></i> Quantity Borrowed
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="text-sm text-red-500">
                  {formik.errors.quantity}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-pencil"></i>
                Reason for Borrowing Equipment
              </label>
              <textarea
                id="reason"
                name="reason"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.reason}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.reason && formik.errors.reason ? (
                <div className="text-sm text-red-500">
                  {formik.errors.reason}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-user"></i>User
              </label>
              <select
                name="status"
                id="status"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.status}
                className="w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]"
              >
                <option value="" disabled>
                  Status
                </option>
                {borrowStatus?.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {formik.touched.status && formik.errors.status ? (
                <div className="text-sm text-red-500">
                  {formik.errors.status}
                </div>
              ) : null}
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className={`w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-gray-700 border border-gray-500 rounded-md ${
                  !formik.isValid
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-80"
                }`}
                disabled={!formik.isValid}
              >
                Update Information
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
