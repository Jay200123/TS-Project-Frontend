import * as yup from "yup";

const authenticationValidationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default authenticationValidationSchema;