import * as yup from "yup";

const editAssigneeValidationSchema = yup.object({
    assignee: yup.string().required("Assignee is required"),
    level: yup.string().required("Level is required"),
    status: yup.string().required("Status is required"),
});

export default editAssigneeValidationSchema;