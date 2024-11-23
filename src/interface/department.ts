import { Branch } from "./branch";

interface Department {
    _id: string;
    branch: Branch;
    department_name: string;
    description: string;
}

interface DepartmentState {
    departments: Department[];
    department: Department | null;
    loading: boolean;
    error: string | null;
    getAllDepartments: () => Promise<Department[]>;
    getOneDepartment: (id: string) => Promise<Department | null>;
    createDepartment: (formData: FormData) => Promise<Department>;
    updateDepartmentById: (id: string, formData: FormData) => Promise<Department>;
    deleteDepartmentById: (id: string) => Promise<void>;
}

export type { Department, DepartmentState };    