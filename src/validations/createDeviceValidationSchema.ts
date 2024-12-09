import * as yup from "yup";

const createDeviceValidationSchema = yup.object({
    owner: yup.string().required("Device Owner is required"),
    type: yup.string().required("Type is required"),
    description: yup.string().required("Description is required"),
    date_requested: yup
        .date()
        .required("Date Requested is required")
        .typeError("Invalid date format"),
    date_purchased: yup
        .date()
        .required("Date Purchased is required")
        .typeError("Invalid date format"),
    serial_number: yup.string().required("Serial Number is required"),
    status: yup.string().required("Status is required"),
});

export default createDeviceValidationSchema;