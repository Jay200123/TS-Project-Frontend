import * as yup from "yup";

const userValidationSchema = yup.object({
    fullname: yup.string().required("Full Name is required"),
    phone: yup.string().required("Phone Number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
});

export default userValidationSchema;    