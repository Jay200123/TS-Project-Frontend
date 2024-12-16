import * as yup from "yup";

const createEquipmentValidationSchema = yup.object({
  equipment_name: yup.string().required("Equipment name is required"),
  price: yup.number().required("Price is required"),
  quantity: yup.number().required("Quantity is required"),
});

export default createEquipmentValidationSchema;
