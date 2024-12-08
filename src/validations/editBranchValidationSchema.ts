import * as yup from "yup";

const editBranchValidationSchema = yup.object({
    branch_name: yup.string().required("Branch Name is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().required("Phone Number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
});

export default editBranchValidationSchema;