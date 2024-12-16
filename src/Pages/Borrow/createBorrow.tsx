import {
  useBranchStore,
  useDepartmentStore,
  useUserStore,
  useBorrowStore,
  useAuthenticationStore,
  useEquipmentStore,
} from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Image } from "../../components";
import { toast } from "react-toastify";
import { createDeviceValidationSchema } from "../../validations";
import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";

export default function () {
  const navigate = useNavigate();
  const { branches, getAllBranches } = useBranchStore();
  const { departments, getAllDepartments } = useDepartmentStore();
  const { users, getAllUsers } = useUserStore();
  const { createBorrow } = useBorrowStore();
  const { equipments, getAllEquipments } = useEquipmentStore();
  const { user: auth } = useAuthenticationStore();

  const [selectBranch, setSelectedBranch] = useState("");
  const [selectDepartment, setSelectedDepartment] = useState("");

  useQuery({
    queryKey: ["branches"],
    queryFn: getAllBranches,
  });

  useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });

  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  useQuery({
    queryKey: ["equipments"],
    queryFn: getAllEquipments,
  });

  const sigCanvas = useRef<SignatureCanvas>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      const base64Data = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setSignature(base64Data);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: "",
      lender: auth?._id?.toString() || "",
      equipment: "",
      serial_number: "",
      reason: "",
      quantity: "",
      signature: signature || "",
    },
    validationSchema: createDeviceValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("user", values.user);
      formData.append("lender", values.lender?.toString());
      formData.append("equipment", values.equipment);
      formData.append("serial_number", values.serial_number);
      formData.append("reason", values.reason);
      formData.append("quantity", values.quantity);
      formData.append("signature", values?.signature);
      try {
        await createBorrow(formData);
        toast.success("Borrow Record Successfully Created");
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

  const filteredDepartments = departments?.filter((d) =>
    selectBranch.includes(d?.branch?._id)
  );
  const filteredUsers = users?.filter((u) =>
    selectDepartment.includes(u?.department?._id)
  );

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex items-center justify-center p-4 m-4"
      >
        <div className="flex flex-col w-full max-w-2xl  xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 overflow-hidden min-h-[24rem]">
          <div className="hidden w-full h-full md:w-1/2 md:block min-h-[20rem]">
            <div className="flex flex-col items-center justify-between">
              <Image />
              <h3 className="text-lg font-bold">User Signature</h3>
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                backgroundColor="#d9d9d9"
                canvasProps={{
                  width: 250,
                  height: 150,
                  className: "sigCanvas",
                }}
              />
            </div>
            <div className="flex items-center justify-center w-full mt-3 space-x-4">
              <button onClick={clearSignature}>Clear</button>
              <button onClick={saveSignature}>Save</button>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-4 md:w-1/2">
            <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
              Create Borrow Forms
            </h2>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-code-branch"></i> Branch
              </label>
              <select
                name="branch"
                onChange={(e) => setSelectedBranch(e.target.value)}
                value={selectBranch}
                className="w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]"
              >
                <option value="" disabled>
                  Select a Branch
                </option>
                {branches?.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branch_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-building"></i> Department
              </label>
              <select
                name="department"
                onChange={(e) => setSelectedDepartment(e.target.value)}
                value={selectDepartment}
                className="p-2 text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[2.5rem]"
              >
                <option value="" disabled>
                  Select a Department
                </option>
                {filteredDepartments?.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-user"></i>User
              </label>
              <select
                name="user"
                id="user"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.user}
                className="w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]"
              >
                <option value="" disabled>
                  Select a User
                </option>
                {filteredUsers?.map((u) => (
                  <option key={u?._id} value={u?._id}>
                    {u?.fullname}
                  </option>
                ))}
              </select>
              {formik.touched.user && formik.errors.user ? (
                <div className="text-sm text-red-500">{formik.errors.user}</div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-toolbox"></i> Equipment
              </label>
              <select
                name="equipment"
                id="equipment"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik?.values.equipment}
                className="w-full text-base border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[2.5rem]"
              >
                <option value="" disabled>
                  Equipment
                </option>
                {equipments?.map((e) => (
                  <option key={e?._id} value={e?._id}>
                    {e?.equipment_name}
                  </option>
                ))}
              </select>
              {formik.touched.equipment && formik.errors.equipment ? (
                <div className="text-sm text-red-500">
                  {formik.errors.equipment}
                </div>
              ) : null}
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
                Create Borrow Record
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
