import * as yup from "yup";

const createTicketValidationSchema = yup.object({
    department: yup.string().required("Department is required"),
    position_name: yup.string().required("Position Name is required"),
    descriptionn: yup.string().required("Position description is required"),
});

export default createTicketValidationSchema;