import * as yup from "yup";

const userValidationSchema = yup.object({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    phone: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
}); 

export default userValidationSchema;    