import * as yup from "yup";

const createPositionValidationSchema = yup.object({
    device: yup.string().required("Device is required"),
    category: yup.string().required("Category is required"),
    description: yup.string().required("Device description is required"),
});

export default createPositionValidationSchema;