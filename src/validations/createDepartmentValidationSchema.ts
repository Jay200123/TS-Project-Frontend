import * as yup from "yup";

const createDepartmentValidationSchema = yup.object({
    branch: yup.string().required("Branch is required"),
    department_name: yup.string().required("Department Name is required"),
    descriptionn: yup.string().required("Department description is required"),
});

export default createDepartmentValidationSchema;