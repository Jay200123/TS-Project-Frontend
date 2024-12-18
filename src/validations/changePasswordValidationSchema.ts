import * as yup from "yup";

const editPasswordValidationSchema = yup.object({
    newPassword: yup.string().required("New Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required"),
});

export default editPasswordValidationSchema;