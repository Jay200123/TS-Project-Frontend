import * as yup from "yup";

const editDeviceValidationSchema = yup.object({
    owner: yup.string().required("Device Owner is required"),
    type: yup.string().required("Type is required"),
    descriptionn: yup.string().required("Description is required"),
    date_requested: yup.date().required("Date Requested is required"),
    date_returned: yup.date().required("Date Returned is required"),
    serial_number: yup.string().required("Serial Number is required"),
    status: yup.string().required("Status is required"),
});

export default editDeviceValidationSchema;