import * as yup from "yup";

const createPositionValidationSchema = yup.object({
    department: yup.string().required("Department is required"),
    position_name: yup.string().required("Position Name is required"),
    description: yup.string().required("Position description is required"),
});

export default createPositionValidationSchema;