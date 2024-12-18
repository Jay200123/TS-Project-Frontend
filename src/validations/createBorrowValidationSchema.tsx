import * as yup from "yup";

const createBorrowValidationSchema = yup.object({
  user: yup.string().required("User is required"),
  equipment: yup.string().required("Equipment is required"),
  serial_number: yup.string().required("Serial Number is required"),
  quantity: yup.number().required("Quantity Borrowed is required"),
  reason: yup.string().required("Reason is required"),
  signature: yup.string().required("Signature is required"),
});

export default createBorrowValidationSchema;
