import { useEquipmentStore } from "../../state/store";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "../../components";
import { editEquipmentValidationSchema } from "../../validations";
import { useQuery } from "@tanstack/react-query";

export default function () {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { equipment, getOneEquipment, updateEquipmentById } =
    useEquipmentStore();

  useQuery({
    queryKey: ["equipment", id],
    queryFn: () => getOneEquipment(id!),
    enabled: !!id,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      equipment_name: equipment?.equipment_name || "",
      price: equipment?.price || "",
      quantity: equipment?.quantity || "",
      image: equipment?.image || [],
    },
    validationSchema: editEquipmentValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("equipment_name", values.equipment_name);
      formData.append("price", values.price?.toString());
      formData.append("quantity", values.quantity?.toString());
      values.image.forEach((file: any) => {
        formData.append("image", file);
      });

      try {
        await updateEquipmentById(equipment?._id!, formData);
        toast.success("Equipment Updated successfully");
        navigate("/equipments");
      } catch (err) {
        toast.error("Failed to create equipment");
      }
    },
  });

  const back = () => {
    window.history.back();
  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex items-center justify-center p-4 m-4"
      >
        <div className="flex relative flex-col w-full max-w-2xl  xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 overflow-hidden min-h-[24rem]">
        <h2 className="absolute text-xl font-bold text-center text-gray-800 md:text-3xl md:text-left">
            <i
              onClick={back}
              className="mr-2 transition-all duration-500 cursor-pointer fa-solid fa-arrow-left hover:opacity-80"
            ></i>
          </h2>
          <div className="hidden w-full md:w-1/2 md:block min-h-[20rem]">
            <Image />
          </div>
          <div className="flex flex-col w-full space-y-4 md:w-1/2">
            <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
            Edit & Upate Details
            </h2>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-barcode"></i> Equipment
              </label>
              <input
                type="text"
                id="equipment_name"
                name="equipment_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.equipment_name}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.equipment_name && formik.errors.equipment_name ? (
                <div className="text-sm text-red-500">
                  {formik.errors.equipment_name}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-peso-sign"></i> Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-sm text-red-500">
                  {formik.errors.price}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-boxes-stacked"></i> Quantity
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
                <i className="mr-1 fa-solid fa-image"></i> Equipment Image
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
