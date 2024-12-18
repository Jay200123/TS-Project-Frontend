import * as yup from "yup";

const editTicketByTechnicianValidationSchema = yup.object({
    findings: yup.string().required("Findings is required"),
    device_status: yup.string().required("Device status is required"),  
    status: yup.string().required("Status is required"),
});

export default editTicketByTechnicianValidationSchema;