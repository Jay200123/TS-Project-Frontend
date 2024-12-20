import { create } from "zustand";
import { DepartmentState } from "../interface";
import api from "./api";
import { PATH } from "../constants";
import { multipart } from "./multipart";

export const useDepartmentStore = create<DepartmentState>((set) => ({
    departments: [],
    department: null,
    loading: false,
    error: null,
    getAllDepartments: async () => {
        const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.DEPARTMENTS_ROUTES}`);
        set({ departments: res.data.details, loading: false, error: null });

        return res.data.details;
    },
    getOneDepartment: async (id: string) => {
        const res = await api.get(`${import.meta.env.VITE_API_URI}${PATH.DEPARTMENT_ID_ROUTE.replace(":id", id)}`);
        set({
            department: !Array.isArray(res.data.details) ? res.data.details : null,
            loading: false,
            error: null,
        });

        return res.data.details;
    },
    createDepartment: async (data) => {
        const res = await api.post(`${import.meta.env.VITE_API_URI}${PATH.DEPARTMENTS_ROUTES}`,
            data,
            {
                headers: multipart,
            }
        );
        set((state) => ({
            departments: [...state.departments, res.data.details],
            loading: false,
            error: null
        }));

        return res.data.details;
    },
    updateDepartmentById: async (id: string, data) => {
        const res = await api.patch(`${import.meta.env.VITE_API_URI}${PATH.EDIT_DEPARTMENT_ROUTE.replace(":id", id)}`,
            data,
            {
                headers: multipart,
            }
        )

        set((state) => ({
            departments: state.departments.map((u) =>
                u._id === id ? res.data.details : u
            ),
        }));

        return res.data.details;
    },

    deleteDepartmentById: async (id: string) => {
        const res = await api.delete(`${import.meta.env.VITE_API_URI}${PATH.DEPARTMENT_ID_ROUTE.replace(":id", id)}`);
        set((state) => ({
            departments: state.departments.filter((u) =>
                u._id !== id
            ),
        }));

        return res.data.details;
    }
}))