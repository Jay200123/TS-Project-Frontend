import * as yup from "yup";

const createTicketValidationSchema = yup.object({
    device: yup.string().required("Device is required"),
    category: yup.string().required("Ticket category is required"),
    description: yup.string().required(" description is required"),
});

export default createTicketValidationSchema;