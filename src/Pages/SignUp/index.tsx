import { Image } from "../../components";
import { useFormik } from "formik";
import { userValidationSchema } from "../../validations";
import {
  useUserStore,
  useBranchStore,
  useDepartmentStore,
  usePositionStore,
} from "../../state/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function () {
  const navigate = useNavigate();
  const { createUser } = useUserStore();
  const { branches, getAllBranches } = useBranchStore();
  const { departments, getAllDepartments } = useDepartmentStore();
  const { positions, getAllPositions } = usePositionStore();

  useQuery({
    queryKey: ["branches"],
    queryFn: getAllBranches,
  });

  useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });

  useQuery({
    queryKey: ["positions"],
    queryFn: getAllPositions,
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      phone: "",
      address: "",
      city: "",
      email: "",
      password: "",
      role: "Employee",
      branch: "",
      department: "",
      position: "",
      image: [],
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("fname", values.fname);
      formData.append("lname", values.lname);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("branch", values.branch);
      formData.append("position", values.position);
      formData.append("department", values.department);
      values.image.forEach((file) => {
        formData.append("image", file);
      });

      try {
        await createUser(formData);
        toast.success("Registration successful");
        navigate("/login");
      } catch (error) {
        toast.error("User Registration failed");

        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });

  const filteredDepartments = departments?.filter(
    (d) => d.branch._id === formik.values.branch
  );

  const filteredPositions = positions?.filter(
    (p) => p.department._id === formik.values.department
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex items-center justify-center p-4 m-4"
    >
      <div className="flex flex-col w-full max-w-5xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6">
        <div className="hidden w-full md:w-1/2 md:block">
          <Image />
        </div>
        <div className="flex flex-col w-full space-y-4 md:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
            Register Your Account
          </h2>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-code-branch"></i> Branch
            </label>
            <select
              name="branch"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.branch}
              className="p-2 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[2.5rem]"
            >
              <option value="" disabled>
                Select a branch
              </option>
              {branches?.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branch_name}
                </option>
              ))}
            </select>
            <div className="min-h-[1.25rem]">
              {formik.touched.branch && formik.errors.branch && (
                <div className="text-sm text-red-500">
                  {formik.errors.branch}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-building"></i> Department
            </label>
            <select
              name="department"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {formik.touched.department && formik.errors.department ? (
              <div className="text-sm text-red-500">
                {formik.errors.department}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-building"></i> Employee Position
            </label>
            <select
              name="department"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.position}
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Your Position
              </option>
              {filteredPositions?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.position_name}
                </option>
              ))}
            </select>
            {formik.touched.position && formik.errors.position ? (
              <div className="text-sm text-red-500">
                {formik.errors.position}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-user"></i> First Name
            </label>
            <input
              type="text"
              name="fname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fname}
              placeholder="Enter your first name"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-user"></i> Last Name
            </label>
            <input
              type="text"
              name="lname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lname}
              placeholder="Enter your last name"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-phone"></i> Contact Number
            </label>
            <input
              type="text"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder="Enter your contact number"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-location-dot"></i> Address
            </label>
            <input
              type="text"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder="Enter your address"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-city"></i> City
            </label>
            <input
              type="text"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your city"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-envelope"></i> Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="mr-1 fa-solid fa-image"></i> Profile Image
            </label>
            <input
              type="file"
              name="image"
              multiple
              onChange={(e) => {
                const files = Array.from(e.currentTarget.files || []);
                formik.setFieldValue("image", files);
              }}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-medium text-white transition duration-700 bg-black border border-gray-500 rounded-md hover:opacity-80"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
